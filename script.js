// Wishlist array
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Elements
const wishlistItems = document.getElementById('wishlist-items');
const libraryList = document.getElementById('library-list');
const addBookForm = document.getElementById('add-book-form');
const bookNameInput = document.getElementById('book-name');
const homeSection = document.getElementById('home-section');
const librarySection = document.getElementById('library-section');
const homeLink = document.getElementById('home-link');
const libraryLink = document.getElementById('library-link');

// Render Wishlist
function renderWishlist() {
  wishlistItems.innerHTML = '';

  if (wishlist.length === 0) {
    wishlistItems.innerHTML = '<li>No books in your wishlist yet.</li>';
    return;
  }

  wishlist.forEach(book => {
    const li = document.createElement('li');
    li.textContent = book;
    wishlistItems.appendChild(li);
  });
}

// Render Library
function renderLibrary() {
  libraryList.innerHTML = '';

  if (wishlist.length === 0) {
    libraryList.innerHTML = '<li>No books found in your library.</li>';
    return;
  }

  wishlist.forEach((book, index) => {
    const li = document.createElement('li');

    const bookTitle = document.createElement('span');
    bookTitle.textContent = book;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');
    removeBtn.addEventListener('click', () => removeBook(index));

    li.appendChild(bookTitle);
    li.appendChild(removeBtn);
    libraryList.appendChild(li);
  });
}

// Remove a book
function removeBook(index) {
  wishlist.splice(index, 1);
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  renderWishlist();
  renderLibrary();
}

// Add a book
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookTitle = bookNameInput.value.trim();

  if (bookTitle === "") {
    alert("Please enter a book title!");
    return;
  }

  if (!wishlist.includes(bookTitle)) {
    wishlist.push(bookTitle);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    renderWishlist();
    renderLibrary();
    bookNameInput.value = "";
  } else {
    alert('This book is already in your wishlist!');
  }
});

// Handle navigation
homeLink.addEventListener('click', (e) => {
  e.preventDefault();
  homeSection.style.display = 'block';
  librarySection.style.display = 'none';
});

libraryLink.addEventListener('click', (e) => {
  e.preventDefault();
  homeSection.style.display = 'none';
  librarySection.style.display = 'block';
});

// Initial render
renderWishlist();
renderLibrary();
