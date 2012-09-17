// This script toggles between three different css files

$(document).ready(function() {

    $("#dark-css").click(function() {
		$("link[title=css-toggle]").attr({href : "css/compiled/dark.css"});
	});

	$("#light-css").click(function() {
        $("link[title=css-toggle]").attr({href : "css/compiled/light.css"});
	});

    $("#high-contrast-css").click(function() {
        $("link[title=css-toggle]").attr({href : "css/compiled/high-contrast.css"});
    });

});
