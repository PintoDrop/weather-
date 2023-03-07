var startDt = dayjs().add(1, "day").startOf("day").unix();
var endDt = dayjs().add(6, "day").startOf("day").unix();

$(document).ready(function () {
  var today = $("#today");
  var fiveDaySection = $("#fiveDay");

  function weatherFunction(searchTerm) {
    // https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

    // Current weather:
    var url_weather1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=e89986efe36f78ede4b3bc4f08baa878`;

    var url_coordinate = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=e89986efe36f78ede4b3bc4f08baa878`;

    // 5 day by city URL
    var url_weather = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=imperial&current&appid=e89986efe36f78ede4b3bc4f08baa878`;

    fetch(url_coordinate)
      .then((res) => res.json())
      .then((data) => {
        // let lat = res.data.city.coord.lat
        // let lon = res.data.city.coord.lon
        console.log(data[0].lon);
        console.log(data[0].lat);

        fetch(url_weather1)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            renderToday(data);
          });

        // call fetch on the other api (5 day forecast)
        fetch(url_weather)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            // renderToday(data);
            fiveDay(data);
            // for (var i=0; i< data.list.length; i+=5) {
            //   var currentDay = data.list[i]
            // fiveDay(currentDay)
            // }
          });
      });
  }

  $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    console.log(searchTerm);
    $("#search-value").val("");
    // alert(searchTerm);
    weatherFunction(searchTerm);
    // weatherForecast(searchTerm);
  });

  function renderToday(dataObject) {
    var dateEl = $("<p>");
    var tempEl = $("<p>");
    var windEl = $("<p>");
    var weatherEl = $("<p>");
    var humidEl = $("<p>");
    var iconEl = $("<img>");
    var city = $("<h1>");
    var iconUrl = `https://openweathermap.org/img/w/${dataObject.weather[0].icon}.png`;
    iconEl.attr("src", iconUrl);

    city.text(dataObject.name);

    tempEl.text("Temperature: " + dataObject.main.temp + " Fahrenheit");
    windEl.text("Wind Speed: " + dataObject.wind.speed + " MPH");
    weatherEl.text("Weather: " + dataObject.weather[0].description);
    humidEl.text("Humidity: " + dataObject.main.humidity + " %");
    dateEl.text("Date: " + dayjs().format("MM/DD/YYYY"));

    // iconEl.text(dataObject.list[0].weather.icon);

    // order of appearance
    today.append(city, dateEl, iconEl, tempEl, windEl, weatherEl, humidEl);
  }

  function fiveDay(dataObject) {
    var dateEl = $("<p>");
    var city = $("<h1>");
    var date = $("<h2>");
    var tempEl = $("<p>");
    var windEl = $("<p>");
    var weatherEl = $("<p>");
    var humidEl = $("<p>");
    var iconEl = $("<img>");

    var startDt = dayjs().add(1, "day").startOf("day").unix();
    var endDt = dayjs().add(6, "day").startOf("day").unix();
    // change index'
    var iconUrl = `https://openweathermap.org/img/w/${dataObject.list[1].weather[0].icon}.png`;
    iconEl.attr("src", iconUrl);

    // tempEl.text(dataObject.list[0].main.temp)
    tempEl.text("Temperature: " + dataObject.list[6].main.temp + " Fahrenheit");
    windEl.text("Wind Speed: " + dataObject.list[6].wind.speed + " MPH");
    weatherEl.text("Weather: " + dataObject.list[6].weather[0].description);
    humidEl.text("Humidity: " + dataObject.list[6].main.humidity + " %");
    dateEl.text("Date: " + dataObject.list[6].dt_txt + "pm");

    for (var i = 0; i < dataObject.length; i++) {
      if (dataObject[i].dt >= startDt && dataObject[i].dt < endDt) {
        if (dataObject[i].dt_txt.slice(11, 13) == "12") {
          fiveDay(dataObject[i]);
        }
      }
    }

    city.text(dataObject.city.name);
    fiveDaySection.append(
      city,
      dateEl,
      iconEl,
      tempEl,
      windEl,
      weatherEl,
      humidEl
    );
    // fiveDay();
  }
});

// img/icon url:https://openweathermap.org/img/w/${forecast.weather[0].icon}.png

// document.getElementById('search-button').addEventListener("click", event => {
//   let searchValue = document.getElementById('searchValue').value
//   console.log(searchTerm)
// });

// $("#9 .description").text(localStorage.getItem("9"));

// url:"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={e89986efe36f78ede4b3bc4f08baa878}";
