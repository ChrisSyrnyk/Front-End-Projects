//Library js

let myLibrary = []; //book storage [[title, author, page-count, isread],[],.....] latest addition stored in 0th position
let bookId = 0; //used and incremented on to set bookId;



function addBook(){
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pageCount = document.getElementById("page-count").value;
    let isRead = document.getElementById("is-read").checked;
    //nullify input values
    console.log(isRead);
    document.getElementById("title").value = null;
    document.getElementById("author").value = null;
    document.getElementById("page-count").value = null;
    document.getElementById("is-read").checked = false;
    myLibrary.unshift([title,author,pageCount,isRead]);   //add book to library
    displayLibrary();
    hideWindow();   
}

function printBooks(){
    console.log(myLibrary[0][1]);
}




function displayLibrary(){
    let title = myLibrary[0][0];
    let author = myLibrary[0][1];
    let pageCount = myLibrary[0][2];
    let isRead = myLibrary[0][3];
    if (isRead == true){
        isRead = "Read";
    } else {
        isRead = "unread";
    }
    
    const container = document.getElementById("library-container");   //get location of new element
    let newBookCard = document.createElement("div"); //create new div
    newBookCard.className = "book-card";
    //give book-card ID;
    newBookCard.id = bookId; //set bookId;
    bookId += 1;    //increment bookId
    //give book a status
    newBookCard.status = isRead;
    //title
    const titleDiv = document.createElement("div");  //create titleDiv
    titleDiv.className = "book-element";
    const bookTitle = document.createTextNode("Title: " + title);  //create title
    titleDiv.appendChild(bookTitle);
    //Author
    const authorDiv = document.createElement("div");    //create authorDiv
    authorDiv.className = "book-element";
    const bookAuthor = document.createTextNode("Author: " + author);  //create author text
    authorDiv.appendChild(bookAuthor);
    //page-count
    const pageCountDiv = document.createElement("div");
    pageCountDiv.className = "book-element";
    const bookPageCount = document.createTextNode("Page count: " + pageCount);  //create title
    pageCountDiv.appendChild(bookPageCount);
    //Button div
    const buttonDiv = document.createElement("div");
    buttonDiv.className = "book-element";
    //mark read
    const markRead = document.createElement("button")
    markRead.className = "book-button";
    markRead.addEventListener("click", () => {changereadStatus(newBookCard.id, markRead)})
    const markReadText = document.createTextNode("Read Status");
    if (isRead == "unread"){
        markRead.style = "background-color: rgb(228, 123, 123)";
    }
    markRead.appendChild(markReadText);
    buttonDiv.appendChild(markRead);
    //remove book
    const removeBook = document.createElement("button");
    removeBook.className = "book-button";
    removeBook.addEventListener("click", () => {removeBookFunction(newBookCard.id)})
    const removeBookText = document.createTextNode("Remove");
    removeBook.appendChild(removeBookText);
    buttonDiv.appendChild(removeBook);
    //add book elements to book card
    newBookCard.appendChild(titleDiv); //add title to div
    newBookCard.appendChild(authorDiv); //add title to div
    newBookCard.appendChild(pageCountDiv); //add title to div
    newBookCard.appendChild(buttonDiv);
    container.appendChild(newBookCard);
}

//remove book function
function removeBookFunction(bookElement){
    thisBook = document.getElementById(bookElement);
    thisBook.remove();
}

//change read status
function changereadStatus(bookElement, markReadElement){
    thisBook = document.getElementById(bookElement)
    //change status
    if (thisBook.status == "Read"){
        thisBook.status = "unRead";
        markReadElement.style = "background-color: rgb(228, 123, 123)";
    } else {
        thisBook.status = "Read";
        markReadElement.style = "background-color: rgb(155, 223, 155)";
    }
    

};

//change read button color... unRead == red, Read == light greenish





/*
Sequence of events 
(1) click add book --> input box
(2) submit book --> add to library 
(3) update display 
*/

function clickAddBook(){
    let container = document.getElementById("input-book-container");
    let container2 = document.getElementById("input-book");
    container.style.display = "block";
    container2.style.display = "block";
}

function hideWindow(){
    let container = document.getElementById("input-book-container");
    let container2 = document.getElementById("input-book");
    container.style.display = "none";
    container2.style.display = "none";
}