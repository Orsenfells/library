const addBookButton = document.querySelector('.add-book');
const modalExit = document.querySelector('.modal-exit');
const submitButton = document.querySelector('.submit');
const form = document.querySelector('#new-book-form')
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

        let authorLabel = document.createElement('div')
        let titleLabel = document.createElement('div')
        let pagesLabel = document.createElement('div')
        let completedLabel = document.createElement('div')

        let titleContainer = document.createElement('div')
        let authorContainer = document.createElement('div')
        let pagesContainer = document.createElement('div')
        let completedContainer = document.createElement('div')

        titleContainer.appendChild(titleLabel)
        titleContainer.appendChild(title)
        authorContainer.appendChild(authorLabel)
        authorContainer.appendChild(author)
        pagesContainer.appendChild(pagesLabel)
        pagesContainer.appendChild(pages)
        completedContainer.appendChild(completedLabel)
        completedContainer.appendChild(readButton)

        titleLabel.textContent = 'Title:'
        authorLabel.textContent = 'Author:'
        pagesLabel.textContent = 'Pages:'
        completedLabel.textContent = 'Progress:'
        
        titleContainer.className = 'book-info-container'
        authorContainer.className = 'book-info-container'
        pagesContainer.className = 'book-info-container'
        completedContainer.className = 'book-info-container'
        bookInfo.dataset.index = book.index;
        let info = [removeBookButton, titleContainer, authorContainer, pagesContainer, completedContainer];
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
function formValidation() {
    let title = document.getElementById('title')
    let author = document.getElementById('author')
    let pages = document.getElementById('pages')

    title.addEventListener() 
}
addBookButton.addEventListener('click', toggleModal)
modalExit.addEventListener('click', toggleModal)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    let input = ['author', 'title', 'pages', 'read']
    let book = {};
    console.log(e.target)
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