import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import { connect } from 'react-redux';
import * as actions from '../actions'
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// const stripeKey = loadStripe(process.env.REACT_APP_STRIPE_KEY)

class Payments extends Component {
    render() {
        return (
            <StripeCheckout
                name="Emailer"
                description="$5 for 5 email credits"
                amount={500}
                token={token =>
                    this.props.handleToken(token)
                }
                stripeKey={process.env.REACT_APP_STRIPE_KEY}>
                <button className='btn black-text'>
                    Add credits
                    </button>
            </StripeCheckout>
            // <Elements stripe={stripeKey}>
            //     amount={500} token={(token) => {
            //         console.log(token)
            //     }}
            // </Elements>

        )
    }
}

export default connect(null, actions)(Payments);