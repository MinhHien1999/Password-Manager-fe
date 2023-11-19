const ADD_ELEMENT = document.getElementById("add");
const feedback = document.getElementById("feedback");
const CATEGORY_ELEMENT = document.getElementById("category");

ADD_ELEMENT.addEventListener("click", async (ev) => {
  const category_select = document.querySelector("#category");
  if(category_select.options.length > 0){
    let category_id =
    category_select.options[category_select.selectedIndex].getAttribute(
      "value-id"
    );
    let category_title =
    category_select.options[category_select.selectedIndex].getAttribute(
      "value-title"
    );
    const account = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      site: document.getElementById("site").value,
      note: document.getElementById("note").value,
      category: {
        id: category_id,
        title: category_title,
      },
    };
    if (validateAccount(account) == false) {
      feedback.classList.remove("invalid-feedback");
      setTimeout(() => {
        feedback.classList.add("invalid-feedback");
      }, 5000);
    } else {
      const response = await createAccount(account);
      if (response.status === 400) {
        feedback.classList.remove("invalid-feedback");
        setTimeout(() => {
          feedback.classList.add("invalid-feedback");
        }, 5000);
      }
      window.location.href = "../index.html";
    }
  }else{
    feedback.classList.remove("invalid-feedback");
    setTimeout(() => {
      feedback.classList.add("invalid-feedback");
    }, 5000);
  }
});

function validateAccount(data) {
  if (
    data.username.trim() == "" ||
    data.password.trim() == "" ||
    (data.category.id.trim() == "") && (data.category.title.trim() == "")
  ) {
    return false;
  }
  return true;
}

async function createAccount(account) {
  const response = await fetch("http://localhost:3000/account", {
    method: "post",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(account),
  });
  return response;
}

async function getCategory() {
  const response = await fetch("http://localhost:3000/category");
  const data = await response.json();
  data.forEach((category) => {
    const optionEl = createElementOptionCategory(category);
    CATEGORY_ELEMENT.append(optionEl);
  });
}
function createElementOptionCategory(category) {
  const optionEl = document.createElement("option");
  optionEl.setAttribute("value-id", category._id);
  optionEl.setAttribute("value-title", category.title);
  optionEl.innerText = `
        ${category.title}
    `;
  return optionEl;
}
getCategory();
