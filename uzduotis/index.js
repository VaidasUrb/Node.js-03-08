import { writeFile, readFile, } from 'fs'
import express, { query } from 'express'


const app = express()
const people = './people.json'


// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './views')

//surandam lyti ir pakeiciam megstama vaisiu
// readFile(people, 'utf8', (err, data) => {
//     let json = JSON.parse(data)
//     json.forEach((json) => {
//         if (json.gender === 'female') {
//             json.favoriteFruit = 'vysnios'
//         } else if (json.gender === 'male') {
//             json.favoriteFruit = 'apelsinas'
//         }

//     });

//     writeFile(people, JSON.stringify(json), 'utf8', (err) => {
//         if (err) {
//             console.log('Nepavyko irasyti tokio failo')
//         } else {
//             console.log('Failas sekmingai isaugotas')
//         }
//     })
// })



//surandam eilute pagal id ir visas kitas istrinam
app.get('/edit-person/:id', (req, res) => {
    let id = req.params.id
    readFile(people, 'utf-8', (err, data) => {
        if (err) {
            res.send('Nepavyko rasti info')
            return
        }
        let json = JSON.parse(data)
        const jsonId = json.findIndex((el) => el.id == id)
        let exists = false
        json.forEach((element) => {
            if (element.id == id) {

                let jsonString = JSON.stringify([element])

                writeFile(people, jsonString, 'utf-8', (err) => {
                    if (err) {
                        res.send('Nepavyko irasyti failo')
                    } else {
                        res.send('Failas sekmingai issaugotas')
                    }
                })
                exists = true
            }
        })
        if (!exists) {
            res.send('Tokio nera')
        }
    })
})


//surandam eilute pagal id ir pakeiciam name reiksme
app.get('/:id/:name', (req, res) => {
    let id = req.params.id
    let name = req.params.name
    console.log(name)
    readFile(people, 'utf-8', (err, data) => {
        if (err) {
            res.send('Nepavyko rasti info')
            return
        }
        let json = JSON.parse(data)
        const jsonId = json.findIndex((el) => el.id == id)
        let exists = false
        json.forEach((element) => {
            if (element.id == id) {
                json[jsonId].name = name
                let jsonString = JSON.stringify([element])
                writeFile(people, jsonString, 'utf-8', (err) => {
                    if (err) {
                        res.send('Nepavyko irasyti failo')
                    } else {
                        res.send('Failas sekmingai issaugotas')
                    }
                })
                exists = true
            }
        })
        if (!exists) {
            res.send('Tokio nera')
        }
    })
})

app.listen(3000)

