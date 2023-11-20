const ACCOUNT_ELEMENT = document.getElementById("account-data");

async function getAll() {
  
  const response = await fetch(`https://password-manager-yakc.onrender.com/account/`);
  const data = await response.json();
  data.forEach((account) => {
    const tr_data = createElementAccount(account);
    ACCOUNT_ELEMENT.append(tr_data);
  });
}

function createElementAccount(data) {
  const tr = document.createElement("tr");
  tr.setAttribute("id",`acc-${data._id}`)
  tr.innerHTML = `
                <td class="text-center">${data.username}</td>
                <td class="text-center visible" id="pass-${data._id}">*****</td>
                <td class="text-center">${data.category.title}</td>
                <td class="text-center">
                    <button href="#" class="btn btn-sm btn-danger" onclick="deleteAccount('${data._id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                    <a href="public/account-edit.html?id=${data._id}" class="btn btn-sm btn-primary">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button href="#" class="btn btn-sm btn-primary" onclick="showPassword('${data._id}')">
                      <i class="fas fa-eye"></i>
                    </button>
                </td>
        `;
  return tr;
}

async function showPassword(account_id){
  const password = document.getElementById(`pass-${account_id}`)
  if(password.classList.contains("visible") == true){
    $.ajax({
      url: `https://password-manager-yakc.onrender.com/account/show/${account_id}`,
      type: 'GET',
    }).done((response) =>{
      password.innerHTML = `${response.password}`
      password.classList.remove("visible")

    })
  }else{
    password.innerHTML = "*****"
    password.classList.add("visible")
  }
}
getAll();
