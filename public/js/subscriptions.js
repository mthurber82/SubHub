const createHandler = async (event) => {
  event.preventDefault();
  const subscription_name = document.querySelector("#subname").value;
  const spend = document.querySelector("#spendmonthly").value;

  if (subscription_name && spend) {
    const response = await fetch("api/subscription", {
      method: "POST",
      body: JSON.stringify({ subscription_name, spend }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create subscription");
    }
  }
};

document.querySelector(".AddSub").addEventListener("submit", createHandler);
