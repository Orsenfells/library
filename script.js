const addBookButton = document.querySelector('.addBook');
const modalExit = document.querySelector('.modal-exit');
const submitButton = document.querySelector('.submit');
let myLibrary = [];
addBookToLibrary(new Book('Joe Abercrombie', 'The First Law', '600', true, myLibrary.length)) ;
addBookToLibrary(new Book('Joe Abercrombie', 'The Last Argument of Kings', '700', true, myLibrary.length));



function Book(author, title, pages, read, index) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read ? 'Completed' : 'Not Completed'
    this.index = index
}
Book.prototype.hasRead = function() {
    if(this.read) {
        this.read = false;
    } else this.read = true
}
function removeAllChildren(node) {
    while(node.firstChild) {
        node.removeChild(node.lastChild)
    }
}
function updateDomLibrary(libraryArray) {
    let bookshelf = document.querySelector('.container')
    removeAllChildren(bookshelf)
    libraryArray.forEach(book => {
        let bookInfo = document.createElement('div');
        let author = document.createElement('div');
        let title = document.createElement('div');
        let pages = document.createElement('div');
        let removeBookButton = document.createElement('span')
        let readButton = document.createElement('button')

        bookInfo.dataset.index = book.index;
        let info = [removeBookButton, author, title, pages, readButton];
        bookInfo.classList.add('book');
        removeBookButton.classList.add('exit-button')
        readButton.textContent = book.read ? 'Completed' : 'Not Completed'
        removeBookButton.textContent = 'X'
        author.textContent = book.author;
        title.textContent = book.title;
        pages.textContent = book.pages;
        info.forEach(info => {
            bookInfo.appendChild(info)
        })
        bookshelf.appendChild(bookInfo)

        removeBookButton.addEventListener('click', () => {
            removeBookFromLibrary(book.index)
            updateDomLibrary(myLibrary)
        })
        readButton.addEventListener('click',() => {
            book.hasRead()
            updateDomLibrary(myLibrary)
        })
    })
}
function addBookToLibrary(book) {
    myLibrary.push(book)
}
function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1)
}
function toggleModal() {
    let modal = document.querySelector('.modal');
    if(modal.style.display === 'block') {
        modal.style.display = 'none'
    } else modal.style.display = 'block'
}
addBookButton.addEventListener('click', toggleModal)
modalExit.addEventListener('click', toggleModal)
submitButton.addEventListener('click', () => {
    let input = ['author', 'title', 'pages', 'read']
    let book = {};
    let emptyValue = false;
    input.forEach(input => {
        let domInput = document.querySelector(`#${input}`)
        if(!domInput.value) {
            emptyValue = true;
        }
        if(domInput.type === 'checkbox') {
            book[input] = domInput.checked
        }else book[input] = domInput.value
    })
    if(emptyValue) {
        return
    }
    addBookToLibrary(new Book(book.author, book.title, book.pages, book.read, myLibrary.length))
    updateDomLibrary(myLibrary)
    toggleModal();
})
updateDomLibrary(myLibrary)