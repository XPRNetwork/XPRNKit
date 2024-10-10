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

# XPRNProvider and useXPRN Documentation

## XPRNProvider

The `XPRNProvider` is a React component that provides a context for XPR Network blockchain interactions within your application.

### Props

```typescript
type XPRNProviderProps = {
  children: React.ReactNode | React.ReactNode[];
  config: XPRProviderConfig;
};
```

- `children`: React components that will have access to the XPRN context.
- `config`: Configuration object for the XPRN provider.

### Configuration

```typescript
type XPRProviderConfig = {
  chainId: string;
  endpoints: string[];
  dAppName: string;
  requesterAccount: string;
  requesterLogo?: string;
  authenticationUrl?: string;
  enforceAuthentication?: boolean;
  apiMode: "testnet" | "mainnet";
};
```

### Usage

```jsx
import { XPRNProvider } from './path/to/XPRNProvider';

const config = {
  chainId: 'your-chain-id',
  endpoints: ['https://your-endpoint.com'],
  dAppName: 'Your dApp Name',
  requesterAccount: 'your-account',
  apiMode: 'mainnet'
};

function App() {
  return (
    <XPRNProvider config={config}>
      {/* Your app components */}
    </XPRNProvider>
  );
}
```

## useXPRN Hook

The `useXPRN` hook provides access to the XPRN context within your React components.

### Usage

```jsx
import { useXPRN } from './path/to/XPRNProvider';

function YourComponent() {
  const { session, profile, connect, disconnect, authenticate } = useXPRN();

  // Use the context values and functions
}
```

### Returned Values

The `useXPRN` hook returns an object with the following properties:

- `session`: Current LinkSession object or null.
- `link`: ProtonWebLink object or null.
- `profile`: XPRNProfile object or null.
- `rpc`: JsonRpc object or null.
- `authentication`: XPRNAuthentication object or null.
- `connect`: Function to initiate a connection.
- `disconnect`: Function to disconnect the session.
- `authenticate`: Function to authenticate the user uring the authentication URL.
- `addTransactionError`: Function to add a transaction error to the stack.

### Key Functions

#### connect

```typescript
connect(
  restore?: boolean,
  silent?: boolean,
  onSession?: (session: LinkSession) => void,
  onProfile?: (profile: XPRNProfile) => void
) => void
```

Initiates a connection to the WebAuth wallet.

#### disconnect

```typescript
disconnect() => void
```

Disconnects the current session.

#### authenticate

```typescript
authenticate(
  success: (res: any) => void,
  fail: (e: any) => void
) => void
```

Authenticates the user using the provided authentication URL.

## Types

### XPRNAuthentication

```typescript
type XPRNAuthentication = {
  actor: string;
  publicKey: string;
  data?: any;
};
```

### XPRNProfile

```typescript
type XPRNProfile = {
  displayName: string;
  avatar?: string;
  authentication?: XPRNAuthentication;
  isKyc: boolean;
};
```

# Components Documentation


# XRPNContainer

`XRPNContainer` is a React component that conditionally renders its children based on the presence of a session.

## Import

```typescript
import { XRPNContainer } from 'path/to/xprn-container';
```

## Props

The `XRPNContainer` component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode \| ReactNode[]` | The content to be rendered when a session is present. |
| `className` | `string` | Optional CSS class name(s) to be applied to the container. |
| `noSessionState` | `ReactNode \| ReactNode[]` | Optional content to be rendered when no session is present. |

Additionally, `XRPNContainer` accepts all standard HTML div element attributes.

## Usage

```jsx
import { XRPNContainer } from 'path/to/xprn-container';

function MyComponent() {
  return (
    <XRPNContainer
      className="my-custom-class"
      noSessionState={<p>Please log in to view content.</p>}
    >
      <h1>Welcome, user!</h1>
      <p>This content is only visible when a session is present.</p>
    </XRPNContainer>
  );
}
```

## Behavior

- If a session is present (determined by the `useXPRN` hook), the component renders its `children`.
- If no session is present, the component renders the `noSessionState` content if provided, otherwise it renders nothing.

## Dependencies

- React
- `useXPRN` hook from "../providers/XPRNProvider"

## Notes

- This component uses the "use client" directive, indicating it's designed for client-side rendering in Next.js applications.
- The component leverages the `useXPRN` hook to determine the session state.


# XPRNConnectButton

The `XPRNConnectButton` is a React component that provides a customizable button for connecting to and disconnecting from an XPRN session.

## Import

```typescript
import { XPRNConnectButton } from "packages/xprnkit/src/components/xprn-session";
```

## Props

The `XPRNConnectButton` accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `className` | `string` | Additional CSS classes to apply to the button |
| `variant` | `string` | Button variant (style) |
| `size` | `string` | Button size |
| `asChild` | `boolean` | If true, renders the component as a child component |
| `onClick` | `function` | Custom click handler (Note: internal connect/disconnect logic will still apply) |
| `children` | `React.ReactNode` | Custom content for the button when not connected |
| `...props` | `React.ButtonHTMLAttributes<HTMLButtonElement>` | Any other props accepted by HTML button element |

## Usage

```jsx
import { XPRNConnectButton } from "packages/xprnkit/src/components/xprn-session";

