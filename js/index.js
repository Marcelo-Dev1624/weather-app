const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');


search.addEventListener('click', () =>{

    const APIKey = 'c136d66bf1ee57ed0cffcdaa7981fa78'
    const city = document.querySelector('.search-box input').value;

    if(city === '')
    return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then
    (response => response.json()).then
        (json => {

        if(json.cod === '404'){
            container.style.height = '500px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            return;
        }

        error404.style.display = 'none';
        error404.classList.remove('fadeIn');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const desc = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        switch(json.weather[0].main){
            case 'Clear':
                image.src = 'imgs/clear.png';
                break;

            case 'Clouds':
                image.src = 'imgs/cloud.png';
                break;

            case 'Rain':
                image.src = 'imgs/rain.png';
                break;
            
            case 'Snow':
                image.src = 'imgs/snow.png';
                break;
            
            case 'Thunderstorm':
                image.src = 'imgs/storm.png';
                break;

            case 'Mist':
                image.src = 'imgs/mist.png';
        
            default:
                image.src = '';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;

        desc.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed} Km/h`;

        weatherBox.style.display ='';
        weatherDetails.style.display = '';
        weatherBox.classList.add('fadeIn');
        weatherDetails.classList.add('fadeIn');
        container.style.height = '600px';
    });
});