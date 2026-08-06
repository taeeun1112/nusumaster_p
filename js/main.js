// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav--open');
  });
}

// Hero background slideshow (3초마다 자동 전환)
const heroSlides = document.querySelectorAll('.hero__bg-slide');
const heroDots = document.querySelectorAll('.hero__dots button');
if (heroSlides.length) {
  let heroIndex = 0;
  const showHeroSlide = (i) => {
    heroSlides.forEach((slide, idx) => slide.classList.toggle('is-active', idx === i));
    heroDots.forEach((dot, idx) => dot.classList.toggle('is-active', idx === i));
    heroIndex = i;
  };
  let heroTimer = setInterval(() => {
    showHeroSlide((heroIndex + 1) % heroSlides.length);
  }, 3000);
  heroDots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      showHeroSlide(i);
      clearInterval(heroTimer);
      heroTimer = setInterval(() => {
        showHeroSlide((heroIndex + 1) % heroSlides.length);
      }, 3000);
    });
  });
}

// 실시간 작업 현황 카드 (자동 옆으로 스크롤되는 캐러셀)
const statsRows = [
  { color: '#f5a623', type: '옥상 방수 누수 진단', price: '15,000원', date: '2026-08-06' },
  { color: '#4d9bf5', type: '수도관 누수 시공', price: '8,000원', date: '2026-08-06' },
  { color: '#f5a623', type: '보일러관 누수 진단', price: '15,000원', date: '2026-08-05' },
  { color: '#5ec98f', type: '욕실 누수 시공', price: '8,000원', date: '2026-08-05' },
  { color: '#f5a623', type: '옥상 방수 누수 진단', price: '15,000원', date: '2026-08-05' },
  { color: '#e56b6b', type: '수도관 누수 시공', price: '8,000원', date: '2026-08-04' },
  { color: '#4d9bf5', type: '보일러관 누수 진단', price: '15,000원', date: '2026-08-04' },
];
const statsTrack = document.getElementById('statsTrack');
if (statsTrack) {
  statsTrack.innerHTML = statsRows.map(row => `
    <div class="stats-card">
      <div class="stats-card__top">
        <span class="stats-card__dot" style="background:${row.color}"></span>
        <span class="stats-card__status">확인완료</span>
      </div>
      <p class="stats-card__type">${row.type}</p>
      <p class="stats-card__meta">${row.price} · ${row.date}</p>
    </div>
  `).join('');
}

const statsViewport = document.getElementById('statsViewport');
if (statsViewport && statsTrack) {
  let statsAutoTimer;
  const startStatsAuto = () => {
    statsAutoTimer = setInterval(() => {
      if (statsViewport.scrollLeft + statsViewport.clientWidth >= statsViewport.scrollWidth - 1) {
        statsViewport.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        statsViewport.scrollLeft += 1;
      }
    }, 20);
  };
  const stopStatsAuto = () => clearInterval(statsAutoTimer);
  startStatsAuto();
  statsViewport.addEventListener('mouseenter', stopStatsAuto);
  statsViewport.addEventListener('mouseleave', startStatsAuto);
  statsViewport.addEventListener('touchstart', stopStatsAuto, { passive: true });
  statsViewport.addEventListener('touchend', startStatsAuto, { passive: true });

  const statsPrev = document.getElementById('statsPrev');
  const statsNext = document.getElementById('statsNext');
  if (statsPrev) statsPrev.addEventListener('click', () => statsViewport.scrollBy({ left: -280, behavior: 'smooth' }));
  if (statsNext) statsNext.addEventListener('click', () => statsViewport.scrollBy({ left: 280, behavior: 'smooth' }));
}

// Reviews
const reviews = [
  { text: '누수 원인을 정확하게 찾아주시고, 시공 과정도 꼼꼼하게 설명해 주셔서 믿음이 갔습니다.' },
  { text: '보일러 배관 누수로 고생했는데 하루 만에 깔끔하게 해결해 주셨어요. 감사합니다.' },
  { text: '방문부터 시공, 사후관리까지 친절하게 응대해 주셔서 만족스러웠습니다.' },
];
const reviewsList = document.getElementById('reviewsList');
if (reviewsList) {
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
}

// 견적문의 폼 (현재는 백엔드 연동 없이 화면 안내만 제공)
const quoteForm = document.getElementById('quoteForm');
const quoteNotice = document.getElementById('quoteNotice');
if (quoteForm && quoteNotice) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    quoteNotice.textContent = '문의가 접수되었습니다. 빠르게 연락드리겠습니다.';
    quoteForm.reset();
  });
}

// 방문 가능 지역 찾기 검색
const areaInput = document.getElementById('areaSearchInput');
const areaList = document.getElementById('areaSearchList');
if (areaInput && areaList) {
  const areaItems = Array.from(areaList.querySelectorAll('li'));
  areaInput.addEventListener('input', () => {
    const keyword = areaInput.value.trim();
    areaItems.forEach(li => {
      const match = !keyword || li.dataset.region.includes(keyword);
      li.classList.toggle('is-hidden', !match);
    });
  });
  areaItems.forEach(li => {
    li.addEventListener('click', () => {
      areaInput.value = li.dataset.region;
      areaItems.forEach(item => item.classList.remove('is-hidden'));
    });
  });
}
