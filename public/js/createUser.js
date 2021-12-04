const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#uname").value.trim();
  const password = document.querySelector("#pword").value.trim();

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to sign up.");
    }
  }
};

document
  .querySelector(".newUser")
  .addEventListener("submit", signupFormHandler);
