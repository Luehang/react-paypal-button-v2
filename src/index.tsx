import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

declare global {
    interface Window { paypal: any }
}

export interface PayPalButtonProps {
    amount?: number|string,
    currency?: number|string,
    shippingPreference?: "NO_SHIPPING" | "GET_FROM_FILE" | "SET_PROVIDED_ADDRESS",
    onSuccess?: Function,
    catchError?: Function,
    onError?: Function,
    createOrder?: Function,
    createSubscription?: Function,
    onApprove?: Function,
    style?: object,
    options?: PaypalOptions,
    onButtonReady?: Function,
    onClick?: Function,
    onCancel?: Function,
}

export interface PayPalButtonState {
    isSdkReady: boolean
}

export interface PaypalOptions {
    clientId?: string,
    merchantId?: string,
    currency?: number|string,
    intent?: string,
    commit?: boolean|string,
    vault?: boolean|string,
    component?: string,
    disableFunding?: string,
    disableCard?: string,
    enableFunding?: string,
    integrationDate?: string,
    locale?: string,
    buyerCountry?: string,
    debug?: boolean|string
}

class PayPalButton extends React.Component<PayPalButtonProps, PayPalButtonState> {
    static propTypes = {
        amount: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        currency: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        shippingPreference: PropTypes.string,
        onSuccess: PropTypes.func,
        catchError: PropTypes.func,
        onError: PropTypes.func,
        createOrder: PropTypes.func,
        createSubscription: PropTypes.func,
        onApprove: PropTypes.func,
        style: PropTypes.object,
        options: PropTypes.shape({
            clientId: PropTypes.string,
            merchantId: PropTypes.string,
            currency: PropTypes.oneOfType([
                PropTypes.number,
                PropTypes.string,
            ]),
            intent: PropTypes.string,
            commit: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.string
            ]),
            vault: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.string
            ]),
            component: PropTypes.string,
            disableFunding: PropTypes.string,
            disableCard: PropTypes.string,
            enableFunding: PropTypes.string,
            integrationDate: PropTypes.string,
            locale: PropTypes.string,
            buyerCountry: PropTypes.string,
            debug: PropTypes.oneOfType([
                PropTypes.bool,
                PropTypes.string
            ])
        }),
        onButtonReady: PropTypes.func,
        onClick: PropTypes.func,
        onCancel: PropTypes.func,
    }

    static defaultProps = {
        style: {},
        options: {
            clientId: "sb",
            currency: "USD"
        },
        shippingPreference: "GET_FROM_FILE",
    }

    constructor(props: PayPalButtonProps) {
        super(props);

        this.state = {
            isSdkReady: false,
        };
    }

    componentDidMount() {
        if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal === undefined
        ) {
            this.addPaypalSdk();
        }
        else if (
            typeof window !== "undefined" &&
            window !== undefined &&
            window.paypal !== undefined &&
            this.props.onButtonReady
        ) {
            this.props.onButtonReady();
        }
    }

    createOrder(data: any, actions: any) {

        const { currency, options, amount, shippingPreference } = this.props;

        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: currency
                  ? currency
                  : options && options.currency
                  ? options.currency
                  : "USD",
                value: amount.toString()
              }
            }
          ],
          application_context: {
            shipping_preference: shippingPreference
          }
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
            createSubscription,
            onApprove,
            style,
            onClick,
            onCancel,
        } = this.props;
        const { isSdkReady } = this.state;

        if (
            !isSdkReady &&
            (typeof window === "undefined" || window.paypal === undefined)
        ) {
            return null;
        }

        const Button = window.paypal.Buttons.driver("react", {
            React,
            ReactDOM,
        });

        const createOrderFn =
            amount && !createOrder
                ? (data: any, actions: any) => this.createOrder(data, actions)
                : (data: any, actions: any) => createOrder(data, actions);

        return (
            <Button
                {...this.props}
                createOrder={createSubscription ? undefined : createOrderFn}
                createSubscription={createSubscription}
                onApprove={
                    onSuccess
                        ? (data: any, actions: any) => this.onApprove(data, actions)
                        : (data: any, actions: any) => onApprove(data, actions)
                }
                style={style}
                onClick={onClick}
                onCancel={onCancel}
            />
        );
    }

    private addPaypalSdk() {
        const { options, onButtonReady } = this.props;
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

            if (onButtonReady) {
                onButtonReady();
            }
        };
        script.onerror = () => {
            throw new Error("Paypal SDK could not be loaded.");
        };
    
        document.body.appendChild(script);
    }
}

export { PayPalButton };
