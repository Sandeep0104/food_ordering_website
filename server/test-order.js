async function testCreateOrder() {
    try {
        const orderData = {
            items: [
                {
                    id: 1,
                    name: "Test Pizza",
                    price: 299,
                    qty: 1,
                    img: "http://example.com/pizza.jpg"
                }
            ],
            amount: 299
        };

        const response = await fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        console.log("Status Code:", response.status);
        const data = await response.json();
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error:", error.message);
    }
}

testCreateOrder();
