import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

// eslint-disable-next-line
const Button = paypal.Buttons.driver("react", { React, ReactDOM });

export interface PayPalButtonProps {
    amount?: number|string,
    currency?: string,
    onSuccess?: Function,
    catchError?: Function,
    onError?: Function,
    createOrder?: Function,
    onApprove?: Function,
    style?: Function
}

class PayPalButton extends React.Component<PayPalButtonProps, {}> {
    createOrder(data: any, actions: any) {
        return actions.order
            .create({
                purchase_units: [{
                    amount: {
                        currency_code: this.props.currency,
                        value: this.props.amount.toString()
                    },
                }]
            });
    }

    onApprove(data: any, actions: any) {
        return actions.order
            .capture()
            .then((details) => {
                if (this.props.onSuccess) {
                    return this.props.onSuccess(details);
                }
            })
            .catch((err) => {
                if (this.props.catchError) {
                    return this.props.catchError(err);
                }
            });
    }

    render() {
        const {
            amount,
            onSuccess,
            createOrder,
            onApprove,
            style
        } = this.props;

        return (
            <Button
                {...this.props}
                createOrder={
                    amount && !createOrder
                        ? (data: any, actions: any) => this.createOrder(data, actions)
                        : (data: any, actions: any) => createOrder(data, actions)
                }
                onApprove={
                    onSuccess
                        ? (data: any, actions: any) => this.onApprove(data, actions)
                        : (data: any, actions: any) => onApprove(data, actions)
                }
                style={style}
            />
        );
    }
}

// eslint-disable-next-line
PayPalButton.defaultProps = {
  currency: "USD",
  style: {}
}

export { PayPalButton }
