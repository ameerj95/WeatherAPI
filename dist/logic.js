const SERVER_URL = "http://localhost:3001/"
//-----------------------------------------------------------------------
class WeatherApp {
    //-----------------------------------------------------------------------
    constructor() {
        this.cityData = []
    }
    //-----------------------------------------------------------------------
    //gets data from server
    async getDataFromDB() {
        return $.ajax({
            method: "GET",
            url: `${SERVER_URL}cities`,
            success: (response) => {
                this.cityData = response
            },
        })
    }
    //-----------------------------------------------------------------------
    //gets city's data from server
    async getCityData(city) {
        return $.ajax({
            method: "GET",
            url: `${SERVER_URL}city/${city}`,
            success: (response) => {
                this.cityData.push({...response,isTemp:true})
            },
        })
    }
    //-----------------------------------------------------------------------
    //saves city in our DB 
    //*NOTE: this could have been done differently with async where we can
    // save it and then re-ask from data in DB , however in this scenario
    // we would like to save time and render it immeiditly manually (change button)
    // rather than re-rendering the view.
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
    //-----------------------------------------------------------------------
    //removes city from our DB
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
    //-----------------------------------------------------------------------
    //delete city from temp array in our client
    DeletedCityInCityData(city) {
        for (var i in this.cityData) {
            if (this.cityData[i].name == city) {
                this.cityData.splice(i, 1);
            }
        }
    }
    //-----------------------------------------------------------------------
    //toggle our cities "awarness" of it being in DB or not
    ToggleCityInCityData(city) {
        for (var i in this.cityData) {
            if (this.cityData[i].name == city) {
                this.cityData.IsTemp = false;
            }
        }
    }
}