import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

const CheckoutForm = ({ amount, onSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            console.log("Stripe or Elements missing");
            return;
        }

        setIsLoading(true);
        console.log("Confirming payment...");

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin,
            },
            redirect: "if_required",
        });

        console.log("Stripe confirmation result:", { error, paymentIntent });

        if (error) {
            console.error("Stripe Error:", error);
            setMessage(error.message);
            toast.error(error.message);
            setIsLoading(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            console.log("Payment Succeeded, calling onSuccess...");
            setMessage("Payment Succeeded!");
            onSuccess(paymentIntent);
            setIsLoading(false);
        } else {
            console.warn("Payment status:", paymentIntent ? paymentIntent.status : "Unknown");
            setMessage("Something went wrong.");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <PaymentElement />
            <button
                disabled={isLoading || !stripe || !elements}
                id="submit"
                className="bg-[#2E8B57] hover:bg-[#236b42] text-white w-full py-3 rounded-lg font-semibold shadow-md transition disabled:opacity-50"
            >
                {isLoading ? "Processing..." : `Pay ₹${amount.toFixed(2)}`}
            </button>
            {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    );
};

export default CheckoutForm;
