"use client"
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { identity, IdentityV2 } from './../../utils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {QRCode} from 'react-qr-code';
import { useXPRN } from './../../providers/XPRNProvider';
type WalletConnectProps = React.HTMLAttributes<HTMLDivElement> & {endpoints:string[]}
export const WalletConnect: React.FunctionComponent<WalletConnectProps> = ({ children, className }) => {
  
  const { config } = useXPRN();
  const rootClasses = classNames({
    [`${className}`]: className,
  });
  const [psrUri, setPsrUri] = useState<string>()
  const getIdentityUri = useCallback(() => {
    if (!config) return;
    IdentityV2(config.requesterAccount,config.endpoints,config.dAppName,config.chainId).then((uri) => {
      console.log('identity v2', uri)
      setPsrUri(uri)
      
    })
    identity(config.endpoints).then((uri) => {
      console.log('identity', uri)
      
      
    })
  }, [setPsrUri])
  return <div className={`${rootClasses}`}>
    <button onClick={() => getIdentityUri()}>Connect shit</button>
    
    {psrUri && <div className='w-96 h-96'>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        
        viewBox={`0 0 256 256`}
        value={psrUri}>
        
        </QRCode>
      <a href={psrUri} >Log using webauth</a>
    </div>}
    
    
    
   </div>
}