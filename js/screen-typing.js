<<<<<<< HEAD
$(document).ready(function() {

    // When the document loads, find the textarea, save it, and give it focus
    var screen = $("#screen > textarea");
    screen.focus();

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
            switch(key) {
                case isNumber(key):
                    $('#num' + key).addClass('hover');
                default:
                    $('#' + key).addClass('hover');
            }
            // If the pressed key is...
            switch(key) {
                case 'shift':
                    // Make the letters uppercase
                    $('.keys').addClass('uppercase');
                    // Make both shift keys flash
                    $('#left-shift, #right-shift').addClass('hover');
                    break;
                case 'ctrl':
                    // Make both shift keys flash
                    $('#left-ctrl, #right-ctrl').addClass('hover');
                    break;
                case 'alt':
                    // Make both shift keys flash
                    $('#left-alt, #right-alt').addClass('hover');
                    break;
            }
            // Prevent auto-focus on textarea if shift, ctrl, alt, capslock, or esc is clicked
            switch (key) {
                case 'shift': case 'ctrl': case 'alt': case 'caps-lock': case 'escape':
                break;
                default:
                    // Focus on the textarea
                    $('#screen > textarea').focus();
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
                case 'shift':
                    // Remove the hover class from both shift keys
                    setTimeout(function() {
                        $('#left-shift, #right-shift').removeClass('hover');
                    }, 100);
                    // Make the letters go back to lowercase
                    $('.keys').removeClass('uppercase');
                    break;
                case 'ctrl':
                    // Remove the hover class from both ctrl keys
                    setTimeout(function() {
                        $('#left-ctrl, #right-ctrl').removeClass('hover');
                    }, 100);
                    break;
                case 'alt':
                    // Remove the hover class from both alt keys
                    setTimeout(function() {
                        $('#left-alt, #right-alt').removeClass('hover');
                    }, 100);
                    break;
                case 'escape':
                    setTimeout(function() {
                        $('#escape').removeClass('hover');
                    }, 100);
                    break;
                case 'caps-lock':
                    setTimeout(function() {
                        $('#caps-lock').removeClass('hover');
                    }, 100);
                    break;
                case 'enter':
                    setTimeout(function() {
                        $('#enter').removeClass('hover');
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
            return 'escape';
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
            return 'caps-lock';
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
        // If the pressedKey is shift
        else if (pressedKey == 16) {
            return 'shift';
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
            return 'ctrl';
        }
        // If the pressedKey is alt
        else if (pressedKey == 18) {
            return 'alt';
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

});
=======
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
>>>>>>> ...
