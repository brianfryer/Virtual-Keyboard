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
