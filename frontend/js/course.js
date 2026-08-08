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

        alert(
            "Chapter 1 is coming next! We will build the complete lesson page."
        );

        return;
    }


    if (chapterNumber === 2) {

        alert(
            "Chapter 2 will become available after we build the learning system."
        );

        return;
    }


    if (chapterNumber === 3) {

        alert(
            "Chapter 3 will become available after we build the learning system."
        );

        return;
    }


    if (chapterNumber === 4) {

        alert(
            "Chapter 4 will become available after we build the learning system."
        );

        return;
    }

}