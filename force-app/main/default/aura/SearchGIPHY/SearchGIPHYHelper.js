({
  search: function (searchTerms, data) {

    console.log('search called successfully');
    console.log(searchTerms);

    var apiKey = _GIPHY.getApiKey();
    console.log(apiKey);

    $.getJSON("https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerms + "&limit=8&offset=0&rating=G&lang=en", function (results) {

      console.log('called api');
      console.log(results);
      console.log(results.data.length);

      data(results);

    });
  }
})