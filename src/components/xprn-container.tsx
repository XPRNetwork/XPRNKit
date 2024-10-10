"use client";
import {useXPRN} from "../providers/XPRNProvider";
import classNames from "classnames";
import React from "react";
import type {ReactNode} from "react";
type XRPNContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  noSessionState?: ReactNode | ReactNode[];
};
export const XRPNContainer: React.FunctionComponent<XRPNContainerProps> = ({
  children,
  className,
  noSessionState,
}) => {
  const {session} = useXPRN();
  return <>{session ? <>{children}</> : <>{noSessionState}</>}</>;
};
