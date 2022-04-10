import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: false
}))

//                                         /Sukurtos duombzės pavadinimas
mongoose.connect('mongodb://localhost/facebook', (err) => {
    if (!err)
        console.log('Prisijungimas prie duomenu bazes pavyko')
});

//Schemos duomenu bazeje sukurimas, inicijuojamas po viena karta kiekvienai kolekcijai (lentelei)
const postsSchema = new mongoose.Schema({
    content: String,
    data: Date
})

//Schemos priskyrimas i modeli, inicijuojamas kartu su auksciau aprasytu kodu
const posts = mongoose.model('posts', postsSchema)

app.get('/show-data', (req, res) => {
    posts.find((err, data) => {
        if (err)
            return console.log(err)

        res.json(data)
    })
})

app.delete('/delete-data/:id', (req, res) => {
    let id = req.params.id

    posts.findByIdAndDelete(id).exec()
    posts.find((err, data) => {
        if (err)
            return console.log(err)

        res.json(data)
    })
})

app.post('/save-data', (req, res) => {
    //Naujo iraso sukurimas ir issaugojimas duomenu bazeje
    const newPost = new posts()
    newPost.content = req.body.content
    newPost.data = req.body.data
    newPost.save()

    res.send('Duomenys išsaugoti duomenų bazėje')
})

let post = posts.findByIdAndUpdate('62448b6786f095f5aaffebfe', {
    content: 'Programiskai paredaguotas irasas'
})
    .then(data => {
        console.log('Irasas sekmingai atnaujintas')

    })


// app.put('/update-todo/:id', (req, res) => {
//     let id = req.params.id

//     readFile(database, 'utf8', (err, data) => {
//         if (err) {
//             res.json({ status: 'failed', message: 'Nepavyko perskaityti failo' })
//             return
//         }
//         //Issifruojame json informacija atgal i javascript masyva
//         let json = JSON.parse(data)

//         const jsonId = json.findIndex((el) => el.id == id)

//         if (jsonId === -1) {
//             res.json({ status: 'failed', message: 'Nepavyko rasti tokio elemento' })
//             return
//         }

//         json[jsonId].done = json[jsonId].done ? false : true

//         let jsonString = JSON.stringify(json)

//         writeFile(database, jsonString, 'utf8', (err) => {
//             if (err) {
//                 res.json({ status: 'failed', message: 'Nepavyko įrašyti failo' })
//             } else {
//                 res.json({ status: 'success', message: 'Užduotis atlikta' })
//             }
//         })

//     })
// })


app.listen(3000)