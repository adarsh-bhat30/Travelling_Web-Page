document.getElementById("bookingForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        upi_id: document.getElementById("upi_id").value,
        amount: document.getElementById("amount").value,
        comments: document.getElementById("comments").value
    };
    
    try {
        const response = await fetch("http://127.0.0.1:3001/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        alert(result.message);
    } catch (error) {
        alert("Booking failed. Please try again. Error: " + error.message);
        console.error(error);
    }
});


