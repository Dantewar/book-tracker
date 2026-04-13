const list = document.getElementById("bookList");

function renderBooks(books) {
  list.innerHTML = "";

  books.forEach(book => {
    const li = document.createElement("li");

    li.textContent = `${book.title} by ${book.author} - ${book.isRead ? "Read" : "Not read"}`;

    list.appendChild(li);
  });
}