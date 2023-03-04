$(document).ready(function () {
  function weatherFunction(searchTerm) {
    var url_weather = `https://api.openweathermap.org/data/2.5/forecast?lat={}&lon={}&appid=e89986efe36f78ede4b3bc4f08baa878`;
    var url_coordinate = `http://api.openweathermap.org/geo/1.0/direct?q=${searchTerm}&appid=14432a58a22e9ecec648a23a3b345761`;

    fetch(url_coordinate)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0].lon);
        console.log(data[0].lat);
        // call fetch on the other api
        // retrieve the needed data (wind, weather, temp, huimidty, image)

      });
  }

  // //search button feature
  $("#search-button").on("click", function () {
    //get value in input search-value.
    var searchTerm = $("#search-value").val();
    //empty input field.
    $("#search-value").val("");
    alert(searchTerm);
    weatherFunction(searchTerm);
    // weatherForecast(searchTerm);
  });
});



// url:"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={e89986efe36f78ede4b3bc4f08baa878}";
