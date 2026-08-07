/**
 * 누수마스터 사이트 전체 GA4 이벤트 트래킹
 *
 * 수집 이벤트
 *  - contact_click  : 전화/카톡 클릭 (button_location 으로 위치 자동 분류)
 *  - scroll_depth   : 스크롤 깊이 단계 도달 (25/50/75/100%)
 *  - page_navigation: 다른 페이지로 이동하는 링크 클릭
 *
 * 모든 이벤트에 landing_page(= 현재 페이지 식별자) 파라미터가 함께 전송됩니다.
 */
(function () {
  if (typeof gtag !== 'function') return;

  // 파일명에서 페이지 식별자 추출 (seoul / index / leak-detection ...)
  var page = location.pathname.split('/').pop().replace('.html', '') || 'index';

  function send(eventName, params) {
    params = params || {};
    params.landing_page = page;
    gtag('event', eventName, params);
  }

  // href 로 연락 유형 판별: tel: → phone, 카톡 → kakao, 그 외 → null
  function contactType(href) {
    if (!href) return null;
    if (href.indexOf('tel:') === 0) return 'phone';
    if (href.indexOf('pf.kakao.com') !== -1) return 'kakao';
    return null;
  }

  // 요소가 페이지의 어느 영역에 있는지 자동 분류 (구체적인 것부터 검사)
  function getLocation(el) {
    if (el.closest('.floating-buttons')) return 'floating';
    if (el.closest('.mobile-bottom-nav')) return 'mobile_nav';
    if (el.closest('.hero')) return 'hero';
    if (el.closest('header')) return 'header';
    if (el.closest('.cta-section')) return 'cta_section';
    if (el.closest('.cta-box')) return 'cta_box';
    var sec = el.closest('section');
    if (sec) return sec.id || (sec.className || '').split(' ')[0] || 'content';
    return 'content';
  }

  // --- 1. 전화/카톡 클릭 (페이지 내 모든 연락 링크) ---
  document.querySelectorAll('a[href]').forEach(function (el) {
    var type = contactType(el.getAttribute('href'));
    if (!type) return;
    el.addEventListener('click', function () {
      send('contact_click', { contact_type: type, button_location: getLocation(el) });
    });
  });

  // --- 2. 스크롤 깊이 추적 (25 / 50 / 75 / 100%) ---
  var thresholds = [25, 50, 75, 100];
  var fired = {};
  var ticking = false;

  function checkScrollDepth() {
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var percent = docHeight <= 0 ? 100 : Math.round((window.scrollY / docHeight) * 100);
    thresholds.forEach(function (t) {
      if (percent >= t && !fired[t]) {
        fired[t] = true;
        send('scroll_depth', { depth_percent: t });
      }
    });
  }

  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    setTimeout(function () {
      ticking = false;
      checkScrollDepth();
    }, 200);
  }, { passive: true });

  // --- 3. 페이지 이동 링크 클릭 ---
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (href.indexOf('tel:') === 0) return;          // 전화 → contact_click 으로 추적
    if (href.indexOf('pf.kakao.com') !== -1) return;  // 카톡 → contact_click 으로 추적
    if (href.charAt(0) === '#') return;               // 페이지 내 앵커 제외
    if (href.indexOf('javascript:') === 0) return;
    if (link.closest('.floating-buttons') || link.closest('.mobile-bottom-nav')) return;

    link.addEventListener('click', function () {
      send('page_navigation', {
        link_url: href,
        link_text: (link.textContent || '').trim().substring(0, 50),
        link_location: link.closest('header') ? 'header'
                     : link.closest('footer') ? 'footer'
                     : 'content'
      });
    });
  });
})();
