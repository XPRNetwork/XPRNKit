# xprnkit

To install dependencies:

```bash
bun install
```

# XPRNKit: 
## Accelerating dApp Development for XPRNetwork

XPRNKit is a React-based library designed to streamline decentralized application (dApp) development and prototyping on the XPRNetwork blockchain. It offers a comprehensive set of tools, components, and utilities that enable developers to rapidly build, deploy, and test dApps with minimal setup. By abstracting away much of the underlying complexity of blockchain interactions, XPRNKit empowers developers to focus on core functionality and user experience.

Whether you're creating smart contracts, integrating wallets, or handling token transactions, XPRNKit simplifies common tasks and accelerates the development process. It’s perfect for both experienced blockchain developers looking to prototype quickly and newcomers who want to get up and running with XPRNetwork faster.

## Key Features

- **Pre-built Components**: Ready-to-use UI components for common dApp functionality like wallet connections, token balances, and transaction history.
- **Blockchain Integration**: Simplified access to XPRNetwork’s blockchain features, reducing the need for extensive configuration.
- **Developer-Friendly Hook**: A simple unique hook to access objects and method to maximizing flexibility.

XPRNKit is the ideal toolkit for developers who want to build and deploy secure, scalable, and user-friendly dApps on XPRNetwork with greater efficiency.

## Hooks

### `useXPRN()`
Accessible in the part of you app wrapped inside the XPRProvider. This hook provides access object and methods for interacting with the wallet session and profile. 

## Types

### `XPRNProfile`
| Key         | Type     | Description                                                                 |
|-------------|----------|-----------------------------------------------------------------------------|
| `displayName`| `string` | The display name of the connected user.                                      |
| `avatar?`   | `string` | Base64 string of the user's avatar image.                                    |
| `isKyc`     | `boolean`| Boolean indicating if the user is KYC verified.                              |


```tsx
const { session, profile, connect, disconnect } = useXPRN();
```

#### Return Values
| Key         | Type                          | Description                                                                 |
|-------------|-------------------------------|-----------------------------------------------------------------------------|
| `session`   | `LinkSession \| null`         | Current user session, if available.                                         |
| `link`      | `ProtonWebLink \| null`       | Proton wallet link used to manage the session.                              |
| `profile`   | `XPRNProfile \| null`         | User profile data, including display name, avatar, and KYC status.          |
| `connect`   | `Function`                    | Connects to the wallet and retrieves session and profile information.       |
| `disconnect`| `Function`                    | Disconnects the current wallet session and clears profile data.             |


### Example of using `useXPRN`

```tsx
import { useXPRN } from './XPRProvider';

const WalletComponent = () => {
  const { session, profile, connect, disconnect } = useXPRN();

  return (
    <div>
      {session ? (
        <div>
          <p>Connected as {profile?.displayName}</p>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      ) : (
        <button onClick={() => connect()}>Connect Wallet</button>
      )}
    </div>
  );
};
```

## Components

### `XPRProviderProps`
#### Overview

The XPRProvider component wraps your application to provide wallet connection management, session handling, and user profile retrieval for dApps built on the XPRNetwork blockchain. It uses the Proton wallet to connect, interact, and authenticate users with the blockchain.

| Prop            | Type                        | Description                                                                 |
|-----------------|-----------------------------|-----------------------------------------------------------------------------|
| `children`      | `React.ReactNode`           | The child components wrapped by `XPRProvider`.                             |
| `config`        | `XPRProviderConfig`         | Configuration for the provider, including chain ID, endpoints, and dApp details. |


### `XPRProviderConfig`
| Key               | Type                   | Description                                                                 |
|-------------------|------------------------|-----------------------------------------------------------------------------|
| `chainId`         | `string`               | The blockchain chain ID used by the provider.                               |
| `endpoints`       | `string[]`             | The blockchain endpoints for connecting to the XPR network.                 |
| `dAppName`        | `string`               | The name of the decentralized application (dApp).                           |
| `requesterAccount`| `string`               | The account that is requesting a session.                                   |
| `requesterLogo?`  | `string`               | (Optional) The logo of the dApp, displayed during wallet connection.        |
| `apiMode`         | `"testnet" | "mainnet"`  | Specifies whether the dApp is operating on testnet or mainnet.              |


<hr/>

### `XPRNConnectButton`
#### Overview

The `XPRNConnectButton` component is a versatile button used to connect and disconnect a user’s wallet to an XPRNetwork dApp. It handles wallet connection state using the `useXPRN` hook from the `XPRProvider`. This button provides multiple variants and sizes using the `class-variance-authority` (CVA) library for styling.

##### Usage

```tsx
import { XPRNConnectButton } from './XPRNConnectButton';

const App = () => (
  <XPRNConnectButton variant="default" size="default" />
);
```

##### Props

###### `XPRNConnectButtonProps`
The component extends the standard HTML button attributes and adds the following custom properties:

| Prop         | Type                                                      | Description                                                                 |
|--------------|-----------------------------------------------------------|-----------------------------------------------------------------------------|
| `variant`    | `default` \| `destructive` \| `outline` \| `secondary` \| `ghost` \| `link` | The style variant of the button. The default is `default`.                  |
| `size`       | `default` \| `sm` \| `lg` \| `icon`                        | The size of the button. The default is `default`.                           |
| `asChild`    | `boolean`                                                 | Renders the button as a child component using the `Slot` from `@radix-ui/react-slot`. |
| `children`   | `React.ReactNode`                                          | The content displayed inside the button (text or elements).                 |

The component accepts all other props from `React.ButtonHTMLAttributes<HTMLButtonElement>` such as `onClick`.

### Variants

###### `variant`
- **default**: A black button with white text and shadow.
- **destructive**: Red button indicating a destructive action.
- **outline**: Outlined button with a light background.
- **secondary**: Secondary styled button with secondary colors.
- **ghost**: A transparent button with hover effects.
- **link**: Styled like a text link with underline on hover.

###### `size`
- **default**: Default size with medium height and padding (`h-9 px-4 py-2`).
- **sm**: Smaller size button (`h-8 rounded-md px-3 text-xs`).
- **lg**: Large size button (`h-10 rounded-md px-8`).
- **icon**: Button styled as an icon, perfect for icon-only buttons (`h-9 w-9`).

###### Example

```tsx
import React from "react";
import { XPRNConnectButton } from "./XPRNConnectButton";

const MyApp = () => (
  <div>
    <XPRNConnectButton variant="outline" size="lg" />
  </div>
);
```

When the button is clicked, it triggers either the `connect` or `disconnect` functions based on the current session state.

###### Behavior:
- If no session is active, the button will render a "Connect Me!" button that initiates the wallet connection.
- If a session is active, the button will display the text `Log out (actor name)` and disconnect the wallet on click.

###### Example with session management:

```tsx
<XPRNConnectButton variant="link" size="sm" />
```

This renders a small button styled as a text link. If connected, it will display the current wallet actor and allow disconnection.

