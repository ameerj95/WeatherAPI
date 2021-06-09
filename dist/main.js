var weatherApp = new WeatherApp()
var renderer = new Renderer()
var searchBtn = $("#citySearchBtn")
var cityInput = $("#cityInput")
//-----------------------------------------------------------------------
//on loadpage function
const loadPage = async function () {
    await weatherApp.getDataFromDB()
    renderer.renderData(weatherApp.cityData)
}
//-----------------------------------------------------------------------
//searched function
const handleSearch = async function () {
    weatherApp.getCityData(cityInput.val()).then((value) => {
        renderer.renderData(weatherApp.cityData)
    });

}
//-----------------------------------------------------------------------
// event listeners
//-----------------------------------------------------------------------
// load page
$(document).ready(async function () {
    console.log("hi")
    await loadPage();
    console.log("hi")
});
//-----------------------------------------------------------------------
//search button
searchBtn.on("click", handleSearch)
//-----------------------------------------------------------------------
//button of add/delete
$("body").on("click", ".isTemp", async function () {
    if ($(this).text() == "-") {
        //two ways around it. we make removecity async or we manually remove it
        weatherApp.removeCity($(this).siblings(".cityName").text()).then((value) => {
            renderer.renderData(weatherApp.cityData)
        });
    }
    else {
        weatherApp.saveCity($(this).siblings(".cityName").text())
        $(this).text("-")
    }
})

