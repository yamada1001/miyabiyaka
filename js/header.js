/**
 * header.js
 * ヘッダー制御用JavaScript
 */

/* ========================================
   ヘッダーの初期化
======================================== */
function initHeader() {
  // モバイルメニューの制御
  initMobileMenu();

  // スクロール時のヘッダー制御
  initScrollHeader();

  // アクティブページのハイライト
  highlightActivePage();
}

/* ========================================
   モバイルメニューの制御
======================================== */
function initMobileMenu() {
  const menuButton = document.getElementById('menuButton');
  const headerNav = document.getElementById('headerNav');

  if (!menuButton || !headerNav) return;

  // オーバーレイ要素を作成
  const overlay = document.createElement('div');
  overlay.className = 'header__overlay';
  document.body.appendChild(overlay);

  // メニューボタンのクリックイベント
  menuButton.addEventListener('click', function() {
    const isOpen = headerNav.classList.contains('is-open');

    if (isOpen) {
      // メニューを閉じる
      closeMenu();
    } else {
      // メニューを開く
      openMenu();
    }
  });

  // オーバーレイのクリックでメニューを閉じる
  overlay.addEventListener('click', function() {
    closeMenu();
  });

  // ESCキーでメニューを閉じる
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && headerNav.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ウィンドウリサイズ時にメニューを閉じる
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    }, 250);
  });

  // メニューを開く関数
  function openMenu() {
    headerNav.classList.add('is-open');
    menuButton.classList.add('is-active');
    overlay.classList.add('is-visible');
    menuButton.setAttribute('aria-expanded', 'true');
    menuButton.setAttribute('aria-label', 'メニューを閉じる');

    // スクロールを無効化
    document.body.style.overflow = 'hidden';
  }

  // メニューを閉じる関数
  function closeMenu() {
    headerNav.classList.remove('is-open');
    menuButton.classList.remove('is-active');
    overlay.classList.remove('is-visible');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'メニューを開く');

    // スクロールを有効化
    document.body.style.overflow = '';
  }
}

/* ========================================
   スクロール時のヘッダー制御
======================================== */
function initScrollHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  let lastScrollTop = 0;
  let ticking = false;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (!ticking) {
      window.requestAnimationFrame(function() {
        // スクロール時にクラスを追加
        if (scrollTop > 100) {
          header.classList.add('is-scrolled');
        } else {
          header.classList.remove('is-scrolled');
        }

        lastScrollTop = scrollTop;
        ticking = false;
      });

      ticking = true;
    }
  });
}

/* ========================================
   アクティブページのハイライト
======================================== */
function highlightActivePage() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.header__nav-link');

  navLinks.forEach(function(link) {
    const linkPath = new URL(link.href).pathname;

    // パスが一致する場合、またはトップページの場合
    if (linkPath === currentPath ||
        (currentPath === '/' && linkPath === '/index.html') ||
        (currentPath === '/index.html' && linkPath === '/')) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

// エクスポート（components.jsから呼び出せるように）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initHeader };
}
