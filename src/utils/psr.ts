import zlib from "pako";
import Link,{LinkTransport} from "@proton/link";
import {LinkOptions} from "@proton/link";
import ProtonLinkBrowserTransport, { BrowserTransportOptions } from '@proton/browser-transport'
import {
  CallbackPayload,
  ResolvedSigningRequest,
  SigningRequest,
  SigningRequestEncodingOptions,
  
} from "@proton/signing-request";

import {
  SignedTransaction,
  Signature,
  Serializer,
  PackedTransaction,
} from "@greymass/eosio";

import { LinkSession} from "@proton/web-sdk";
import {ApiInterfaces, JsonRpc, Api} from "@proton/js";
import { deflateRawSync, inflateRawSync } from "zlib";
import BrowserTransport from "@proton/browser-transport";


export type PSRResponse = {
  signingRequest:any|null,
  uri:string | null,
};

export async function generatePsrUri(
  session: LinkSession,
  actions:any[]
): Promise<PSRResponse> {
  return new Promise(async (resolve, reject) => {
    const response: PSRResponse = {
      signingRequest:null,
      uri:null
    };

    if (!session) {
      console.log("no session");
      reject();
    }

    const signingReqResponse = await session.link.createRequest(
      {actions},
      session.link.getChain(0),
      session.link.transport
    );

    if (!session.link.transport || !session.link.transport.prepare) return;
    
    
    const preparedRequest = await session.link.transport.prepare(
      signingReqResponse.request,
      session
    );
    preparedRequest.setInfoKey("req_account", "posx");
    response.uri = preparedRequest.encode();
    resolve({ signingRequest: signingReqResponse, uri: preparedRequest.encode() })

    
  });
}

export async function processPSR(session:LinkSession,requestResponse:any,onRequest?:()=>void,onSuccess?:(res:any)=>void,onFailure?:(err:any)=>void):Promise<any> { 

  let callBack: any;
  let callbackPayload:CallbackPayload
  if (requestResponse.callback) callBack = await requestResponse.callback.wait() 
  callbackPayload = callBack as CallbackPayload;
  
    console.log("RESULT OF A CALLBACK", callbackPayload);
    if (typeof callbackPayload.rejected === "string") {
      console.warn("CALLBACK WAS REJECTED", callbackPayload.rejected);
    } else {
      

      const chain = session.link.chains.findLast(
        (chain: any) =>
          chain.chainId.toString() == callbackPayload.cid
      );
      const payloadKeys = Object.keys(callbackPayload);
      const signatures: Signature[] = payloadKeys
        .filter(key => key.startsWith("sig") && key !== "sig0")
        .map(key => Signature.from(callbackPayload [key]!));

      const resolvedSigningRequest = await ResolvedSigningRequest.fromPayload(
        callbackPayload ,
        {
          zlib: zlib,
          //TODO fix scheme
          scheme: "proton-dev",
          abiProvider: chain,
        }
      );
      //@ts-ignore
      const signedTx = SignedTransaction.from({
        ...resolvedSigningRequest.transaction,
        signatures,
      }).toJSON();

      const signedTxParsed = Serializer.objectify(signedTx);
      const packedTx = PackedTransaction.fromSigned(signedTx);
      if (onRequest) onRequest();
      let sessionRequest: Promise<ApiInterfaces.TransactResult | any>
      try {

      
      sessionRequest = session.client
        .push_transaction({
          serializedTransaction: packedTx.packed_trx.array,
          serializedContextFreeData: packedTx.packed_context_free_data.array,
          signatures: signedTxParsed.signatures,
          transactionHeader: signedTxParsed,
        })
        .then((res: any) => {
          //@ts-ignore
          if (onSuccess) onSuccess(res);
          if (session.link.transport.onSuccess)
            session.link.transport.onSuccess(requestResponse.request, res);
          return res;
        })
        .catch(err => {
          if (onFailure) onFailure(err);
          if (session.link.transport.onFailure)
            session.link.transport.onFailure(requestResponse.request, err);
        });
      } catch (err:any) {
        sessionRequest = err;
      }
      return sessionRequest
    }

}

export async function IdentityV2(requester:string,endpoints:string[],dAppName:string,chainId:string) {
  
  const linkOptions = {
    endpoints: endpoints,
    chainId:chainId
    
  }
  const selectorOptions = {
    appName: dAppName,
  };
  const transportOptions = {
    requestAccount: requester,
  };

  const options:LinkOptions = {
    ...linkOptions,
    scheme:'proton-dev',
    transport: new ProtonLinkBrowserTransport({
      ...transportOptions,
      walletType:'proton'
    }) as any,
    walletType:'proton',
    chains: [{
      chainId: chainId,
      nodeUrl:endpoints[0]
    }]
  }

  const link = new Link(options as LinkOptions);
  
  const req = await link.createRequest({ identity: { permission: { actor: 'solid', permission: 'active' } } });
  console.log(req.request.isIdentity(),'isIdentity')
  req.request.setInfoKey("req_account", "posx")
  
  //link.transport.onRequest(req.request,(re)=>{console.log('it have been canceled')})
  const uri = req.request.encode()
  
  link.sendRequest(req.request, req.callback)
  req.callback.wait();
  
  console.log(uri, 'this is uri')
  
  return uri

}

export async function identity(endpoints:string[]) {
    

  const identityRequestOptions = {
    callback: {
      background: true,
      url:''
    },
    chainId:process.env.NEXT_PUBLIC_CHAIN_ID
  }

  const textEncoder = new TextEncoder();
  const textDecoder = new TextDecoder();
  const jsonRPC = new JsonRpc(endpoints);
  const api = new Api({
    rpc: jsonRPC,
  });

  const encoderOption: SigningRequestEncodingOptions = {
    scheme: "proton-dev",
    // string encoder
    textEncoder: textEncoder,
    // string decoder
    textDecoder: textDecoder,
    // zlib string compression (optional, recommended)
    zlib: {
      deflateRaw: data => new Uint8Array(deflateRawSync(Buffer.from(data))),
      inflateRaw: data => new Uint8Array(inflateRawSync(Buffer.from(data))),
    },
    // Customizable ABI Provider used to retrieve contract data
    abiProvider: {
      // Ugly workaround for now :|
      // @ts-ignore
      getAbi: async (account: string) => {
        return await api.getAbi(account);
      },
    },
  }

  const request = await SigningRequest.identity(identityRequestOptions, encoderOption);
  const transport = new BrowserTransport({ requestAccount: 'solid' })
  const sr = await transport.prepare(request);
  console.log(sr,'this is sr')
  const uri = request.encode();
  return uri;
}

export class CustomTransport extends ProtonLinkBrowserTransport{
  constructor(
    options?: BrowserTransportOptions
  ) {
    super(options);
    
  }
}