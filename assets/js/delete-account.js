

async function deleteAccount(account_id){
    Swal.fire({
        title: "Bạn có chắc chắn muốn xóa tài khoản này?",
        showDenyButton: true,
        confirmButtonText: `Có`,
        denyButtonText: `Không`,
      }).then((result) => {
        if (result.isConfirmed) {
            const trAccount = document.getElementById(`acc-${account_id}`)
            $.ajax({
                url: `https://password-manager-yakc.onrender.com/account/${account_id}`,
                type: 'DELETE',
            }).done((response) =>{
                trAccount.remove()
                Swal.fire(`${response.message}`, "", "success");
            })
        }
    });
}