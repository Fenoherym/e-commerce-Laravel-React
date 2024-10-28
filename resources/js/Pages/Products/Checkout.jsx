import { CardCvcElement, CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { router, usePage } from "@inertiajs/react"
import Master from "@/Layouts/Master"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getCartCount } from "@/features/counter"

const stripePromise = loadStripe('pk_test_51Jg0xZHK50yV0bEAnN7D2gKOSdhPeYhpVfaXVImc4EQqTHFPNBjqHuCSKTNGa7Echs5f8CLEVGmv9AuhkfYVfDFd00IO7ZTxHw')

function Checkout() {

    const stripe = useStripe()
    const elements = useElements()
    const dispatch = useDispatch()

    const { flash } = usePage().props;
    const [msgError, setMsgError] = useState(null)

    let message
    

    if(flash.success) {
        setMsgError(null)
        dispatch(getCartCount())
        message =  <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            {flash.success}
        </div>
    }

    if(flash.error) {
        message =  <div className="bg-red-100 mb-4 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {flash.error} 
        </div>
        set
    }

    useEffect(() => {
        if (flash.success && elements) {
            const cardElement = elements.getElement(CardElement);
            if (cardElement) {
                cardElement.clear();
            }
        }
    }, [flash.success, elements]);
    

    async function handleSubmit(event) {
        event.preventDefault();

        if (!stripe || !elements) return;
        const { token, error } = await stripe.createToken(elements.getElement(CardElement))

        if (error) {             // Vous pouvez afficher un message d'erreur à l'utilisateur
            let msg = <div className="bg-red-100 mb-4 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error.message}
        </div>
            setMsgError(msg)
            return;
        }
        
        router.post('/checkout', { stripeToken: token.id })
     
    }

    return (
        <Master>
            <div className="container mx-auto p-10 bg-white shadow-lg rounded-lg mt-5">
                <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>
                {msgError}
                {message}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <CardElement className="border border-gray-300 rounded p-3 mb-6" />
                    <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200" disabled={!stripe}>
                        Payer
                    </button>
                </form>
            </div>
        </Master>
    )
}

const CheckoutWrapper = () => (
    <Elements stripe={stripePromise}>
        <Checkout />
    </Elements>
);

export default CheckoutWrapper;
