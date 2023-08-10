// javascript에서 배웠던 todoList 기능을 가져와서 사용.
/*  post로 요청을 보낼때 input 태그 안의 내용들만 보내져서
    추가 버튼을 눌렀을 때 할 일을 입력할 input 태그가 늘어나도록 적용
    
    해결할 일: 할 일을 추가하고 input 태그에 내용을 입력후 다시 추가 버튼을 누르면
    이전에 입력했던 내용이 사라짐, 삭제 버튼도 마찬가지 
*/

let input = document.getElementById("task-input")
// input 텍스트 이름 선언
let divi  = document.getElementById("task-board")
let but   = document.getElementById("add-button")
// 추가 버튼 기능 but으로 선언
let todolist = 0
but.addEventListener('click',function(){
    const inputContainer = divi
    const newTask = document.createElement("div");
    newTask.className = "task";

    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "routineList";

    const buttonArea = document.createElement("div");
    buttonArea.className = "button-area";

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger";
    deleteButton.textContent = "삭제";

    deleteButton.addEventListener("click", () => {
      inputContainer.removeChild(newTask);
      // or
      //newTask.remove();
    });

    buttonArea.appendChild(deleteButton);
    newTask.appendChild(newInput);
    newTask.appendChild(buttonArea);
    inputContainer.appendChild(newTask);
})