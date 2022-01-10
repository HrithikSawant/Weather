let loc = document.getElementById("location");
let tempVal = document.getElementById("temp-value");
let climate = document.getElementById("climate");

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");


searchButton.addEventListener('click',(e)=>{
    e.preventDefault();
    getWeather(searchInput.value);
    searchInput.value='';
})

const getWeather = async (city)=>{
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={Your API KEY}`);
        const weatherData = await response.json();
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{icon,main}=weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempVal.textContent = Math.round(feels_like-273);
        document.getElementById('temp-icon').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
    }catch(error){
        alert("Enter Valid City Name");
    }

}

window.addEventListener("load",()=>{
let long;
let lat;


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position)=>{
        long= position.coords.longitude;
        lat = position.coords.latitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid={Your API KEY}`

        fetch(api).then((response)=>{
            return response.json();
        })
        
        .then(data =>{
            const{name} = data;
            const{feels_like} = data.main;
            const{icon,main} = data.weather[0];

            loc.textContent = name;
            climate.textContent = main;
            tempVal.textContent = Math.round(feels_like-273);
            document.getElementById('temp-icon').src = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
        })

    })
}
})
