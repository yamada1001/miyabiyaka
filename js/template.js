/**
 * template.js
 * HTMLテンプレートシステム
 */

/* ========================================
   ページ設定の取得
======================================== */
function getPageConfig() {
  // HTMLのdata属性からページ設定を取得
  const html = document.documentElement;

  return {
    title: html.getAttribute('data-page-title') || 'miyabiyaka（みやびやか）着付け教室',
    description: html.getAttribute('data-page-description') || 'miyabiyaka（みやびやか）は首藤ルリ子が主宰する着付け教室です。',
    keywords: html.getAttribute('data-page-keywords') || 'miyabiyaka,みやびやか,着付け教室',
    ogTitle: html.getAttribute('data-og-title') || 'miyabiyaka（みやびやか）着付け教室',
    ogDescription: html.getAttribute('data-og-description') || '首藤ルリ子が主宰する着付け教室。',
    ogImage: html.getAttribute('data-og-image') || 'https://example.com/images/ogp.jpg',
    pageType: html.getAttribute('data-page-type') || 'website',
    currentPath: html.getAttribute('data-current-path') || '/miyabiyaka/',
    breadcrumb: html.getAttribute('data-breadcrumb') || null,
    pageHeader: html.getAttribute('data-page-header') || null,
    additionalCSS: html.getAttribute('data-additional-css') || null,
    structuredData: html.getAttribute('data-structured-data') || null
  };
}

/* ========================================
   HEADタグの生成
======================================== */
function generateHead(config) {
  const head = document.head;

  // メタタグ設定
  document.title = config.title;

  // 既存のメタタグを更新または追加
  setMetaTag('description', config.description);
  setMetaTag('keywords', config.keywords);

  // OGPタグ
  setMetaTag('og:title', config.ogTitle, 'property');
  setMetaTag('og:description', config.ogDescription, 'property');
  setMetaTag('og:type', config.pageType, 'property');
  setMetaTag('og:url', `https://example.com${config.currentPath}`, 'property');
  setMetaTag('og:image', config.ogImage, 'property');
  setMetaTag('og:site_name', 'miyabiyaka（みやびやか）着付け教室', 'property');

  // Twitter Card
  setMetaTag('twitter:card', 'summary_large_image', 'name');
  setMetaTag('twitter:title', config.ogTitle, 'name');
  setMetaTag('twitter:description', config.ogDescription, 'name');
  setMetaTag('twitter:image', config.ogImage, 'name');

  // Google Fonts（既に読み込まれていない場合）
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';
    head.appendChild(preconnect1);

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';
    head.appendChild(preconnect2);

    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap';
    fontLink.rel = 'stylesheet';
    head.appendChild(fontLink);
  }

  // CSS読み込み（既に読み込まれていない場合）
  loadCSS('/miyabiyaka/css/common.css');
  loadCSS('/miyabiyaka/css/header.css');
  loadCSS('/miyabiyaka/css/footer.css');

  // 追加CSSの読み込み
  if (config.additionalCSS) {
    const cssFiles = config.additionalCSS.split(',');
    cssFiles.forEach(cssFile => {
      loadCSS(`/miyabiyaka/css/${cssFile.trim()}`);
    });
  }

  // 構造化データの追加
  if (config.structuredData) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = config.structuredData;
    head.appendChild(script);
  }
}

/* ========================================
   メタタグ設定ヘルパー
======================================== */
function setMetaTag(name, content, attribute = 'name') {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

/* ========================================
   CSS読み込みヘルパー
======================================== */
function loadCSS(href) {
  if (!document.querySelector(`link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  }
}

/* ========================================
   パンくずリストの生成
======================================== */
function generateBreadcrumb(breadcrumbData) {
  if (!breadcrumbData) return '';

  const items = JSON.parse(breadcrumbData);

  let breadcrumbHTML = `
    <nav class="breadcrumb" aria-label="パンくずリスト">
      <div class="container">
        <ol class="breadcrumb__list">`;

  items.forEach((item, index) => {
    if (index === items.length - 1) {
      // 最後の項目（現在のページ）
      breadcrumbHTML += `
          <li class="breadcrumb__item">
            <span class="breadcrumb__current">${item.name}</span>
          </li>`;
    } else {
      // リンク付き項目
      breadcrumbHTML += `
          <li class="breadcrumb__item">
            <a href="${item.url}" class="breadcrumb__link">${item.name}</a>
          </li>`;
    }
  });

  breadcrumbHTML += `
        </ol>
      </div>
    </nav>`;

  return breadcrumbHTML;
}

/* ========================================
   ページヘッダーの生成
======================================== */
function generatePageHeader(pageHeaderData) {
  if (!pageHeaderData) return '';

  const data = JSON.parse(pageHeaderData);

  const bgStyle = data.bgImage
    ? `style="background-image: url('${data.bgImage}');"`
    : '';

  return `
    <div class="page-header" ${bgStyle}>
      <div class="page-header__content">
        <h1 class="page-header__title">${data.title}</h1>
        <p class="page-header__subtitle">${data.subtitle}</p>
      </div>
    </div>`;
}

/* ========================================
   テンプレート初期化
======================================== */
function initTemplate() {
  const config = getPageConfig();

  // HEADタグの生成
  generateHead(config);

  // パンくずリストの生成（存在する場合）
  if (config.breadcrumb) {
    const breadcrumbElement = document.getElementById('breadcrumb');
    if (breadcrumbElement) {
      breadcrumbElement.innerHTML = generateBreadcrumb(config.breadcrumb);
    }
  }

  // ページヘッダーの生成（存在する場合）
  if (config.pageHeader) {
    const pageHeaderElement = document.getElementById('page-header');
    if (pageHeaderElement) {
      pageHeaderElement.innerHTML = generatePageHeader(config.pageHeader);
    }
  }
}

// テンプレート初期化を即座に実行
initTemplate();
