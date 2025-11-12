/**
 * components.js
 * 共通コンポーネント（ヘッダー・フッター）の管理
 */

/* ========================================
   ヘッダーHTML
======================================== */
const headerHTML = `
  <header class="header">
    <div class="header__container">
      <!-- ロゴ -->
      <div class="header__logo">
        <a href="/miyabiyaka/index.html" class="header__logo-link">
          <h1 class="header__logo-text">
            <span class="header__logo-main">miyabiyaka</span>
            <span class="header__logo-sub">みやびやか 着付け教室</span>
          </h1>
        </a>
      </div>

      <!-- ハンバーガーメニューボタン（モバイル用） -->
      <button class="header__menu-button" id="menuButton" aria-label="メニューを開く" aria-expanded="false">
        <span class="header__menu-icon"></span>
        <span class="header__menu-icon"></span>
        <span class="header__menu-icon"></span>
      </button>

      <!-- グローバルナビゲーション -->
      <nav class="header__nav" id="headerNav">
        <ul class="header__nav-list">
          <li class="header__nav-item">
            <a href="/miyabiyaka/about.html" class="header__nav-link">教室について</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/course.html" class="header__nav-link">コース案内</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/price.html" class="header__nav-link">料金表</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/instructor.html" class="header__nav-link">講師紹介</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/access.html" class="header__nav-link">アクセス</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/faq.html" class="header__nav-link">よくある質問</a>
          </li>
          <li class="header__nav-item">
            <a href="/miyabiyaka/blog/index.html" class="header__nav-link">ブログ</a>
          </li>
          <li class="header__nav-item header__nav-item--cta">
            <a href="/miyabiyaka/contact.html" class="header__nav-link header__nav-link--cta">お問い合わせ</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
`;

/* ========================================
   フッターHTML
======================================== */
const footerHTML = `
  <footer class="footer">
    <div class="footer__container">
      <!-- フッターコンテンツエリア -->
      <div class="footer__content">

        <!-- フッターロゴ・情報 -->
        <div class="footer__info">
          <div class="footer__logo">
            <h2 class="footer__logo-text">
              <span class="footer__logo-main">miyabiyaka</span>
              <span class="footer__logo-sub">みやびやか 着付け教室</span>
            </h2>
          </div>
          <p class="footer__description">
            首藤ルリ子が主宰する着付け教室です。<br>
            伝統的な着付け技術を丁寧にお教えいたします。
          </p>
        </div>

        <!-- フッターナビゲーション -->
        <nav class="footer__nav">
          <div class="footer__nav-group">
            <h3 class="footer__nav-title">教室案内</h3>
            <ul class="footer__nav-list">
              <li class="footer__nav-item">
                <a href="/miyabiyaka/about.html" class="footer__nav-link">教室について</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/course.html" class="footer__nav-link">コース案内</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/price.html" class="footer__nav-link">料金表</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/instructor.html" class="footer__nav-link">講師紹介</a>
              </li>
            </ul>
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__nav-title">サポート</h3>
            <ul class="footer__nav-list">
              <li class="footer__nav-item">
                <a href="/miyabiyaka/access.html" class="footer__nav-link">アクセス</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/faq.html" class="footer__nav-link">よくある質問</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/contact.html" class="footer__nav-link">お問い合わせ</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/blog/index.html" class="footer__nav-link">ブログ</a>
              </li>
            </ul>
          </div>

          <div class="footer__nav-group">
            <h3 class="footer__nav-title">その他</h3>
            <ul class="footer__nav-list">
              <li class="footer__nav-item">
                <a href="/miyabiyaka/company.html" class="footer__nav-link">教室概要</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/privacy.html" class="footer__nav-link">プライバシーポリシー</a>
              </li>
              <li class="footer__nav-item">
                <a href="/miyabiyaka/sitemap.html" class="footer__nav-link">サイトマップ</a>
              </li>
            </ul>
          </div>
        </nav>

      </div>

      <!-- コピーライト -->
      <div class="footer__copyright">
        <p class="footer__copyright-text">
          &copy; 2025 miyabiyaka（みやびやか）着付け教室. All Rights Reserved.
        </p>
      </div>
    </div>
  </footer>
`;

/* ========================================
   SEO設定管理
======================================== */
// 公開前はtrue、公開後はfalseに変更
const IS_UNDER_CONSTRUCTION = true;

function initSEO() {
  if (IS_UNDER_CONSTRUCTION) {
    // noindexメタタグを動的に追加
    const metaRobots = document.createElement('meta');
    metaRobots.name = 'robots';
    metaRobots.content = 'noindex, nofollow';
    document.head.appendChild(metaRobots);
  }
}

/* ========================================
   DOM読み込み完了時の処理
======================================== */
document.addEventListener('DOMContentLoaded', function() {
  // SEO設定の初期化
  initSEO();

  // ヘッダーの挿入
  const headerElement = document.getElementById('header');
  if (headerElement) {
    headerElement.innerHTML = headerHTML;
  }

  // フッターの挿入
  const footerElement = document.getElementById('footer');
  if (footerElement) {
    footerElement.innerHTML = footerHTML;
  }

  // ヘッダー関連の初期化（header.jsが読み込まれている場合）
  if (typeof initHeader === 'function') {
    initHeader();
  }
});
