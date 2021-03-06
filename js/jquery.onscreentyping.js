// When the document loads...
$(document).ready(function() {

    // ... find the textarea, save it, and give it focus.
    var screen = $(".screen > textarea");
    screen.focus();

    // For on-screen keyboard mouse clicks:
    $('.keys > li').on({

        // When a key is clicked...
        'click': function() {

            // ... get the clickedKey.
            var clickedKey = getClickedKey(this).replace(' ', '-');

            // If the clickedKey is NOT a modifier...
            if (!$(this).is('.modifier')) {

                // If the clickedKey is a letter...
                if ($(this).is('.letter')) {

                    // If .caps-lock is .hover AND .shift is .hover ...
                    if ($('.caps-lock').is('.hover') && $('.shift').is('.hover') ) {
                        // ...make the clickedKey lowercase, and insert it at the caret.
                        screen.insertAtCaret(clickedKey.toLowerCase());
                    // If .caps-lock, or .shift is .hover...
                    } else if ($('.caps-lock, .shift').is('.hover')) {
                        // ...make the clickedKey uppercase, and insert it at the caret.
                        screen.insertAtCaret(clickedKey.toUpperCase());
                    // ...otherwise,
                    } else {
                        // ...insert the clickedKey at the caret.
                        screen.insertAtCaret(clickedKey);
                    }
                // Do this if the clickedKey is not a letter...
                } else {
                    screen.insertAtCaret(clickedKey);
                }

                // If .caps-lock is .hover...
                if ($('.caps-lock').is('.hover')) {
                    // ...make the .keys uppercase.
                    $('.keys').addClass('uppercase');
                    // If .caps-lock is not .hover...
                } else if ($('.caps-lock').not('.hover')) {
                    // ...make the .keys lowercase.
                    $('.keys').removeClass('uppercase');
                }

                // Always remove the hover effect from the shift key when a key is pressed
                $('.shift').removeClass('hover');

            }

            // If the clickedKey is a modifier...
            if ($(this).is('.modifier')) {

                $('.' + clickedKey.toLowerCase()).toggleClass('hover');

            }

            // If the clickedKey is shift...
            if ($(this).is('.shift')) {
                if ($('.caps-lock').is('hover')) {
                    $('.keys').removeClass('uppercase');
                } else if ($('.caps-lock').not('hover')) {
                    $('.keys').toggleClass('uppercase');
                }
            }

            // If the clickedKey is caps-lock...
            if ($(this).is('.caps-lock')) {
                if ($('.shift').is('hover')) {
                    $('.keys').addClass('uppercase');
                } else if ($('.shift').not('hover')) {
                    $('.keys').toggleClass('uppercase');
                }
            }

            // If the clickedKey is a tab...
            if ($(this).is('.tab')) {
                // ... insert a tab character at the caret.
                screen.insertAtCaret('\t');
                $('.tab').removeClass('hover');
            }

            // If the clickedKey is the space-bar...
            if ($(this).is('.space-bar')) {
                // ... insert a tab character at the caret.
                screen.insertAtCaret(' ');
                $('.space-bar').removeClass('hover');
            }

            // If the clickedKey is the enter key...
            if ($(this).is('.enter')) {
                // ... insert a tab character at the caret.
                screen.insertAtCaret('\n');
                $('.enter').removeClass('hover');
            }



        }
    });

    // For physical keyboard key presses:
    $(document).on({

        // When a key is pressed ...
        'keydown': function(event) {

            // get the pressedKey.
            var pressedKey = getPressedKey(event);
            var pressedKeyChar = pressedKey[0];
            var pressedKeyType = pressedKey[1];

            // make it hover (unless it's the caps-lock key).
            $('.' + pressedKeyChar).not('.caps-lock').addClass('hover');

            // If the pressedKey is a letter...
            if (pressedKeyType == 'letter') {
                var options = {
                    caps_lock_on: function() {
                        $('.caps-lock').addClass('hover');
                        $('.keys').addClass('uppercase');
                    }
                };
                // ...and the shift key is not pressed...
                if (event.shiftKey == false) {
                    //
                    $(screen).capslock(options);
                }
            }

            // If the pressedKeyChar is caps-lock...
            if (pressedKeyChar == 'caps-lock') {
                // ... make the caps-lock key hover.
                $('.caps-lock').toggleClass('hover');
                // ... make the caps-lock key move down.
                $('.caps-lock').css('top', '2px');
                // ... make the letters uppercase.
                $('.keys').toggleClass('uppercase');
            }

            // If the pressedKeyChar is shift...
            if (pressedKeyChar == 'shift') {
                // ... and the caps-lock has hover ...
                if ($('.caps-lock').hasClass('hover')) {
                    // ... make the keys lowercase.
                    $('.keys').removeClass('uppercase');
                }
                // ... otherwise ...
                else {
                    // ... make the letters uppercase.
                    $('.keys').addClass('uppercase');
                }
            }

            // If the pressedKey IS NOT a modifier OR IS the backspace key...
            if (pressedKeyType !== 'modifier' || pressedKeyChar == 'backspace') {
                // focus on the textarea.
                $('.screen > textarea').focus();
            }

            // If the pressedKey is a tab...
            if (pressedKeyChar == 'tab') {
                // ... prevent its default function.
                event.preventDefault();
                // ... insert a tab character at the caret.
                screen.insertAtCaret('\t');
            }

        },

        // When a key is no longer pressed ...
        'keyup': function(event) {

            // ... get the (un)pressedKey ...
            var unpressedKey = getPressedKey(event);
            var unpressedKeyChar = unpressedKey[0];
            var unpressedKeyType = unpressedKey[1];

            // ... set a timer for 100ms (to make the key "flash") ...
            setTimeout(function() {
                // ... and remove the hover class from all non-modifier keys (this prevents "sticky hover").
                $('*').not('.modifier').removeClass('hover');

                if (unpressedKeyType == 'modifier' && unpressedKeyChar !== 'caps-lock') {
                    $('.' + unpressedKeyChar).removeClass('hover');
                }

                $('.caps-lock').css('top', '0');

            }, 100);

            // If the depressedKeyChar is shift...
            if (unpressedKeyChar == 'shift') {
                // ... and the caps-lock key has hover...
                if ($('.caps-lock').hasClass('hover')) {
                    // ... make the letters uppercase.
                    $('.keys').addClass('uppercase');
                }
                // ... otherwise...
                else {
                    // ... make the letters lowercase.
                    $('.keys').removeClass('uppercase');
                }
            }

        }
    });

    // Get the value of the key being clicked
    function getClickedKey(target) {
        // Find the active <span>, get the contents, trim away the whitespace, and save it
        clickedKey = $(target).find('.active').text().trim();
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
        // If the pressedKey is an accent, or a tilde ` ~
        else if (pressedKey == 192) {
            var accentKey = new Array(2);
            accentKey[0] = 'accent';
            accentKey[1] = 'symbol';
            return accentKey;
        }
        // If the pressedKey is a hyphen, or an underscore - _
        else if (pressedKey == 189) {
            var hyphenKey = new Array(2);
            hyphenKey[0] = 'hyphen';
            hyphenKey[1] = 'symbol';
            return hyphenKey;
        }
        // If the pressedKey is an equals sign, or a plus sign = +
        else if (pressedKey == 187) {
            var equalKey = new Array(2);
            equalKey[0] = 'equal';
            equalKey[1] = 'symbol';
            return equalKey;
        }
        // If the pressedKey is an opening bracket, or an opening brace [ {
        else if (pressedKey == 219) {
            var openingbracketKey = new Array(2);
            openingbracketKey[0] = 'opening-bracket';
            openingbracketKey[1] = 'symbol';
            return openingbracketKey;
        }
        // If the pressedKey is a closing bracket, or a closing brace ] }
        else if (pressedKey == 221) {
            var closingbracketKey = new Array(2);
            closingbracketKey[0] = 'closing-bracket';
            closingbracketKey[1] = 'symbol';
            return closingbracketKey;
        }
        // If the pressedKey is a backslash, or a vertical bar \ |
        else if (pressedKey == 220) {
            var backSlashKey = new Array(2);
            backSlashKey[0] = 'backslash';
            backSlashKey[1] = 'symbol';
            return backSlashKey;
        }
        // If the pressedKey is a semi-colon, or a colon ; :
        else if (pressedKey == 186) {
            var semiColonKey = new Array(2);
            semiColonKey[0] = 'semi-colon';
            semiColonKey[1] = 'symbol';
            return semiColonKey;
        }
        // If the pressedKey is an quotation mark, or a double-quotation mark ' "
        else if (pressedKey == 222) {
            var quoteKey = new Array(2);
            quoteKey[0] = 'quote';
            quoteKey[1] = 'symbol';
            return quoteKey;
        }
        // If the pressedKey is a comma, or a less than sign , <
        else if (pressedKey == 188) {
            var commaKey = new Array(2);
            commaKey[0] = 'comma';
            commaKey[1] = 'symbol';
            return commaKey;
        }
        // If the pressedKey is a period, or a greater than sign . >
        else if (pressedKey == 190) {
            var periodKey = new Array(2);
            periodKey[0] = 'period';
            periodKey[1] = 'symbol';
            return periodKey;
        }
        // If the pressedKey is a forward slash, or a question mark / ?
        else if (pressedKey == 191) {
            var forwardSlashKey = new Array(2);
            forwardSlashKey[0] = 'forward-slash';
            forwardSlashKey[1] = 'symbol';
            return forwardSlashKey;
        }
        // If the pressedKey is the enter key
        else if (pressedKey == 13) {
            var enterKey = new Array(2);
            enterKey[0] = 'enter';
            enterKey[1] = 'symbol';
            return enterKey;
        }
        // If the pressedKey is the space bar
        else if (pressedKey == 32) {
            var spaceBarKey = new Array(2);
            spaceBarKey[0] = 'space-bar';
            spaceBarKey[1] = 'symbol';
            return spaceBarKey;
        }
        // If the pressedKey is backspace
        else if (pressedKey == 8) {
            var backSpaceKey = new Array(2);
            backSpaceKey[0] = 'backspace';
            backSpaceKey[1] = 'modifier';
            return backSpaceKey;
        }
        // If the pressedKey is tab
        else if (pressedKey == 9) {
            var tabKey = new Array(2);
            tabKey[0] = 'tab';
            tabKey[1] = 'modifier';
            return tabKey;
        }
        // If the pressedKey is escape
        else if (pressedKey == 27) {
            var escapeKey = new Array(2);
            escapeKey[0] = 'escape';
            escapeKey[1] = 'modifier';
            return escapeKey;
        }
        // If the pressedKey is a capsLock
        else if (pressedKey == 20) {
            var capsLockKey = new Array(2);
            capsLockKey[0] = 'caps-lock';
            capsLockKey[1] = 'modifier';
            return capsLockKey;
        }
        // If the pressedKey is shift
        else if (pressedKey == 16) {
            var shiftKey = new Array(2);
            shiftKey[0] = 'shift';
            shiftKey[1] = 'modifier';
            return shiftKey;
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

});
