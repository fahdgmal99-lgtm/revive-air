/**
 * REVIVE AIR — Main JavaScript Controller
 * Handles Bilingual switching, Portfolio filtering, Lightbox, FAQs, WhatsApp Form, and UI interactions.
 */

(function () {
  'use strict';

  // Constants & Global State
  const PHONE_NUMBER = '01028805759';
  const WHATSAPP_INTL = '201028805759';
  const DEFAULT_LANG = 'ar';
  let currentLang = localStorage.getItem('revive_lang') || DEFAULT_LANG;
  let currentFilter = 'all';

  // DOM Elements Cache
  const htmlDoc = document.documentElement;
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const mobileToggleBtn = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const videoGrid = document.getElementById('video-grid');
  const quoteForm = document.getElementById('quote-form');
  const currentYearElements = document.querySelectorAll('.current-year');
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  /**
   * Initialize on DOM Ready
   */
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initLanguage(currentLang);
    initNavigation();
    initPortfolio();
    initVideoGallery();
    initFaqAccordion();
    initQuotationForm();
    initScrollInteractions();
    initModalEvents();
  });

  /**
   * Dynamic Copyright Year
   */
  function initDynamicYear() {
    const year = new Date().getFullYear();
    currentYearElements.forEach(el => {
      el.textContent = year;
    });
  }

  /**
   * Language Switcher
   */
  function initLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('revive_lang', lang);

    const isRtl = lang === 'ar';
    htmlDoc.setAttribute('lang', lang);
    htmlDoc.setAttribute('dir', isRtl ? 'rtl' : 'ltr');

    const dict = TRANSLATIONS[lang] || TRANSLATIONS.ar;

    // Update document title & meta description
    if (dict.pageTitle) document.title = dict.pageTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict.metaDescription) {
      metaDesc.setAttribute('content', dict.metaDescription);
    }

    // Update all text nodes with data-i18n (lock #about section to English)
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const targetDict = el.closest('#about') ? TRANSLATIONS.en : dict;
      if (targetDict && targetDict[key]) {
        el.textContent = targetDict[key];
      }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const targetDict = el.closest('#about') ? TRANSLATIONS.en : dict;
      if (targetDict && targetDict[key]) {
        el.setAttribute('placeholder', targetDict[key]);
      }
    });

    // Update aria labels
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const targetDict = el.closest('#about') ? TRANSLATIONS.en : dict;
      if (targetDict && targetDict[key]) {
        el.setAttribute('aria-label', targetDict[key]);
      }
    });

    // Update Language Button Label
    if (langToggleBtn) {
      langToggleBtn.textContent = dict.langToggle;
      langToggleBtn.setAttribute('aria-label', dict.langToggleAria);
    }

    // Re-render Dynamic Lists
    renderPortfolio(currentFilter);
    renderVideoGallery();
  }

  // Toggle Language Handler
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetLang = currentLang === 'ar' ? 'en' : 'ar';
      initLanguage(targetLang);
    });
  }

  /**
   * Navigation & Mobile Drawer
   */
  function initNavigation() {
    if (!mobileToggleBtn || !navMenu) return;

    mobileToggleBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  function openMobileMenu() {
    navMenu.classList.add('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeMobileMenu() {
    navMenu.classList.remove('open');
    mobileToggleBtn.setAttribute('aria-expanded', 'false');
  }

  /**
   * Portfolio & Project Cards System
   */
  function initPortfolio() {
    // Filter click listeners
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderPortfolio(currentFilter);
      });
    });

    renderPortfolio(currentFilter);
  }

  function renderPortfolio(filter) {
    if (!portfolioGrid) return;
    portfolioGrid.innerHTML = '';

    const dict = TRANSLATIONS[currentLang];

    const filtered = PROJECTS_DATA.filter(proj => {
      // Step 3: Ensure only projects with real content and media are rendered, omitting empty placeholder icons
      if (!proj.hasRealImage || !proj.image) return false;
      if (filter === 'all') return true;
      if (filter === 'residential' || filter === 'commercial') {
        return proj.projectType === filter;
      }
      return proj.category === filter;
    });

    if (filtered.length === 0) {
      portfolioGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
          <p style="color: var(--color-text-muted);">${dict.placeholderNotice}</p>
        </div>
      `;
      return;
    }

    filtered.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.setAttribute('data-category', proj.category);

      const title = proj.title[currentLang] || proj.title.ar;
      const desc = proj.description[currentLang] || proj.description.ar;
      const location = proj.location[currentLang] || proj.location.ar;
      const typeLabel = proj.projectType === 'residential' 
        ? (currentLang === 'ar' ? 'سكني' : 'Residential')
        : (currentLang === 'ar' ? 'تجاري' : 'Commercial');

      const categoryLabel = getCategoryLabel(proj.category, currentLang);

      // Pre-filled WhatsApp inquiry link for this specific project
      const waText = encodeURIComponent(
        currentLang === 'ar'
          ? `مرحبًا ريفايف إير، أود الاستفسار عن مشروع مماثل لـ: ${title}`
          : `Hello REVIVE AIR, I would like to inquire about a project similar to: ${title}`
      );
      const waLink = `https://wa.me/${WHATSAPP_INTL}?text=${waText}`;

      // Media area: handles either real image or clear professional placeholder
      let mediaHtml = '';
      if (proj.hasRealImage && proj.image) {
        const photoCount = proj.additionalImages ? proj.additionalImages.length : 1;
        mediaHtml = `
          <div class="project-media-wrap has-image" role="button" tabindex="0" title="${currentLang === 'ar' ? 'انقر لتكبير واستعراض صور المشروع' : 'Click to view project photos'}" style="cursor: pointer; position: relative;">
            <img src="${proj.image}" alt="${proj.alt[currentLang] || ''}" loading="lazy" onerror="this.parentElement.classList.remove('has-image'); this.remove();">
            ${photoCount > 1 ? `
              <div class="gallery-badge" style="position: absolute; bottom: 0.75rem; inset-inline-end: 0.75rem; background: rgba(10, 77, 140, 0.88); color: #ffffff; padding: 0.3rem 0.65rem; border-radius: 20px; font-size: 0.75rem; font-weight: 700; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 4px 10px rgba(0,0,0,0.25); backdrop-filter: blur(4px);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                <span>${photoCount} ${currentLang === 'ar' ? 'صور' : 'Photos'}</span>
              </div>
            ` : ''}
          </div>
        `;
      } else {
        mediaHtml = `
          <div class="project-media-wrap">
            <svg class="placeholder-schematic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke-dasharray="2 2"/>
              <path d="M3 9h18M9 21V9"/>
              <circle cx="15" cy="15" r="2.5"/>
            </svg>
            <div class="placeholder-badge">${dict.placeholderNotice}</div>
            <div class="placeholder-path-hint" title="${proj.image}">${proj.image}</div>
          </div>
        `;
      }

      card.innerHTML = `
        ${mediaHtml}
        <div class="project-content">
          <div class="project-tags">
            <span class="project-tag">${categoryLabel}</span>
            <span class="project-tag tag-location">📍 ${location}</span>
            <span class="project-tag">${typeLabel}</span>
          </div>
          <h4 class="project-title">${title}</h4>
          <p class="project-desc">${desc}</p>
          <div class="project-footer">
            <span class="project-year">${dict.projectYearLabel} ${proj.completionDate || '—'}</span>
            <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-secondary" style="font-size: 0.8rem; padding: 0.45rem 0.85rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <span>${dict.projectInquireCta}</span>
            </a>
          </div>
        </div>
      `;

      if (proj.hasRealImage) {
        const mediaWrap = card.querySelector('.project-media-wrap.has-image');
        if (mediaWrap) {
          mediaWrap.addEventListener('click', () => {
            openProjectGalleryModal(proj);
          });
        }
      }

      portfolioGrid.appendChild(card);
    });
  }

  function getCategoryLabel(category, lang) {
    const dict = TRANSLATIONS[lang];
    switch (category) {
      case 'piping': return dict.filterPiping;
      case 'split-ac': return dict.filterSplit;
      case 'concealed-ac': return dict.filterConcealed;
      case 'maintenance': return dict.filterMaintenance;
      case 'water-filters': return dict.filterFilters;
      default: return '';
    }
  }

  /**
   * Video Gallery System
   */
  function initVideoGallery() {
    renderVideoGallery();
  }

  function renderVideoGallery() {
    if (!videoGrid) return;
    videoGrid.innerHTML = '';
    const dict = TRANSLATIONS[currentLang];

    VIDEOS_DATA.filter(vid => vid.hasRealVideo).forEach(vid => {
      const card = document.createElement('div');
      card.className = 'video-card';

      const title = vid.title[currentLang] || vid.title.ar;
      const desc = vid.description[currentLang] || vid.description.ar;
      const catLabel = getCategoryLabel(vid.category, currentLang);
      const location = (vid.location && (vid.location[currentLang] || vid.location.ar)) || '';

      card.innerHTML = `
        <div class="video-player-wrap" style="position: relative; width: 100%; aspect-ratio: 9 / 16; background: #0b1324; overflow: hidden; border-radius: var(--radius-lg) var(--radius-lg) 0 0;">
          <video 
            controls 
            playsinline 
            preload="metadata"
            ${vid.thumbnail ? `poster="${vid.thumbnail}"` : ''} 
            style="width: 100%; height: 100%; object-fit: contain; display: block;"
          >
            <source src="${vid.videoUrl}" type="video/mp4">
            ${currentLang === 'ar' ? 'متصفحك لا يدعم تشغيل هذا الفيديو مباشرة.' : 'Your browser does not support inline video playback.'}
          </video>
          <span style="position: absolute; top: 0.75rem; inset-inline-end: 0.75rem; background: rgba(37, 211, 102, 0.95); color: #ffffff; padding: 0.25rem 0.65rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; z-index: 2; pointer-events: none; box-shadow: 0 2px 8px rgba(0,0,0,0.3); backdrop-filter: blur(4px);">
            ▶ ${currentLang === 'ar' ? 'فيديو حقيقي' : 'Real Video'}
          </span>
        </div>
        <div class="video-card-body" style="padding: 1.25rem;">
          <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.65rem; flex-wrap: wrap;">
            <span class="project-tag">${catLabel}</span>
            ${location ? `<span class="project-tag tag-location">📍 ${location}</span>` : ''}
          </div>
          <h4 class="video-card-title" style="margin-bottom: 0.5rem; font-size: 1.15rem; line-height: 1.4;">${title}</h4>
          <p class="video-card-desc" style="margin-bottom: 1rem; font-size: 0.92rem; color: var(--color-text-muted); line-height: 1.6;">${desc}</p>
          <a href="https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(currentLang === 'ar' ? 'مرحبًا ريفايف إير، أود الاستفسار عن خدمة مماثلة لفيديو: ' + title : 'Hello REVIVE AIR, I would like to inquire regarding video: ' + title)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="width: 100%; justify-content: center; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.6rem 1rem; border-radius: var(--radius-sm);">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>${currentLang === 'ar' ? 'طلب معاينة أو استفسار عبر واتساب' : 'Inquire via WhatsApp'}</span>
          </a>
        </div>
      `;

      videoGrid.appendChild(card);
    });
  }

  /**
   * Project Photos Lightbox Modal
   */
  function openProjectGalleryModal(proj) {
    if (!modalOverlay || !modalBody) return;
    const title = proj.title[currentLang] || proj.title.ar;
    const desc = proj.description[currentLang] || proj.description.ar;
    const location = proj.location[currentLang] || proj.location.ar;
    const images = (proj.additionalImages && proj.additionalImages.length > 0)
      ? proj.additionalImages
      : [{ url: proj.image, caption: { ar: title, en: title } }];

    modalBody.innerHTML = `
      <div class="project-gallery-modal-content">
        <div style="margin-bottom: 1.25rem;">
          <span class="project-tag" style="margin-bottom: 0.5rem; display: inline-block;">📍 ${location}</span>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem; line-height: 1.4;">${title}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">${desc}</p>
        </div>

        <div class="modal-gallery-main-view" style="margin-bottom: 0.85rem; border-radius: var(--radius-md); overflow: hidden; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 280px; max-height: 520px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);">
          <img id="gallery-main-img" src="${images[0].url}" alt="${title}" style="width: 100%; max-height: 520px; object-fit: contain; transition: opacity 0.2s ease;">
        </div>
        <p id="gallery-img-caption" style="font-size: 0.9rem; color: var(--color-text-main); text-align: center; margin-bottom: 1rem; font-weight: 600; min-height: 1.5rem;">
          ${(images[0].caption && images[0].caption[currentLang]) || ''}
        </p>

        ${images.length > 1 ? `
          <div class="modal-gallery-thumbs" style="display: flex; gap: 0.65rem; overflow-x: auto; padding: 0.5rem 0.25rem 0.75rem; scrollbar-width: thin;">
            ${images.map((img, idx) => `
              <button type="button" class="thumb-btn ${idx === 0 ? 'active' : ''}" data-idx="${idx}" style="flex: 0 0 84px; height: 60px; border-radius: var(--radius-sm); overflow: hidden; border: 2.5px solid ${idx === 0 ? 'var(--color-primary)' : 'rgba(0,0,0,0.1)'}; padding: 0; background: #000; cursor: pointer; transition: all 0.2s ease;">
                <img src="${img.url}" alt="" style="width: 100%; height: 100%; object-fit: cover;">
              </button>
            `).join('')}
          </div>
        ` : ''}

        <div style="margin-top: 1.25rem; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 1rem; border-top: 1px solid var(--color-border); padding-top: 1.25rem;">
          <span style="font-size: 0.85rem; color: var(--color-text-muted);">
            📸 ${images.length} ${currentLang === 'ar' ? 'صور توثيقية حقيقية للمشروع' : 'Real Project Documentation Photos'}
          </span>
          <a href="https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(currentLang === 'ar' ? 'مرحبًا ريفايف إير، أود الاستفسار عن مشروع: ' + title : 'Hello REVIVE AIR, I would like to inquire about: ' + title)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>${currentLang === 'ar' ? 'طلب عرض سعر لمشروع مماثل' : 'Inquire About Similar Project'}</span>
          </a>
        </div>
      </div>
    `;

    // Thumb click listener
    modalBody.querySelectorAll('.thumb-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        modalBody.querySelectorAll('.thumb-btn').forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = 'rgba(0,0,0,0.1)';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--color-primary)';
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        const mainImg = modalBody.querySelector('#gallery-main-img');
        const captionEl = modalBody.querySelector('#gallery-img-caption');
        if (mainImg) {
          mainImg.style.opacity = '0.3';
          setTimeout(() => {
            mainImg.src = images[idx].url;
            mainImg.style.opacity = '1';
          }, 150);
        }
        if (captionEl) {
          captionEl.textContent = (images[idx].caption && images[idx].caption[currentLang]) || '';
        }
      });
    });

    modalOverlay.classList.add('open');
  }

  function openVideoModal(vid) {
    const dict = TRANSLATIONS[currentLang];
    const title = vid.title[currentLang] || vid.title.ar;
    const desc = vid.description[currentLang] || vid.description.ar;
    const location = (vid.location && (vid.location[currentLang] || vid.location.ar)) || '';

    if (vid.hasRealVideo && vid.videoUrl) {
      modalBody.innerHTML = `
        <div style="margin-bottom: 1.25rem;">
          ${location ? `<span class="project-tag" style="margin-bottom: 0.5rem; display: inline-block;">📍 ${location}</span>` : ''}
          <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.5rem; line-height: 1.4;">${title}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6;">${desc}</p>
        </div>

        <div style="background: #000; border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.25rem; box-shadow: 0 8px 24px rgba(0,0,0,0.3); display: flex; justify-content: center; align-items: center;">
          <video controls autoplay ${vid.thumbnail ? `poster="${vid.thumbnail}"` : ''} style="width: 100%; max-height: 520px; display: block;" preload="auto">
            <source src="${vid.videoUrl}" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        </div>

        <div style="display: flex; justify-content: flex-end; align-items: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
          <a href="https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(currentLang === 'ar' ? 'مرحبًا ريفايف إير، أود الاستفسار عن خدمة تأسيس مماثلة لفيديو: ' + title : 'Hello REVIVE AIR, I would like to inquire regarding piping video: ' + title)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.65rem 1.25rem;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
            <span>${currentLang === 'ar' ? 'طلب معاينة وعرض سعر عبر واتساب' : 'Request Inspection & Quote via WhatsApp'}</span>
          </a>
        </div>
      `;
    } else {
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: rgba(63, 169, 245, 0.15); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="23 7 16 12 23 17 23 7"/>
              <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
            </svg>
          </div>
          <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--color-primary); margin-bottom: 0.75rem;">${dict.videoNoticeTitle}</h3>
          <p style="color: var(--color-text-muted); font-size: 0.95rem; line-height: 1.6; max-width: 480px; margin: 0 auto 1.5rem;">
            ${dict.videoNoticeDesc}
          </p>
          <div style="background: var(--color-bg); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-family: monospace; font-size: 0.8rem; color: var(--color-text-subtle); margin-bottom: 1.5rem; direction: ltr;">
            📁 ${vid.videoUrl}
          </div>
          <a href="https://wa.me/${WHATSAPP_INTL}?text=${encodeURIComponent(currentLang === 'ar' ? 'مرحبًا ريفايف إير، أود مشاهدة نماذج من فيديوهات أعمالكم الميدانية.' : 'Hello REVIVE AIR, I would like to see sample videos of your field work.')}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            <span>${dict.videoNoticeCta}</span>
          </a>
        </div>
      `;
    }

    modalOverlay.classList.add('open');
  }

  function initModalEvents() {
    if (!modalOverlay || !modalCloseBtn) return;

    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (!modalOverlay) return;
    // Stop any playing video
    const video = modalOverlay.querySelector('video');
    if (video) video.pause();
    modalOverlay.classList.remove('open');
  }

  /**
   * FAQ Accordion
   */
  function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const headerBtn = item.querySelector('.faq-header-btn');
      headerBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close other items for neatness
        faqItems.forEach(other => {
          if (other !== item) {
            other.classList.remove('active');
            other.querySelector('.faq-header-btn').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          headerBtn.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          headerBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /**
   * Quotation Request Form -> Formatted WhatsApp Message
   */
  function initQuotationForm() {
    if (!quoteForm) return;

    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('quote-name');
      const phoneInput = document.getElementById('quote-phone');
      const serviceSelect = document.getElementById('quote-service');
      const projectTypeSelect = document.getElementById('quote-project-type');
      const locationSelect = document.getElementById('quote-location');
      const detailsInput = document.getElementById('quote-details');
      const feedbackEl = document.getElementById('form-feedback');

      // Validation
      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();
      const service = serviceSelect.value;
      const projectType = projectTypeSelect.value;
      const location = locationSelect.value;
      const details = detailsInput.value.trim();

      if (!name || !service || !projectType || !location) {
        feedbackEl.textContent = TRANSLATIONS[currentLang].formRequiredError;
        feedbackEl.classList.add('show');
        return;
      }

      feedbackEl.classList.remove('show');

      // Format WhatsApp Message
      let message = '';
      if (currentLang === 'ar') {
        message = `*طلب عرض سعر — ريفايف إير (REVIVE AIR)*\n\n`
          + `👤 *الاسم:* ${name}\n`
          + (phone ? `📞 *الهاتف:* ${phone}\n` : '')
          + `🔧 *نوع الخدمة:* ${serviceSelect.options[serviceSelect.selectedIndex].text}\n`
          + `🏢 *نوع المشروع:* ${projectTypeSelect.options[projectTypeSelect.selectedIndex].text}\n`
          + `📍 *الموقع:* ${locationSelect.options[locationSelect.selectedIndex].text}\n`
          + (details ? `📝 *تفاصيل إضافية:* ${details}\n\n` : '\n')
          + `_تم إرسال هذا الطلب عبر موقع REVIVE AIR الرسمي._`;
      } else {
        message = `*Quotation Request — REVIVE AIR*\n\n`
          + `👤 *Name:* ${name}\n`
          + (phone ? `📞 *Phone:* ${phone}\n` : '')
          + `🔧 *Service:* ${serviceSelect.options[serviceSelect.selectedIndex].text}\n`
          + `🏢 *Project Type:* ${projectTypeSelect.options[projectTypeSelect.selectedIndex].text}\n`
          + `📍 *Location:* ${locationSelect.options[locationSelect.selectedIndex].text}\n`
          + (details ? `📝 *Details:* ${details}\n\n` : '\n')
          + `_Sent via REVIVE AIR official website._`;
      }

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${WHATSAPP_INTL}?text=${encodedMsg}`;

      // Open WhatsApp in new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /**
   * Scroll Interactions (Sticky header, Back-to-top)
   */
  function initScrollInteractions() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;

      // Header shadow
      if (siteHeader) {
        if (scrollPos > 40) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      // Back to top button
      if (backToTopBtn) {
        if (scrollPos > 400) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }
    }, { passive: true });

    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

})();
