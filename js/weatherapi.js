fetch("https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Mendoza/today?unitGroup=metric&elements=datetime%2Ctemp%2Csnow%2Ccloudcover&include=current&key=GF82MTB8ZLLGEXBCCXMDP6WHQ&contentType=json", {
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
    const weatherIcon = document.querySelector(".weather-icon");
    let days = response.days;

    for (var i = 0; i < days.length; i++) {
        if (days[i].cloudcover > 75.0) {
            weatherIcon.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
        } else if (days[i].cloudcover > 25.0 && days[i].cloudcover < 75.0) {
            weatherIcon.innerHTML = `<span class="fa-stack">
                                        <i class="fa-solid fa-sun fa-stack-1x"></i>
                                        <i class="fa-solid fa-cloud fa-stack-2x"></i>
                                    </span>`;
        }
        else {
            weatherIcon.innerHTML = `<i class="fa-solid fa-sun"></i>`;
        }
        const text = `${days[i].temp}c`; 
        temp.innerHTML += text;
    }
}