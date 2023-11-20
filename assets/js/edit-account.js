const EDIT_ELEMENT = document.getElementById("edit");
const feedback = document.getElementById("feedback");
const queryString = new URLSearchParams(window.location.search);
const ACCOUNT_ID = queryString.get("id");
const CATEGORY_ELEMENT = document.getElementById("category");
const username = document.getElementById("username");
const password = document.getElementById("password");
const category = document.getElementById("category");
const siteEL = document.getElementById("site");
const noteEL = document.getElementById("note");

async function getAccountById() {
  const response = await fetch(
    `https://password-manager-yakc.onrender.com/account/${ACCOUNT_ID}`
  );
  const data = await response.json();
  username.value = data.username;
  password.value = data.password;
  site.value = data.site;
  note.value = data.note;
  const optionEL = document.getElementById(`${data.category._id}`);
  optionEL.selected = "true";
}
EDIT_ELEMENT.addEventListener("click", async (ev) => {
  const category_select = document.querySelector("#category");
  const category_id =
    category_select.options[category_select.selectedIndex].getAttribute(
      "value-id"
    );
  const category_title =
    category_select.options[category_select.selectedIndex].getAttribute(
      "value-title"
    );
  const account = {
    id: ACCOUNT_ID,
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
    const response = await updateAccount(account);
    if (response.status === 400) {
      feedback.classList.remove("invalid-feedback");
      setTimeout(() => {
        feedback.classList.add("invalid-feedback");
      }, 5000);
    }
    window.location.href = "../index.html";
  }
});

function validateAccount(data) {
  if (
    data.username.trim() == "" ||
    data.password.trim() == "" ||
    (data.category.id.trim() == "" && data.category.title.trim() == "")
  ) {
    return false;
  }
  return true;
}

async function updateAccount(account) {
  const response = await fetch(
    `https://password-manager-yakc.onrender.com/account/${ACCOUNT_ID}`,
    {
      method: "put",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }
  );
  return response;
}

async function getCategory() {
  const response = await fetch(
    "https://password-manager-yakc.onrender.com/category"
  );
  const data = await response.json();
  data.forEach((category) => {
    const optionEl = createElementOptionCategory(category);
    CATEGORY_ELEMENT.append(optionEl);
  });
}
function createElementOptionCategory(category) {
  const optionEl = document.createElement("option");
  optionEl.setAttribute("id", category._id);
  optionEl.setAttribute("value-id", category._id);
  optionEl.setAttribute("value-title", category.title);
  optionEl.innerText = `
        ${category.title}
    `;
  return optionEl;
}
getCategory();
getAccountById();
