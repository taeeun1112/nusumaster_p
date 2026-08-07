/**
 * 누수마스터 공식 웹사이트 JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 초기화
    initHeader();
    initHeroSlider();
    initMobileMenu();
    initScrollAnimations();
    initCounterAnimation();
    initCatchphraseAnimation();
    initHeroScrollBtn();
    initTopButton();
    updateStatusDates();
});

/**
 * 실시간 현황 날짜 자동 업데이트
 */
function updateStatusDates() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    document.querySelectorAll('.status-date').forEach(el => {
        el.textContent = formattedDate;
    });
}

/**
 * 헤더 스크롤 효과
 */
function initHeader() {
    const header = document.getElementById('header');

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 초기 상태 체크
}

/**
 * 히어로 슬라이더
 */
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-pagination .dot');
    let currentSlide = 0;
    const slideInterval = 5000; // 5초
    let autoSlideTimer;

    function goToSlide(index) {
        // 현재 슬라이드 비활성화
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // 새 슬라이드 활성화
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
        autoSlideTimer = setInterval(nextSlide, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideTimer);
        startAutoSlide();
    }

    // 닷 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoSlide();
        });
    });

    // 자동 슬라이드 시작
    startAutoSlide();
}

/**
 * 모바일 메뉴
 */
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // 모바일 드롭다운 토글 (모든 드롭다운에 적용)
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('a');
        if (toggle) {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    // 다른 드롭다운 닫기
                    dropdowns.forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // 네비게이션 링크 클릭 시 메뉴 닫기 (드롭다운 토글 제외)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // 드롭다운 부모를 가진 링크는 메뉴 닫기 제외
            if (link.parentElement.classList.contains('nav-dropdown') && window.innerWidth <= 768) {
                return;
            }
            menuBtn.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * 스크롤 애니메이션 (AOS 대체)
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * 카운터 애니메이션
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000; // 2초
    const step = target / (duration / 16); // 60fps 기준
    let current = 0;

    function updateCounter() {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }

    updateCounter();
}

/**
 * 캐치프레이즈 애니메이션 — 순차 실행 (아이템→구분선→아이템→구분선→아이템)
 */
function initCatchphraseAnimation() {
    var section = document.getElementById('catchphrase');
    if (!section) return;

    var headline = section.querySelector('.catchphrase-headline');
    var subheadline = section.querySelector('.catchphrase-subheadline');
    var items = section.querySelectorAll('.catchphrase-item');
    var dividers = section.querySelectorAll('.catchphrase-divider');

    // 순차 실행: 제목 즉시 → 부제 페이드인 → 아이템3개 (구분선은 즉시 표시)
    var steps = [];
    if (subheadline) steps.push({ type: 'subheadline', el: subheadline });
    items.forEach(function(item) {
        steps.push({ type: 'item', el: item });
    });

    function runSequence() {
        // 제목, 구분선은 즉시 표시
        if (headline) headline.classList.add('active');
        dividers.forEach(function(d) { d.classList.add('active'); });

        var delay = 0;
        steps.forEach(function(step) {
            setTimeout(function() {
                step.el.classList.add('active');
            }, delay);

            // 부제 300ms, 아이템 300ms 간격
            delay += 300;
        });
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                runSequence();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(section);
}


/**
 * 히어로 스크롤 버튼 — 네비바 높이 고려하여 캐치프레이즈로 이동
 */
function initHeroScrollBtn() {
    var btn = document.querySelector('.hero-scroll-btn');
    if (!btn) return;

    btn.addEventListener('click', function(e) {
        e.preventDefault();
        var target = document.getElementById('catchphrase');
        if (!target) return;

        var header = document.querySelector('.header');
        var headerHeight = header ? header.offsetHeight : 0;
        var dest = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        smoothScrollTo(dest, 1000);
    });
}

/**
 * 커스텀 스무스 스크롤 (duration ms)
 */
function smoothScrollTo(to, duration) {
    var start = window.pageYOffset;
    var diff = to - start;
    var startTime = null;

    function step(time) {
        if (!startTime) startTime = time;
        var progress = Math.min((time - startTime) / duration, 1);
        var ease = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        window.scrollTo(0, start + diff * ease);
        if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
}

/**
 * TOP 버튼
 */
function initTopButton() {
    const topBtn = document.getElementById('topBtn');

    if (!topBtn) return;

    topBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 스크롤 위치에 따라 버튼 표시/숨김
    function handleTopButtonVisibility() {
        const floatingButtons = document.querySelector('.floating-buttons');
        if (window.scrollY > 500) {
            floatingButtons.style.opacity = '1';
            floatingButtons.style.visibility = 'visible';
        } else {
            floatingButtons.style.opacity = '0.7';
        }
    }

    window.addEventListener('scroll', handleTopButtonVisibility);
}

/**
 * 부드러운 스크롤 (네비게이션 링크)
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        // 모바일 메뉴가 닫힐 시간 대기
        setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    });
});

/**
 * 이미지 지연 로딩
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * 실시간 작업 현황 시뮬레이션 (선택적)
 */
function simulateRealtimeStatus() {
    const statusList = document.querySelector('.status-list');
    if (!statusList) return;

    const locations = [
        '서울 강남', '서울 송파', '경기 수원', '경기 성남',
        '인천 부평', '부산 해운대', '대구 수성', '광주 서구'
    ];

    const names = ['김O수', '이O희', '박O진', '최O영', '정O민'];
    const types = [
        { type: 'leak', label: '누수' },
        { type: 'sewer', label: '하수' }
    ];

    // 5분마다 상태 업데이트 (데모용)
    setInterval(() => {
        const items = statusList.querySelectorAll('.status-item');
        items.forEach(item => {
            const stateEl = item.querySelector('.status-state');
            if (stateEl.classList.contains('dispatch')) {
                stateEl.classList.remove('dispatch');
                stateEl.classList.add('complete');
                stateEl.textContent = '작업완료';
            }
        });
    }, 300000);
}

// ===== 행정동 아코디언 토글 =====
document.querySelectorAll('.district-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
        var group = this.closest('.district-group');
        var isActive = group.classList.contains('active');
        group.classList.toggle('active');
        this.setAttribute('aria-expanded', !isActive);
    });
});

// ===== 지역 검색 위젯 =====
document.querySelectorAll('.district-search input[type="text"]').forEach(function(input) {
    var resultEl = input.parentElement.querySelector('.search-result');
    var datalistId = input.getAttribute('list');
    var datalist = document.getElementById(datalistId);
    if (!resultEl || !datalist) return;

    var options = Array.from(datalist.querySelectorAll('option')).map(function(opt) {
        return opt.value;
    });

    input.addEventListener('input', function() {
        var val = this.value.trim();
        if (!val) {
            resultEl.textContent = '';
            resultEl.className = 'search-result';
            return;
        }
        var match = options.some(function(opt) {
            return opt.indexOf(val) !== -1;
        });
        if (match) {
            resultEl.textContent = '서비스 가능 지역입니다! 지금 바로 상담하세요.';
            resultEl.className = 'search-result found';
        } else {
            resultEl.textContent = '검색 결과가 없습니다. 전화 상담을 이용해주세요.';
            resultEl.className = 'search-result not-found';
        }
    });
});

// 페이지 로드 완료 후 추가 초기화
window.addEventListener('load', function() {
    initLazyLoading();
    // simulateRealtimeStatus(); // 필요시 활성화
});
