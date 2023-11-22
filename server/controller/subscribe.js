const Users = require('../models/Users');

const stripe = require('stripe')('sk_test_51OEvFFCeaXdCP4uCQizk57tLNdPP0KqgHw8hKkCp18ktWZ523wLJSOGCMuURFLvl7O293Jq1Qp1IOVRiHcQrye8J00tEyrVitb');

const Subscribe = async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: 'auto',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'news'
                    },
                    unit_amount: 2.99.toFixed(2) * 100
                },
                // For metered billing, do not pass quantity
                quantity: 1,

            }, ],
            mode: 'payment',
            success_url: `http://localhost:3000/news`,
            cancel_url: `http://localhost:3000/failed`,
        });
        if (session) {
            const user = await Users.findById(req.user.id)
            user.subscribed = true
            await user.save();
            res.status(303).json({
                sessionURL: session.url,
                successURL: session.success_url,
                failedURL: session.cancel_url
            })
        }
        // res.redirect(303, session.url);

    } catch (error) {
        res.status(404).json(error)
    }

    console.log("subscribing");
}

module.exports = {
    Subscribe
}