const createHandler = async (event) => {
  event.preventDefault();
  try {
    //Look Up Images
    const imgs = await fetch("api/subscription/imgs");
    const imglist = await imgs.json();
    //Define Values
    const subscription_name = document.querySelector("#subname").value;
    const spend = document.querySelector("#spendmonthly").value;
    const usage = document.querySelector("#usage").value;
    const renewal_date = document.querySelector("#renewal").value;
    //Define Filename for logo if available
    const imgText = `${subscription_name.toLowerCase()}.png`;
    let filename;
    if (imglist.includes(imgText)) {
      filename = `${subscription_name}.png`;
    } else {
      filename = "default.png";
    }

    if (subscription_name && spend && usage && renewal_date) {
      const response = await fetch("api/subscription", {
        method: "POST",
        body: JSON.stringify({
          subscription_name,
          spend,
          usage,
          renewal_date,
          filename,
        }),
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
  } catch (err) {
    console.error(err);
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
        const item = document.createElement("h3");
        item.className = "itemName";
        item.innerText = sub;
        const icon = document.createElement("i");
        icon.className = "far fa-plus-square";
        item.appendChild(icon);
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
    document.body.scrollTop = document.documentElement.scrollTop = 0;
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
    div.className = "DYM mt-4";
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
    nameOption.map((option) => {
      if (name != option.subscription_name) {
        presentNames(nameOption);
        return;
      } else {
        return;
      }
    });
  }
  console.log("triggered");
};

const updateName = async (event) => {
  event.preventDefault();
  const updatedName = document.querySelector(".update").innerText;
  console.log(updatedName);

  document.querySelector("#subname").value = updatedName;
};

document.querySelector("#create").addEventListener("submit", createHandler);
document.querySelector("#search").addEventListener("submit", searchHandler);

document.querySelector(".getSub").addEventListener("click", addItemhandler);
document.querySelector("#subname").addEventListener("blur", validateName);
