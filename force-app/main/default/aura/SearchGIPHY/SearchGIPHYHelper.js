({
  search: function (searchTerms, data) {

    var apiKey = _GIPHY.getApiKey();

    $.getJSON("https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerms + "&limit=8&offset=0&rating=G&lang=en", function (results) {

      data(results);

    });
  }
})