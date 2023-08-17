// 서버에 데이터를 저장하는 함수(임시저장)
function saveDataToServer(name, value) {
  // JSON 데이터를 서버에 전송하기 위한 객체 생성
  const data = {
      name: name,
      value: JSON.stringify(value)
  };
  
  // '/dreamboard/add' 엔드포인트로 POST 요청을 전송
  fetch('/dreamboard/add', {
      method: "POST",
      headers: {
          'Content-Type': 'application/json' // 요청 본문의 컨텐츠 타입을 JSON으로 설정
      },
      body: JSON.stringify(data) // 데이터 객체를 문자열로 변환하여 본문에 넣음
  })
  .then(res => {
    if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
    }
    return res.json();
  })
  .then(res => {
      console.log("Server Response:", res);
  })
  .catch(error => {
      console.error("Error occurred:", error);
  });
}

// 서버에 데이터를 저장하는 함수(등록하기) 
function sendDataToServer(name, value , url) {
  // JSON 데이터를 서버에 전송하기 위한 객체 생성
  const data = {
    name: name,
    value: JSON.stringify(value),
    url : 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(url)
  };

  // '/dreamboard/save' 엔드포인트로 POST 요청을 전송
  fetch("/dreamboard/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // 요청 본문의 컨텐츠 타입을 JSON으로 설정
    },
    body: JSON.stringify(data), // 데이터 객체를 문자열로 변환하여 본문에 넣음
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Server returned status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      console.log("Server Response:", res);
    })
    .catch((error) => {
      console.error("Error occurred:", error);
    });
}

// URL로부터 데이터를 가져오는 함수
// https://storage.googleapis.com/dreamboard/user_id_example.txt
async function fetchDataFromUrl(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("URL로부터 데이터를 가져오는데 실패")
  }

  // 압축된 데이터를 텍스트로 가져오기
  const compressedData = await res.arrayBuffer();
  console.log(compressedData);

  // 데이터 압축 해체하기
  let decompressedData;
  try {
    const compressedDataArray = new Uint8Array(compressedData);
    decompressedData = pako.inflate(compressedDataArray, { to: 'string' });
  } catch (error) {
    console.error("압축 해제 중 오류 발생:", error);
    // 필요한 경우, 추가적인 처리를 여기에 작성할 수 있습니다.
    throw error;
  }
  return decompressedData;
}
// fetchDataFromUrl함수 끝

// /dreamboard/loadData'에 저장된 DB 정보를 요청 및 
async function getData() {
  const url = await fetch("/dreamboard/loadData")
    .then(res => {
      if(!res.ok) throw new Error("네트워크 응답에 오류가 발생:로그인하였는지 확인하기");
      return res.json();
    })
    .then(data => {
      const resultingUrl = data && data.length > 0 ? data[0].vision_desc : 'https://storage.googleapis.com/dreamboard/example.txt'
      return resultingUrl;
    });
  return fetchDataFromUrl(url);
}

/**
 * 스토리지를 사용한 캔버스 상태를 저장/불러오기하기 위한 유틸리티를 정의합니다
 */
window.saveInBrowser = {
  save: (name, value) => {
    // 값이 객체인 경우, 문자열로 변환합니다
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    saveDataToServer(name, value);
  },
  load: async (name) => {
    //async
    let value = await getData();
    // console.log("loadData : ",JSON.parse(value))
    // 가져온 값을 JSON 객체로 변환하여 반환
    return JSON.parse(value);
  },
  remove: (name) => {
    // 로컬 스토리지에서 해당 이름의 항목을 제거합니다
    localStorage.removeItem(name);
  },
  send: (name, value, url) => {
    // 값이 객체인 경우, 문자열로 변환합니다
    if (value instanceof Object) {
      value = JSON.stringify(value);
    }
    sendDataToServer(name, value ,url);
  },
};