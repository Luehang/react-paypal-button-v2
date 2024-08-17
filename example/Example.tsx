import React, { Component } from "react";
import { PayPalButton } from "../src/index";

class Example extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { showLoading: true };
    }

    render() {
        const buttonStyles = {
            textAlign: "center",
            padding: "1rem",
            margin: "1rem"
        }

        const { showLoading } = this.state;

        return (
            <div style={buttonStyles as any}>
                <h3>Try me out</h3>

                {showLoading ? <span>Loading Button...</span> : null}

                <PayPalButton
                    amount="0.01"
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details) => {
                        return alert("Transaction completed by " + details.payer.name.given_name)
                    }}
                    onButtonReady={() => this.setState({ showLoading: false })}
                />

                {/* <PayPayButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
                                value: "0.01"
                                }
                            }],
                            // application_context: {
                            //   shipping_preference: "NO_SHIPPING" // default is "GET_FROM_FILE"
                            // }
                        });
                    }}
                    onApprove={(data, actions) => {
                        // Capture the funds from the transaction
                        return actions.order.capture().then(function(details) {
                            // Show a success message to your buyer
                            alert("Transaction completed by " + details.payer.name.given_name);
                        });
                    }}
                    onButtonReady={() => this.setState({ showLoading: false })}
                /> */}

                {/* <PayPalButton
                    createSubscription={(data, actions) => {
                        return actions.subscription.create({
                            plan_id: "P-XXXXXXXXXXXXXXXXXXXXXXXX",
                            auto_renewal: true
                        });
                    }}
                    onApprove={(data, actions) => {
                        console.log("created subscription:", data.orderID, data.subscriptionID);
                        alert("Subscription created");
                    }}
                    options={{clientId: "sb", vault: true}}
                    onButtonReady={() => this.setState({ showLoading: false })}
                /> */}
            </div>
        );
    }
}

export { Example }
