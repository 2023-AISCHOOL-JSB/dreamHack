// main.js 파일
// 가상의 데이터
const posts = [
    { title: '첫 번째 게시물', author: '작성자1' },
    { title: '두 번째 게시물', author: '작성자2' },
    { title: '세 번째 게시물', author: '작성자3' },
    { title: '네 번째 게시물', author: '작성자4' },
];

// 모달 창 열기 이벤트 리스너 등록
document.querySelectorAll('.modal-btn').forEach((button) => {
    button.addEventListener('click', (event) => {
      const modalId = event.target.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'block';
      }
    });
  });
  
  // 모달 닫기 이벤트 리스너 등록
  document.querySelectorAll('.modal').forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        modal.style.display = 'none';
      }
    });
  });
