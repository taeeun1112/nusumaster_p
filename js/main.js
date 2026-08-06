// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
navToggle.addEventListener('click', () => {
  nav.classList.toggle('nav--open');
});

// Hero slide dots (visual only, auto-rotate)
const dots = document.querySelectorAll('.hero__dots button');
let activeDot = 0;
setInterval(() => {
  dots[activeDot].classList.remove('active');
  activeDot = (activeDot + 1) % dots.length;
  dots[activeDot].classList.add('active');
}, 4000);
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    dots[activeDot].classList.remove('active');
    activeDot = i;
    dots[activeDot].classList.add('active');
  });
});

// Real-time work status table
const statsRows = [
  { color: '#f5a623', type: '옥상 방수 누수 진단', price: '15,000원', date: '2026-08-06' },
  { color: '#4d9bf5', type: '수도관 누수 시공', price: '8,000원', date: '2026-08-06' },
  { color: '#f5a623', type: '보일러관 누수 진단', price: '15,000원', date: '2026-08-05' },
  { color: '#5ec98f', type: '욕실 누수 시공', price: '8,000원', date: '2026-08-05' },
  { color: '#f5a623', type: '옥상 방수 누수 진단', price: '15,000원', date: '2026-08-05' },
  { color: '#e56b6b', type: '수도관 누수 시공', price: '8,000원', date: '2026-08-04' },
  { color: '#4d9bf5', type: '보일러관 누수 진단', price: '15,000원', date: '2026-08-04' },
];
const statsBody = document.getElementById('statsTableBody');
statsBody.innerHTML = statsRows.map(row => `
  <tr>
    <td><span class="tag" style="background:${row.color}"></span></td>
    <td>${row.type}</td>
    <td>${row.price}</td>
    <td>${row.date}</td>
    <td><span class="status">확인완료</span></td>
  </tr>
`).join('');

// Reviews
const reviews = [
  { text: '누수 원인을 정확하게 찾아주시고, 시공 과정도 꼼꼼하게 설명해 주셔서 믿음이 갔습니다.' },
  { text: '보일러 배관 누수로 고생했는데 하루 만에 깔끔하게 해결해 주셨어요. 감사합니다.' },
  { text: '방문부터 시공, 사후관리까지 친절하게 응대해 주셔서 만족스러웠습니다.' },
];
const reviewsList = document.getElementById('reviewsList');
reviewsList.innerHTML = reviews.map(r => `
  <div class="review-card">
    <div class="ph"><span class="ph__icon">👤</span></div>
    <div class="review-card__body">
      <h4>○○○ 고객님</h4>
      <p class="review-card__stars">★★★★★</p>
      <p>${r.text}</p>
    </div>
  </div>
`).join('');
