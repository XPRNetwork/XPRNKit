"use client";
import {useXPRN} from "../providers/XPRNProvider";
import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "../lib/utils";
import type {ServiceStatus} from "../interfaces/service-status";
import type { TransactResult } from "@proton/web-sdk";

const XPRNTransactionVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        
      },
      size: {
      
      },
    },
    defaultVariants: {
      
    },
  }
);

export interface XPRNTransactionButtonBaseProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof XPRNTransactionVariants> {
  asChild?: boolean;
}

export type XPRNTransactionButtonProps = XPRNTransactionButtonBaseProps & {
  onTransactionStart?: () => void;
  onTransactionSuccess?: (res:TransactResult) => void;
  onTransactionFail?: (e:any) => void;
  actions: any[];
};

const XPRNTransaction = React.forwardRef<
  HTMLButtonElement,
  XPRNTransactionButtonProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      onClick,
      children,
      actions,
      onTransactionStart,
      onTransactionSuccess,
      onTransactionFail,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    const {session, connect, addTransactionError,txErrorsStack} = useXPRN();
    const [txStatus, setTxStatus] = React.useState<ServiceStatus>('idle');

    const TxStatusNode = React.useMemo(() => {
      if (txStatus == 'idle') return <>{ children}</>;
      if (txStatus == 'pending') return <>
        <svg xmlns="http://www.w3.org/2000/svg" className="animate-spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      </>;
      if (txStatus == 'success') return <div className="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335"/><path d="m9 11 3 3L22 4"/></svg>Success</div>;
      if (txStatus == 'fail') return <div className="flex gap-2 justify-center items-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>Fail, lease Rety</div>;
    }, [session,txStatus]);

    const pushTransaction = React.useCallback(() => {
      if (session) {
        if (onTransactionStart) onTransactionStart(); 
        setTxStatus('pending')
        
        try {
          session.transact({ actions }, { broadcast: true }).then(res => {
            if (onTransactionSuccess) onTransactionSuccess(res as TransactResult)
              setTxStatus('success')
          }).catch((e) => {
            setTxStatus('fail')
            addTransactionError(e)
          })
        } catch (e:any) {
          setTxStatus('fail')
          addTransactionError(e.toString())
          if (onTransactionFail) onTransactionFail(e)
          setTimeout(() => {
            setTxStatus('idle');
          }, 3000)
        }
        
      }
    }, [session, actions,setTxStatus]);

    return (
      <>
        {!session && (
          <Comp
            onClick={() => connect(false,false,()=>pushTransaction())}
            
            className={cn(XPRNTransactionVariants({variant, size, className}))}
            ref={ref}
            children="Connecte Me!"
            {...props}
          />
        )}
        {session && (
          <Comp
            onClick={() => pushTransaction()}
            
            className={cn(XPRNTransactionVariants({variant, size, className}))}
            ref={ref}
            children={TxStatusNode}
            {...props}
          />
        )}
      </>
    );
  }
);
XPRNTransaction.displayName = "XPRNTransaction";

export {XPRNTransaction, XPRNTransactionVariants};