function MyComponent() {
  return (
    <XPRNConnectButton
      variant="primary"
      size="medium"
      className="custom-class"
    >
      Connect to XPRN
    </XPRNConnectButton>
  );
}
```

## Behavior

- When there's no active session, the button displays the provided `children` content and triggers the `connect()` function when clicked.
- When there's an active session, the button displays "Log out (actor)" and triggers the `disconnect()` function when clicked.


## Notes

- The component uses the `useXPRN` hook to access the current session state and connect/disconnect functions.

# XPRNIdentity Component

## Overview

The `XPRNIdentity` component is a React functional component that displays user identity information and provides session management functionality

## Props

The component accepts the following props:

- `children`: React nodes to be rendered inside the dropdown menu (optional)
- `className`: Additional CSS classes for the root element (optional)
- `showLogout`: Boolean to determine if the logout link should be displayed (optional)
- `activeSessionClassName`: Additional CSS classes for the active session container (optional)
- `dropdownClassName`: Additional CSS classes for the dropdown menu (optional)
- `avatarClassName`: Additional CSS classes for the avatar component (optional)

## Functionality

1. If a user session exists:
   - Displays a dropdown menu with the user's avatar and session information
   - Shows the user's name and actor information
   - Optionally displays a logout link
   - Renders any child components in the dropdown content

2. If no user session exists:
   - Displays a "Connect" button using the `XPRNConnectButton` component


## Usage

```jsx
import { XPRNIdentity } from 'path/to/xprn-identity';

function MyComponent() {
  return (
    <XPRNIdentity showLogout={true} avatarClassName="custom-avatar">
      <div>Additional dropdown content</div>
    </XPRNIdentity>
  );
}
```

## Notes

- The component is wrapped in a "use client" directive, indicating it's designed for client-side rendering.
- It uses the `useXPRN` hook to access session information and the `disconnect` function.
- The logout functionality is implemented using the `disconnect` function from the XPRN context.


## Identity sub components

The following components are used inside XPRNIdentity:

1. **XPRNAvatar**
   - Exported from: `'./xprn-avatar'`
   - Description: A component for rendering user avatars or profile pictures.

2. **XPRNSessionActor**
   - Exported from: `'./xprn-session-actor'`
   - Description: Related to the current session's active user or actor.

3. **XPRNSessionName**
   - Exported from: `'./xprn-session-name'`
   - Description: For displaying the current session user's name.

## Usage
To use these components in your project, you can import them from this file:

```typescript
import { XPRNAvatar, XPRNSessionActor, XPRNSessionName } from 'xprnkit/src/components/identity';
```

# XPRNSwap Component

The `XPRNSwap` component is a React functional component that provides a user interface for XPR Network tokens swapping functionality out of the box.

## Import

```typescript
import { XPRNSwap } from 'packages/xprnkit/src/components/swap/xprn-swap';
```

## Props

The `XPRNSwap` component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `filters` | `XPRNMarketProviderQuoteFilter` | Optional. Filters for market provider quotes. |
| `sides` | `XPRNSwapSide[]` | Optional. Array of swap sides. |
| `markets` | `string[]` | Optional. Array of market identifiers. |
| `className` | `string` | Optional. Additional CSS classes to apply to the component. |
| `children` | `React.ReactNode` | Optional. Child elements to render within the component. |

Additionally, the component accepts all standard HTML attributes for a `div` element.

## Usage

### Basic
```jsx
<XPRNSwap />
```

### With config
```jsx
<XPRNSwap
filters={...}
sides={['buy', 'sell']}
markets={['market1', 'market2']}
className="custom-class"
/>
```

### Customs using `XPRNSwapProvider`
```jsx
<XPRNSwapProvider config={{filters:{quoteSymbol:"SNIPS",baseSymbol:"XUSDC"}}}>
  <div className="p4 bg-green-400 grid grid-cols-[1fr,min-content] gap-6 p-4 w-full">
    <XPRNPairsSelector/>
    <XPRNSwapFieldsGroup horizontal className="w-full">
      <XPRNSwapField/>
      <XPRNSwapSideButton horizontal>Yo!</XPRNSwapSideButton>
      <XPRNSwapField/>
    </XPRNSwapFieldsGroup>
    <XPRNTransaction>Swap</XPRNTransaction>
  </div>
