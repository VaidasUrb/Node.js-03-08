import express, { query } from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { engine } from 'express-handlebars'
import { faker } from '@faker-js/faker'
import session from 'express-session'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views')

app.use(session({
    secret: 'authentification',
    resave: false,
    saveUninitialized: true
}))

//Routeris
// app.get('/', function (req, res) {   //req - gaunama uzklausa
//     //res - tai ka graziname atgal
//     if (Object.keys(req.query).length > 0) {
//         console.log(req.query) //atvaizduoja vartptpjo suvestus duomenis
//         res.render('person', {
//             pirmas: req.query.vardas,
//             antras: req.query.pavarde,
//             trecias: req.query.adresas,
//             ketvirtas: req.query.telefonas,
//             penktas: req.query.email

//         })
//         return
//     }



//     //HTM failo perdavimas
//     res.sendFile(__dirname + '/templates/index.html') //nurodome grazinama turini atgal i narsykle

//     //Handlebars turinio perdavimas
//     //res.render('login', { x })
// })


//------------prisingiam ir patenkam i admin------------

app.get('/login', function (req, res) {
    //tikriname ar suvesti teisingi duomenys
    let message = ''
    if (Object.keys(req.query).length > 0) {
        if (req.query.login != '' &&
            req.query.password != '' &&
            req.query.login === 'admin@inv.lt' &&
            req.query.password === '1234'
        ) {

            req.session.loggedIn = true
            req.session.userName = 'admin@inv.lt'
            res.redirect('http://localhost:3000/people')
            return
        } else {
            message = 'Neteisingi prisijungimo duomenys'
        }
    }
    res.render('login', { message }) //nurodome grazinama turini atgal i narsykle
})

app.get('/administratorius', function (req, res) {
    res.sendFile(__dirname + '/templates/admin.html') //nurodome grazinama turini atgal i narsykle
})

app.get('/people', function (req, res) {
    //panaikiname sesijos reiksmes individuoaliai
    //req.session.loggedIn = null
    //req.session.userName = null

    //panaikiname visa sesija
    //req.sesssion.destroy()
    if (req.session.loggedIn) {
        let zmones = []
        for (let i = 0; i < 100; i++) {
            zmones.push({
                zmogusName: faker.name.firstName(),
                zmogusLastName: faker.name.lastName(),
                adress: faker.address.city(),
                phone: faker.phone.phoneNumber(),
                email: faker.internet.email()
            })


        }
        res.render('people', { zmones, user: req.session.userName })
    } else {
        res.redirect('/login')
    }
})


//---------------------------------------------------------------------


// app.get('/:pirmas', function (req, res) {
//     let pirmas = req.params.pirmas
//     res.send('<h1>' + pirmas + '</h1>')
// })


// app.get('/:pirmas/:antras/:trecias/:ketvirtas/:penktas', function (req, res) {
//     let pirmas = req.params.pirmas
//     let antras = req.params.antras
//     let trecias = req.params.trecias
//     let ketvirtas = req.params.ketvirtas
//     let penktas = req.params.penktas
//     res.render('person', { pirmas, antras, trecias, ketvirtas, penktas })
// })

// app.get('/kontaktai', function (req, res) {
//     //req - gaunama uzklausa
//     //res - tai ka graziname atgal
//     res.send('<h1>Kontaktai</h1>') //nurodome grazinama turini atgal i narsykle
// })

app.listen(3000) //nurodomas portas ir inecijuojamas serveris