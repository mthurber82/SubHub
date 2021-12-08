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
async function presentNames(options) {
  if (!document.querySelector(".DYM")) {
    const placement = document.querySelector(".main");
    const div = document.createElement("div");
    div.className = "DYM";
    const h3 = document.createElement("h3");
    h3.innerText = "Did you mean:";
    placement.appendChild(div);
    div.appendChild(h3);
    vals = [];
    options.map((sub) => vals.push(sub.subscription_name));
    let uniqueSubs = [...new Set(vals)];
    uniqueSubs.map((sub) => {
      const item = document.createElement("button");
      item.setAttribute("class", "update btn btn-sm btn-primary");
      item.innerText = sub;
      h3.appendChild(item);
    });
    document.querySelector(".update").addEventListener("click", updateName);
  }
}

const validateName = async (event) => {
  // event.preventDefault();
  const name = document.querySelector("#subname").value;
  if (name) {
    const response = await fetch(`api/subscription/validate?name=${name}`);
    const nameOption = await response.json();
    console.log(nameOption);
    for (var i = 0; i < nameOption.length; i++) {
      if (name != [i].subscription_name) {
        presentNames(nameOption);
        break;
      } else {
        return;
      }
    }
  }
  console.log("triggered");
};

const updateName = async (event) => {
  event.preventDefault();
  const updatedName = document.querySelector(".update").innerText;
  console.log(updatedName);

  document.querySelector("#subname").value = updatedName;
};

document.querySelector(".AddSub").addEventListener("submit", createHandler);
document.querySelector("#search").addEventListener("submit", searchHandler);

document.querySelector(".getSub").addEventListener("click", addItemhandler);
document.querySelector("#subname").addEventListener("blur", validateName);
