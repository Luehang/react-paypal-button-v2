import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

export interface PayPalButtonProps {
    amount?: number|string,
    currency?: number|string,
    onSuccess?: Function,
    catchError?: Function,
    onError?: Function,
    createOrder?: Function,
    onApprove?: Function,
    style?: Function,
    options?: PaypalOptions,
    onButtonReady?: Function,
}

export interface PayPalButtonState {
    isSdkReady: boolean
}

export interface PaypalOptions {
    clientId: string,
    merchantId?: string,
    currency: number|string,
    intent?: string,
    commit?: boolean|string,
    vault?: boolean|string,
    component?: string,
    disableFunding?: string,
    disableCard?: string,
    integrationDate?: string,
    locale?: string,
    buyerCountry?: string,
    debug?: boolean|string
}

class PayPalButton extends React.Component<PayPalButtonProps, PayPalButtonState> {
    constructor(props: PayPalButtonProps) {
        super(props);

        this.state = {
            isSdkReady: false,
        };
    }

    componentDidMount() {
        if (window !== undefined && window.paypal === undefined) {
            this.addPaypalSdk();
        }
    }

    createOrder(data: any, actions: any) {
        return actions.order
            .create({
                purchase_units: [{
                    amount: {
                        currency_code: this.props.currency
                            ? this.props.currency
                            : this.props.options && this.props.options.currency
                            ? this.props.options.currency
                            : "USD",
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
                    return this.props.onSuccess(details, data);
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
            style,
            onButtonReady,
        } = this.props;
        const { isSdkReady } = this.state;

        if (!isSdkReady && window.paypal === undefined) {
            return null;
        }

        const Button = window.paypal.Buttons.driver("react", {
            React,
            ReactDOM,
        });

        if (onButtonReady) {
            onButtonReady();
        }

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

    private addPaypalSdk() {
        const { options } = this.props;
        const queryParams: string[] = [];

        // replacing camelCase with dashes
        Object.keys(options).forEach(k => {
            const name = k.split(/(?=[A-Z])/).join("-").toLowerCase();
            queryParams.push(`${name}=${options[k]}`);
        });

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?${queryParams.join("&")}`;
        script.async = true;
        script.onload = () => {
          this.setState({ isSdkReady: true });
        };
        script.onerror = () => {
            throw new Error("Paypal SDK could not be loaded.");
        };
    
        document.body.appendChild(script);
    }
}

// eslint-disable-next-line
PayPalButton.defaultProps = {
    style: {},
    options: {
        clientId: "sb",
        currency: "USD"
    },
}

export { PayPalButton }
