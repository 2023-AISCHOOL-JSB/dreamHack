let com_myForm = document.getElementById("myForm");
com_myForm.addEventListener("submit",function(e){
    let title = document.getElementById("com_title");
    if(title.value.length == 0){
        alert("제목을 입력하세요")
        e.preventDefault();
    }

    let content = document.getElementById("com_content");
    if(content.value.length == 0){
        alert("내용을 입력하세요")
        e.preventDefault();
    }
})