</XPRNSwapProvider>
```

## Behavior

1. The component wraps its content in an `XPRNSwapProvider` to provide context for swap-related data and functionality.
2. It renders an `XPRNSwapLayout` component within the provider.
3. The component applies a default grid layout with padding and border styling.
4. Custom CSS classes can be added via the `className` prop.

## Dependencies

- XPRNSwapProvider
- XPRNSwapLayout

## Notes

- Alternatively, XPRNSwap component allow you to rebuild the entire swap component layout the way you want by using it's sub components wrapped in a `XPRNSwapProvider` 


# XPRNSwapProvider

The `XPRNSwapProvider` is a React component that provides context for managing cryptocurrency swap operations.

## Usage

```jsx
import { XPRNSwapProvider } from 'path/to/xprn-swap-provider';

function App() {
  return (
    <XPRNSwapProvider config={/* optional config */}>
      {/* Your app components and XPRNKit swap sub components */}
    </XPRNSwapProvider>
  );
}
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `children` | `React.ReactNode \| React.ReactNode[]` | Child components to be wrapped by the provider |
| `config` | `XPRNSwapProviderConfig` (optional) | Configuration options for the swap provider |

### XPRNSwapProviderConfig

| Property | Type | Description |
|----------|------|-------------|
| `filters` | `XPRNMarketProviderQuoteFilter` (optional) | Filters for market provider quotes |
| `marketFilters` | `string[]` (optional) | Filters for specific markets |
| `sides` | `XPRNSwapSide[]` (optional) | Available swap sides (e.g., "buy", "sell") |

## Context

The `XPRNSwapProvider` creates a context with the following properties and methods:

| Property/Method | Type | Description |
|-----------------|------|-------------|
| `marketProviders` | `XPRNMarketProvider[]` | List of available market providers |
| `currentMarketProvider` | `XPRNMarketProvider \| null` | Currently selected market provider |
| `setCurrentMarketProvider` | `(marketProvider: XPRNMarketProvider) => void` | Function to set the current market provider |
| `refreshMarketPairs` | `() => void` | Function to refresh market pairs |
| `currentMarketPairs` | `XPRNMarketProviderResult[]` | Current list of market pairs |
| `refreshStatus` | `ServiceStatus` | Status of the refresh operation |
| `setCurrentSwapPair` | `(pair: XPRNMarketProviderResult) => void` | Function to set the current swap pair |
| `currentSwapPair` | `XPRNMarketProviderResult \| null` | Currently selected swap pair |
| `swapTransaction` | `any[]` | Current swap transaction details |
| `swapSide` | `XPRNSwapSide` | Current swap side (e.g., "buy" or "sell") |
| `setSwapSide` | `(value: XPRNSwapSide) => void` | Function to set the swap side |
| `swapVolume` | `number` | Current swap volume |
| `setSwapVolume` | `(value: number) => void` | Function to set the swap volume |
| `config` | `XPRNSwapProviderConfig` (optional) | Current configuration |
| `swapValues` | `XPRNSwapValues` | Current swap values |
| `updateSwapValues` | `(base: number, quote: number, lastMutated: "base" \| "quote") => void` | Function to update swap values |

## Hook

The `useXPRNSwap` hook can be used to access the `XPRNSwapProvider` context in child components.

### Usage

```jsx
import { useXPRNSwap } from 'path/to/xprn-swap-provider';

function SwapComponent() {
  const { currentSwapPair, swapSide, setSwapSide } = useXPRNSwap();

  // Use the context values and methods
  // ...

  return (
    // Your component JSX
  );
}
```

## Notes

- The provider fetches market pairs from the selected market provider's endpoint (currently Alcor is the only supported exchange). You can edit or add new provider using the `XPRNMarketProvider` interface.
- It manages the state of the current swap, including the selected pair, swap side, and volume.
- The provider automatically updates swap transactions when relevant values change.
- Error handling is implemented for network requests and configuration issues.

# XPRNSwapFieldsGroup

The `XPRNSwapFieldsGroup` is a React component that provides a flexible container for grouping swap fields in the XPRN swap interface. It's a utility component that flip swap fields position according to side (buy or sell)

