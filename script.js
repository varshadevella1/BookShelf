const bookCardTemplate = document.querySelector("#data-books-template")
const bookCardContainer = document.querySelector("#data-books-cards-container")
const searchBooks = document.querySelector("#search-box")
let books = []
searchBooks.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const books = JSON.parse(localStorage.getItem("books"));
  const booksAfterFilter = books.filter((book) => {
    return book.title.toLowerCase().includes(value);
  })
  renderBooks(booksAfterFilter,bookCardContainer);
})

function renderBooks(books , container){
  document.getElementById("data-books-cards-container").innerText = "";
  books.map((book, index) => {
    const card = bookCardTemplate.content.cloneNode(true).children[0]//gets the content inside template
    const imageLink = card.querySelector("#data-image")
    const title = card.querySelector("#data-title")
    const author = card.querySelector("#data-author")
    const status = null
    title.textContent = book.title
    author.textContent = book.author
    imageLink.src = book.imageLink
    const statusOptions = card.querySelector(".select")
    statusOptions.id= book.id
    statusOptions.addEventListener('change', (event) => {
      const selectedValue = event.target.value;
      console.log(selectedValue)
      const books = JSON.parse(localStorage.getItem("books"));
      // console.log(books)
      var localId = event.target.id;
      const BooksList = books.map(e => {
        if (e.id.toString() === localId) {
          return { ...e, status: selectedValue };
        }
        return e;
      })
      localStorage.setItem("books", JSON.stringify(BooksList))
      console.log(BooksList)
    })
    container.append(card)
  })
};

fetch("books.json", {
  method: 'GET',
  "host_permissions": ["https://api.com/*"],
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})
  .then(res => res.json())
  .then(data => {
    localStorage.setItem("books", JSON.stringify(data))
    renderBooks(data,bookCardContainer);
  })
