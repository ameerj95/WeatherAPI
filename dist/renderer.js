class Renderer{
    //-----------------------------------------------------------------------
    constructor() {
        this.source = $('#cityweather-template').html();
        this.template = Handlebars.compile(this.source);
        this.citiesElement = $("#cities")
    }
    //-----------------------------------------------------------------------
    renderData(cities) {
        console.log(cities)
        const newHTML = this.template({ cities:cities });
        this.citiesElement.empty().append(newHTML);
    }
}