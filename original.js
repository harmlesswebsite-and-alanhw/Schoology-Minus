// ==UserScript==
// @name         Schoology Minus
// @description  Mod the interface
// @version      8.8.8.5
// @author       weeklyd3
// @match        https://bins.schoology.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=schoology.com
// @grant        none
// ==/UserScript==
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
function getGradeColor(letterGrade) {
    switch (letterGrade.charAt(0)) {
        case 'H':
            return 'green';
            break;
        case 'A':
            return '#69b34c';
            break;
        case 'B':
            return '#acb334';
            break;
        case 'C':
            return '#fab733';
            break;
        case 'D':
            return '#ff8e15';
            break;
        case 'F':
            return '#ff4e11';
            break;
        case 'U':
            return 'red';
            break;
        case 'T':
            return 'brown';
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
    if (window.location.href.includes('grades')) {
        // Probably a grades page
        if (document.querySelector('[class="gradebook-course-title"]')) {
             var grades = document.querySelectorAll('[class="grade-column"]');
            for (var j = 0; j < grades.length; j++) {
                var gradeTd = grades[j];
                if (!gradeTd.children[0].children[0]) continue;
                if (!gradeTd.children[0].children[1]) continue;
                console.log(gradeTd);
                var received = parseFloat(gradeTd.children[0].children[0].textContent);
                var total = parseFloat(gradeTd.children[0].children[1].textContent.slice(2));
                if (received !== received) {
                    // Sounds Cra-Z. That must be NaN.
                    continue;
                }
                gradeTd.children[0].children[2].style.margin = '3px';
                if (!total) {
                    gradeTd.children[0].children[2].textContent = '(ZERO TOTAL POINTS YA BIG NUB)';
                    continue;
                }
                var letter = letterGrade(100 * received / total);
                gradeTd.children[0].children[2].style.color = getGradeColor(letter);
                gradeTd.children[0].children[0].style.color = getGradeColor(letter);
                gradeTd.children[0].children[2].textContent = " (" + (100 * received / total) + "%) (" + letter + ")";
            }
        }
    }
    var actualSettings = document.createElement('div');
    actualSettings.setAttribute('id', 'poologysettings');
    actualSettings.setAttribute('style', 'z-index: 33283328; display: none;position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5);');
    actualSettings.innerHTML = `<div style="color: black; padding: 7px; position: fixed; top: 50%; left: 50%; overflow: scroll; width: 75%; height: 75%; transform: translate(-50%, -50%); background-color: white;"><h2>Schoology Minus Settings</h2>
<p>You can modify the interface here.</p>
    <div style="float: right;">
    Preview of image:<br />
    <img id="peeview" src="data:image/png;base64," alt="Preview" style="max-width: 50%; display: block;" onerror="document.getElementById('error').style.display = 'block'; document.getElementById('load').style.display = 'none';" onload="document.getElementById('load').style.display = 'none';" />
    <div id="load" style="display: none;">Loading...</div>
    <div id="error" style="display: none;">An error occurred while loading the image.</div>
    </div>
    <form onsubmit="save_settings(document.getElementById('img').value, document.getElementById('resources').value, document.getElementById('grades').value, document.getElementById('homehref').value, document.getElementById('boringclasses').value, document.getElementById('pooptalks').value)">
    <table>
    <tr><td><label for="img">Logo image:</label></td> <td><input id="img" oninput="document.getElementById('load').style.display = 'block'; document.getElementById('error').style.display = 'none'; document.getElementById('peeview').src = this.value;" /></td></tr>
    <tr><td><label for="boringclasses">Text of Courses:</label></td><td><input id="boringclasses" /></td></tr>
    <tr><td><label for="pooptalks">Text of Groups: </td><td><input id="pooptalks" /></td></tr>
    <tr><td><label for="resources">Text of Resources:</label><td><input id="resources" /></td></tr>
    <tr><td><label for="grades">Text of 'Grades' link:</label></td> <td><input id="grades" /></td></tr>
    <tr><td><label for="homehref">Where should the logo link to?</label></td> <td><input id="homehref" /></td></tr>
    </table>
    <input type="button" value="CANCEL" style="background-color: black; color: white;" onclick="if (confirm('Are you sure you want to exist? WHOOPS I meant exit')) document.getElementById('poologysettings').style.display = 'none';" />
    <input type="submit" value="SAVE" style="font-weight: 700; background-color: black; color: white;" onclick="document.getElementById('poologysettings').style.display = 'none'; location.reload();" />
    <br />
    <h3>Advanced configuration</h3>
    <p>You probably don't want to go here.</p>
    <input type="button" value="RESET ALL SETTINGS" style="background-color: black; color: white;" onclick="if (confirm('WAT!? RESETTING SETTINGS TO BASIC SCHOOLOGY? U R BoRiNg')) { var ids = ['img_url', 'resources', 'grades', 'homehref', 'boringclasses', 'pooptalks']; for (var i = 0; i < ids.length; i++) localStorage.removeItem(ids[i]); location.reload(); }" />
    <p>Schoology Minus, version 8.8.8.5. Licensed under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPL 3.0 (or at your option any later version)</a>. Copyright &copy; 2022 weeklyd3.</p>
    </form>
    </div>`;

    var img_url = "https://alanhw.weeklyd3.repl.co/morebsiv.png";
    var img = localStorage.getItem('img_url') ?? img_url;
    document.body.appendChild(actualSettings);
    document.getElementById('img').value = img;
    document.getElementById('peeview').src = img;
    document.getElementById('resources').value = localStorage.getItem('resources') ?? 'ЯЕЕЅОЦЯСЕЅ';
    // The FALIURE GRADES line caused some problems on small screens. Moving to bottom.
    document.getElementById('boringclasses').value = localStorage.getItem('boringclasses') ?? 'BORING CLASSES';
    document.getElementById('pooptalks').value = localStorage.getItem('pooptalks') ?? 'POOP TALKS';
    document.getElementById('homehref').value = localStorage.getItem('homehref') ?? '/home';
    var poologyMinusButton = document.createElement('button');
    poologyMinusButton.addEventListener('click', function() { document.getElementById('poologysettings').style.display = 'block'; });
    poologyMinusButton.textContent = 'SCHOOLOGY MINUS SETTINGS';
    document.body.appendChild(poologyMinusButton);

    document.querySelector('a[href="/home"]').style.backgroundImage = `url(${img})`;
    document.querySelector('[href="/resources"]').textContent = localStorage.getItem('resources') ?? 'ЯЕЕЅОЦЯСЕЅ';
      document.querySelector('a[href="/home"]').addEventListener('click', function(ev) {
        ev.stopImmediatePropagation();
        ev.preventDefault();
        location.href = localStorage.getItem('homehref') ?? '/home';
    });
    document.querySelector('a[href="/home"]').setAttribute('href', localStorage.getItem('homehref') ?? 'https://alanhw.weeklyd3.repl.co/schoology.html');
    document.querySelector('[href="/grades/grades"]').textContent = localStorage.getItem('grades') ?? 'FALIURE GRADES';
    document.querySelector('nav ul li:nth-child(2) div button span').textContent = localStorage.getItem('boringclasses') ?? 'BORING CLASSES';
    document.querySelector('nav ul li:nth-child(3) div button span').textContent = localStorage.getItem('pooptalks') ?? 'POOP TALKS';
        document.getElementById('grades').value = localStorage.getItem('grades') ?? 'FALIURE GRADES';

})();
