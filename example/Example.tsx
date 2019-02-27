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
                    onSuccess={(details) => {
                        return alert("Transaction completed by " + details.payer.name.given_name)
                    }}
                    onButtonReady={() => this.setState({ showLoading: false })}
                    options={{clientId: "sb"}}
                />

                {/* <PayPayButton
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            purchase_units: [{
                                amount: {
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
                        });
                    }}
                /> */}
            </div>
        );
    }
}

export { Example }
