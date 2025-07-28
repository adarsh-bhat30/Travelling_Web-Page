document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("sign-in-form");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      const response = await fetch("http://127.0.0.1:5510/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message);
        window.location.href = "/index.html"; // Redirect to index.html after login
      } else {
        alert(result.error || "Login failed.");
      }
    });
  });
  