## Import

```typescript
import { XPRNSwapFieldsGroup } from 'packages/xprnkit/src/components/swap/xprn-swap-fields-group';
```

## Props

The component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `React.ReactNode` | - | The child components to be rendered within the group. |
| `className` | `string` | `undefined` | Additional CSS classes to be applied to the root element. |
| `horizontal` | `boolean` | `false` | Determines if the fields should be arranged horizontally. |

Additionally, the component accepts all standard HTML div element attributes.

## Usage

```jsx
import { XPRNSwapFieldsGroup } from 'packages/xprnkit/src/components/swap/xprn-swap-fields-group';

function SwapInterface() {
  return (
    <XPRNSwapFieldsGroup horizontal={true} className="custom-class">
      {/* Swap field components go here */}
    </XPRNSwapFieldsGroup>
  );
}
```

## Behavior

- The component uses the `useXPRNSwap` hook to access the current swap configuration.
- It dynamically applies CSS classes based on the `horizontal` prop and the current `swapSide`.
- The layout of child components is reversed when `swapSide` is "sell".
- The component supports both vertical (default) and horizontal layouts.

# XPRNSwapSideButton

The `XPRNSwapSideButton` is a React component that provides a button for switching between "buy" and "sell" sides in a swap interface.

## Import

```typescript
import { XPRNSwapSideButton } from 'path/to/xprn-swap-side-button';
```

## Props

The component accepts the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `horizontal` | `boolean` | `false` | Determines the orientation of the swap icon. If `true`, a horizontal arrow icon is displayed. |
| `children` | `React.ReactNode` | `undefined` | Custom content to be rendered inside the button. If not provided, a default icon is used. |
| `className` | `string` | `undefined` | Additional CSS classes to be applied to the button. |

The component also accepts all standard HTML attributes for a `div` element.

## Usage

```jsx
import { XPRNSwapSideButton } from 'path/to/xprn-swap-side-button';

function SwapInterface() {
  return (
    <div>
      {/* Other swap interface components */}
      <XPRNSwapSideButton horizontal={true} className="custom-class" />
    </div>
  );
}
```

## Behavior

- The button toggles between "buy" and "sell" sides when clicked.
- It uses the `useXPRNSwap` hook to access and modify the swap state.
- The button is not rendered if the swap configuration only has one side.
- The button has a hover effect that rotates it 180 degrees.

## Customization

- You can provide custom content by passing children to the component.
- The default icon can be overridden by passing custom JSX as children.
- Additional styling can be applied using the `className` prop.

## Notes

- The component is wrapped with `"use client"` directive, indicating it's a Client Component in Next.js.
- It uses React hooks (`useCallback`, `useMemo`) for performance optimization.


# XPRNSwapField Component

## Overview

The `XPRNSwapField` is a React component used in a the `XPRNSwap` interface. It provides an input field for users to enter the amount of tokens they want to swap, either for the base or quote currency of a trading pair. This component should be wrapped in a `XPRNSwapProvider`

## Props

The component accepts the following props:

- `type`: A string, either "quote" or "base", indicating whether this field is for the quote or base currency.
- `className`: An optional string for additional CSS classes.
- `children`: Optional child elements (not used in the current implementation).

It also accepts any other props that can be applied to a `div` element.

## Usage

```tsx
import { XPRNSwapField } from './path/to/xprn-swap-field';

<XPRNSwapField type="base" className="custom-class" />
```


## Styling

The component uses CSS classes for styling, including conditional classes based on the `className` prop and predefined classes for the input field.

# XPRNSwapMarketsSelector

## Overview

`XPRNSwapMarketsSelector` is a React functional component that renders a dropdown selector for swap market providers. It uses the `Select` component from a UI library and populates it with market providers from the `useXPRNSwap` hook. The component must be wrapped in a `XPRNSwapProvider` in order to be fed by markets config provided through `XPRNSwapProvider` config.

## Props

The component accepts the following props:

- `children`: React node (optional)
- `className`: string (optional)

These props are extended from `React.HTMLAttributes<HTMLDivElement>`.

## Usage

```tsx
import { XPRNSwapMarketsSelector } from 'path/to/xprn-swap-markets-selector';

function MyComponent() {
  return (
    <XPRNSwapMarketsSelector className="custom-class" />
  );
}
```

## Functionality

1. The component uses the `useXPRNSwap` hook to get `marketProviders`.
2. It initializes `services` state with `useState`.
3. `defaultServices` are memoized using `useMemo` and set to `DEFAULT_SWAP_SERVICES`.
4. `defaultService` is memoized to find the first service marked as default or the first service in the list.
5. The component renders a `Select` component 

