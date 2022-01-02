const addBookButton = document.querySelector('.addBook');
const modalExit = document.querySelector('.modal-exit');
let firstLaw = new Book('Joe Abercrombie', 'The First Law', '600', true) ;
let lastArgument = new Book('Joe Abercrombie', 'The Last Argument of Kings', '700', true);
let myLibrary = [firstLaw, lastArgument];


function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read
}
function updateDomLibrary(libraryArray) {
    let bookshelf = document.querySelector('.container')
    libraryArray.forEach(book => {
        let bookInfo = document.createElement('div');
        let author = document.createElement('div');
        let title = document.createElement('div');
        let pages = document.createElement('div');
        let read = document.createElement('div');
        let info = [author, title, pages, read];
        bookInfo.classList.add('book');
        
        author.textContent = book.author;
        title.textContent = book.title;
        pages.textContent = book.pages;
        read.textContent = book.read;
        info.forEach(info => {
            bookInfo.appendChild(info)
        })
        bookshelf.appendChild(bookInfo)
    })
}
function addBookToLibrary(book) {
    myLibrary.push(book)
}

addBookButton.addEventListener('click', () => {
    let modal = document.querySelector('.modal');

    modal.style.display = 'block';
})
modalExit.addEventListener('click', () => {
    let modal = document.querySelector('.modal');
    modal.style.display = 'none';
})
updateDomLibrary(myLibrary)