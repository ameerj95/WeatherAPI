const express = require('express')
const router = express.Router()
const request = require('request')
const City = require('../../models/City')
const API_KEY = "3318436ae3aeaefe61ba3439c20aa106"
const WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather"

//-----------------------------------------------------------------------
//this ap returns city data
router.get('/city/:cityName', function (req, res) {
    request(`${WEATHER_API_URL}?q=${req.params.cityName}&APPID=${API_KEY}&units=metric`, function (error, response, body) {
        var data = JSON.parse(body)
        let newCity = new City({ name:data.name, temperature:data.main.temp, condition:data.weather[0].main, conditionPic:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`})
        res.send(newCity)
    });
})
//-----------------------------------------------------------------------
//return all cities saved in DB
router.get('/cities', function (req, res) {
    City.find({}).exec(function (err, arr) {
        res.send(arr)
    })
})

//-----------------------------------------------------------------------
//saves a city in DB
router.post('/city', function (req, res) {
    var { city } = req.body
    request(`${WEATHER_API_URL}?q=${city}&APPID=${API_KEY}&units=metric`, function (error, response, body) {
        var data = JSON.parse(body)
        let newCity = new City({ name:data.name, temperature:data.main.temp, condition:data.weather[0].main, conditionPic:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`})
        newCity.save()
        res.send(newCity)
    });
})
//-----------------------------------------------------------------------
//deletes a city from DB
router.delete('/city/:cityName', function (req, res) {
    console.log("in delete")
    console.log(req.params.cityName)
    City.findOneAndDelete({ name: req.params.cityName }).exec(function (err, arr) {
        res.send("deleted")
    })
})
//-----------------------------------------------------------------------
module.exports = router