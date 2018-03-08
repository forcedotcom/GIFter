({

  afterScriptsLoaded: function (component, event, helper) {
    console.log('afterScriptsLoaded called successfully');
  },

  doInit: function (component, event, helper) {
    console.log('doInit called successfully');
  },

  keyCheck: function (component, event, helper) {

    if (event.which == 13) {

      var searchTerms = component.get("v.searchTerms");
      helper.search(searchTerms, function (results) {
        _GIPHY.setResults(results);
        component.set("v.results", results.data);
      });

    }
  },

  search: function (component, event, helper) {

    var searchTerms = component.get("v.searchTerms");
    helper.search(searchTerms, function (results) {
      _GIPHY.setResults(results);
      component.set("v.results", results.data);
    });

  },

  gifSelected: function (component, event, helper) {

    var property = component.get("v.property");

    component.set("v.showModal", true);

    var id = event.target.dataset.index;
    var results = _GIPHY.getResults();
    var selectedGif = results.data.find(item => item.id === id)
    var width = selectedGif.images.original.width;
    var height = selectedGif.images.original.height;

    component.set("v.selectedGifWidth", width);
    component.set("v.selectedGifHeight", height);
    component.set("v.selectedGif", "https://media0.giphy.com/media/" + id + "/giphy.gif");

  },

  closeModal: function (component) {
    component.set("v.showModal", false);
  },

  postToChatter: function (component, event, helper) {

    var chatterText = component.get("v.chatterText");
    var imageUrl = component.get("v.selectedGif");
    var action = component.get("c.getChatterGroups");

    action.setParams({
      imageUrl : imageUrl,
      chatterText : chatterText
    });

    $A.enqueueAction(action);

    action.setCallback(this, function (response) {
      
      var feedItemId = response.getReturnValue();

      var urlEvent = $A.get("e.force:navigateToURL");
      urlEvent.setParams({
        "url": "one/one.app#/sObject/"+ feedItemId + "/view"
      });

      urlEvent.fire();

    });
  },

})