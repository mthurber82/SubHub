let subId;
const getcontentHandler = async (event) => {
  // event.preventDefault();
  if (event.target.hasAttribute("data-update")) {
    const id = event.target.getAttribute("data-update");

    subId = id;

    const response = await fetch(`/api/subscription/${id}`);

    const subData = await response.json();
    console.log(subData);

    document.querySelector("#sub-name").value = subData.subscription_name;
    document.querySelector("#sub-spend").value = subData.spend;
    document.querySelector("#sub-usage").value = subData.usage;
    document.querySelector("#sub-renewal").value = subData.renewal_date;

    return subData;
  }
};

const uptateBtnhandler = async (event) => {
  if (event.target.hasAttribute("data-put")) {
    const subscription_name = document.querySelector("#sub-name").value;
    const spend = document.querySelector("#sub-spend").value;
    const usage = document.querySelector("#sub-usage").value;
    const renewal_date = document.querySelector("#sub-renewal").value;

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
  const response = await fetch(`/api/subscription/${subId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert("Failed to delete post");
  }
};

document.querySelector(".getSub").addEventListener("click", getcontentHandler);
document
  .querySelector("#update-button")
  .addEventListener("click", uptateBtnhandler);
document
  .querySelector("#delete-button")
  .addEventListener("click", delBtnHandler);
