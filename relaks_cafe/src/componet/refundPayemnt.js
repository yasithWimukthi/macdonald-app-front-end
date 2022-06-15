import { Secret_key, STRIPE_PUBLISHABLE_KEY } from '../assert/key/key';

const RefundPayement = async (refID) => {

    const refund = {
        'charge': refID,
    };

    return fetch('https://api.stripe.com/v1/refunds', {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${Secret_key}`
            },
            // Use a proper HTTP method
            method: 'post',
            // Format the credit card data to a string of key-value pairs
            // divided by &
            body: Object.keys(refund)
                .map(key => key + '=' + refund[key])
                .join('&')
        }).then(response => response.json());

};

export default RefundPayement;