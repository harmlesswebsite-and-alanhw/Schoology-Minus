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
                gradeTd.children[0].children[2].textContent = '(Techer messed up)';
                continue;
            }
            var letter = letterGrade(100 * received / total);
            gradeTd.children[0].children[2].style.color = getGradeColor(letter);
            gradeTd.children[0].children[0].style.color = getGradeColor(letter);
            gradeTd.children[0].children[2].textContent = " (" + (100 * received / total) + "%) (" + letter + ")";
        }
    }
}