## Conditional Rendering

The component only renders if there is more than one market provider (`marketProviders.length > 1`).

## Styling

The component uses `classNames` for conditional class application. The root `div` element receives the `className` prop if provided.


# XPRNPairsSelector Component

The `XPRNPairsSelector` is a React component that provides a dropdown selector for available (filtered or not) trading pairs form the selected market provider. It's designed to work within the context of an `XPRNSwapProvider`.

## Import Statement

```typescript
import * as React from "react";
import classNames from "classnames";
import {useXPRNSwap} from "./xprn-swap-provider";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
```

## Props

The component accepts the following props:

- `className?: string`: Additional CSS classes for the root element.
- `contentClassName?: string`: Additional CSS classes for the dropdown content.
- `itemsClassName?: string`: Additional CSS classes for the dropdown items.

These props extend the standard `HTMLDivElement` attributes.

## Functionality

1. The component uses the `useXPRNSwap` hook to access swap-related data and functions.
2. It displays a dropdown of available trading pairs when the loaded by the `XPRNSwapProvider` from the default or selected market provider.
3. Users can select a trading pair, which updates the current swap pair inside the `XPRNSwapProvider`.
4. The component shows loading and error states based on the `XPRNSwapProvider` loading status of the pair list.

## Usage

```tsx
<XPRNPairsSelector 
  className="custom-class"
  contentClassName="content-class"
  itemsClassName="item-class"
/>
```

## Render Logic

- If loading of the  is "idle":
  - Renders a `Select` component with the current pairs as options.
- If loading of the  is "pending":
  - Displays "Loading Pairs".
- If loading of the  is "fail":
  - Displays "Pairs shit" (consider changing this to a more appropriate error message).

## Styling

The component uses `classNames` for conditional styling:

- Root element: Applies the `className` prop if provided.
- Dropdown content: Applies "bg-white" and the `contentClassName` prop if provided.
- Dropdown items: Applies "text-black" and the `itemsClassName` prop if provided.

## Notes

- The component doesn't render anything if there's only one or zero market pairs available.
- The default selected value is set based on the `currentSwapPair`.
- Consider improving the error message for the "fail" state to be more user-friendly and informative.


# toPrecision

## Description

The `toPrecision` function adjusts a numeric value to a specified precision, with options for rounding behavior and decimal representation. It's used to format the an arbitrary price according to the token precision.

## Function Signature

```typescript
function toPrecision(
  value: number,
  precision: number,
  mode: 'ceil' | 'floor' | 'round' | 'none' = 'ceil',
  forceDecimal: boolean = true
): string
```

## Parameters

- `value` (number): The input number to be adjusted.
- `precision` (number): The number of decimal places to round to.
- `mode` ('ceil' | 'floor' | 'round' | 'none', optional): The rounding mode to use. Defaults to 'ceil'.
  - 'ceil': Rounds up to the nearest integer.
  - 'floor': Rounds down to the nearest integer.
  - 'round': Rounds to the nearest integer.
  - 'none': Uses 'ceil' behavior (same as 'ceil').
- `forceDecimal` (boolean, optional): Whether to force the output to include decimal places. Defaults to true.

## Returns

- (string): The adjusted value as a string, with or without forced decimal places based on the `forceDecimal` parameter.

## Behavior

1. Multiplies the input `value` by 10^`precision` to shift the decimal point.
2. Applies the specified rounding `mode` to the shifted value.
3. Divides the result by 10^`precision` to shift the decimal point back.
4. If `forceDecimal` is true, returns the result with the specified number of decimal places.
5. If `forceDecimal` is false, returns the result as a string without forcing decimal places.

## Example Usage

```typescript
console.log(toPrecision(3.14159, 2)); // "3.15"
console.log(toPrecision(3.14159, 2, 'floor')); // "3.14"
console.log(toPrecision(3.14159, 2, 'round')); // "3.14"
console.log(toPrecision(3.14159, 2, 'ceil', false)); // "3.15"
console.log(toPrecision(3, 2,'none',true)); // "3.00"
console.log(toPrecision(3, 2, 'ceil', false)); // "3"
```

## Notes

- The 'none' mode behaves the same as 'ceil' mode.
- When `forceDecimal` is true, the output will always have the specified number of decimal places, even if the input is an integer.
- When `forceDecimal` is false, the output may have fewer decimal places than specified if they are not needed (e.g., for whole numbers).

