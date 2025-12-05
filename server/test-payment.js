async function testPayment() {
    try {
        const response = await fetch("http://localhost:5000/api/payment/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ amount: 1000 })
        });

        const data = await response.json();
        console.log("Status Code:", response.status);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testPayment();
