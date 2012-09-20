// "press" = you used your physical keyboard
// "clicked" = you used your mouse to click the on-screen keyboard

$(document).ready(function() {

    // Find the textarea, save it to var screen, and focus the cursor on it
    var screen = $("#screen > textarea");
    screen.focus();

    // Listen for when a (non-modifier, or non-function) key is clicked
    $('li').not('.modifier, .short-key').click(function() {

        // Find the first <span>, get the contents, trim away the whitespace, and save it to var txt
        var character = $(this).find(':first-child').text().trim();

        // Extend jQuery to insert characters at the caret
        jQuery.fn.extend({
            insertAtCaret: function(character){
                return this.each(function(i) {
                    if (document.selection) {
                        //For browsers like Internet Explorer
                        this.focus();
                        sel = document.selection.createRange();
                        sel.text = character;
                        this.focus();
                    }
                    else if (this.selectionStart || this.selectionStart == '0') {
                        //For browsers like Firefox and Webkit based
                        var startPos = this.selectionStart;
                        var endPos = this.selectionEnd;
                        var scrollTop = this.scrollTop;
                        this.value = this.value.substring(0, startPos)+character+this.value.substring(endPos,this.value.length);
                        this.focus();
                        this.selectionStart = startPos + character.length;
                        this.selectionEnd = startPos + character.length;
                        this.scrollTop = scrollTop;
                    } else {
                        this.value += character;
                        this.focus();
                    }
                });
            }
        });

        // Insert characters in the textarea at the current caret
        screen.insertAtCaret(character);
    });

    // Get the value of the key being pressed and make sure it's lower case
    function getCharacter(event) {

        code = event.keyCode;

        if ((code >= 65) && (code <= 90)) {
            return (String.fromCharCode(code)).toLowerCase();
        } else {
            console.log(code);
        }
    }

    $(document).on({
        // Do this when a key is pressed
        'keydown': function(event) {
            var key = getCharacter(event);
            // Make the on-screen key flash for 100ms
            $('#' + key).addClass('hover');
            // Focus on the textarea
            $('#screen > textarea').focus();
        },
        // Do this when a key is let go
        'keyup': function(event) {
            var key = getCharacter(event);
            // After a key is clicked, remove the .hover class
            $('#' + key).removeClass('hover').delay(100);
        }
    });

});
