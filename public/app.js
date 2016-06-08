  $(function() {
    var availableTags = [
      "ActionScript",
      "AppleScript",
      "Asp",
      "BASIC",
      "C",
      "C++",
      "Clojure",
      "COBOL",
      "ColdFusion",
      "Erlang",
      "Fortran",
      "Groovy",
      "Haskell",
      "Java",
      "JavaScript",
      "Lisp",
      "Perl",
      "PHP",
      "Python",
      "Ruby",
      "Scala",
      "Scheme"
    ];
    $( "#tags" ).autocomplete({
      source: availableTags
    });
    $( "#airports" ).autocomplete({
      source: availableTags
    });
  });

$.ajax({
  type: 'GET',
  dataType: "json",
  url: '/api/airports',
  async: false,
  success: function(data){
    console.log(data);
  }
});