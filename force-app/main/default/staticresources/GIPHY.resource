window._GIPHY = (function() {
    var apiKey = "YOUR_GIPHY_API_KEY";

    return { //public API
        getApiKey: function() {
            return apiKey;
        }
    };
}());