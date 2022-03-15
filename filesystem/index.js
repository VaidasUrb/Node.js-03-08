import { writeFile, mkdir, readFile } from 'fs'
import express, { query } from 'express'
import { engine } from 'express-handlebars'


const app = express()
const database = './database/db.json'

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')



//----------------------------------------------
function rand(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}



app.get('/create-file', function (req, res) {
    mkdir('./database', function () {
        let masyvas = []
        for (let i = 0; i < 101; i++) {
            let atsitiktinis = rand(1, 110)
            masyvas.push(atsitiktinis)
        }
        // let objektas = {
        //     masyvas: masyvas
        // }
        //JSON.stringify() konvertuoja i JSON formata
        //JSON.parse() ISsifruoja JSON formata ir konvertuoja i js objekta

        writeFile(database, JSON.stringify(masyvas), 'utf8', function (err) {
            if (!err) {
                res.send('Failas geras')
                return
            } else {
                res.send('Klaida')
                return
            }
        })
    })


    // res.send(objektas)
})

app.get('/check-file', (req, res) => {

    readFile(database, "utf8", (err, data) => {
        let number = JSON.parse(data)
        const result = number.filter(num => (num % 2 === 0))

        res.send(result)

    });


})
//----------------------------------------------------------
// //Direktorijos sukurima
// mkdir('./failai', function (err) {
//     if (!err) {
//         console.log('Direktorija sukurta')
//     } else {
//         console.log('Ivyko klaida, arba tokia direktorija jau yra sukurta')
//     }
// })


// //Failo sukurimas
// writeFile('./failai/hello.txt', 'Labas pasauli', 'utf8', function (err) {
//     if (!err) {
//         console.log('Failas geras')
//     } else {
//         console.log('Klaida')
//     }
// })


app.listen(3000)