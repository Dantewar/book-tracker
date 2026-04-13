function renderBooks(books) {
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${book.title} by ${book.author} - ${book.isRead ? "Read" : "Not read"}
      <button onclick="markAsRead('${book.title}')">Read</button>
      <button onclick="removeBook('${book.title}')">Remove</button>
    `;

    list.appendChild(li);
  });
}

function markAsRead(title) {
  const book = library.find(b => b.title === title);
  if (book) {
    book.isRead = true;
    renderBooks(library);
  }
}

function removeBook(title) {
  library = library.filter(b => b.title !== title);
  renderBooks(library);
}const unreadBtn = document.getElementById("unreadBtn");
const allBtn = document.getElementById("allBtn");

unreadBtn.addEventListener("click", listUnread);
allBtn.addEventListener("click", () => renderBooks(library));

function listUnread() {
  const unread = library.filter(b => !b.isRead);
  renderBooks(unread);
}