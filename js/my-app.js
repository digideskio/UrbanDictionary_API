var myApp = new Framework7({});

var $$ = Dom7;

// Select Template
var template = $$('#search-template').html();

// Compile and render
var compiledTemplate = Template7.compile(template);

function getSearch(searchstring){
	// Get JSON Data from UrbanDictionary API by searchstring
	$$.getJSON('http://api.urbandictionary.com/v0/define?term='+searchstring, function (json) {
		// Insert rendered template
		$$('#content-wrap').html(compiledTemplate(json))
	});
}

// Initialize searchbar
var searchstring = "";
var mySearchbar = myApp.searchbar('.searchbar', {
    customSearch: true,
    onSearch: function(s) {
        searchstring = s.query;
    }
});

// 'Hack' to search only by pressing Enter-Key
$('.searchbar').bind("keypress", function(e) {
    if (e.which === 13) {
        if (searchstring.length > 0) {
            mySearchbar.disable();
            getSearch(searchstring);
        }
    }
});

var mainView = myApp.addView('.view-main', {
  dynamicNavbar: true
});