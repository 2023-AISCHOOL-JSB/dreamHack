let check_box = document.querySelector("#check_real")
let submit_button = document.querySelector(".submit")

// check_box.addEventListener('change',()=>{
//     if(check_box.checked){
//         submit_button.disabled = false;
//     }
// }
// )
submit_button.addEventListener('click', (event) => {
    console.log(1)
    if (!check_box.checked){
        alert("체크를 확인하세요")
        event.preventDefault();
    }
}
)