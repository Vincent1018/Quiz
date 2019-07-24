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
        "What is Batman's true identity?",
        ["Moose Jane","Cruise Lane", "Bruce Wayne", "Roose Maine"],
        2
    )
    const q2 = new Question(
        "When was Javascript created?",
        ["June 1995","May 1995", "July 1995", "Sep 1996"],
        1
    )
    const q3 = new Question(
        "What does CSS stand for?",
        ["County Sheriff Service","Cascading Sexy Sheets", "Cascading Style Sheets", "Chicken Soy Stirfry"],
        2
    )
    const q4 = new Question(
        "The full form of HTML is...?",
        ["Hyper Text Markup Language","Hold The Mic Lower", "Have The Money Later", "Hit The Moon, Lance"],
        0
    )
    const q5 = new Question(
        "console.log(typeof []) would return what?",
        ["Array","Object","Null", "String"],
        1
    )

    const quiz = new Quiz([q1,q2,q3,q4,q5]);
    
    const listeners = _ => {
        nextButtonEl.addEventListener("click", function(){
            const selectedRadioElem = document.querySelector('input[name="choice"]:checked');//get the input element with the name of choice that is checked
            if (selectedRadioElem) {//if something is checked then...
               const key = Number(selectedRadioElem.getAttribute("data-order")); quiz.guess(key); 
               renderAll(); 
            }
        })
        restartButtonEl.addEventListener("click", function(){
            //1. reset the quiz
            quiz.reset();
            setValue(taglineEl,`Pick an option below!`);
            //2. renderAll
            renderAll();
            //3. restore the next button
            nextButtonEl.style.opacity = 1;
        })
    }

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
            <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
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
        setValue(trackerEl,`${index +1} of ${quiz.questions.length}`)
    }

    const getPercentage = (num1,num2) => {
        return Math.round((num1/num2*100));
    }

    const launch = (width, maxPercent) => {
        let loadingBar = setInterval(function(){
        if (width > maxPercent) {
            clearInterval(loadingBar);
        } else {
            width++;
            progressInnerEl.style.width = `${width}%`;
        };
        }, 3)
    }

    const renderProgress =_=> {
        //1. width
        const currentWidth = getPercentage(quiz.currentIndex,quiz.questions.length);
        //2. launch
        launch(0,currentWidth);
    }

    const renderEndScreen =_=> {
        setValue(quizQuestionEl, `Great Job!`);
        setValue(taglineEl, `Complete!`);
        setValue(trackerEl, `Your score: ${getPercentage(quiz.score,quiz.questions.length)}%`);
        nextButtonEl.style.opacity = 0;
        renderProgress();
    }

    const renderAll = _ => {
        if (quiz.hasEnded()) {
            //renderEndScreen
            renderEndScreen();
        } else {
            //render the question   
            renderQuestions();
            //render the choices elements
            renderChoicesElement();
            //render the tracker
            renderTracker();
            //render the progress
            renderProgress();
        }
    }
    return {
        renderAll: renderAll,
        listeners: listeners,
    }
})();

App.renderAll();
App.listeners();