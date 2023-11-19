const EDIT_ELEMENT = document.getElementById("edit")
const feedback = document.getElementById("feedback")
const title = document.getElementById("title")
const queryString = new URLSearchParams(window.location.search)
const CATEGORY_ID = queryString.get("id");
const CATEGORY_TITLE = queryString.get("title");
title.value = CATEGORY_TITLE
EDIT_ELEMENT.addEventListener("click", async (ev) => {
    const category = {
        title: document.getElementById("title").value
    }
    if(validateCategory(category)== false){
        feedback.classList.remove("invalid-feedback")
        setTimeout(() => {
            feedback.classList.add("invalid-feedback")
        }, 5000);
    }else{
        await editCategory(category)
        window.location.href = "categories.html"
    }
})

function validateCategory(data){
    if(data.title.trim() == ''){
        return false;
    }
    return true
}

async function editCategory(category){
    const result = await fetch(`http://localhost:3000/category/${CATEGORY_ID}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
}
