const quizData = [
  {
    question: "What was the first permanent English settlement in North America?",
    options: ["Plymouth", "Jamestown", "Boston", "Philadelphia"],
    answer: "Jamestown",
  },
  {
    question: "Which major world war began in 1914?",
    options: ["World War I", "World War II", "Korean War", "Vietnam War"],
    answer: "World War I",
  },
  {
    question: "Who was the first person to walk on the moon?",
    options: ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "Alan Shepard"],
    answer: "Neil Armstrong",
  },
  {
    question: "What was the main cause of the French Revolution?",
    options: ["Industrial Revolution", "Enlightenment ideals", "Economic inequality", "All of the above"],
    answer: "All of the above",
  },
  {
    question: "Which city was the capital of the Ancient Roman Empire?",
    options: ["Athens", "Rome", "Constantinople", "Alexandria"],
    answer: "Rome",
  },
  // Geography
  {
    question: "What is the longest river in the world?",
    options: ["Nile", "Amazon", "Yangtze", "Mississippi-Missouri"],
    answer: "Nile",
  },
  {
    question: "On which continent is the Great Barrier Reef located?",
    options: ["Asia", "Africa", "Australia", "South America"],
    answer: "Australia",
  },
  {
    question: "What mountain range separates Europe and Asia?",
    options: ["Alps", "Himalayas", "Urals", "Andes"],
    answer: "Urals",
  },
  {
    question: "Which country borders both the Atlantic and Pacific Oceans?",
    options: ["United States", "Canada", "Mexico", "Panama"],
    answer: "Panama",
  },
  {
    question: "What is the driest desert in the world?",
    options: ["Sahara", "Gobi", "Atacama", "Kalahari"],
    answer: "Atacama",
  },
  // General Knowledge
  {
    question: "What is the scientific name for humans?",
    options: ["Homo sapiens", "Panthera leo", "Ursus arctos", "Gorilla gorilla"],
    answer: "Homo sapiens",
  },
  {
    question: "How many planets are in our solar system?",
    options: ["8", "9", "10", "11"],
    answer: "8" // Pluto is no longer considered a planet
  },
  {
    question: "What is the capital of Canada?",
    options: ["Toronto", "Ottawa", "Montreal", "Vancouver"],
    answer: "Ottawa",
  },
  {
    question: "What is the chemical symbol for iron?",
    options: ["Fe", "Cu", "Zn", "Mg"],
    answer: "Fe",
  },
  {
    question: "What is the largest living organism on Earth?",
    options: ["Blue whale", "Giant sequoia", "Honey fungus", "African elephant"],
    answer: "Giant sequoia",
  },
  {
    question: "What was the ancient kingdom centered in Axum, known for its trade and obelisks?",
    options: ["Aksum", "Kush", "Meroë", "Punt"],
    answer: "Aksum",
  },
  {
    question: "What religion became dominant in Ethiopia during the 4th century AD?",
    options: ["Islam", "Christianity", "Judaism", "Animism"],
    answer: "Christianity",
  },
  {
    question: "The historical region of Shewa is now part of which modern-day Ethiopian province?",
    options: ["Amhara", "Oromia", "Tigray", "Southern Nations, Nationalities, and Peoples' Region"],
    answer: "Oromia",
  },
  {
    question: "Who was the last Ethiopian emperor, overthrown in the 1974 revolution?",
    options: ["Haile Selassie I", "Menelik II", "Yewhahēras Tesema", "Fasil Gondar"],
    answer: "Haile Selassie I",
  },
  {
    question: "What archaeological site in Ethiopia is known for its early hominid fossils, including 'Lucy'?",
    options: ["Axum", "Lalibela", "Gondar", "Awash Valley"],
    answer: "Awash Valley",
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
let currentQuestion = 0;
let score = 0;
let incorrectAnswers = []; // Fixed variable name

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function displayQuestion() {
    const questionData = quizData[currentQuestion];
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;

    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';

    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);

    for (let i = 0; i < shuffledOptions.length; i++) {
        const option = document.createElement('label');
        option.className = 'option';

        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz';
        radio.value = shuffledOptions[i];

        const optionText = document.createTextNode(shuffledOptions[i]);

        option.appendChild(radio);
        option.appendChild(optionText);
        optionsElement.appendChild(option);
    }

    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === quizData[currentQuestion].answer) {
            score++;
        } else {
            incorrectAnswers.push({
                question: quizData[currentQuestion].question,
                incorrectAnswer: answer,
                correctAnswer: quizData[currentQuestion].answer,
            });
        }
        currentQuestion++;
        selectedOption.checked = false;
        if (currentQuestion < quizData.length) {
            displayQuestion();
        } else {
            displayResult();
        }
    }
}

function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
}

function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';

    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
        incorrectAnswersHtml += `
            <p>
                <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
                <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
                <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
            </p>
        `;
    }

    resultContainer.innerHTML = `
        <p>You scored ${score} out of ${quizData.length}!</p>
        <p>Incorrect Answers:</p>
        ${incorrectAnswersHtml}
    `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion(); // Make sure this function is defined or renamed correctly
