
window.addEventListener("load", () => {
    let long;
    let lat;
    let number = document.querySelector('.number');
    let info = document.querySelector('.summary')
    let timezone = document.querySelector('#city');
    let country = document.querySelector('#country');
    let background = document.querySelector('body');
    let img = document.querySelector('#image');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;  
    	
        let api_key = "f1ffe9c432fdffd0acdbfd213ced70b8";
        let units = "imperial";
        let proxy = "https://cors-anywhere.herokuapp.com/";
        let api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api_key}&units=${units}`

        fetch(api)
            .then(response => {
	            return response.json();
            })
            .then(data => {
                console.log(data);
                let temperature = data.main.temp;
                let summary = data.weather[0].main;
                let city = data.name;
                let origin = data.sys.country;
                let icon = data.weather[0].icon;

                number.textContent = temperature;
                info.textContent = summary;
                timezone.textContent = city;
                country.textContent = origin;
                img.src= `https://openweathermap.org/img/wn/${icon}@2x.png`;
                
                if (temperature >= "85") {
                        background.classList.add("warm_gradient");
                }

                else if (temperature < "85" && temperature >= "68" ) {
                    background.classList.add("nice_gradient");
                }
                else {
                    background.classList.add("cold_gradient");
                };
                
            })
            .catch(err => {
	        console.error(err);
            });

        })
    }
})