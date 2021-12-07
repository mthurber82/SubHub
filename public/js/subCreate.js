const createHandler = async (event) => {
  event.preventDefault();
  const subscription_name = document.querySelector("#subname").value;
  const spend = document.querySelector("#spendmonthly").value;
  const usage = document.querySelector("#usage").value;
  const renewal_date = document.querySelector("#renewal").value;

  if (subscription_name && spend && usage && renewal_date) {
    const response = await fetch("api/subscription", {
      method: "POST",
      body: JSON.stringify({ subscription_name, spend, usage, renewal_date }),
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
