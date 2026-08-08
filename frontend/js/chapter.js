// ========================================
// CHAPTER 1 JAVASCRIPT
// ========================================


// ========================================
// SETTINGS
// ========================================

const totalLessons = 6;

let completedLessons = [];

let currentLesson = 1;


// ========================================
// TIMER
// ========================================

let timerSeconds = 0;

let timerRunning = false;

let timerInterval = null;


// ========================================
// QUIZ
// ========================================

const quizQuestions = [

    {
        question:
            "Which function is used to display output in Python?",

        options: [
            "input()",
            "print()",
            "display()",
            "show()"
        ],

        answer: 1
    },


    {
        question:
            "Which symbol is used to write a comment in Python?",

        options: [
            "//",
            "/* */",
            "#",
            "<!-- -->"
        ],

        answer: 2
    },


    {
        question:
            "Which of these is a valid Python statement?",

        options: [
            "print(\"Hello\")",
            "print Hello",
            "echo(\"Hello\")",
            "System.out.println(\"Hello\")"
        ],

        answer: 0
    },


    {
        question:
            "What does input() allow a Python program to do?",

        options: [
            "Repeat code",
            "Receive information from the user",
            "Create a comment",
            "Stop the program"
        ],

        answer: 1
    },


    {
        question:
            "What is important when writing Python blocks of code?",

        options: [
            "Semicolons",
            "Brackets",
            "Indentation",
            "Dollar signs"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let quizScore = 0;

let quizAnswered = false;


// ========================================
// LOAD SAVED PROGRESS
// ========================================

function loadProgress() {

    const savedProgress =
        localStorage.getItem(
            "pylearn_chapter1_progress"
        );


    if (savedProgress) {

        completedLessons =
            JSON.parse(savedProgress);

    }


    updateLessonStatus();

    updateProgress();

}


// ========================================
// SAVE PROGRESS
// ========================================

function saveProgress() {

    localStorage.setItem(
        "pylearn_chapter1_progress",
        JSON.stringify(completedLessons)
    );

}


// ========================================
// GO TO COURSE
// ========================================

function goToCourse() {

    window.location.href =
        "course.html";

}


// ========================================
// SHOW LESSON
// ========================================

function showLesson(lessonNumber) {

    currentLesson =
        lessonNumber;


    const lessonPages =
        document.querySelectorAll(
            ".lesson-page"
        );


    lessonPages.forEach(function(page) {

        page.classList.remove(
            "active"
        );

    });


    const selectedLesson =
        document.getElementById(
            "lesson" + lessonNumber
        );


    if (selectedLesson) {

        selectedLesson.classList.add(
            "active"
        );

    }


    const lessonButtons =
        document.querySelectorAll(
            ".lesson-item"
        );


    lessonButtons.forEach(function(button) {

        button.classList.remove(
            "active"
        );

    });


    const specialButtons =
        document.querySelectorAll(
            ".special-item"
        );


    specialButtons.forEach(function(button) {

        button.classList.remove(
            "active"
        );

    });


    const selectedButton =
        document.getElementById(
            "lessonButton" + lessonNumber
        );


    if (selectedButton) {

        selectedButton.classList.add(
            "active"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    // Start quiz whenever quiz page is opened

    if (lessonNumber === 7) {

        startQuiz();

    }

}


// ========================================
// COMPLETE LESSON
// ========================================

function completeAndNext(lessonNumber) {

    if (
        !completedLessons.includes(
            lessonNumber
        )
    ) {

        completedLessons.push(
            lessonNumber
        );


        completedLessons.sort(
            function(a, b) {
                return a - b;
            }
        );

    }


    saveProgress();

    updateLessonStatus();

    updateProgress();


    if (
        lessonNumber < totalLessons
    ) {

        showLesson(
            lessonNumber + 1
        );

    }
    else {

        showLesson(7);

    }

}


// ========================================
// UPDATE LESSON STATUS
// ========================================

function updateLessonStatus() {

    for (
        let i = 1;
        i <= totalLessons;
        i++
    ) {

        const status =
            document.getElementById(
                "status" + i
            );


        const button =
            document.getElementById(
                "lessonButton" + i
            );


        if (!status || !button) {
            continue;
        }


        if (
            completedLessons.includes(i)
        ) {

            status.textContent =
                "✓";

            button.classList.add(
                "completed"
            );

        }
        else {

            status.textContent =
                "○";

            button.classList.remove(
                "completed"
            );

        }

    }

}


// ========================================
// UPDATE PROGRESS
// ========================================

function updateProgress() {

    const percentage =
        Math.round(
            (
                completedLessons.length /
                totalLessons
            ) * 100
        );


    const progressFill =
        document.getElementById(
            "chapterProgressFill"
        );


    const progressText =
        document.getElementById(
            "chapterProgressText"
        );


    if (progressFill) {

        progressFill.style.width =
            percentage + "%";

    }


    if (progressText) {

        progressText.textContent =
            percentage + "%";

    }

}


// ========================================
// QUICK CHECK
// ========================================

function checkAnswer(
    button,
    correct
) {

    const parent =
        button.parentElement;


    const buttons =
        parent.querySelectorAll(
            "button"
        );


    buttons.forEach(function(item) {

        item.classList.remove(
            "correct"
        );

        item.classList.remove(
            "wrong"
        );

    });


    if (correct) {

        button.classList.add(
            "correct"
        );


        const result =
            parent.parentElement
                .querySelector(
                    ".check-result"
                );


        if (result) {

            result.textContent =
                "Correct! Nice thinking.";

            result.style.color =
                "#86efac";

        }

    }
    else {

        button.classList.add(
            "wrong"
        );


        const result =
            parent.parentElement
                .querySelector(
                    ".check-result"
                );


        if (result) {

            result.textContent =
                "Not quite. Think about the concept again.";

            result.style.color =
                "#fca5a5";

        }

    }

}


// ========================================
// START QUIZ
// ========================================

function startQuiz() {

    currentQuestion = 0;

    quizScore = 0;

    quizAnswered = false;


    const quizCard =
        document.getElementById(
            "quizCard"
        );


    const resultCard =
        document.getElementById(
            "quizResultCard"
        );


    if (quizCard) {

        quizCard.style.display =
            "block";

    }


    if (resultCard) {

        resultCard.classList.remove(
            "show"
        );

    }


    displayQuestion();

}


// ========================================
// DISPLAY QUESTION
// ========================================

function displayQuestion() {

    quizAnswered = false;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const questionNumber =
        document.getElementById(
            "quizQuestionNumber"
        );


    const scoreDisplay =
        document.getElementById(
            "quizScore"
        );


    const questionText =
        document.getElementById(
            "quizQuestion"
        );


    const optionsContainer =
        document.getElementById(
            "quizOptions"
        );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    const nextButton =
        document.getElementById(
            "nextQuestionButton"
        );


    const progressFill =
        document.getElementById(
            "quizProgressFill"
        );


    questionNumber.textContent =
        "Question " +
        (currentQuestion + 1) +
        " of " +
        quizQuestions.length;


    scoreDisplay.textContent =
        "Score: " +
        quizScore;


    questionText.textContent =
        question.question;


    optionsContainer.innerHTML =
        "";


    feedback.textContent =
        "";


    nextButton.style.display =
        "none";


    progressFill.style.width =
        (
            (
                currentQuestion + 1
            ) /
            quizQuestions.length
        ) * 100 + "%";


    question.options.forEach(
        function(option, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.textContent =
                option;


            button.onclick =
                function() {

                    answerQuestion(
                        index,
                        button
                    );

                };


            optionsContainer.appendChild(
                button
            );

        }
    );

}


// ========================================
// ANSWER QUESTION
// ========================================

function answerQuestion(
    selectedAnswer,
    selectedButton
) {

    if (quizAnswered) {
        return;
    }


    quizAnswered = true;


    const question =
        quizQuestions[
            currentQuestion
        ];


    const buttons =
        document.querySelectorAll(
            "#quizOptions button"
        );


    buttons.forEach(
        function(button, index) {

            button.disabled =
                true;


            if (
                index ===
                question.answer
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "quizFeedback"
        );


    if (
        selectedAnswer ===
        question.answer
    ) {

        quizScore++;


        selectedButton.classList.add(
            "correct"
        );


        feedback.textContent =
            "✓ Correct!";

        feedback.style.color =
            "#86efac";

    }
    else {

        selectedButton.classList.add(
            "wrong"
        );


        feedback.textContent =
            "✗ Not quite. The correct answer is: " +
            question.options[
                question.answer
            ];

        feedback.style.color =
            "#fca5a5";

    }


    document.getElementById(
        "quizScore"
    ).textContent =
        "Score: " +
        quizScore;


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "inline-block";

}


// ========================================
// NEXT QUESTION
// ========================================

function nextQuestion() {

    if (!quizAnswered) {
        return;
    }


    currentQuestion++;


    if (
        currentQuestion <
        quizQuestions.length
    ) {

        displayQuestion();

    }
    else {

        finishQuiz();

    }

}


// ========================================
// FINISH QUIZ
// ========================================

function finishQuiz() {

    const quizCard =
        document.getElementById(
            "quizCard"
        );


    const resultCard =
        document.getElementById(
            "quizResultCard"
        );


    const finalScore =
        document.getElementById(
            "finalScore"
        );


    const finalMessage =
        document.getElementById(
            "finalMessage"
        );


    quizCard.style.display =
        "none";


    resultCard.classList.add(
        "show"
    );


    finalScore.textContent =
        quizScore +
        " / " +
        quizQuestions.length;


    if (quizScore >= 4) {

        finalMessage.textContent =
            "Excellent! You passed the Chapter 1 quiz.";


        saveQuizCompletion(true);

    }
    else {

        finalMessage.textContent =
            "You need at least 4 / 5 to pass. Review the lessons and try again.";

        saveQuizCompletion(false);

    }

}


// ========================================
// SAVE QUIZ RESULT
// ========================================

function saveQuizCompletion(
    passed
) {

    localStorage.setItem(
        "pylearn_chapter1_quiz_passed",
        passed
    );


    updateQuizSidebar();

}


// ========================================
// UPDATE QUIZ SIDEBAR
// ========================================

function updateQuizSidebar() {

    const passed =
        localStorage.getItem(
            "pylearn_chapter1_quiz_passed"
        );


    const quizButton =
        document.getElementById(
            "lessonButton7"
        );


    if (
        passed === "true" &&
        quizButton
    ) {

        quizButton.classList.add(
            "completed"
        );


        const icon =
            quizButton.querySelector(
                "span"
            );


        if (icon) {

            icon.textContent =
                "✓";

        }

    }

}


// ========================================
// BOOKMARKS
// ========================================

function toggleBookmark(
    lessonNumber
) {

    const button =
        document.getElementById(
            "bookmark" +
            lessonNumber
        );


    if (!button) {
        return;
    }


    button.classList.toggle(
        "bookmarked"
    );


    if (
        button.classList.contains(
            "bookmarked"
        )
    ) {

        button.textContent =
            "★ Bookmarked";

    }
    else {

        button.textContent =
            "☆ Bookmark";

    }

}


// ========================================
// NOTES
// ========================================

function toggleNotes() {

    const panel =
        document.querySelector(
            ".notes-panel"
        );


    panel.classList.toggle(
        "open"
    );


    loadNotes();

}


function loadNotes() {

    const notes =
        localStorage.getItem(
            "pylearn_chapter1_notes"
        );


    const textarea =
        document.getElementById(
            "chapterNotes"
        );


    if (
        notes &&
        textarea
    ) {

        textarea.value =
            notes;

    }

}


function saveNotes() {

    const textarea =
        document.getElementById(
            "chapterNotes"
        );


    const savedMessage =
        document.getElementById(
            "notesSaved"
        );


    localStorage.setItem(
        "pylearn_chapter1_notes",
        textarea.value
    );


    savedMessage.textContent =
        "Notes saved successfully.";


    setTimeout(
        function() {

            savedMessage.textContent =
                "";

        },
        2500
    );

}


// ========================================
// TIMER
// ========================================

function toggleTimer() {

    if (timerRunning) {

        stopTimer();

    }
    else {

        startTimer();

    }

}


function startTimer() {

    if (timerRunning) {
        return;
    }


    timerRunning = true;


    timerInterval =
        setInterval(
            function() {

                timerSeconds++;

                updateTimerDisplay();

            },
            1000
        );

}


function stopTimer() {

    timerRunning = false;


    clearInterval(
        timerInterval
    );

}


function updateTimerDisplay() {

    const display =
        document.getElementById(
            "timerDisplay"
        );


    if (!display) {
        return;
    }


    const hours =
        Math.floor(
            timerSeconds / 3600
        );


    const minutes =
        Math.floor(
            (
                timerSeconds % 3600
            ) / 60
        );


    const seconds =
        timerSeconds % 60;


    display.textContent =

        String(hours).padStart(
            2,
            "0"
        )

        + ":" +

        String(minutes).padStart(
            2,
            "0"
        )

        + ":" +

        String(seconds).padStart(
            2,
            "0"
        );

}


// ========================================
// PYTHON RUNNER PLACEHOLDER
// ========================================

function showRunnerMessage() {

    alert(
        "The real Python runner will be connected here."
    );

}


// ========================================
// COMPLETE CHAPTER
// ========================================

function completeChapter() {

    if (
        completedLessons.length <
        totalLessons
    ) {

        alert(
            "Complete all six lessons before marking the chapter complete."
        );

        return;

    }


    const quizPassed =
        localStorage.getItem(
            "pylearn_chapter1_quiz_passed"
        );


    if (quizPassed !== "true") {

        alert(
            "Pass the Chapter Quiz before completing the chapter."
        );

        showLesson(7);

        return;

    }


    alert(
        "Chapter complete!"
    );

}


// ========================================
// START
// ========================================

loadProgress();

updateQuizSidebar();