/* ========================================
   PORTOFOLIO INTERACTIVITY
   ======================================== */

(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');
  const revealElements = document.querySelectorAll(
    '.section-header, .skill-card, .cert-item, .project-card, .data-card, .about-text, .about-data, .contact-info, .contact-form'
  );
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const yearSpan = document.getElementById('year');

  // Tahun copyright otomatis
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // ========================================
  // MENU MOBILE
  // ========================================
  function toggleMenu(forceClose = false) {
    const isOpen = mainNav.classList.contains('open');
    const shouldOpen = forceClose ? false : !isOpen;

    mainNav.classList.toggle('open', shouldOpen);
    menuToggle.setAttribute('aria-expanded', String(shouldOpen));
    document.body.style.overflow = shouldOpen ? 'hidden' : '';
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => toggleMenu());

    navLinks.forEach((link) => {
      link.addEventListener('click', () => toggleMenu(true));
    });

    document.addEventListener('click', (event) => {
      if (
        mainNav.classList.contains('open') &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        toggleMenu(true);
      }
    });
  }

  // ========================================
  // HIGHLIGHT LINK AKTIF SAAT SCROLL
  // ========================================
  function updateActiveLink() {
    const scrollPos = window.scrollY + (header ? header.offsetHeight + 50 : 100);

    let currentId = '';
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 20) {
      currentId = 'kontak';
    }

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  // ========================================
  // ANIMASI SCROLL REPEATABLE
  // ========================================
  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        } else {
          entry.target.classList.remove('visible');
        }
      });
    },
    {
      root: null,
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

//  // ========================================
//   // CAROUSEL PROYEK (Infinite Smooth Loop)
//   // ========================================
//   const projectsGrid = document.getElementById('projectsGrid');
//   const prevBtn = document.getElementById('prevBtn');
//   const nextBtn = document.getElementById('nextBtn');

//   if (projectsGrid && prevBtn && nextBtn) {
//     const originalCards = Array.from(projectsGrid.children);
//     const totalOriginals = originalCards.length;
    
//     // 1. Duplikasi kartu untuk menciptakan buffer loop yang cukup
//     originalCards.forEach((card) => {
//       const cloneEnd = card.cloneNode(true);
//       const cloneStart = card.cloneNode(true);
//       projectsGrid.appendChild(cloneEnd);
//       projectsGrid.insertBefore(cloneStart, projectsGrid.firstChild);
//     });

//     const getCardWidth = () => {
//       const card = projectsGrid.querySelector('.project-card');
//       return card ? card.offsetWidth + 24 : 300; // 24px = gap
//     };

//     const singleSetWidth = getCardWidth() * totalOriginals;

//     // 2. Set posisi awal ke kartu pertama di set tengah secara presisi
//     projectsGrid.scrollLeft = singleSetWidth;

//     // 3. Observer untuk Focus Active Card
//     const observerOptions = {
//       root: projectsGrid,
//       threshold: 0.6
//     };

//     const cardObserver = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('active-card');
//         } else {
//           entry.target.classList.remove('active-card');
//         }
//       });
//     }, observerOptions);

//     const allCards = projectsGrid.querySelectorAll('.project-card');
//     allCards.forEach((card) => cardObserver.observe(card));

//     // 4. Mencegah transisi kasar saat teleportasi seamless
//     let isTeleporting = false;

//     const handleInfiniteScroll = () => {
//       if (isTeleporting) return;

//       const currentScroll = projectsGrid.scrollLeft;

//       // Jika scroll hampir habis di ujung kiri
//       if (currentScroll <= 10) {
//         isTeleporting = true;
//         projectsGrid.classList.add('no-smooth');
//         projectsGrid.scrollLeft = currentScroll + singleSetWidth;
        
//         // Kembalikan efek smooth setelah teleport selesai
//         requestAnimationFrame(() => {
//           requestAnimationFrame(() => {
//           projectsGrid.classList.remove('no-smooth');
//           isTeleporting = false;
//           });
//         });
//       } 
//       // Jika scroll melampaui set tengah ke ujung kanan
//       else if (currentScroll >= singleSetWidth * 2 - 10) {
//         isTeleporting = true;
//         projectsGrid.classList.add('no-smooth');
//         projectsGrid.scrollLeft = currentScroll - singleSetWidth;
        
//         requestAnimationFrame(() => {
//           projectsGrid.classList.remove('no-smooth');
//           isTeleporting = false;
//         });
//       }
//     };

//     // 5. Tombol Navigasi
//     nextBtn.addEventListener('click', () => {
//       projectsGrid.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
//     });

//     prevBtn.addEventListener('click', () => {
//       projectsGrid.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
//     });

//     projectsGrid.addEventListener('scroll', handleInfiniteScroll);
//   }

  // ========================================
  // HEADER SHADOW SAAT SCROLL
  // ========================================
  function updateHeaderShadow() {
    if (!header) return;
    if (window.scrollY > 10) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
    } else {
      header.style.boxShadow = 'none';
    }
  }

  window.addEventListener('scroll', updateHeaderShadow);
  updateHeaderShadow();

  // ========================================
  // FORMULIR KONTAK
  // ========================================
  if (contactForm && formNote) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = contactForm.name.value.trim();
      const email = contactForm.email.value.trim();
      const message = contactForm.message.value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Harap isi semua kolom terlebih dahulu.';
        formNote.className = 'form-note error';
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formNote.textContent = 'Format email tidak valid.';
        formNote.className = 'form-note error';
        return;
      }

      formNote.textContent = 'Terima kasih, pesan Anda telah terkirim!';
      formNote.className = 'form-note success';
      contactForm.reset();

      setTimeout(() => {
        formNote.textContent = '';
        formNote.className = 'form-note';
      }, 5000);
    });
  }

  updateActiveLink();
})();