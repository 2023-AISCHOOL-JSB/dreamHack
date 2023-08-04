const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');
const modalButtons = document.querySelectorAll('.modal-btn');

// 모달 폼을 열고 닫는 함수
function toggleModal(modal) {
  modal.classList.toggle('active');
}

// 모달 폼 열기/닫기 이벤트 리스너 추가
modalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const modalId = button.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    toggleModal(modal);
  });
});