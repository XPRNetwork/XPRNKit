"use client";
import {ApiClass} from "@proton/api";
import type {Link, LinkSession, ProtonWebLink} from "@proton/web-sdk";
import ConnectWallet from "@proton/web-sdk";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {JsonRpc} from "@proton/js";
import type {XPRNTransactionsError} from "../interfaces/transaction-error-message";
import {parseTransactionErrorMessage} from "../utils";
import {proton_wrap} from "../interfaces/proton_wrap";

export type XPRNAuthentication = {
  actor: string;
  publicKey: string;
  data?: any;
};

export type XPRNProfile = {
  displayName: string;
  avatar?: string;
  authentication?: XPRNAuthentication;
  isKyc: boolean;
};

export type XPRProviderConfig = {
  chainId: string;
  endpoints: string[];
  dAppName: string;
  requesterAccount: string;
  requesterLogo?: string;
  authenticationUrl?: string;
  enforceAuthentication?: boolean;
  apiMode: "testnet" | "mainnet";
};

type XPRNProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  config: XPRProviderConfig;
};

type XPRNProviderContext = {
  session: LinkSession | null;
  link: ProtonWebLink | null;
  profile: XPRNProfile | null;
  rpc: JsonRpc | null;
  txErrorsStack: null;
  authentication: XPRNAuthentication | null;
  authenticate: (success: (res:any) => void, fail: (e:any) => void) => void;
  addTransactionError: (rawMessage: string) => void;
  connect: (
    restore?: boolean,
    silent?: boolean,
    onSession?: (session: LinkSession) => void,
    onProfile?: (profile: XPRNProfile) => void
  ) => void;
  disconnect: () => void;
};

const XPRNContext = React.createContext<XPRNProviderContext>({
  session: null,
  link: null,
  profile: null,
  rpc: null,
  txErrorsStack: null,
  connect: () => {},
  disconnect: () => {},
  addTransactionError(rawMessage) {},
  authentication: null,
  authenticate: callback => {},
});
export const XPRNProvider: React.FunctionComponent<XPRNProviderProps> = ({
  children,
  config,
}: XPRNProviderProps) => {
  const [session, setSession] = useState<LinkSession>();
  const [link, setLink] = useState<ProtonWebLink | Link>();
  const [authentication, setAuthentication] =
    useState<XPRNAuthentication | null>(null);
  const [jsonRpc, setJsonPrc] = useState<JsonRpc>(
    new JsonRpc(config.endpoints)
  );
  const [profile, setProfile] = useState<XPRNProfile>();
  const [errorsStack, setErrorStack] = useState<XPRNTransactionsError[]>();
  const onSessionRef = useRef<(session: LinkSession) => void>();
  const onProfileRef = useRef<(profile: XPRNProfile) => void>();

  const connect = useCallback(
    (
      restore?: boolean,
      silent?: boolean,
      onSession?: (session: LinkSession) => void,
      onProfile?: (profile: XPRNProfile) => void
    ) => {
      ConnectWallet({
        linkOptions: {
          endpoints: config.endpoints,
          restoreSession: restore ? true : false,
        },
        selectorOptions: {
          appName: config.dAppName,
        },
        transportOptions: {
          requestAccount: config.requesterAccount,
        },
      }).then(res => {
        onSessionRef.current = onSession;
        onProfileRef.current = onProfile;
        if (res.link) setLink(res.link);
        if (res.session) {
          setSession(prev => {
            return res.session;
          });
          const api = new ApiClass(
            config.apiMode && config.apiMode == "testnet"
              ? "proton-test"
              : "proton"
          );
          api.getProtonAvatar(res.session.auth.actor.toString()).then(res => {
            if (res) {
              setProfile(prev => {
                const xprProfile = {
                  displayName: res.name,
                  avatar: `${res.avatar}`,
                  isKyc: res.kyc.length > 0 || false,
                };
                return xprProfile;
              });
            }
          });
        }
      });
    },
    [config,setProfile]
  );

  const disconnect = useCallback(
    (onDestroy?: () => void) => {
      if (!link || !session) return;
      link
        .removeSession(config.requesterAccount, session.auth, session.chainId)
        .then(() => {
          setProfile(undefined);
          setSession(undefined);
          if (onDestroy) onDestroy();
        });
    },
    [link, session, config]
  );

  const addTxError = useCallback(
    (message: string) => {
      const mutatedMessages =
        errorsStack && errorsStack.length >= 0 ? [...errorsStack] : [];
      mutatedMessages.push(parseTransactionErrorMessage(message));
      setErrorStack(mutatedMessages);
    },
    [errorsStack, setErrorStack]
  );

  const authenticate = useCallback(
    (success: (res:any) => void, fail: (res:any) => void) => {
      if (!session) return;
      if (!config.authenticationUrl) return;
      const authenticationAction = proton_wrap.generateauth(
        [
          {
            actor: session.auth.actor.toString(),
            permission: session.auth.permission.toString(),
          },
        ],
        {
          protonAccount: session.auth.actor.toString(),
          time: new Date().toISOString().slice(0, -1),
        }
      );

      try {
        session
          .transact({actions: [authenticationAction]}, {broadcast: false})
          .then(res => {
            const identityProofBody = {
              signer: {
                actor: session.auth.actor,
                permission: session.auth.permission,
                public_key: session.publicKey,
              },
              transaction: res.resolvedTransaction,
              signatures: res.signatures,
            };
            if (config.authenticationUrl)
              fetch(config.authenticationUrl, {
                method: "post",
                body: JSON.stringify(identityProofBody),
              }).then(res=>res.json())
                .then(res => {
                  if (!session) return;
                  setAuthentication({
                    publicKey: session.publicKey.toString(),
                    actor: session.auth.actor.toString(),
                    data: res,
                  });
                  
              });
          })
          .catch(e => {});
      } catch (e: any) {}
    },
    [setAuthentication, session, config]
  );

  useEffect(() => {
    if (session) {
      if (config.enforceAuthentication && config.authenticationUrl) {
        authenticate(
          (res) => {
            setAuthentication(res)
          },
          () => {}
        );
      }
    }

    if (session && onSessionRef.current) {
      onSessionRef.current(session);
      onSessionRef.current = undefined; // Reset the ref
    }
  }, [session,authenticate,setAuthentication]);

  useEffect(() => {
    if (profile && onProfileRef.current) {
      onProfileRef.current(profile);
      onProfileRef.current = undefined; // Reset the ref
    }
  }, [profile]);

  const providerValue = useMemo(() => {
    return {
      session,
      link,
      profile,
      rpc: jsonRpc,
      addTransactionError: addTxError,
      connect,
      disconnect,
      authenticate,
      authentication,
    };
  }, [session, link, profile, connect, disconnect,authenticate,authentication]);
  return (
    <XPRNContext.Provider value={providerValue as any}>
      {children}
    </XPRNContext.Provider>
  );
};

export function useXPRN(): XPRNProviderContext {
  return useContext(XPRNContext);
}
