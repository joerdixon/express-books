// Required Packages
const express = require("express");
const fs = require("fs");
// Needed to manipulate paths
const path = require("path");

// Port
const PORT = process.env.PORT || 3000;

// Create app
const app = express();

// Static middleware telling all file paths to start from this directory
app.use(express.static("public"));

// Middleware allowing the express server to parse incoming data.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Landing page 
app.get("/", (req, res) => {
    // Creates an absolute filepath by combining __dirname with a relative file path.
    res.sendFile(path.join(__dirname, "./views/index.html"))
})

// All books route
app.get("/api/books", (req, res) => {
    // Reads the current database, in utf-8 format, catching any error.
    fs.readFile("./db/books.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err)
            res.status(500).json({
                msg: "oh no!",
                err:err
            })
        } else {
            // We must parse the data in order for it to return as a object rather than a string.
            res.json(JSON.parse(data))
        }
    })
})

// Specific book route
app.get("/api/books/:id", (req, res) => {
    // Reads the current database, in utf-8 format, catching any error.
    fs.readFile("./db/books.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err)
            res.status(500).json({
                msg: "oh no!",
                err:err
            })
        } else {
            // We must parse the data in order for it to return as a object rather than a string.
            const dataArr = JSON.parse(data);
            // For every book in our database, check if the id matches the users GET request.
            for (let i = 0; i < dataArr.length; i++) {
                const book = dataArr[i];
                if (book.id == req.params.id ) {
                    // If it does, return 
                    return res.json(book)
                }
            }
            res.status(404)
            console.log(req.params.id)
        }
    })
})

// New book posting route
app.post("/api/books", (req, res) => {
    // Reads the current database, in utf-8 format, catching any error.
    fs.readFile("./db/books.json", "utf-8", (err, data) => {
        if(err) {
            console.log(err)
            res.status(500).json({
                msg: "oh no!",
                err:err
            })
        } else {
            // We must parse the data in order for it to return as a object rather than a string.
            const dataArr = JSON.parse(data);
            dataArr.push(req.body);
            fs.writeFile("./db/books.json", JSON.stringify(dataArr), (err, data) => {
                if(err){
                    console.log(err)
                } else {
                    res.json({
                        msg: "successfully added!"
                    })
                }
            })
        }
    })
})

app.get("*", (req, res) => {
    res.sendFile()
})

// Listen on this port
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})