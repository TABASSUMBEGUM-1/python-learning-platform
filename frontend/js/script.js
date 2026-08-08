// ========================================
// PYTHON LEARNING PLATFORM
// HOMEPAGE JAVASCRIPT
// ========================================


// ========================================
// START LEARNING
// ========================================

function startLearning() {

    window.location.href = "course.html";

}


// ========================================
// EXPLORE COURSE
// ========================================

function exploreCourse() {

    const courseSection =
        document.getElementById("course");

    courseSection.scrollIntoView({
        behavior: "smooth"
    });

}