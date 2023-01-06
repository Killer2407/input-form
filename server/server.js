if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: __dirname + './.env' })
}
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const logger = require("./logger.js")
const bodyParser = require('body-parser');

require('dotenv').config({ path: './.env' });
const Athlete = require("./athlete.model.js")

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "100mb" }))
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 50000 }))

const port = process.env.PORT || 4000;
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log("connection completed......")

    }).catch((error) => {
        console.log(error.message)
        console.log(error.message || "connection failed...")
        logger.logger.log("error", error.message)
    })

app.get('/api/', (req, res) => {
    res.send('Api is working fine ......')
})

app.get('/api/getAllAthlete', (req, res) => {
    Athlete.find().then(users => {
        res.status(200).json({ data: users })

    }).catch(err => {
        console.log('err')
    })
})
app.post("/api/register", async (req, res) => {

    console.log(req.body)
    try {
        const { name, dob, location, team, gender, sports, about, interests, profileImage } = req.body;
        try {
            console.log({ name, dob, location, team, gender, sports, about, interests, profileImage })
            const athleteUser = new Athlete({
                name, dob, location, team, gender, sports, about, interests, profileImage
            })
            await athleteUser.save();
            res.status(200).json({ message: "Saved Successfully" })

        } catch (error) {
            res.status(422).json({ message: error.message || "Somethig went wrong" })
        }
    } catch (error) {
        res.status(422).json({ message: error.message || "Somethig went wrong" })
        logger.logger.log("error", error.message)
    }

});

app.get('/api/getById/:id', (req, res) => {
    Athlete.find({ _id: req.params.id }).then(users => {
        res.status(200).json(users)

    }).catch(err => {
        console.log('err')
    })
})

app.put("/api/update/:id", async (req, res) => {
    try {
        try {
            const { name, dob, location, team, gender, sports, about, interests, profileImage } = req.body;

            await Athlete.findByIdAndUpdate(
                { _id: req.params.id },
                { name, dob, location, team, gender, sports, about, interests, profileImage }
                , { new: true }
            )
            res.status(200).json({ message: "update Successfully" })
        } catch (error) {
            res.status(422).json({ message: error.message || "Update Failed" })
        }
    } catch (error) {
        res.status(422).json({ message: error.message || "Somethig went wrong" })
        logger.logger.log("error", error.message)
    }

});

if (process.env.NODE_ENV === 'production') {
    const path = require('path');

    app.get('/', (req, res) => {
        app.use(express.static(path.join(__dirname, '../client', 'build')))
        res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'))
    })
}

app.listen(port, () => console.log("Node server listening on port " + port));
