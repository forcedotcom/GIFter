
({

  afterScriptsLoaded: function (component, event, helper) {
    console.log('afterScriptsLoaded called successfully');
  },

  doInit: function (component, event, helper) {
    console.log('doInit called successfully');
  },

  keyCheck: function (component, event, helper) {
    if (event.which == 13) {
      console.log('keyCheck detected enter')

      var searchTerms = component.get("v.searchTerms");
      helper.search(searchTerms, function (results) {
        console.log('keyCheck enter returned from helper')
        _GIPHY.setResults(results);
        component.set("v.results", results.data);
      });

    }
  },

  search: function (component, event, helper) {

    console.log('search called successfully');

    var searchTerms = component.get("v.searchTerms");
    helper.search(searchTerms, function (results) {
      console.log('search returned from helper')
      _GIPHY.setResults(results);
      component.set("v.results", results.data);
    });

  },

  gifSelected: function (component, event, helper) {

    var property = component.get("v.property");

    component.set("v.showModal", true);


    console.log('gifSelected called successfully');

    var id = event.target.dataset.index;
    console.log(id);

    var results = _GIPHY.getResults();

    console.log("results");
    console.log(results);


    var selectedGif=results.data.find(item => item.id === id)
    console.log(selectedGif);

    var width = selectedGif.images.original.width;
    var height = selectedGif.images.original.height;

    console.log("width: " + width);
    console.log("height: " + height);
    
    component.set("v.selectedGifWidth", width);
    component.set("v.selectedGifHeight", height);
    component.set("v.selectedGif", "https://media0.giphy.com/media/" + id + "/giphy.mp4");

  },

  closeModal: function (component) {
    component.set("v.showModal", false);
  },

})