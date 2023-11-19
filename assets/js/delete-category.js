
async function deleteCategory(id){
    Swal.fire({
        title: "Xóa danh mục sẽ xóa toàn bộ tài khoản được lưu trong danh mục đó, bạn có chắc chắn muốn xóa?",
        showDenyButton: true,
        confirmButtonText: `Có`,
        denyButtonText: `Không`,
      }).then((result) => {
        if (result.isConfirmed) {
            const tr = document.getElementById(`category-${id}`)
            $.ajax({
                url: `http://localhost:3000/category/${id}`,
                type: 'DELETE',
            }).done((response) =>{
                tr.remove()
                Swal.fire(`${response.message}`, "", "success");
            })
        }
    });
}