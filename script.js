/**
 * Creatie® – Creative Designer Portfolio Script
 * Pure Vanilla JavaScript (No Frameworks)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAppleDock();
  initFAQAccordion();
  initCaseStudyModal();
  initSmoothScroll();
  initHeroTilt();
});

/* --------------------------------------------------------------------------
   1. Apple Dock Magnification Physics
   -------------------------------------------------------------------------- */
function initAppleDock() {
  const dock = document.querySelector('.apple-dock');
  if (!dock) return;

  const items = Array.from(dock.querySelectorAll('.dock-item'));
  const baseSize = window.innerWidth <= 810 ? 38 : 44;
  const maxScale = 1.45;
  const distanceThreshold = 120;

  dock.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;

    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const itemCenterX = rect.left + rect.width / 2;
      const dist = Math.abs(mouseX - itemCenterX);

      if (dist < distanceThreshold) {
        // Gaussian / Cosine smooth bell curve
        const factor = Math.cos((dist / distanceThreshold) * (Math.PI / 2));
        const scale = 1 + (maxScale - 1) * factor;
        const width = baseSize * scale;
        const height = baseSize * scale;

        item.style.width = `${width}px`;
        item.style.height = `${height}px`;
        item.style.transform = `translateY(-${(scale - 1) * 16}px)`;
      } else {
        item.style.width = `${baseSize}px`;
        item.style.height = `${baseSize}px`;
        item.style.transform = 'translateY(0)';
      }
    });
  });

  dock.addEventListener('mouseleave', () => {
    items.forEach((item) => {
      item.style.width = `${baseSize}px`;
      item.style.height = `${baseSize}px`;
      item.style.transform = 'translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   2. FAQ Accordion Toggle
   -------------------------------------------------------------------------- */
function initFAQAccordion() {
  // مدیریت FAQهای شناور
const faqChips = document.querySelectorAll('.faq-floating-chip');

faqChips.forEach((chip) => {
  const btn = chip.querySelector('.faq-question-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const isOpen = chip.classList.contains('open');

    // بستن بقیه
    faqChips.forEach((other) => {
      if (other !== chip && other.classList.contains('open')) {
        other.classList.remove('open');
      }
    });

    chip.classList.toggle('open', !isOpen);
  });
});
}

/* --------------------------------------------------------------------------
   3. Case Study Modal Dialog with Dynamic Gallery
   -------------------------------------------------------------------------- */
const projectData = {
  lenziinoo: {
    title: 'Lenziinoo',
    category: 'Branding & Ads',
    tools: 'Photoshop & Illustrator',
    year: '1404',
    image: 'assets/images/lenziino/first-c.png',
    gallery: [
      'assets/images/lenziino/first-c.png',
      'assets/images/lenziino/poster3-c.png',
      'assets/images/lenziino/instapost.png',
      'assets/images/lenziino/logo.png'
    ],
    description: 'طراحی جامع هویت بصری، پوسترهای تبلیغاتی، پست‌های اینستاگرام و لوگوی اختصاصی برند Lenziinoo. تمرکز اصلی این پروژه خلق حس زنده بودن، پویایی و ماندگاری در ذهن مخاطبان و ایجاد هماهنگی کامل بین متریال‌های چاپی و دیجیتال بوده است.'
  },
  posters: {
    title: 'Posters Collections',
    category: 'Graphic Design & Posters',
    tools: 'Figma & Photoshop',
    year: '1402-1403',
    image: 'assets/images/posters/ad poster-ز.png',
    gallery: [
      'assets/images/posters/ad poster-ز.png',
      'assets/images/posters/event banner-ز.png',
      'assets/images/posters/farhangi poster-ز.png',
      'assets/images/posters/varje-vorje-ز.png'
    ],
    description: 'مجموعه‌ای از پوسترهای هنری و تبلیغاتی با تمرکز بر تایپوگرافی جسورانه، ترکیبات فرمی چشم‌نواز و تضادهای رنگی گیرا. این پوسترها با هدف جذب نگاه مخاطب در همان ثانیه اول طراحی شده‌اند.'
  },
  nava: {
    title: 'Nava Art Concept',
    category: 'Brand Identity & AI Exploration',
    tools: 'Illustrator & PhotoShop',
    year: '1405',
    image: 'assets/images/nava/nava1.png',
    gallery: [
      'assets/images/nava/nava1.png',
      'assets/images/nava/nava2.png',
      'assets/images/nava/nava3.png',
      'assets/images/nava/nava11.png',
      'assets/images/nava/nava12.png'
    ],
    description: 'طراحی هویت بصری یک برند آرایشی شامل لگو ،پالت رنگی ،پترن ها و سبک ایکون های پیشنهادی مورد استفاده در طراحی ها ،طراحی سری ست پست و استوری در فضای مجازی ، پکیچینگ تستی ، و مجموعه کارت تشکر و استیکر بری ارسال بسته (پروژه فرضی با کارفرما AI)'
  },
  cover: {
    title: 'Digi Naghal cover',
    category: 'padcast cover',
    tools: 'Photoshop',
    year: '1404-1405',
    image: 'assets/images/cover/podcast coveer1.png',
    gallery: [
      'assets/images/cover/podcast coveer1.png',
      'assets/images/cover/podcast cover2.png'
    ],
    description: 'طراجی کاور پادکست دیجی نقال ،پادکست رسمی انجمن علمی مهندسی کامپیوتر دانشگاه بزرگمهر'
  },
  rosta: {
    title: 'Rosta Art Concept',
    category: 'Brand Identity & AI Exploration & Packaging',
    tools: 'Illustrator & Photoshop',
    year: '1403-1404',
    image: 'assets/images/rosta/rosta1.jpg',
    gallery: [
      'assets/images/rosta/rosta1.jpg',
      'assets/images/rosta/rosta44.jpg',
      'assets/images/rosta/rosta2.jpg',
      'assets/images/rosta/rosta3.jpg',
      'assets/images/rosta/rosta4.jpg'
    ],
    description: 'طراحی هویت بصری کامل برند سفالگری از صنایع روستایی شامل لگو ،پالت رنگی ،پترن ها و سبک ایکون های پیشنهادی مورد استفاده در طراحی ها، طراحی سری ست پست و استوری در فضای مجازی ،اقلام تبلیغاتی شامل  پکیچینگ تستی ، و مجموعه کارت تشکر و استیکر بری ارسال بسته و نمونه مهر و راهنمای جامع برندینگ روستـا با نگاهی مینیمال و وفادار به طبیعت و اصالت.(با کارفرمای AI)'
  },
  petshop: {
    title: 'Pet Shop (Wild Pup)',
    category: 'Ads in social & product story',
    tools: 'PhotoShop & AI(for mockups only)',
    year: '1403',
    image: 'assets/images/petshop/petshampoo.jpg',
    gallery: [
      'assets/images/petshop/petshampoo.jpg',
      'assets/images/petshop/doggift.jpg',
      'assets/images/petshop/catfood.jpg',
      'assets/images/petshop/catshen.jpg'
    ],
    description: 'طراحی پوستر های تبلیغی (استوری برد محصول ) فروشگاه آنلاین تخصصی پت‌شاپ؛ بهره‌گیری از تصویرسازی‌های خلاقانه و رنگ‌بندی گرم و دوستانه به همراه موکاپ محصولات (ساخته شده با AI) و تجربه خرید آسان با ادیت پیشرفته و استفاده از المان های جذاب برای مشتری در فتوشاپ.'
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('caseStudyModal');
  if (!modal) return;

  const closeBtn = modal.querySelector('.modal-close-btn');
  const modalImg = modal.querySelector('.modal-hero-img');
  const modalTitle = modal.querySelector('.modal-project-title');
  const modalCategory = modal.querySelector('.modal-project-category');
  const modalDesc = modal.querySelector('.modal-desc-persian');
  const modalTool = modal.querySelector('.modal-tool-val');
  const modalYear = modal.querySelector('.modal-year-val');
  const galleryGrid = document.getElementById('modalGalleryGrid');
  const galleryCount = document.getElementById('modalGalleryCount');
  const gallerySection = document.getElementById('modalGallerySection');

  // Trigger buttons
  document.querySelectorAll('[data-case-study]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-case-study');
      const data = projectData[key];

      if (data) {
        modalImg.src = data.image;
        modalImg.alt = data.title;
        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDesc.textContent = data.description;
        if (modalTool) modalTool.textContent = data.tools;
        if (modalYear) modalYear.textContent = data.year;

        // Render dynamic gallery
        if (galleryGrid) {
          galleryGrid.innerHTML = '';
          if (data.gallery && data.gallery.length > 0) {
            if (gallerySection) gallerySection.style.display = 'block';
            if (galleryCount) galleryCount.textContent = `(${data.gallery.length} تصویر)`;

            data.gallery.forEach((imgSrc) => {
              const item = document.createElement('div');
              item.className = 'modal-gallery-item';
              item.innerHTML = `
                <img src="${imgSrc}" alt="${data.title} gallery item" loading="lazy">
                <div class="gallery-item-overlay">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </div>
              `;

              // Click to swap with hero image
              item.addEventListener('click', () => {
                const currentHero = modalImg.src;
                modalImg.style.opacity = '0.3';
                setTimeout(() => {
                  modalImg.src = imgSrc;
                  modalImg.style.opacity = '1';
                }, 150);
              });

              galleryGrid.appendChild(item);
            });
          } else {
            if (gallerySection) gallerySection.style.display = 'none';
          }
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close handlers
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   4. Smooth Scroll for Anchor Links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Tilt & Parallax on Hero elements
   -------------------------------------------------------------------------- */
function initHeroTilt() {
  const hero = document.querySelector('.hero-section');
  const chips = document.querySelectorAll('.floating-chip');

  if (!hero || window.innerWidth < 810) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (clientX - centerX) / 40;
    const moveY = (clientY - centerY) / 40;

    chips.forEach((chip, index) => {
      const depth = (index + 1) * 0.4;
      const defaultRot = index === 0 ? -6 : index === 1 ? 5 : 7;
      chip.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px) rotate(${defaultRot}deg)`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    chips.forEach((chip, index) => {
      const defaultRot = index === 0 ? -6 : index === 1 ? 5 : 7;
      chip.style.transform = `rotate(${defaultRot}deg)`;
    });
  });
}
