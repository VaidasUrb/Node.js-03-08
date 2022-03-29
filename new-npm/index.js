import express, { query } from 'express'
import { engine } from 'express-handlebars'
import { writeFile, mkdir, readFile, existsSync } from 'fs'
import { send } from 'process'
import chalk from 'chalk'

const app = express()
const database = './database.json'

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

app.use(express.urlencoded({ extended: false }))

app.use('/assets', express.static('assets'))


app.get('/check-file', (req, res) => {

    if (existsSync(database)) {
        console.log(chalk.yellow('Failas egzistuoja'))
        res.send('Failas egzistuoja')
    } else {
        console.log(chalk.red('Failas neegzistuoja'))
        res.send('Failas neegzistuoja')
    }
})

app.get('/add-user', function (req, res) {
    res.render('add-user')
})

app.post('/add-user', function (req, res) {
    if (Object.keys(req.body).length > 0) {
        //Tikrinama ar laukeliai nera tusti
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

                    //Auto increment
                    req.body.id = dataArray[dataArray.length - 1].id + 1

                    dataArray.push(req.body)

                    writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                        if (!err) {
                            res.render('add-user', { message: 'Failas sekmingai papildytas', status: 'green' })
                            return
                        } else {
                            console.log(err)
                        }
                    })

                })

            } else {

                //Jeigu failo nera

                let masyvas = []

                req.body.id = 0

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

//vartotojo redagavimas
app.get('/edit-user/:id', (req, res) => {
    let id = req.params.id
    readFile(database, 'utf-8', (err, data) => {
        if (err) {
            res.send('Nepavyko irasyti tokio failo')
            return
        }
        const json = JSON.parse(data)
        const jsonId = json.findIndex((el) => el.id == id)

        if (jsonId === -1) {
            res.send('Nepavyko rasti tokio elementu')
            return
        }
        res.render('edit-user', { data: json[jsonId] })
    })

})


app.post('/edit-user/:id', (req, res) => {
    let id = req.params.id
    if (Object.keys(req.body).length > 0) {
        //Tikrinama ar laukeliai nera tusti
        if (req.body.vardas === '' ||
            req.body.pavarde === '' ||
            req.body.tel_nr === '' ||
            req.body.email === '' ||
            req.body.adresas === ''
        ) {
            res.render('edit-user', { message: 'Yra tusciu laukeiu', status: 'red' })
            return

        } else {

            if (existsSync(database)) {

                //Jeigu failas yra

                readFile(database, 'utf8', (err, data) => {
                    let dataArray = JSON.parse(data)

                    const jsonId = dataArray.findIndex((el) => el.id == id)

                    if (jsonId === -1) {
                        res.send('Nepavyko rasti tokio elementu')
                        return
                    }

                    req.body.id = id

                    dataArray[jsonId] = req.body


                    writeFile(database, JSON.stringify(dataArray), 'utf8', (err) => {
                        if (!err) {
                            res.redirect('/contacts')
                            return
                        } else {
                            console.log(err)
                        }
                    })

                })

            } else {

                //Jeigu failo nera

                let masyvas = []

                req.body.id = 0

                masyvas.push(req.body)

                writeFile(database, JSON.stringify(masyvas), 'utf8', (err) => {
                    if (!err) {
                        res.render('edit-user', { message: 'Failas sekmingai isaugotas', status: 'green' })
                    } else {
                        console.log(err)
                    }
                })

            }

        }

    }
})



app.delete('/:id', (req, res) => {
    let id = req.params.id
    readFile(database, 'utf-8', (err, data) => {
        if (err) {
            res.send('Nepavyko perskaityti failo')
            return
        }
        //Issifruojame JSON info atgal i Javascrip faila
        const json = JSON.parse(data)

        const jsonId = json.findIndex((el) => el.id == id)


        if (jsonId === -1) {
            res.send('Nepavyko rasti tokio elementu')
            return
        }
        json.splice(jsonId, 1)

        let jsonString = JSON.stringify(json)
        writeFile(database, jsonString, 'utf8', (err) => {
            if (err) {
                res.send('Nepavyko irasyti tokio failo')
            } else {
                res.send('Failas sekmingai isaugotas')
            }
        })

    })
})

app.get('/contacts', function (req, res) {
    readFile(database, 'utf8', (err, data) => {
        let dataArray = JSON.parse(data)
        res.render('contacts', { dataArray })
        return
    })

})

app.listen(3000)