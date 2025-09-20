require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
var cors = require('cors');
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const db_url = `mongodb+srv://${dbUser}:${dbPass}@cluster0.sx8zk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
let connectDB = require('./database.js');

let db;
connectDB.then((client) => {
    console.log('DB connected')
    db = client.db('music_db')
    app.locals.db = db; // 반드시 할당

    app.use(cors());
    app.use(express.json());

    app.use(express.static(path.join(__dirname, 'songlist-front', 'out')));

    app.get('/list', async (req, res) => {

        const list = await db.collection('songs').find().toArray();
        const songs = list.map(song => ({
            id: song._id,
            image: song.image,
            artist: song.artist,
            name: song.name,
            like: song.like,
        }));
        res.json({ songs });
    })


    app.listen(8080, function () {
        console.log('listening on 8080')
    });
})