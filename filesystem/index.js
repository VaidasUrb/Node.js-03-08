import { writeFile, mkdir } from 'fs'



//Direktorijos sukurima
mkdir('./failai', function (err) {
    if (!err) {
        console.log('Direktorija sukurta')
    } else {
        console.log('Ivyko klaida, arba tokia direktorija jau yra sukurta')
    }
})


//Failo sukurimas
writeFile('./failai/hello.txt', 'Labas pasauli', 'utf8', function (err) {
    if (!err) {
        console.log('Failas geras')
    } else {
        console.log('Klaida')
    }
})
