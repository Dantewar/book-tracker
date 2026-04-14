let library = JSON.parse(localStorage.getItem("library")) || [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const list = document.getElementById("list");

function saveLibrary() {
  localStorage.setItem("library", JSON.stringify(library));
}

function addBookUI() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) {
    alert("Please fill all fields");
    return;
  }

  library.push({
    id: Date.now(),
    title,
    author,
    isRead: false
  });

  saveLibrary();
  renderBooks(library);

  titleInput.value = "";
  authorInput.value = "";
}

function renderBooks(books) {
  list.innerHTML = "";

  if (books.length === 0) {
    list.innerHTML = "<li class='empty'>No books found</li>";
    return;
  }

  books.forEach(book => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="book-info">
        <strong>${book.title}</strong> by ${book.author}
        <span class="${book.isRead ? "read" : "unread"}">
          ${book.isRead ? "Read" : "Not read"}
        </span>
      </div>

      <div class="buttons">
        <button onclick="markAsRead(${book.id})">Read</button>
        <button onclick="editBook(${book.id})">Edit</button>
        <button onclick="removeBook(${book.id})">Remove</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function markAsRead(id) {
  const book = library.find(b => b.id === id);

  if (book) {
    book.isRead = true;
    saveLibrary();
    renderBooks(library);
  }
}

function removeBook(id) {
  library = library.filter(b => b.id !== id);
  saveLibrary();
  renderBooks(library);
}

function editBook(id) {
  const book = library.find(b => b.id === id);

  const newTitle = prompt("New title:", book.title);
  const newAuthor = prompt("New author:", book.author);

  if (!newTitle || !newAuthor) return;

  book.title = newTitle.trim();
  book.author = newAuthor.trim();

  saveLibrary();
  renderBooks(library);
}

function listUnreadUI() {
  const unread = library.filter(b => !b.isRead);
  renderBooks(unread);
}

function showAll() {
  renderBooks(library);
}

renderBooks(library);