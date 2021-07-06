function Book (title, author, num_pages, read) {
  this.title = title;
  this.author = author;
  this.num_pages = num_pages;
  this.read = read;

  this.info = function() {
    return read ? `${title} by ${author}, ${num_pages} pages, read.` : `${title} by ${author}, ${num_pages} pages, not read yet`;
  }
}

const theHobbit = new Book ("The Hobbit", "J.R.R. Tolkien", 295, false);

console.log(theHobbit.info());