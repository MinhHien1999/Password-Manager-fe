const ADD_ELEMENT = document.getElementById("add")
const feedback = document.getElementById("feedback")

ADD_ELEMENT.addEventListener("click", async (ev) => {
    const category = {
        title: document.getElementById("title").value
    }
    if(validateCategory(category)== false){
        feedback.classList.remove("invalid-feedback")
        setTimeout(() => {
            feedback.classList.add("invalid-feedback")
        }, 5000);
    }else{
        await createCategory(category)
        window.location.href = "categories.html"
    }
})

function validateCategory(data){
    if(data.title.trim() == ''){
        return false;
    }
    return true
}

async function createCategory(category){
    const response = await fetch("http://localhost:3000/category", {
        method: "post",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
      });
}