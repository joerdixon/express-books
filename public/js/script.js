// const express = require("express");
const newBook = document.querySelector("#newBook");
const bookID = document.querySelector("#bookID");
const bookTitle = document.querySelector("#bookTitle");
const bookAuthor = document.querySelector("#bookAuthor");
const readingList = document.querySelector("#allBooks");

fetch("/api/books").then(res => {
    return res.json()
}).then(data=>{
    data.forEach(book => {
        const newLi = document.createElement('li');
        newLi.textContent = book.title
        readingList.append(newLi)
    })
})

// When the user submits a new book


newBook.addEventListener("submit", (e) => {
    // Prevent default behavior
    e.preventDefault();
    // Construct object from user input
    const newReview = {
        id: parseInt(bookID.textContent),
        title: bookTitle.textContent,
        author: bookAuthor.textContent
    }
    fetch("/api/books", {
        method: "POST",
        headers: {
            'Content-Type':'application/json',
          },
        body: JSON.stringify(newReview)
    }).then((res) => {
        if(res.ok) {
            location.reload()
        } else {
            alert("trumpet sound")
        }
    })
})