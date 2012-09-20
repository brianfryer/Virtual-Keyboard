// "press" = you used your physical keyboard
// "clicked" = you used your mouse to click the on-screen keyboard

$(document).ready(function() {

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

    // Find the textarea, save it to var screen, and focus the cursor on it
    var screen = $("#screen > textarea");
    screen.focus();

    // Get the value of the key being clicked, and make sure it's trimmed
    function getClickedKey(target) {
        // Look for the contents of the first <span>, and add it to pressedKey
        clickedKey = $(target).find(':first-child').text().trim();
        //
        console.log(clickedKey);
        //
        return clickedKey;
    }
    // Listen for when a letter/number is clicked
    $('li').not('.modifier, .short-key').on({
        'click': function() {
            // Find the first <span>, get the contents, trim away the whitespace, and save it to var character
            character = getClickedKey(this);
            // Insert characters in the textarea at the caret
            screen.insertAtCaret(character);
        }
    });

    // Get the value of the key being pressed
    function getPressedKey(target) {
        // Look for the keyCode of the key being pressed
        pressedKey = target.keyCode;
        // If the keyCode is letter...
        if ((pressedKey >= 65) && (pressedKey <= 90)) {
            return (String.fromCharCode(pressedKey)).toLowerCase();
        }
        // If the keyCode is a number...
        else if ((pressedKey >=48) && (pressedKey <= 57)) {
            return (String.fromCharCode(pressedKey))
        }
        // If the pressedKey is an accent `
        else if (pressedKey == 192) {
            return 'accent';
        }
        // If the pressedKey is a hyphen -
        else if (pressedKey == 189) {
            return 'hyphen';
        }
        // If the pressedKey is an equals sign =
        else if (pressedKey == 187) {
            return 'equal';
        }
        // If the pressedKey is an opening bracket [
        else if (pressedKey == 219) {
            return 'opening-bracket';
        }
        // If the pressedKey is a closing bracket ]
        else if (pressedKey == 221) {
            return 'closing-bracket';
        }
        // If the pressedKey is a backslash \
        else if (pressedKey == 220) {
            return 'backslash';
        }
        // If the pressedKey is semi-colon ;
        else if (pressedKey == 186) {
            return 'semi-colon';
        }
        // If the pressedKey is a quotation mark '
        else if (pressedKey == 222) {
            return 'quote';
        }
        // If the pressedKey is a comma ,
        else if (pressedKey == 188) {
            return 'comma';
        }
        // If the pressedKey is a period .
        else if (pressedKey == 190) {
            return 'period';
        }
        // If the pressedKey is a forward slash /
        else if (pressedKey == 191) {
            return 'forward-slash';
        }
        // If the pressedKey doesn't match anything above, output to the console!
        else {
            console.log(pressedKey);
        }
    }
    // Find out if the key is a number
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    $(document).on({
        // Do this when a key is pressed
        'keydown': function(event) {
            key = getPressedKey(event);
            // Make the on-screen key flash for 100ms
            if (isNumber(key)) {
                $('#num' + key).addClass('hover');
            }
            else {
                $('#' + key).addClass('hover');
            }
            // Focus on the textarea
            $('#screen > textarea').focus();

            if (pressedKey == 16) {
                $('.keys').addClass('uppercase');
                $('#left-shift, #right-shift').addClass('hover');
            }
        },
        // Do this when a key is let go
        'keyup': function(event) {
            key = getPressedKey(event);
            // After a key is clicked, remove the .hover class
            setTimeout(function() {
                $('*').not('.modifier').removeClass('hover');
            }, 100);
            // If the shift key is let go...
            if (pressedKey == 16) {
                // ...remove the .hover and .uppercase classes
                setTimeout(function() {
                    $('#left-shift, #right-shift').removeClass('hover');
                }, 100);
                $('.keys').removeClass('uppercase');
            }
        }
    });

});