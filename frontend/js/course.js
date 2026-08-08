// ========================================
// PYTHON COURSE PAGE
// ========================================


// ========================================
// GO BACK TO HOME
// ========================================

function goHome() {

    window.location.href = "index.html";

}


// ========================================
// CONTINUE LEARNING
// ========================================

function continueLearning() {

    openChapter(1);

}


// ========================================
// OPEN CHAPTER
// ========================================

function openChapter(chapterNumber) {

    if (chapterNumber === 1) {

        window.location.href = "chapter1.html";

        return;
    }


    if (chapterNumber === 2) {

        alert(
            "Chapter 2 will become available after we build it."
        );

        return;
    }


    if (chapterNumber === 3) {

        alert(
            "Chapter 3 will become available after we build it."
        );

        return;
    }


    if (chapterNumber === 4) {

        alert(
            "Chapter 4 will become available after we build it."
        );

        return;
    }

}