const CATEGORIES_ELEMENT = document.getElementById("categories-data");

async function getAll() {
  const response = await fetch("https://password-manager-yakc.onrender.com/category");
  const data = await response.json();
  data.forEach((category) => {
    const tr_data = createElementCategory(category);
    CATEGORIES_ELEMENT.append(tr_data);
  });
}

function createElementCategory(data) {
  const tr = document.createElement("tr");
  tr.setAttribute("id", `category-${data._id}`);
  tr.innerHTML = `
                <td class="text-center">
                <a href="category-detail.html?id=${data._id}" style="color: unset">
                  ${data.title}
                </a>
                </td>
                <td class="text-center">
                    <button class="btn btn-sm btn-danger category-delete" onclick="deleteCategory('${data._id}')">
                        <i class="fa fa-trash"></i>
                    </button>
                    <a href="categories-edit.html?id=${data._id}&title=${data.title}" class="btn btn-sm btn-primary">
                        <i class="fas fa-edit"></i>
                    </a>
                </td>
        `;
  return tr;
}
getAll();
