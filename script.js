var searchFormEl = document.querySelector("#searchbtn");
var weathergrab = document.getElementById("search-bar");

//
function getCity() {
	var input = weathergrab.value;

	weather.fetchWeather(input);
}

let weather = {
	ApiKey: "8b006008ab7f10f23fda68de1ffbe1e2",
	fetchWeather: function (city) {
		console.log(weathergrab.value);
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weather.ApiKey}`
		)
			.then(function (response) {
				return response.json();
			})
			.then(function (data) {
				displayWeather(data);
				getForcast(data);
			});
	},
};
// weather.fetchWeather();
searchbtn.addEventListener("click", getCity);

function displayWeather(data) {
	var city = data.name;
	let  icon  = data.weather[0];
	let  temp = data.main.temp;
	let humidity = data.main.humidity;
	let  speed  = data.wind.speed;
	console.log(city, icon, temp, humidity, speed);
	var currentday = document.getElementById("daycurrent");
	$('#tempcurrent').innerText =`temp: ${temp}`
	console.log(data)
	
	
}

// gets forcast from data
function getForcast(data) {
	var forcastArray = [];
	let lon = data.coord.lon;
	let lat = data.coord.lat;
	const Url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weather.ApiKey}`;
	fetch(Url)
		.then(function (response) {
			return response.json();
		})
		// prints forcast data
		.then(function (data) {
			for (let i = 3; i < data.list.length; i += 8) {
				forcastArray.push(data.list[i]);
			}
			printForcast(forcastArray);
		});
}

//prints to the page
function printForcast(forcast) {
	console.log(forcast);
	for (i = 0; i < forcast.length; i++) {
		var day = document.querySelector(`#day${i + 1}`);
		day.textContent =`date: ${forcast[i].dt_txt}`;

		var temp = document.querySelector(`#temp${i + 1}`);
		temp.textContent =  `temp: ${forcast[i].main.temp}`;

		var description = document.querySelector(`#description${i + 1}`);
		description.textContent = `description: ${forcast[i].weather[0].description}`;
		
		var humidity = document.querySelector(`#humidity${i + 1}`);
		humidity.textContent = `humidity: ${forcast[i].main.humidity}`;

		var wind = document.querySelector(`#wind${i + 1}`);
		wind.textContent = ` wind speed: ${Math.round(forcast[i].wind.speed)}`;

		var icon = document.querySelector(`#icon${i + 1}`)
		var icon = " http://openweathermap.org/img/wn/04n@2x.png";
		$(".icon").attr(" http://openweathermap.org/img/wn/04n@2x.png", icon);
		console.log(icon)
	
	}
}









