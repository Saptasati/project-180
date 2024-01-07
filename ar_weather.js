var coordinates = {}

$(document).ready( function() {
    getCoordinates();
    get_weather();
})

function getCoordinates() {
    var searchParameter = new URLSearchParams(window.location.search)
    if(searchParameter.has("source") && searchParameter.has("destination")) {
        var source = searchParameter.get("source")
        var destination = searchParameter.get("destination")

        coordinates.source_lat = source.split(";")[0]
        coordinates.source_lng = source.split(";")[1]
        
        coordinates.destination_lat = destination.split(";")[0]
        coordinates.destination_lng = destination.split(";")[1]
    } else{
        alert("Coordinates not selected")
        window.history.back()
    }
}

function get_weather() {
    $.ajax({
        url:`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.destination_lat}&lon=${coordinates.destination_lon}&appid=95b76dd996ce68e67808d5f515d1feef`,
        type: "get",
        success: function(response) {
            let name = response.name
            let weather = response.weather[0].main
            $("#scene_container").append(
                `
                <a-entity gps-entity-place="latitude: ${steps[i].maneuver.location[1]}; longitude: ${steps[i].maneuver.location[0]};"
                    <a-entity>
                        <a-text height="50" value="Weather forcast is ${weather} at ${name}"></a-text>
                    </a-entity>
                </a-entity>
            `
            )
        }

    })
}