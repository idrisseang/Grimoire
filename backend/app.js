require('dotenv').config()
const express = require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/user")
const bookRoutes = require("./routes/book")


const url = `mongodb+srv://idrisse:${process.env.DATABASE_PASSWORD}@cluster.rnslr8s.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url) // promesse
.then(()=> console.log("Connexion à la base de donnée réussie")) // résolue = tout est ok
.catch(()=> console.log("Connexion à la base de donnée échouée"))

const app = express()

app.use(express.json())
app.use("/images", express.static('images'))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use("/api/auth", userRoutes)

app.use("/api/books", bookRoutes)


module.exports  = app