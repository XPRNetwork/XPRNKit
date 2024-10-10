type proton_wrap_Actions = {
  "deladdress": {
    index:number
  },
  "deladdress2": {
    index:number
  },
  "generateauth": {
    protonAccount:string;
    time:{
    
}
  },
  "saveaddress": {
    address:{
  index:number;
account:string;
coin:string;
wallet:string;
address:string;
address_hash:{
    
}  
}
  },
  "saveaddress2": {
    address:{
  index:number;
account:string;
chain:string;
address:string;
address_hash:{
    
}  
}
  },
  "wrapfinish": {
    wrap_hash:{
    
};
    status:string
  },
  "wrapfinish2": {
    wrap_hash:{
    
};
    status:string
  },
  "wrapprocess": {
    wrap_hash:{
    
}
  },
  "wrapprocess2": {
    wrap_hash:{
    
}
  },
  "wrapsetconf": {
    wrap_hash:{
    
};
    confirmations:number
  },
  "wrapsetconf2": {
    wrap_hash:{
    
};
    confirmations:number
  },
  "wrapstart": {
    balance:{
    
};
    txid:string;
    coin:string;
    wallet:string;
    deposit_address:string;
    confirmations:number
  },
  "wrapstart2": {
    balance:{
    
};
    id:string;
    txid:string;
    chain:string;
    deposit_address:string;
    confirmations:number
  }
}

export const proton_wrap = {
  deladdress:(authorization:Authorization[],data:proton_wrap_Actions['deladdress']):XPRAction<'deladdress'>=>({
	account:'proton.wrap',
	name:'deladdress',
	authorization,
data}),
 deladdress2:(authorization:Authorization[],data:proton_wrap_Actions['deladdress2']):XPRAction<'deladdress2'>=>({
	account:'proton.wrap',
	name:'deladdress2',
	authorization,
data}),
 generateauth:(authorization:Authorization[],data:proton_wrap_Actions['generateauth']):XPRAction<'generateauth'>=>({
	account:'proton.wrap',
	name:'generateauth',
	authorization,
data}),
 saveaddress:(authorization:Authorization[],data:proton_wrap_Actions['saveaddress']):XPRAction<'saveaddress'>=>({
	account:'proton.wrap',
	name:'saveaddress',
	authorization,
data}),
 saveaddress2:(authorization:Authorization[],data:proton_wrap_Actions['saveaddress2']):XPRAction<'saveaddress2'>=>({
	account:'proton.wrap',
	name:'saveaddress2',
	authorization,
data}),
 wrapfinish:(authorization:Authorization[],data:proton_wrap_Actions['wrapfinish']):XPRAction<'wrapfinish'>=>({
	account:'proton.wrap',
	name:'wrapfinish',
	authorization,
data}),
 wrapfinish2:(authorization:Authorization[],data:proton_wrap_Actions['wrapfinish2']):XPRAction<'wrapfinish2'>=>({
	account:'proton.wrap',
	name:'wrapfinish2',
	authorization,
data}),
 wrapprocess:(authorization:Authorization[],data:proton_wrap_Actions['wrapprocess']):XPRAction<'wrapprocess'>=>({
	account:'proton.wrap',
	name:'wrapprocess',
	authorization,
data}),
 wrapprocess2:(authorization:Authorization[],data:proton_wrap_Actions['wrapprocess2']):XPRAction<'wrapprocess2'>=>({
	account:'proton.wrap',
	name:'wrapprocess2',
	authorization,
data}),
 wrapsetconf:(authorization:Authorization[],data:proton_wrap_Actions['wrapsetconf']):XPRAction<'wrapsetconf'>=>({
	account:'proton.wrap',
	name:'wrapsetconf',
	authorization,
data}),
 wrapsetconf2:(authorization:Authorization[],data:proton_wrap_Actions['wrapsetconf2']):XPRAction<'wrapsetconf2'>=>({
	account:'proton.wrap',
	name:'wrapsetconf2',
	authorization,
data}),
 wrapstart:(authorization:Authorization[],data:proton_wrap_Actions['wrapstart']):XPRAction<'wrapstart'>=>({
	account:'proton.wrap',
	name:'wrapstart',
	authorization,
data}),
 wrapstart2:(authorization:Authorization[],data:proton_wrap_Actions['wrapstart2']):XPRAction<'wrapstart2'>=>({
	account:'proton.wrap',
	name:'wrapstart2',
	authorization,
data}) 
} 
type proton_wrap_Tables = {
  "Address": {
    index:number;
    account:string;
    coin:string;
    wallet:string;
    address:string;
    address_hash:{
    
}
  },
  "Address2": {
    index:number;
    account:string;
    chain:string;
    address:string;
    address_hash:{
    
}
  },
  "Wrap": {
    index:number;
    proton_account:string;
    balance:{
    
};
    txid:string;
    coin:string;
    wallet:string;
    deposit_address:string;
    status:string;
    confirmations:number;
    finish_txid:{
    
};
    wrap_hash:{
    
}
  },
  "Wrap2": {
    index:number;
    proton_account:string;
    balance:{
    
};
    id:string;
    txid:string;
    chain:string;
    deposit_address:string;
    status:string;
    confirmations:number;
    finish_txid:{
    
};
    wrap_hash:{
    
}
  }
}


    export type Authorization = {
      actor: string;
      permission: "active"|"owner"|string;
  }

    export type XPRAction<A extends keyof (proton_wrap_Actions)>={
      account: 'proton.wrap';
      name: A;
      authorization: Authorization[];
      data: proton_wrap_Actions[A]; 
    }
  
export type Tables<TableName extends keyof (proton_wrap_Tables)> = proton_wrap_Tables[TableName];
export type Actions<ActionName extends keyof (proton_wrap_Actions)> = proton_wrap_Actions[ActionName];
export function proton_wrap_actionParams<ActionName extends keyof (proton_wrap_Actions)>(actionPrams: proton_wrap_Actions[ActionName]):(object|number|string |number[]|string[])[]{return Object.values(actionPrams)}
