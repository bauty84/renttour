fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Bariloche/today?unitGroup=metric&elements=datetime%2Ctemp%2Csnow%2Ccloudcover&include=current&key=GF82MTB8ZLLGEXBCCXMDP6WHQ&contentType=json", {
    "method": "GET",
    "headers": {},
}).then(response => {
    if (!response.ok) {
        throw response;
    }

    return response.json();

}).then(response => {
    processWeatherData(response);

}).catch((errorResponse) => {
    if (errorResponse.text) {
        errorResponse.text().then(errorMessage => {
            console.log("🚀 ~ file: weathapi.js ~ line 20 ~ errorResponse.text ~ errorMessage", errorMessage)
        })
    }
});

function processWeatherData(response) {
    const temp = document.querySelector(".temperatura");
    let days = response.days;

    for (var i = 0; i < days.length; i++) {
        const text = `${days[i].temp}c`; 
        temp.innerHTML += text;
    }
}