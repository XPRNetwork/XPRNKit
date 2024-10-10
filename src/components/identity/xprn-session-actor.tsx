"use client"
import React from 'react';
import classNames from 'classnames';
import { useXPRN } from '../../providers/XPRNProvider';
type XPRNSessionActorProps = React.HTMLAttributes<HTMLHeadElement> & {}
export const XPRNSessionActor: React.FunctionComponent<XPRNSessionActorProps> = ({ children, className }) => { 
  const {session} = useXPRN()
const rootClasses = classNames({
[`${className}`]: className,
});
  if (!session) return <></>
  return <h3 className={`${rootClasses}`}>
     @{session.auth.actor.toString()}
   </h3>
}