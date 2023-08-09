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
    //   추가 버튼 클릭 활성화
    todolist +=1
    // 텍스트 내용(input)을 todolist에 추가 
    let text = "";

    for( let i = 0 ; i < todolist;i++){

        // todolist 수 만큼 실행
        // text에 name = "routineList" 인 input 태그를 포함한 html 문장 추가

        text += `<div class="task"><input type="text" id="task-input" name="routineList"><div class="button-area"><button class="btn btn-danger" onclick ="deletelist(${i})">삭제</button></div></div>`
        // div class = task  의 문장의 todolist가 text에 저장
        }
        divi.innerHTML = text; 
        // divi innerHTML에 텍스트가 출력
}
)
    const deletelist =(a)=>{
    let text = "";
    for( let i = 0 ; i < todolist-1;i++){
        //todolist-1 만큼 시행
        text += `<div class="task"><input type="text" id="task-input" name="routineList"><div class="button-area"><button class="btn btn-danger" onclick ="deletelist(${i})">삭제</button></div></div>`
    }
    divi.innerHTML = text
    todolist-=1;
}
