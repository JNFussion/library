let myLibrary = [];
const tableRef = document.querySelector('tbody');
const addBookButton = document.getElementById('add-btn');
const closeButton = document.querySelector('.close-btn');
const form = document.getElementById('book-form');

class Book {
  title;
  author;
  num_pages;
  read;

  constructor(title, author, num_pages, read) {
    this.title = title;
    this.author = author;
    this.num_pages = num_pages;
    this.read = read;
  }

  swapRead = function() {
    this.read = !this.read;
  }
}

/* GET DATA FROM FORM, CREATE A NEW BOOK AND ADD IT TO THE LIBRARY */


form.addEventListener("submit", (event) => {
  event.preventDefault()
  let newBook = new Book (
    form.querySelector('input[name="title"]').value,
    form.querySelector('input[name="author"]').value,
    form.querySelector('input[name="num-pages"]').value,
    form.querySelector('input[name="read"]').checked
  )
  myLibrary.push(newBook);
  resetForm();
  toggleHide();
  addBookToTable(newBook);
})


function resetForm() {
  form.querySelector('input[name="title"]').value = '';
  form.querySelector('input[name="author"]').value = '';
  form.querySelector('input[name="num-pages"]').value = '';
  form.querySelector('input[name="read"]').checked = '';
}

function addBookToTable(book, index) {
  tableRef.innerHTML += 
    `<tr>
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td class="num-pages_col">${book.num_pages}</td>
      <td class="read-col">${book.read ? "YES" : "NO"}</td>
      <td>
      <a onclick="delRow(${ typeof index !== 'undefined' ? index : myLibrary.length - 1 })" href="#" class="delete-btn"><i class="fas fa-trash-alt"></i></a>
      <a href="#" onclick="changeRead(${ typeof index !== 'undefined'? index : myLibrary.length - 1 })">
        <span class="fa-stack">
          <i class="fas fa-book fa-stack-2x"></i>
          <i class="fas fa-check fa-stack-1x"></i>
        </span>
      </a>
      </td>
    </tr>`;
}

function displayBooks() {
  tableRef.innerHTML = '';
  myLibrary.forEach( (book, i) => addBookToTable(book, i));
  syncLibStorage()
}

function delRow(index) {
  tableRef.deleteRow(index);
  myLibrary.splice(index, 1);
  displayBooks();
}

function changeRead(index) {
  myLibrary[index].swapRead();
  displayBooks();
}

function toggleHide() {
  const formContainer = document.getElementById('form-container');
  const tableContainer = document.querySelector('.table-container')
  formContainer.classList.toggle("hide");
  tableContainer.classList.toggle("hide");
}

function syncLibStorage() {
  localStorage.clear()
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

/* SHOW OR HIDE FORM WHEN CLICKED */

addBookButton.addEventListener( 'click', toggleHide);
closeButton.addEventListener( 'click', toggleHide);


/* IF THERE IS ANY BOOK SAVED LOCALY, IT LOAD THEM. */

if ( localStorage.length && localStorage.myLibrary != "[]" ) {
  myLibrary = [];
  window.addEventListener( 'load', () => {
    let tempLib = JSON.parse(localStorage.myLibrary);
    tempLib.forEach( tempBook => {
      myLibrary.push(new Book(
        tempBook.title, 
        tempBook.author, 
        tempBook.num_pages, 
        tempBook.read));
    })
    displayBooks();
  })
}