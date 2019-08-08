const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoData = require('./utils/geo')
const forcast = require('./utils/forcast')

const app = express()
const pathDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs' )
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(pathDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Divya'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Divya'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'We are here to help you',
        name: 'Divya'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send( {
            error: 'Please provide address'
        })
    }
     geoData( req.query.address , (error, { latitude, longitude, location } = {} )  => {
         if(error) {
             return res.send({ error })
         }
         forcast(latitude, longitude, (error, forcastData) => {
             if(error) {
                 return res.send({ error })
             }
             res.send({
                 forecast: forcastData,
                 location,
                 address: req.query.address
             })


         })
         
    })
    
})

app.get('/weather/*', (req, res) => {
    res.render('404', {
        errorMessage: 'Weather not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: 'Page not found'
    });
})
app.listen(3000, () => {
    console.log('Server is listening at 3000!');
})