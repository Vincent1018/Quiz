import Question from "./Question.js";
import Quiz from "./quiz.js";

const App = (() => {
    //cache the DOM- putting all the DOM elements we need in variables so we don't need to do document.querySelector for everything
    const quizEl = document.querySelector(".jabquiz");
    const quizQuestionEl = document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const taglineEl = document.querySelector(".jabquiz__tagline")
    const choicesEl = document.querySelector(".jabquiz__choices");
    const progressInnerEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restartButtonEl = document.querySelector(".restart");

    const q1 = new Question(
        "First President of US?",
        ["Barrack","Osama", "George", "Monkey"],
        2
    )
    const q2 = new Question(
        "When was Javascript created?",
        ["June 1995","May 1995", "July 1995", "Sep 1996"],
        1
    )
    const q3 = new Question(
        "What does CSS stand for?",
        ["County Sheriff Service","Cascading Sexy Sheets", "Cascading Style Sheets", "Monkey"],
        2
    )
    const q4 = new Question(
        "The full form of HTML is...?",
        ["Hyper Text Markup Language","Hold The Mic", "ERROR", "Monkey"],
        0
    )
    const q5 = new Question(
        "console.log(typeof []) would return what?",
        ["Array","Object","Null", "array"],
        1
    )

    const quiz = new Quiz([q1,q2,q3,q4,q5]);
    
    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestions = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl,question);
    }

    const renderChoicesElement = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem,index) => {
        markup += `
        <li class="jabquiz__choice">
            <input type="radio" name="choice" class="jabquiz__input" id="choice${index}">
            <label for="choice${index}" class="jabquiz__label">
                <i></i>
                <span>${elem}</span>
            </label>
        </li>
        `
        });
        setValue(choicesEl,markup);
    }

    const renderTracker =_=> {
        const index = quiz.currentIndex;

    }

    renderQuestions();
    renderChoicesElement();

    const renderAll = _ => {
        if (quiz.hasEnded()) {
            //renderEndScreen
        } else {
            //render the question   
            renderQuestions();
            //render the choices elements
            renderChoicesElement();
            //render the tracker
            //render the progress
        }
    }
})();