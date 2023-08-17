let checkBoxes = document.querySelectorAll("#check_real");

submit_button.addEventListener("click", (event) => {
  let isChecked = false;

  // 체크 박스 중 하나라도 체크되어 있는지 확인
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) {
      isChecked = true;
    }
  });

  // 하나도 체크되어 있지 않다면 경고 메시지 출력
  if (!isChecked) {
    alert("체크를 확인하세요");
    event.preventDefault();
  }
});
