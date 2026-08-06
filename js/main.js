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

// 실시간 작업 현황 카드 (Figma/ mockup 스타일 캐러셀)
const statsCardsData = [
  {
    title: '누수 탐지 및 공사',
    desc: '지하 주차장 천장 누수를 정확하게 탐지하여 배관 고압 시공 및 마감을 확실하게 완료했습니다.',
    image: 'images/work_leak.jpg',
    theme: 'dark',
    tags: ['고압 펌프', '배관 카메라', '보수 완료']
  },
  {
    title: '수도관 누수 복원',
    desc: '아파트 욕실 벽면 내부 수도관의 미세 균열을 탐지하고, 노후 배관을 새 동관으로 전면 교체하였습니다.',
    image: 'images/work_pipe.jpg',
    theme: 'light',
    tags: ['청음식 탐지', '배관 교체', '타일 복원']
  },
  {
    title: '보일러 분배기 교체',
    desc: '단독주택 보일러실 배관 분배기 밸브에서의 미세 누수를 감지하여 특수 밸브로 교체 후 열화상 검증을 마쳤습니다.',
    image: 'images/work_boiler.jpg',
    theme: 'dark',
    tags: ['가스 탐지', '분배기 교체', '열화상 검증']
  },
  {
    title: '하수관 누수 정밀 보수',
    desc: '빌라 공동 하수관 연결 부위의 미세한 틈새 누수를 초정밀 배관 카메라로 탐색하여 특수 방수 실링 처리했습니다.',
    image: 'images/work_sewage.jpg',
    theme: 'light',
    tags: ['내시경 카메라', '방수 실링', '부분 보수']
  },
  {
    title: '일상생활배상책임 보험공사',
    desc: '아래층 누수 피해 보상과 공사비를 보험 적용하여 복잡한 서류 작업 대행과 함께 비용 부담 없이 진행 완료했습니다.',
    image: 'images/work_insurance.jpg',
    theme: 'dark',
    tags: ['보험 서류 대행', '손해 방지', '부담금 최소화']
  }
];

const statsTrack = document.getElementById('statsTrack');
if (statsTrack) {
  statsTrack.innerHTML = statsCardsData.map(card => {
    if (card.theme === 'dark') {
      return `
        <div class="stats-card stats-card--dark">
          <div class="stats-card__content">
            <h3 class="stats-card__title">${card.title}</h3>
            <p class="stats-card__desc">${card.desc}</p>
          </div>
          <div class="stats-card__media">
            <img src="${card.image}" alt="${card.title}" class="stats-card__img">
          </div>
          <div class="stats-card__overlay">
            <div class="stats-card__tags">
              ${card.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
            <button class="stats-card__plus" aria-label="상세보기">+</button>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="stats-card stats-card--light">
          <div class="stats-card__content">
            <h3 class="stats-card__title">${card.title}</h3>
            <p class="stats-card__desc">${card.desc}</p>
          </div>
          <div class="stats-card__media">
            <img src="${card.image}" alt="${card.title}" class="stats-card__img">
          </div>
          <div class="stats-card__bottom">
            <div class="stats-card__tags">
              ${card.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
            <button class="stats-card__plus" aria-label="상세보기">+</button>
          </div>
        </div>
      `;
    }
  }).join('');
}

const statsViewport = document.getElementById('statsViewport');
const statsProgress = document.getElementById('statsProgress');

if (statsViewport && statsTrack) {
  // Update progress bar
  const updateProgress = () => {
    if (statsProgress) {
      const maxScroll = statsViewport.scrollWidth - statsViewport.clientWidth;
      const progress = maxScroll > 0 ? (statsViewport.scrollLeft / maxScroll) * 100 : 0;
      statsProgress.style.width = `${Math.min(100, Math.max(15, progress))}%`;
    }
  };

  statsViewport.addEventListener('scroll', updateProgress);
  window.addEventListener('resize', updateProgress);

  const statsPrev = document.getElementById('statsPrev');
  const statsNext = document.getElementById('statsNext');
  if (statsPrev) statsPrev.addEventListener('click', () => statsViewport.scrollBy({ left: -360, behavior: 'smooth' }));
  if (statsNext) statsNext.addEventListener('click', () => statsViewport.scrollBy({ left: 360, behavior: 'smooth' }));
}

// Reviews (Mockup layout style grid)
const reviewsData = [
  {
    image: 'images/diff_visit.jpg',
    title: '아파트 배관 미세 누수 해결',
    text: '누수 원인을 정확하게 찾아주시고, 복잡한 탐지 장비와 시공 과정도 친절하고 꼼꼼하게 설명해 주셔서 깊은 믿음이 갔습니다.',
    btnText: '후기 상세보기'
  },
  {
    image: 'images/equipment_service.jpg',
    title: '보일러 배관 누수 원스톱 시공',
    text: '보일러 배관 물샘 문제로 큰 고생을 했는데 신속히 방문해 주셔서 원인 파악부터 공사까지 하루 만에 깔끔하게 해결해 주셨어요.',
    btnText: '후기 상세보기'
  },
  {
    image: 'images/service_duo.jpg',
    title: '아래층 천장 물 얼룩 마감 보수',
    text: '방문부터 시공, 사후 A/S 보장까지 전 과정을 책임지고 친절하게 진행해 주셔서 매우 만족스럽고 이웃 간의 갈등도 잘 풀렸습니다.',
    btnText: '후기 상세보기'
  }
];

const reviewsGrid = document.getElementById('reviewsGrid');
if (reviewsGrid) {
  reviewsGrid.innerHTML = reviewsData.map(r => `
    <div class="review-card">
      <div class="review-card__media">
        <img src="${r.image}" alt="${r.title}" class="review-card__img">
      </div>
      <div class="review-card__body">
        <h3 class="review-card__title">${r.title}</h3>
        <p class="review-card__stars">★★★★★</p>
        <p class="review-card__text">${r.text}</p>
        <a href="#contact" class="review-card__btn">${r.btnText}</a>
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
  
  // Show list on input focus
  areaInput.addEventListener('focus', () => {
    areaList.style.display = 'block';
  });

  // Hide list when clicking outside
  document.addEventListener('click', (e) => {
    if (!areaInput.contains(e.target) && !areaList.contains(e.target)) {
      areaList.style.display = 'none';
    }
  });

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
      areaList.style.display = 'none';
      areaItems.forEach(item => item.classList.remove('is-hidden'));
    });
  });
}
