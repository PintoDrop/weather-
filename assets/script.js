$(document).ready(function () {
  var today = $("#today");
  var fiveDaySection = $("#fiveDay");
  var searchCity = $("#search-city");

  function weatherFunction(searchTerm) {

    // Current weather:
    var url_weather1 = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&appid=e89986efe36f78ede4b3bc4f08baa878`;

    var url_coordinate = `https://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=e89986efe36f78ede4b3bc4f08baa878`;

    // 5 day by city URL
    var url_weather = `https://api.openweathermap.org/data/2.5/forecast?q=${searchTerm}&units=imperial&current&appid=e89986efe36f78ede4b3bc4f08baa878`;

    fetch(url_coordinate)
      .then((res) => res.json())
      .then((data) => {
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
          });
      });
  }

  $("#search-button").on("click", function () {
    var searchTerm = $("#search-value").val();
    console.log(searchTerm);
    $("#search-value").val("");
    weatherFunction(searchTerm);
  });

  function renderToday(dataObject) {
    today.empty();
    var dateEl = $("<h3>");
    var tempEl = $("<li>");
    var windEl = $("<li>");
    var weatherEl = $("<li>");
    var humidEl = $("<li>");
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

    // searchCity
    var newButton = $("<button>");
    newButton.text(`${dataObject.name}`);

    newButton.on("click", () => {
      weatherFunction(dataObject.name);
    });

    searchCity.append(newButton);

    // order of appearance
    today.append(city, dateEl, iconEl, tempEl, windEl, weatherEl, humidEl);
  }

  function fiveDay(dataObject) {
    fiveDaySection.empty();

    var startDate = dayjs().add(1, "day").startOf("day").unix();
    var endDate = dayjs().add(6, "day").startOf("day").unix();
    console.log(startDate, endDate);
    // change index'

    for (var i = 0; i < dataObject.list.length; i++) {
      if (
        dataObject.list[i].dt >= startDate &&
        dataObject.list[i].dt < endDate
      ) {
        if (dataObject.list[i].dt_txt.slice(11, 13) == "12") {
          console.log(dataObject.list[i]);

          var tempEl = $("<li>");
          var windEl = $("<li>");
          var weatherEl = $("<li>");
          var humidEl = $("<li>");
          var iconEl = $("<img>");
          var dateEl = $("<h3>");
          var cityEl = $("<h1>");

          var iconUrl = `https://openweathermap.org/img/w/${dataObject.list[i].weather[0].icon}.png`;
          iconEl.attr("src", iconUrl);

          tempEl.text(
            "Temperature: " + dataObject.list[i].main.temp + " Fahrenheit"
          );
          windEl.text("Wind Speed: " + dataObject.list[i].wind.speed + " MPH");
          weatherEl.text(
            "Weather: " + dataObject.list[i].weather[0].description
          );
          humidEl.text("Humidity: " + dataObject.list[i].main.humidity + " %");
          dateEl.text("Date: " + dataObject.list[i].dt_txt + "pm");
          console.log("hey");

          var divEl = $("<div>");
          divEl.addClass("each-day");

          divEl.append(cityEl);
          divEl.append(dateEl);
          divEl.append(iconEl);
          divEl.append(tempEl);
          divEl.append(windEl);
          divEl.append(weatherEl);
          divEl.append(humidEl);

          fiveDaySection.append(divEl);

          
        }
      }
    }

  }
});
