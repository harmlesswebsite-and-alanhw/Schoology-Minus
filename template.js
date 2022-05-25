// ==UserScript==
// @name         Schoology Minus
// @description  Mod the interface
// @version      8.8.8.5
// @author       weeklyd3
// @match        https://bins.schoology.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=schoology.com
// @grant        none
// ==/UserScript==
$WARNING.TXT
function save_settings(img, resources, grades, homehref, courses, groups) {
    localStorage.setItem('img_url', img); 
    localStorage.setItem('resources', resources);
    localStorage.setItem('grades', grades);
    localStorage.setItem('homehref', homehref);
    localStorage.setItem('boringclasses', courses);
    localStorage.setItem('pooptalks', groups);
}
function letterGrade(grade) {
    if (grade > 100) return "HEY! U Cheated!";
    if (90 <= grade && grade <= 100) return 'A - AVERAGE and AWFUL!';
    if (80 <= grade && grade < 90) return 'B - U GET B? STOOBID';
    if (70 <= grade && grade < 80) return 'C - REDO IT';
    if (60 <= grade && grade < 70) return 'D - U SUK';
    if (0 < grade && grade < 60) return 'F - YOU ARE A FALIURE';
    if (grade === 0) return 'U GET 0 HEHEHEHEHE';
    return 'The techer gave u negative score. Get Nubed'
}
var above100 = `
$ABOVE100.TXT
`,
a = `
$A.TXT
`,
b = `
$B.TXT
`,
c = `
$C.TXT
`,
d = `
$D.TXT
`,
f = `
$F.TXT
`,
u = `
$U.TXT
`,
t = `
$T.TXT
`;
function getGradeColor(letterGrade) {
    switch (letterGrade.charAt(0)) {
        case 'H':
            return above100;
            break;
        case 'A':
            return a;
            break;
        case 'B':
            return b;
            break;
        case 'C':
            return c;
            break;
        case 'D':
            return d;
            break;
        case 'F':
            return f;
            break;
        case 'U':
            return u;
            break;
        case 'T':
            return t;
            break;
    }
}
window.letterGrade = letterGrade;
window.save_settings = save_settings;
(function() {
    'use strict';
    if (window.parent !== window) {
        // Probably an iframe.
        return;
    }
$GRADER.JS
    var actualSettings = document.createElement('div');
    actualSettings.setAttribute('id', 'poologysettings');
    actualSettings.setAttribute('style', 'z-index: 33283328; display: none;position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);');
    actualSettings.innerHTML = `
$SETTINGSPAGE.HTML
`;

$ADDITIONAL.JS

})();
