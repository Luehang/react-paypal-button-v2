# react-paypal-button-v2

<img src="paypal-smart-buttons.png" width="200px" />

> An easy and simple to use React button component to implement PayPal&#39;s Checkout with Smart Payment Buttons V2 (Version 2).

:information_source: This PayPal Checkout integration uses the PayPal JavaScript SDK.  Starting at the beginning of February 2019, all new users must use PayPal's version 2 integration as version 1 is now depreciated.

<br/>
<br/>
<br/>
<a href="https://luehangs.site/marketplace/mobile-development"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>
<br/>

# Index

### 1.  [Prerequisites](#large_blue_diamond-prerequisites)
### 2.  [Install](#large_blue_diamond-install)
### 3.  [Usage Example](#large_blue_diamond-usage-example)
### 4.  [API](#large_blue_diamond-api)
### 5.  :books: [Props](#large_blue_diamond-props)
### 6.  [Example Project](#large_blue_diamond-example-project)
### 7.  [Contribute](#large_blue_diamond-contribute)
### 8.  [License](#large_blue_diamond-license)

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: Prerequisites

To use PayPal's Smart Payment Buttons in prodution, you must have a PayPal Business account set up and verified. After this is done, you'll have access to your API credentials to use with this button.

Once you have your account set up, you will have 2 different sets of credentials for sandbox mode and production mode. You will also be able to create sandbox business and customer accounts to be tested on.

<br/>
<br/>
<br/>
<a href="https://luehangs.site/marketplace/mobile-development"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>
<br/>

## :large_blue_diamond: Install

1. Type in the following to the command line to install the dependency.

```sh
$ npm install react-paypal-button-v2 --save
```

or

```sh
$ yarn add react-paypal-button-v2
```

<br/>

2. Add the PayPal script to your web page, then add your sandbox or production client-id to the script tag.  While you're testing in sandbox, you can use `client-id=sb` as a shortcut.

```html
<script src="https://www.paypal.com/sdk/js?client-id=sb" />
```

### Query Parameters

Option | Description | Default
------ | ------ | ------
`client-id` | Your PayPal REST client ID. While you're testing in sandbox, you can use `client-id=sb` as a shortcut. | required
`currency` | The currency of the transaction. | `USD`

To see a complete list of available parameters and values, go to [PayPal's Customization page](https://developer.paypal.com/docs/checkout/reference/customize-sdk/).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: Usage Example

Add an ``import`` to the top of the file.  At minimal, declare the ``PayPalButton`` component in the ``render()`` method providing a number for the `amount` prop and a function to the `onSuccess` prop. Optional, but also add an error function to the `onError` prop.

```javascript
import { PayPalButton } from "react-paypal-button-v2";

export default class Example Component {
  render() {
    return (
      <PayPalButton
        amount="0.01"
        onSuccess={(details) => {
          return alert("Transaction completed by " + details.payer.name.given_name);
        }}
        onError={(err) => {
          return alert("Transaction was unsuccessful.");
        }}
      />
    );
  }
}
```

<br/>
OR
<br/>

```javascript
import { PayPalButton } from "react-paypal-button-v2";

export default class Example Component {
  render() {
    return (
      <PayPalButton
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: "USD",
                value: "0.01"
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
          // Capture the funds from the transaction
          return actions.order.capture().then(function(details) {
            // Show a success message to your buyer
            alert("Transaction completed by " + details.payer.name.given_name);
            // OPTIONAL: Call your server to save the transaction
            return fetch("/paypal-transaction-complete", {
              method: "post",
              body: JSON.stringify({
                orderID: data.orderID
              })
            });
          });
        }}
      />
    );
  }
}
```

<br/>
<br/>
<a href="https://luehangs.site/marketplace/mobile-development"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>

## :large_blue_diamond: API

``<PayPalButton />`` component accepts the following props...

<br/>

# :large_blue_diamond: Props

| Props                         | Description                                                                                                                                                                                    | Type              | Default |
|-------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------|---------|
| `amount`                     | The amount value of the transaction. | `string` |  |
| `currency`                   | The currency of the transaction. | `string` | "USD" |
| `onSuccess`                  | The successful completion of the transaction. `(details: object) => void` | `Function` |  |
| `onError`                    | Transaction declined or errored. `(err: object) => void` | `Function` |  |
| `createOrder`                | A function called when the buyer clicks the PayPal button. Calls PayPal using the `actions.order.create()` to set up the details of the transaction. `(data: object, actions: object) => void` | `Function` |  |
| `onApprove`                  | A function called when the buyer approves the transaction on paypal.com. Calls PayPal using the `actions.order.capture()` to capture the funds from the transaction.  Optionally calls PayPal using `actions.order.get()` to get the transaction details. `(data: object, actions: object)` | `Function` |  |
| `style`                     | PayPal Checkout offers several style options that you can use to customize the look and feel of your Smart Payment Button. You can also display multiple funding sources to the buyer, when appropriate. See more on what to input in the style object at [Customize the PayPal Buttons page](https://developer.paypal.com/docs/checkout/integration-features/customize-button/). | `object` | {} |

:information_source: Learn more about the integration proccess along with more props and advance use cases starting at [PayPal's docs](https://developer.paypal.com/docs/checkout/integrate/).

<br/>
<br/>
<br/>
<a href="https://luehangs.site/marketplace/mobile-development"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>
<br/>

## :large_blue_diamond: Example Project

Perform steps 1-2 to run locally:

1. [Clone the Repo](#1-clone-the-repo)
2. [Install and Run](#2-install-and-run)

<br/>

### :small_blue_diamond: 1. Clone the Repo

**Clone** `react-paypal-button-v2` locally. In a terminal, run:

```sh
$ git clone https://github.com/Luehang/react-paypal-button-v2.git react-paypal-button-v2
```

<br/>

### :small_blue_diamond: 2. Install and Run

```sh
$ cd react-paypal-button-v2/example/
$ npm install
$ npm run start
```

<br/>
<br/>
<br/>
<a href="https://luehangs.site/marketplace/mobile-development"><img src="https://luehangs.site/images/lh-blog-strip.jpg" alt="LH LABS"/></a>
<br/>
<br/>
<br/>

## :large_blue_diamond: Contribute

[Pull requests](https://github.com/Luehang/react-paypal-button-v2/pulls) are welcomed.

<br/>

### :small_blue_diamond: Beginners

Not sure where to start, or a beginner? Take a look at the [issues page](https://github.com/Luehang/react-paypal-button-v2/issues).

<br/>
<br/>
<br/>

---
<br/>
<br/>
<br/>

## :large_blue_diamond: License

Apache 2.0 © [Lue Hang](https://luehangs.site), as found in the LICENSE file.
