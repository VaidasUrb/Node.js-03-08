import express, { query } from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))


//Routeris
app.get('/', function (req, res) {
    console.log(req.query)
    if (Object.keys(req.query).length > 0) {
        console.log(req.query) //atvaizduoja vartptpjo suvestus duomenis
        res.redirect('http://localhost:3000')
        return
    }
    //req - gaunama uzklausa
    //res - tai ka graziname atgal
    res.sendFile(__dirname + '/templates/index.html') //nurodome grazinama turini atgal i narsykle
})


app.get('/login', function (req, res) {
    if (Object.keys(req.query).length > 0) {
        if (req.query.login != '' &&
            req.query.password != '' &&
            req.query.login === 'admin@inv.lt' &&
            req.query.password === '1234'
        ) {
            res.redirect('http://localhost:3000/administratorius')
            return
        } else {
            res.redirect('http://localhost:3000/login')
            return
        }
    }
    res.sendFile(__dirname + '/templates/login.html') //nurodome grazinama turini atgal i narsykle
})

app.get('/administratorius', function (req, res) {
    res.sendFile(__dirname + '/templates/admin.html') //nurodome grazinama turini atgal i narsykle
})

app.get('/:pirmas', function (req, res) {
    let pirmas = req.params.pirmas
    res.send('<h1>' + pirmas + '</h1>')
})


app.get('/:pirmas/:antras/:trecias/:ketvirtas/:penktas', function (req, res) {
    let pirmas = req.params.pirmas
    let antras = req.params.antras
    let trecias = req.params.trecias
    let ketvirtas = req.params.ketvirtas
    let penktas = req.params.penktas
    res.send(`<h1>${pirmas} ${antras} ${trecias} ${ketvirtas} ${penktas}</h1>`)
})

app.get('/kontaktai', function (req, res) {
    //req - gaunama uzklausa
    //res - tai ka graziname atgal
    res.send('<h1>Kontaktai</h1>') //nurodome grazinama turini atgal i narsykle
})

app.listen(3000) //nurodomas portas ir inecijuojamas serveris