$(document).ready(function() {

    // When the document loads, find the textarea, save it, and give it focus
    var screen = $(".screen > textarea");

    // On-screen keyboard mouse click
    $('li').not('.modifier, .short-key').on({
        // When a letter or number is clicked...
        'click': function() {
            // Get the key
            key = getClickedKey(this);
            // Insert its character in the textarea at the caret
            screen.insertAtCaret(key);
        }
    });

    // Physical keyboard key press
    $(document).on({

        // When a key is pressed...
        'keydown': function(event) {
            // Get the pressedKey
            key = getPressedKey(event);
            // Make the on-screen key flash for 100ms
            if (isNumber(key)) {
                $('.num' + key).addClass('hover');
            } else if ($.inArray('modifier', key)) {
                // ... Make the on-screen key flash for 100ms
                $('.' + key[0]).addClass('hover');
            } else {
                $('.' + key).addClass('hover');
            }
            // Prevent auto-focus on textarea if capslock, ctrl, alt, capslock, or esc is clicked
            switch (key) {
                case 'capslock': case 'ctrl': case 'alt': case 'caps-lock': case 'escape':
                break;
                default:
                    // Focus on the textarea
                    $('.screen > textarea').focus();
            }
        },
        // When a key is no longer pressed...
        'keyup': function(event) {
            // Get the unpressedKey
            key = getPressedKey(event);
            // Remove the hover class from all non-modifier elements (this prevents "sticky hover")
            setTimeout(function() {
                $('*').not('.modifier').removeClass('hover');
            }, 100);

            // If the key that is no longer pressed is...
            switch(key) {
                case 'capslock':
                    // Remove the hover class from both capslock keys
                    setTimeout(function() {
                        $('.capslock').removeClass('hover');
                    }, 100);
                    // Make the letters go back to lowercase
                    $('.keys').removeClass('uppercase');
                    break;
                case 'ctrl':
                    // Remove the hover class from both ctrl keys
                    setTimeout(function() {
                        $('.ctrl').removeClass('hover');
                    }, 100);
                    break;
                case 'alt':
                    // Remove the hover class from both alt keys
                    setTimeout(function() {
                        $('.alt').removeClass('hover');
                    }, 100);
                    break;
                case 'escape':
                    setTimeout(function() {
                        $('.escape').removeClass('hover');
                    }, 100);
                    break;
                case 'caps-lock':
                    setTimeout(function() {
                        $('.caps-lock').removeClass('hover');
                    }, 100);
                    break;
                case 'enter':
                    setTimeout(function() {
                        $('.enter').removeClass('hover');
                    }, 100);
                    break;
            }
        }
    });

    // Get the value of the key being clicked
    function getClickedKey(target) {
        // Find the first <span>, get the contents, trim away the whitespace, and save it
        clickedKey = $(target).find(':first-child').text().trim();
        return clickedKey;
    }

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
        // If the pressedKey is esc
        else if (pressedKey == 27) {
            var escapeKey = new Array(2);
            escapeKey[0] = 'escape';
            escapeKey[1] = 'modifier';
            return escapeKey;
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
        // If the pressedKey is an caps lock
        else if (pressedKey == 20) {
            var capslockKey = new Array(2);
            capslockKey[0] = 'capslock';
            capslockKey[1] = 'modifier';
            return capslockKey;
        }
        // If the pressedKey is semi-colon ;
        else if (pressedKey == 186) {
            return 'semi-colon';
        }
        // If the pressedKey is a quotation mark '
        else if (pressedKey == 222) {
            return 'quote';
        }
        // If the pressedKey is enter
        else if (pressedKey == 13) {
            return 'enter';
        }
        // If the pressedKey is capslock
        else if (pressedKey == 16) {
            var capslockKey = new Array(2);
            capslockKey[0] = 'capslock';
            capslockKey[1] = 'modifier';
            return capslockKey;
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
        // If the pressedKey is ctrl
        else if (pressedKey == 17) {
            var ctrlKey = new Array(2);
            ctrlKey[0] = 'ctrl';
            ctrlKey[1] = 'modifier';
            return ctrlKey;
        }
        // If the pressedKey is alt
        else if (pressedKey == 18) {
            var altKey = new Array(2);
            altKey[0] = 'alt';
            altKey[1] = 'modifier';
            return altKey;
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

    // Find out if the key is a modifier
    function isModifier(n) {

    }

});
