// var data = require("json!/../airports.json");
$.ajax({
  type: 'GET',
  dataType: "json",
  url: '/api/airports',
  async: false,
  success: function(data){
    var names = data.map( (airport) => {
          return airport.name ? airport.name.toLowerCase() : '';
      });


  $(function() {
    
    $( "#tags" ).autocomplete({
      source: names
    });
    $( "#airports" ).autocomplete({
      source: names
    });
  });
  }
});

