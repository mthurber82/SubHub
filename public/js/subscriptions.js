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

let subId;
const getcontentHandler = async (event) => {
  event.preventDefault();
  if (event.target.hasAttribute("data-update")) {
    const id = event.target.getAttribute("data-update");

    subID = id;

    const response = await fetch(`/api/subscription/${id}`);

    const subData = await response.json();

    document.querySelector("#sub1-content").value = subData.content;
    document.querySelector("#sub1-name").value = subData.title;

    return subData;
  }
};

const uptateBtnhandler = async (event) => {
  if (event.target.hasAttribute("data-put")) {
    const subscription_name = document.querySelector("#sub_name").value;
    const spend = document.querySelector("#sub_spend").value;
    const usage = document.querySelector("#sub_usage").value;
    const renewal_date = document.querySelector("#sub_renewal").value;

    const response = await fetch(`/api/subscription/${subId}`, {
      method: "PUT",
      body: JSON.stringify({ subscription_name, spend, usage, renewal_date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to send update");
    }
  }
};

const delBtnHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/subscription/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document.querySelector(".AddSub").addEventListener("submit", createHandler);
document.querySelector(".getSub").addEventListener("click", getcontentHandler);
document
  .querySelector(".updateSub")
  .addEventListener("click", uptateBtnhandler);
document.querySelector(".deleteSub").addEventListener("click", delBtnHandler);
