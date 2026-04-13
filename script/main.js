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

  if (!title || !author) return;

  library.push({
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
        <button onclick="markAsRead('${book.title}')">Read</button>
        <button onclick="removeBook('${book.title}')">Remove</button>
      </div>
    `;

    list.appendChild(li);
  });
}

function markAsRead(title) {
  const book = library.find(b => b.title === title);

  if (book) {
    book.isRead = true;
    saveLibrary();
    renderBooks(library);
  }
}

function removeBook(title) {
  library = library.filter(b => b.title !== title);
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