$(document).ready(function() {

    // Find the textarea, and save it to var screen
    var screen = $("#screen > textarea");

    $('li').not('.modifier, .short-key').click(function() {
        // Find the first <span>, get the contents, trim away the whitespace, and save it to var txt
        var txt = $(this).find(':first-child').text().trim();
        // Add the trimmed txt to the textarea
        screen.val(screen.val() + txt);
    });

    var clickedKey = $(document).keydown( function(event){ String.fromCharCode(event.keyCode); });

    KeyboardJS.bind.key(
        // Physical keyboard input
        clickedKey,
        // onDownCallback
        function() {
            // Make the on-screen key flash
            $('#' + clickedKey).addClass('hover');
            // If the textarea has focus...
            if ($('#screen > textarea').is(':focus')) {
                // ...do nothing
            } else {
                // Add the trimmed txt from the first span to the textarea
                var txt = $('.keys').find('#' + clickedKey).children(':first').text().trim();
                screen.val(screen.val() + txt);
            }
        },
        function() {
            // After a key is clicked, remove the .hover class
            setTimeout(function() {
                $('.keys').find('#' + clickedKey).removeClass('hover');
            }, 100);
        }
    );

});