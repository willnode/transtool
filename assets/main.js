---
---

/* Button functionality */

import { Cookie } from "./cookie.js";

import { translate } from "./google-translate-api.js";

var content = document.getElementById("content");

document.getElementById('btn-translate-en').onclick = (e) => {
    translate(content.value, { from: 'id', to: 'en' }, (res) => {
        content.value = res.text;
    });
};

document.getElementById('btn-translate-id').onclick = (e) => {
    translate(content.value, { from: 'en', to: 'id' }, (res) => {
        content.value = res.text;
    });
};

/* Key functionality */

content.onkeydown = (e) => {

    var text = content.value;
    if (e.which == 9 /*tab*/) {
        var start = Math.min(content.selectionStart, text.length - 1);
        var sel = { start: start, length: content.selectionEnd - start };

        if (e.shiftKey)
            FindPrevWord(text, sel);
        else
            FindNextWord(text, sel);

        content.setSelectionRange(sel.start, sel.length + sel.start);

        e.preventDefault();
    };
    if (e.which == 8 /*backspace*/) {
        if (content.selectionStart == content.selectionEnd) return;

        var start = content.selectionStart;
        var t = content.value.substr(0, content.selectionStart) + content.value.substr(content.selectionEnd);

        if (start > 0 && start < t.length - 1) {
            if ((t[start - 1]) == ' ' && (t[start]) == ' ') {
                t = t.substr(0, start - 1) + t.substr(start);
                {
                    start--;
                    var sel = { start: start, length: 0 };
                    FindNextWord(t, sel);
                    content.value = t;
                    content.setSelectionRange(sel.start, sel.length + sel.start);
                }
                e.preventDefault();
            }
        }
    }

    Cookie.setCookie("content", content.value, 30);
};

window.onload = (e) => {
    content.value = Cookie.getCookie("content");
};


function IsWorldLetter(c) {
    return (c >= "a".charCodeAt(0) && c <= "z".charCodeAt(0)) ||
        (c >= "A".charCodeAt(0) && c <= "Z".charCodeAt(0)) || c == "\'".charCodeAt(0) || c == '_'.charCodeAt(0);
};

function FindNextWord(s, sel) {
    var end = sel.start + sel.length;

    while (end < s.length && IsWorldLetter(s.charCodeAt(end)))
        end++;

    if (end >= s.length) return;

    while (end < s.length && !IsWorldLetter(s.charCodeAt(end)))
        end++;

    if (end >= s.length) return;

    sel.start = end;

    while (end < s.length && IsWorldLetter(s.charCodeAt(end)))
        end++;

    sel.length = (end >= s.length) ? s.length - sel.start : end - sel.start;
};

function FindPrevWord(s, sel) {

    var start = sel.start;

    while (start >= 0 && IsWorldLetter(s.charCodeAt(start)))
        start--;

    if (start < 0) { return; }

    while (start >= 0 && !IsWorldLetter(s.charCodeAt(start)))
        start--;

    if (start < 0) { return; }

    sel.length = start;

    while (start >= 0 && IsWorldLetter(s.charCodeAt(start)))
        start--;

    sel.length -= start++;

    sel.start = start;

};
