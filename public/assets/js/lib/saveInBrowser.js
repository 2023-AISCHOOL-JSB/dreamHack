// 현재 캔버스에 대한 객체 정보를 가져와서 fetch:"post"로 서버측에 ***(추가됨)
function saveDataToServer(name, value) {
  let data = new FormData();
  data.append("name", name);
  data.append("value", JSON.stringify(value));
  console.log('첫번째:',value)
  fetch('/dreamboard/add', {
      method : "POST", 
      headers: {
          'Content-Type': 'application/json'
        },
      body : JSON.stringify({
          name : name, 
          value : value
      })
  })
  .then(res => res.json())
  .then(res => console.log())
}

async function getData() {
  const response = await fetch('/dreamboard/loadData');
  const data = await response.json();
  if(data && data.length > 0){
    // console.log('data',data[0].vision_desc)
    return data[0].vision_desc;
  } else {
    return '{"version":"3.6.3","objects":[]}'
  }
}
async function main() {
  let loadData = await getData();
  return loadData
}
let loadData = main();

/**
 * 로컬 스토리지를 사용하여 캔버스 상태를 저장/불러오기하기 위한 유틸리티를 정의합니다
 */
window.saveInBrowser = {
  save: (name, value) => {
    // 값이 객체인 경우, 문자열로 변환합니다
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }

    // 로컬 스토리지에 이름과 값을 저장합니다
    // localStorage.setItem(name, value);
    saveDataToServer(name, value);

  },
  load: async(name) => { //async
    // 로컬 스토리지로부터 해당 이름에 대한 값을 가져옵니다
    // let value = localStorage.getItem(name);
    let value = await loadData;
    // 가져온 값을 JSON 객체로 변환합니다
    value = JSON.parse(value);

    return value;
  },
  remove: (name) => {
    // 로컬 스토리지에서 해당 이름의 항목을 제거합니다
    localStorage.removeItem(name);
  }
}