var newBooks=JSON.parse(localStorage.getItem("books"))
console.log(newBooks)
const bookCardTemplate = document.querySelector("#data-books-template")
// console.log(newBooks[1].status);
function checkCurrentReading(i){
  console.log(i)
  return i.status==="Currently reading"
}
const currentlyReading=newBooks.filter(checkCurrentReading)
console.log(currentlyReading)

function renderBooks(books , container){
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
      const books = JSON.parse(localStorage.getItem("books"));
      var localId = event.target.id;
      const BooksList = books.map(e => {
        if (e.id.toString() === localId) {
          return { ...e, status: selectedValue };
        }
        return e;
      })
      localStorage.setItem("books", JSON.stringify(BooksList))
    })
    container.append(card)
  })
};

var currentlyReadingBooks=document.querySelector("#currently-reading-container")
renderBooks(currentlyReading,currentlyReadingBooks)

function checkWantToRead(i){
  return i.status==="Want to read"
}
const wantToRead =newBooks.filter(checkWantToRead)
console.log(wantToRead)
var wantToReadBooks=document.querySelector("#want-to-read-container")
renderBooks(wantToRead,wantToReadBooks)


function checkRead(i){
  return i.status==="Read"
}
const read=newBooks.filter(checkRead)
console.log(read)

var readBooks=document.querySelector("#read-container")
renderBooks(read,readBooks)

function removeBook(i){
  return i.status==="None"
}
const none=newBooks[i].remove(removeBook)
console.log(none)