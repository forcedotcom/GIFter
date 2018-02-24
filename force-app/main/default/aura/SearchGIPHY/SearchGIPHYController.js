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
        component.set("v.results", results.data);
      });

    }
  },

  search: function (component, event, helper) {

    console.log('search called successfully');

    var searchTerms = component.get("v.searchTerms");
    helper.search(searchTerms, function (results) {
      console.log('search returned from helper')
      component.set("v.results", results.data);
    });

  },

  gifSelected: function (component) {
    var property = component.get("v.property");

    console.log('gifSelected called successfully');
  }

})