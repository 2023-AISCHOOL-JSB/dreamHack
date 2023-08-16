let startDateInput = document.querySelector(".date_start");
let endDateInput = document.querySelector(".date_end");
let submitButton = document.querySelector(".submit");

submitButton.addEventListener('click', (event) => {
    console.log(1)
    let startDate = startDateInput.valueAsDate;
    let endDate = endDateInput.valueAsDate;
    if (endDate < startDate) {
        alert("마감일이 시작일보다 빠릅니다!");
        event.preventDefault(); // 제출 동작 막기
    }else if (!startDate || !endDate) {
        alert("시작일과 마감일을 모두 입력해주세요!");
        event.preventDefault();
    }
    }
    );