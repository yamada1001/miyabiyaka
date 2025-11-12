/**
 * common.js
 * 全ページ共通JavaScript
 */

/* ========================================
   DOM読み込み完了時の処理
======================================== */
document.addEventListener('DOMContentLoaded', function() {
  // フェードインアニメーション
  initFadeIn();

  // スムーススクロール
  initSmoothScroll();

  // ページトップボタン
  initPageTop();

  // アコーディオン
  initAccordion();

  // フォームバリデーション
  initFormValidation();

  // 画像遅延読み込み
  initLazyLoad();
});

/* ========================================
   フェードインアニメーション
======================================== */
function initFadeIn() {
  const fadeElements = document.querySelectorAll('.fade-in');

  if (fadeElements.length === 0) return;

  // Intersection Observer の設定
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(function(element) {
    observer.observe(element);
  });
}

/* ========================================
   スムーススクロール
======================================== */
function initSmoothScroll() {
  const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

  smoothScrollLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      // href="#"の場合はページトップへ
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }

      // アンカーリンクの場合
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   ページトップボタン
======================================== */
function initPageTop() {
  // ページトップボタンを作成
  const pageTopButton = document.createElement('button');
  pageTopButton.className = 'page-top';
  pageTopButton.innerHTML = '↑';
  pageTopButton.setAttribute('aria-label', 'ページトップへ戻る');
  document.body.appendChild(pageTopButton);

  // スクロール時の表示制御
  let ticking = false;
  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        if (window.pageYOffset > 300) {
          pageTopButton.classList.add('is-visible');
        } else {
          pageTopButton.classList.remove('is-visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // クリックイベント
  pageTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========================================
   アコーディオン
======================================== */
function initAccordion() {
  const accordionHeaders = document.querySelectorAll('.accordion__header');

  accordionHeaders.forEach(function(header) {
    header.addEventListener('click', function() {
      const accordionItem = this.parentElement;
      const accordionBody = accordionItem.querySelector('.accordion__body');
      const isOpen = accordionItem.classList.contains('is-open');

      if (isOpen) {
        // 閉じる
        accordionItem.classList.remove('is-open');
        accordionBody.style.maxHeight = null;
        this.setAttribute('aria-expanded', 'false');
      } else {
        // 開く
        accordionItem.classList.add('is-open');
        accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px';
        this.setAttribute('aria-expanded', 'true');
      }
    });

    // 初期状態の設定
    header.setAttribute('aria-expanded', 'false');
  });
}

/* ========================================
   フォームバリデーション
======================================== */
function initFormValidation() {
  const forms = document.querySelectorAll('.form');

  forms.forEach(function(form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();

      let isValid = true;

      // 必須フィールドのチェック
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(function(field) {
        const errorElement = field.parentElement.querySelector('.form__error');

        if (!field.value.trim()) {
          isValid = false;
          field.classList.add('is-error');

          if (errorElement) {
            errorElement.textContent = 'この項目は必須です';
          }
        } else {
          field.classList.remove('is-error');

          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      });

      // メールアドレスのバリデーション
      const emailFields = form.querySelectorAll('input[type="email"]');
      emailFields.forEach(function(field) {
        const errorElement = field.parentElement.querySelector('.form__error');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (field.value && !emailPattern.test(field.value)) {
          isValid = false;
          field.classList.add('is-error');

          if (errorElement) {
            errorElement.textContent = 'メールアドレスの形式が正しくありません';
          }
        }
      });

      // 電話番号のバリデーション（数字とハイフンのみ）
      const telFields = form.querySelectorAll('input[type="tel"]');
      telFields.forEach(function(field) {
        const errorElement = field.parentElement.querySelector('.form__error');
        const telPattern = /^[0-9\-]+$/;

        if (field.value && !telPattern.test(field.value)) {
          isValid = false;
          field.classList.add('is-error');

          if (errorElement) {
            errorElement.textContent = '電話番号の形式が正しくありません';
          }
        }
      });

      // バリデーション成功時
      if (isValid) {
        // 実際の送信処理はここに実装
        // 現在はアラート表示のみ
        alert('お問い合わせを受け付けました。\n（※このフォームは送信機能が実装されていません）');

        // フォームのリセット
        form.reset();
      } else {
        // バリデーションエラー時は最初のエラーフィールドにフォーカス
        const firstErrorField = form.querySelector('.is-error');
        if (firstErrorField) {
          firstErrorField.focus();
        }
      }
    });

    // リアルタイムバリデーション
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        const errorElement = this.parentElement.querySelector('.form__error');

        // 必須チェック
        if (this.hasAttribute('required') && !this.value.trim()) {
          this.classList.add('is-error');
          if (errorElement) {
            errorElement.textContent = 'この項目は必須です';
          }
        } else {
          this.classList.remove('is-error');
          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      });

      // 入力時にエラーをクリア
      input.addEventListener('input', function() {
        if (this.classList.contains('is-error') && this.value.trim()) {
          this.classList.remove('is-error');
          const errorElement = this.parentElement.querySelector('.form__error');
          if (errorElement) {
            errorElement.textContent = '';
          }
        }
      });
    });
  });
}

/* ========================================
   画像遅延読み込み
======================================== */
function initLazyLoad() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');

  if ('loading' in HTMLImageElement.prototype) {
    // ネイティブのloading属性をサポートしている場合
    lazyImages.forEach(function(img) {
      img.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    });
  } else {
    // Intersection Observerを使用したポリフィル
    const imageObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(function(img) {
      imageObserver.observe(img);
    });
  }
}

/* ========================================
   ページトップボタンのCSS（動的に追加）
======================================== */
const pageTopStyles = `
  .page-top {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--color-accent, #d32f2f);
    color: #fff;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    z-index: 999;
  }

  .page-top.is-visible {
    opacity: 1;
    visibility: visible;
  }

  .page-top:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    .page-top {
      width: 45px;
      height: 45px;
      font-size: 1.25rem;
      bottom: 15px;
      right: 15px;
    }
  }
`;

// スタイルを追加
const styleSheet = document.createElement('style');
styleSheet.textContent = pageTopStyles;
document.head.appendChild(styleSheet);
