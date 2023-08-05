

let input = document.getElementById("task-input")
// input 텍스트 이름 선언
let divi  = document.getElementById("task-board")
let but   = document.getElementById("add-button")
// 추가 버튼 기능 but으로 선언
let todolist = 0
but.addEventListener('click',function(){
    //   추가 버튼 클릭 활성화
    todolist +=1// todolist =[1 2 7]
    // 텍스트 내용(input)을 todolist에 추가 
    let text = "";

    for( let i = 0 ; i < todolist;i++){
        // todo리스트의 길이만큼 실행.
        text += `<div class="task"><input type="text" id="task-input" name="routineList"><div class="button-area"><button class="btn btn-danger" onclick ="deletelist(${i})">삭제</button></div></div>`
        // div class = task  의 문장의 todolist가 text에 저장
         //for(let i =0; i<todolist.length;i++)
        }
        divi.innerHTML = text; 
        // divi innerHTML에 텍스트가 출력
}
)
    const deletelist =(a)=>{
        // 
         // todolist =[1 2 7]
    let text = "";
    for( let i = 0 ; i < todolist-1;i++){
        text += `<div class="task"><input type="text" id="task-input" name="routineList"><div class="button-area"><button class="btn btn-danger" onclick ="deletelist(${i})">삭제</button></div></div>`
    }
    divi.innerHTML = text
    todolist-=1;
}
