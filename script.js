const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherBody = document.getElementById('weatherBody');
const notFound = document.getElementById('notFound');
const bgVideo = document.getElementById('bgVideo');
const videoSource = document.getElementById('videoSource');

const API_KEY = "a5db1262b81a1526d103cda3c92d4997";

async function checkWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === `404`) {
            notFound.style.display = "block";
            weatherBody.style.display = "none";
            return;
        }

        notFound.style.display = "none";
        weatherBody.style.display = "flex";

        document.getElementById('temperature').innerHTML = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerHTML = data.weather[0].description;
        document.getElementById('humidity').innerHTML = `${data.main.humidity}%`;
        document.getElementById('windSpeed').innerHTML = `${data.wind.speed} Km/H`;
        
        const iconCode = data.weather[0].icon;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        updateBackground(data.weather[0].main);

    } catch (error) {
        console.error("Error fetching weather:", error);
    }
}

function updateBackground(weather) {
    let fileUrl = "";
    let isVideo = true; // Set to false if you are using images/GIFs instead of MP4s

    switch (weather) {
        case 'Clear':
            // PASTE Sunny/Clear path below (e.g., "images/sunny.mp4")
            fileUrl = "videos/sunnyvideo.mp4"; 
            break;
        case 'Clouds':
            // PASTE Cloudy path below (e.g., "images/clouds.mp4")
            fileUrl = "videos/cloudy.mp4";
            break;
        case 'Rain':
        case 'Drizzle':
            // PASTE Rain path below
            fileUrl = "78-135733055_medium.mp4";
            break;
        case 'Snow':
            // PASTE Snow path below
            fileUrl = "videos/6985327-uhd_2160_3840_24fps.mp4";
            break;
        case 'Thunderstorm':
            // PASTE Thunder path below
            fileUrl = "videos/6985327-uhd_2160_3840_24fps.mp4";
            break;
        default:
            // PASTE Default path below
            fileUrl = "14237230_3840_2160_25fps.mp4";
            break;
    }

    if (isVideo) {
        videoSource.src = fileUrl;
        bgVideo.load(); // Reloads the video with the new source
        bgVideo.style.display = "block";
    } else {
        bgVideo.style.display = "none";
        document.body.style.backgroundImage = `url('${fileUrl}')`;
    }
}

searchBtn.addEventListener('click', () => {
    if(cityInput.value.trim() !== "") checkWeather(cityInput.value);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkWeather(cityInput.value);
});