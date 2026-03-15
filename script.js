const apiKey = "01c9e13fcbbe7011f830ac0c994d3cc6";

function log(message) {
    const logs = document.getElementById("logs");
    const p = document.createElement("p");
    p.textContent = message;
    logs.appendChild(p);
}

async function getWeather() {

    const city = document.getElementById("cityInput").value;

    if (!city) return;

    log("Sync Start");
    log("[ASYNC] Start fetching");

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        log("Promise.then (Microtask)");

        const data = await response.json();

        log("[ASYNC] Data received");

        document.getElementById("city").textContent = data.name;
        document.getElementById("temp").textContent = data.main.temp + " °C";
        document.getElementById("weather").textContent = data.weather[0].main;
        document.getElementById("humidity").textContent = data.main.humidity + "%";
        document.getElementById("wind").textContent = data.wind.speed + " m/s";

        addToHistory(city);

    } catch (error) {
        alert("City not found!");
    }

    log("Sync End");
}

function addToHistory(city) {

    const history = document.getElementById("history");

    const span = document.createElement("span");
    span.textContent = city;

    span.onclick = () => {
        document.getElementById("cityInput").value = city;
        getWeather();
    };

    history.appendChild(span);
}