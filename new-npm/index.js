import express, { query } from 'express'
import { engine } from 'express-handlebars'
import { writeFile, mkdir, readFile, existsSync } from 'fs'

const app = express()
const database = './database.json'

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

app.use(express.urlencoded({ extended: false }))

app.get('/check-file', (req, res) => {

    if (existsSync(database)) {
        console.log('Failas egzistuoja')
        res.send('Failas egzistuoja')
    } else {
        console.log('Failas neegzistuoja')
        res.send('Failas neegzistuoja')
    }
})

app.get('/add-user', function (req, res) {
    res.render('add-user')
})

app.post('/add-user', function (req, res) {
    if (Object.keys(req.body).length > 0) {

        if (req.body.vardas === '' ||
            req.body.pavarde === '' ||
            req.body.tel_nr === '' ||
            req.body.email === '' ||
            req.body.adresas === ''
        ) {
            res.render('add-user', { message: 'Yra tusciu laukeiu', status: 'red' })
            return

        } else {

            if (existsSync(database)) {

                //Jeigu failas yra

                readFile(database, 'utf8', (err, data) => {
                    let dataArray = JSON.parse(data)

                    dataArray.push(req.body)

                    writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                        if (!err) {
                            res.render('add-user', { message: 'Failas sekmingai isaugotas', status: 'green' })
                            return
                        } else {
                            console.log(err)
                        }
                    })

                })

            } else {

                //Jeigu failo nera

                let masyvas = []

                masyvas.push(req.body)

                writeFile(database, JSON.stringify(masyvas), 'utf8', (err) => {
                    if (!err) {
                        res.render('add-user', { message: 'Failas sekmingai isaugotas', status: 'green' })
                    } else {
                        console.log(err)
                    }
                })

            }

        }

    }
})


app.listen(3000)