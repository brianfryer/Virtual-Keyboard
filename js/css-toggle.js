// This script toggles between three different css files

$(document).ready(function() {

	$("#dark-css").click(function() {
		$("link[rel=stylesheet]").attr({href : "css/dark.css"});
	});

	$("#light-css").click(function() {
		$("link[rel=stylesheet]").attr({href : "css/light.css"});
	});

    $("#high-contrast-css").click(function() {
        $("link[rel=stylesheet]").attr({href : "css/high-contrast.css"});
    });

});