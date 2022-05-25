$SCRIPTINFO.JS
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
    if (grade > 100) return "$ABOVE100.MSG";
    if (90 <= grade && grade <= 100) return '$A.MSG';
    if (80 <= grade && grade < 90) return '$B.MSG';
    if (70 <= grade && grade < 80) return '$C.MSG';
    if (60 <= grade && grade < 70) return '$D.MSG';
    if (0 < grade && grade < 60) return '$F.MSG';
    if (grade === 0) return '$0.MSG';
    return '$NEG.MSG'
}
function getGradeColor(letterGrade) {
    switch (letterGrade.charAt(0)) {
        case 'H':
            return $ABOVE100.TXT;
            break;
        case 'A':
            return '$A.TXT'; // Original: $A.TXT
            break;
        case 'B':
            return '$B.TXT'; // Original: $B.TXT
            break;
        case 'C':
            return '$C.TXT'; // Original: $C.TXT
            break;
        case 'D':
            return '$D.TXT'; // Original: $D.TXT
            break;
        case 'F':
            return '$F.TXT'; // Original: $F.TXT
            break;
        case 'U':
            return '$U.TXT'; // Original: $U.TXT
            break;
        case 'T':
            return '$T.TXT'; // Original: $T.TXT
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
