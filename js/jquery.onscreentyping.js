// When the document loads...
$(document).ready(function() {

    // ... find the textarea, save it, and give it focus.
    var screen = $(".screen > textarea");

    // For on-screen keyboard mouse clicks:
    $('li').not('.modifier, .short-key').on({
        // When a key is clicked...
        'click': function() {
            // ... get the clickedkey...
            var clickedKey = getClickedKey(this); // I don't know why I need to pass 'this', and not 'event', into the function
            // ... and insert its character in the textarea at the caret
            screen.insertAtCaret(clickedKey);
        }
    });

    // For physical keyboard key presses:
    $(document).on({

        // When a key is pressed ...
        'keydown': function(event) {

            // ... get the pressedKey.
            var pressedKey = getPressedKey(event);
            var pressedKeyChar = pressedKey[0];
            var pressedKeyType = pressedKey[1];

            // ... and make the key hover.
            $('.' + pressedKeyChar).not('.caps-lock').addClass('hover');

            if ((pressedKeyChar == 'caps-lock') && !$('.caps-lock').hasClass('hover')) {
                $('.caps-lock').addClass('hover');
                $('.keys').addClass('uppercase');
            } else {
                $('.caps-lock').removeClass('hover');
                $('.keys').removeClass('uppercase');
            }

            if (pressedKeyChar == 'shift') {
                $('.keys').addClass('uppercase');
            }

            if ((pressedKeyChar == 'shift') && $('.caps-lock').hasClass('hover')) {
                $('.keys').removeClass('uppercase');
            }

            // If the pressedKey is NOT a modifier key ...
            if (pressedKeyType !== 'modifier') {
                // ... focus on the textarea,
                $('.screen > textarea').focus();
            }

        },

        // When a key is no longer pressed ...
        'keyup': function(event) {

            // ... get the (un)pressedKey ...
            var pressedKey = getPressedKey(event);
            var pressedKeyChar = pressedKey[0];
            var pressedKeyType = pressedKey[1];

            // ... set a timer for 100ms (to make the key "flash") ...
            setTimeout(function() {

                // ... and remove the hover class from all non-modifier keys (this prevents "sticky hover").
                $('*').not('.modifier').removeClass('hover');

                // If the (un)pressedKey IS a modifier, and is NOT caps-lock ...
                if (pressedKeyType == 'modifier') {
                    // ... remove the hover class of just the modifier key.
                    $('.' + pressedKeyChar).not('.caps-lock').removeClass('hover');
                }



            }, 100);

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
            var letterKey = new Array(2);
            letterKey[0] = String.fromCharCode(pressedKey).toLowerCase();
            letterKey[1] = 'letter';
            return letterKey;
        }
        // If the keyCode is a number...
        else if ((pressedKey >=48) && (pressedKey <= 57)) {
            var numKey = new Array(2);
            numKey[0] = 'num' + String.fromCharCode(pressedKey);
            numKey[1] = 'number';
            return numKey;
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
            var accentKey = new Array(2);
            accentKey[0] = 'accent';
            accentKey[1] = 'tilde';
            return accentKey;
        }
        // If the pressedKey is a hyphen -
        else if (pressedKey == 189) {
            var hyphenKey = new Array(2);
            hyphenKey[0] = 'hyphen';
            hyphenKey[1] = 'underscore';
            return hyphenKey;
        }
        // If the pressedKey is an equals sign =
        else if (pressedKey == 187) {
            var equalKey = new Array(2);
            equalKey[0] = 'equal';
            equalKey[1] = 'plus';
            return equalKey;
        }
        // If the pressedKey is an opening bracket [
        else if (pressedKey == 219) {
            var openingbracketKey = new Array(2);
            openingbracketKey[0] = 'opening-bracket';
            openingbracketKey[1] = 'opening-brace';
            return openingbracketKey;
        }
        // If the pressedKey is a closing bracket ]
        else if (pressedKey == 221) {
            var closingbracketKey = new Array(2);
            closingbracketKey[0] = 'closing-bracket';
            closingbracketKey[1] = 'closing-brace';
            return closingbracketKey;
        }
        // If the pressedKey is a backslash \
        else if (pressedKey == 220) {
            var backSlashKey = new Array(2);
            backSlashKey[0] = 'backslash';
            backSlashKey[1] = 'vertical-bar';
            return backSlashKey;
        }
        // If the pressedKey is a capsLock
        else if (pressedKey == 20) {
            var capsLockKey = new Array(2);
            capsLockKey[0] = 'caps-lock';
            capsLockKey[1] = 'modifier';
            return capsLockKey;
        }
        // If the pressedKey is semi-colon ;
        else if (pressedKey == 186) {
            var semiColonKey = new Array(2);
            semiColonKey[0] = 'semi-colon';
            semiColonKey[1] = 'colon';
            return semiColonKey;
        }
        // If the pressedKey is a quotation mark '
        else if (pressedKey == 222) {
            var quoteKey = new Array(2);
            quoteKey[0] = 'quote';
            quoteKey[1] = 'double-quote';
            return quoteKey;
        }
        // If the pressedKey is enter
        else if (pressedKey == 13) {
            var enterKey = new Array(2);
            enterKey[0] = 'enter';
            enterKey[1] = 'modifier';
            return enterKey;
        }
        // If the pressedKey is shift
        else if (pressedKey == 16) {
            var shiftKey = new Array(2);
            shiftKey[0] = 'shift';
            shiftKey[1] = 'modifier';
            return shiftKey;
        }
        // If the pressedKey is a comma ,
        else if (pressedKey == 188) {
            var commaKey = new Array(2);
            commaKey[0] = 'comma';
            commaKey[1] = 'less-than-sign';
            return commaKey;
        }
        // If the pressedKey is a period .
        else if (pressedKey == 190) {
            var periodKey = new Array(2);
            periodKey[0] = 'period';
            periodKey[1] = 'greater-than-sign';
            return periodKey;
        }
        // If the pressedKey is a forward slash /
        else if (pressedKey == 191) {
            var forwardSlashKey = new Array(2);
            forwardSlashKey[0] = 'forward-slash';
            forwardSlashKey[1] = 'question-mark';
            return forwardSlashKey;
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
        else if (pressedKey == 32) {
            var spaceBarKey = new Array(2);
            spaceBarKey[0] = 'space-bar';
            spaceBarKey[1] = ' ';
            return spaceBarKey;
        }
        // If the pressedKey doesn't match anything above, output to the console!
        else {
            console.log(pressedKey);
        }
    }

});
