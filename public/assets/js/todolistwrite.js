let check_box = document.querySelector("#check_real")
let submit_button = document.querySelector(".submit")

check_box.addEventListener('change',()=>{
    if(check_box.checked){
        submit_button.disabled = false;
    }
}
)