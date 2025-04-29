// -------------------- WAIT UNTIL DOM IS READY --------------------
document.addEventListener("DOMContentLoaded", () => {
    initDarkMode();
    initScrollToBooks();
    initQuoteCarousel();
    initDynamicPlaceholder();
    initBookClickModal();
    initSmoothScrolling();
    initSidebarFilters();
    handleImageErrors();
  });
  
  // -------------------- DARK MODE TOGGLE --------------------
  function initDarkMode() {
    const toggleButton = document.getElementById('dark-mode-toggle');
    const body = document.body;
  
    if (!toggleButton) return;
  
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add('dark-mode');
    }
  
    toggleButton.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      localStorage.setItem("theme", body.classList.contains('dark-mode') ? "dark" : "light");
    });
  }
  
  // -------------------- SCROLL TO BOOKS --------------------
  function initScrollToBooks() {
    window.scrollToBooks = function() {
      const bookSection = document.querySelector('.book-images');
      if (bookSection) {
        bookSection.scrollIntoView({ behavior: 'smooth' });
      }
    };
  }
  
  // -------------------- QUOTE CAROUSEL WITH FADE EFFECT --------------------
  function initQuoteCarousel() {
    const quotes = document.querySelectorAll('.quote');
    const prevButton = document.getElementById('prev-btn');
    const nextButton = document.getElementById('next-btn');
    let currentIndex = 0;
  
    function showQuote(index) {
      quotes.forEach((quote, i) => {
        quote.style.opacity = '0';
        quote.style.transition = 'opacity 0.6s ease-in-out';
        quote.classList.remove('active');
      });
      quotes[index].classList.add('active');
      setTimeout(() => {
        quotes[index].style.opacity = '1';
      }, 50);
    }
  
    if (prevButton && nextButton) {
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        showQuote(currentIndex);
      });
  
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % quotes.length;
        showQuote(currentIndex);
      });
  
      showQuote(currentIndex);
    }
  }
  
  // -------------------- DYNAMIC PLACEHOLDER IN SEARCH BAR --------------------
  function initDynamicPlaceholder() {
    const booksArray = [
      "The Da Vinci Code",
      "Harry Potter and the Prisoner of Azkaban",
      "Surrounded by Idiots",
      "The Alchemist",
      "Atomic Habits"
    ];
    const searchBar = document.getElementById('searchbar');
    let placeholderIndex = 0;
  
    if (!searchBar) return;
  
    function changePlaceholder() {
      searchBar.placeholder = booksArray[placeholderIndex];
      placeholderIndex = (placeholderIndex + 1) % booksArray.length;
    }
  
    setInterval(changePlaceholder, 3000);
    changePlaceholder();
  }
  
  // -------------------- BOOK CLICK MODAL (Instead of Alert) --------------------
  function initBookClickModal() {
    const books = document.querySelectorAll(".book");
  
    if (!books.length) return;
  
    // Create Modal Structure
    const modal = document.createElement('div');
    modal.id = 'bookModal';
    modal.style.cssText = `
      position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
      background: white; padding: 30px 40px; border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.2); z-index: 9999;
      display: none; flex-direction: column; align-items: center;
      min-width: 250px;
    `;
  
    const modalTitle = document.createElement('h2');
    modalTitle.style.marginBottom = '15px';
  
    const closeBtn = document.createElement('button');
    closeBtn.innerText = "Close";
    closeBtn.style.cssText = `
      margin-top: 20px; padding: 10px 20px;
      background-color: #ff7043; color: white; border: none;
      border-radius: 8px; cursor: pointer;
    `;
  
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  
    modal.appendChild(modalTitle);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
  
    // Attach Event Listeners
    books.forEach(book => {
      book.addEventListener('click', () => {
        const title = book.querySelector('h3')?.innerText || "Unknown Book";
        modalTitle.innerText = `📖 ${title}`;
        modal.style.display = 'flex';
      });
    });
  }
  
  // -------------------- SMOOTH SCROLLING FOR INTERNAL LINKS --------------------
  function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
  
  // -------------------- SIDEBAR FILTERS (IF USED) --------------------
  function initSidebarFilters() {
    const openFiltersButton = document.getElementById('openfilters');
    const closeFiltersButton = document.getElementById('closefilters');
    const sidebar = document.getElementById('filtersidebar');
  
    if (openFiltersButton && sidebar) {
      openFiltersButton.addEventListener('click', () => {
        sidebar.style.right = '0';
      });
    }
  
    if (closeFiltersButton && sidebar) {
      closeFiltersButton.addEventListener('click', () => {
        sidebar.style.right = '-350px';
      });
    }
  }
  
  // -------------------- HANDLE BROKEN IMAGES --------------------
  function handleImageErrors() {
    const allImages = document.querySelectorAll('img');
  
    allImages.forEach(img => {
      img.addEventListener('error', () => {
        img.src = 'placeholder.jpg'; // fallback image
        img.alt = 'Image Not Found';
      });
    });
  }

 // toggle classes on small screens when the hamburger icon is clicked.
  function toggleMobileMenu() {
    const navLinks = document.getElementById("navLinks");
    const rightSection = document.getElementById("rightSection");
  
    navLinks.classList.toggle("active");
    rightSection.classList.toggle("active");
  }
  
  function toggleAuthDropdown() {
    document.querySelector('.auth-dropdown').classList.toggle('active');
  }

  window.onclick = function (e) {
    if (!e.target.closest('.auth-dropdown')) {
      document.querySelector('.auth-dropdown')?.classList.remove('active');
    }
  };