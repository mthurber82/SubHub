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
      const type = "success";
      const message = "Subscription Created!";
      showAlert(type, message);
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create subscription");
    }
  }
};

const searchHandler = async (event) => {
  event.preventDefault();
  const subscription_name = document.querySelector(".form-control").value;

  if (subscription_name) {
    const response = await fetch(
      `api/subscription/search?name=${subscription_name}`
    );
    const box = document.querySelector(".searchItem");
    const subData = await response.json();

    if (subData.length) {
      vals = [];
      subData.map((sub) => vals.push(sub.subscription_name));
      let uniqueSubs = [...new Set(vals)];
      uniqueSubs.map((sub) => {
        const item = document.createElement("p");
        item.classList.add("itemName");
        item.innerText = sub;
        box.appendChild(item);
      });
    } else {
      document.querySelector(".itemName").innerText = "Not Found";
    }
    document.querySelector(".form-control").value = "";
  }
};

const addItemhandler = async (event) => {
  event.preventDefault();
  if (event.target.className === "itemName") {
    const type = "primary";
    showAlert(type, "Add Remaining Info");
    const name = event.target.innerText;
    document.querySelector("#subname").value = name;
  }
};

async function showAlert(type, message) {
  const placement = document.querySelector(".main");
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.setAttribute("role", "alert");
  alert.innerText = message;
  placement.appendChild(alert);
  setTimeout(function () {
    placement.removeChild(alert);
  }, 2000);
}

document.querySelector(".AddSub").addEventListener("submit", createHandler);
document.querySelector("#search").addEventListener("submit", searchHandler);

document.querySelector(".getSub").addEventListener("click", addItemhandler);
