const SERVER_URL = "http://localhost:3001/"

class WeatherApp {
    constructor() {
        this.cityData = []
    }
    async getDataFromDB() {
        return $.ajax({
            method: "GET",
            url: `${SERVER_URL}cities`,
            success: (response) => {
                this.cityData = response
            },
        })
    }
    async getCityData(city) {
        return $.ajax({
            method: "GET",
            url: `${SERVER_URL}city/${city}`,
            success: (response) => {
                this.cityData.push({...response,isTemp:true})
            },
        })
    }
    saveCity(city) {
        $.ajax({
            method: "POST",
            url: `${SERVER_URL}city`,
            data: { city: city },
            success: (response) => {
                console.log(response)
            },
        })
    }
    async removeCity(city) {
        return $.ajax({
            method: "DELETE",
            url: `${SERVER_URL}city/${city}`,
            data: { city: city },
            success: (response) => {
                this.DeletedCityInCityData(city)
            },
        })
    }
    DeletedCityInCityData(city) {
        for (var i in this.cityData) {
            if (this.cityData[i].name == city) {
                this.cityData.splice(i, 1);
            }
        }
    }
    ToggleCityInCityData(city) {
        for (var i in this.cityData) {
            if (this.cityData[i].name == city) {
                this.cityData.IsTemp = false;
            }
        }
    }
}