let library = [];

const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", addBook);

function addBook() {
  const title = titleInput.value.trim();
  const author = authorInput.value.trim();

  if (!title || !author) return;

  const book = {
    title,
    author,
    isRead: false
  };

  library.push(book);

  titleInput.value = "";
  authorInput.value = "";

  console.log(library);
}