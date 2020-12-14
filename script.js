(function() {
  "use strict";

  let questions = [
    {
      question: "'Não tem problema compartilhar objetos, como o celular, pois o novo coronavírus não se transmite dessa forma'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Não preciso me preocupar em higienizar as compras do mercado, afinal, eu mesmo peguei da prateleira com as mãos limpas'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Se me sinto bem, não tem problema abraçar e beijar as pessoas que amo'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Os sintomas mais comuns da COVID-19 são: febre, tosse seca e cansaço'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 1
    },
    {
      question: "'É possível estar com a COVID-19 por até 14 dias antes de apresentar os sintomas'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 1
    },
    {
      question: "'Usando máscara não é possível ser infectado'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Devo procurar o Hospital quando estiver espirrando'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Pacientes cardiopatas possuem o maior risco de morte em casos graves do Novo Coronavírus'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 1
    },
    {
      question: "'Qualquer sabão serve para matar o vírus'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 1
    },
    {
      question: "'Luvas são uma ótima ideia para prevenir a doença'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Chá de boldo e caldo de cana curam COVID-19'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    },
    {
      question: "'Quando tossir, a melhor coisa a se fazer é cobrir a boca com a mão, afinal, devo evitar contaminar outras pessoas'",
      answers: ["Verdade", "Mentira"],
      correctAnswer: 2
    }
  ];

  let questionIndex,
    currentQuestion,
    score,
    timeSpent,
    quizTimer,
    questionIsAnswered,
    isQuizDone;
  let quiz = document.getElementById("quiz");

  function initQuiz() {
    quiz.classList.remove("quiz-intro");
    quiz.classList.add("quiz-started");

    questionIndex = 0;
    currentQuestion = 1;
    questionIsAnswered = 0;
    score = 0;
    timeSpent = "00:00";

    quiz.innerHTML = `<div id="progress-container"><span id="progress"></span></div>
    <div id="stats">
    <p>Questão: <span id="questionNumber">${currentQuestion}/${
      questions.length
    }</span></p>
    <p>Pontos: <span id="score">${score}</span></p>
    <p>Tempo: <span id="timer">00:00</span></p>
    </div>
    <section id="answers"></section>`;

    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    let question = questions[questionIndex];
    let answers = document.getElementById("answers");
    let answerNumber = 0;
    let output = `<h2 class="text-center bold">${currentQuestion}. ${
      question.question
    }</h2>`;

    for (let i in question.answers) {
      answerNumber++;
      output += `<div class="answer">
      <input type="radio" id="answer-${answerNumber}" name="answers" value="${answerNumber}">
      <label for="answer-${answerNumber}">
      <span class="answer-number">${answerNumber}.</span> ${question.answers[i]}
      </label>
      </div>`;
    }

    answers.innerHTML = output;
  }

  function startTimer() {
    let s = 0;
    let m = 0;
    let h = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    let timer = document.getElementById("timer");

    quizTimer = setInterval(function() {
      s++;

      if (s > 59) {
        s = 0;
        m++;
        seconds = "0" + s;
      }

      if (m > 59) {
        m = 0;
        h++;
        minutes = "00";
      }

      seconds = s > 9 ? s : "0" + s;
      minutes = m > 9 ? m : "0" + m;
      hours = h > 9 ? h : "0" + h;

      timeSpent = h
        ? hours + ":" + minutes + ":" + seconds
        : minutes + ":" + seconds;
      timer.textContent = timeSpent;
    }, 1000);
  }

  function displayResults() {
    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);
    quizTimer = null;
    isQuizDone = 1;

    let pageURL = "http://www.ibiapaba.com.br/servicos/especial-covid-19#quizverdadementira";
    let shareText = `Eu fiz este quiz sobre cuidados contra a COVID e acertei ${score} pontos de ${
      questions.length
    } perguntas. Faça você também.`;
    let fbShareURL = `https://www.facebook.com/sharer.php?u=${pageURL}&quote=${shareText}`;
    let zipzopShareURL = `https://api.whatsapp.com/send?text=${shareText} ${pageURL}`;
    let twitterShareURL = `https://twitter.com/intent/tweet?text=${shareText} ${pageURL}`;

    quiz.innerHTML = `<section id="results" class="text-center">
    <h2 class="bold">Aqui estão seus resultados:</h2>
    <p id="percentage">${scorePercentage()}%</p>
    <p>Você acertou <span class="bold">${score}</span> de <span class="bold">${
      questions.length
    }</span> questões.</p>
    <p>Confira no site do Hospital Ibiapaba CEBAMS um material completo sobre as prevenções apresentadas neste teste! <a href="http://www.ibiapaba.com.br" target="_blank">CLIQUE AQUI E CONFIRA!</a></p>
    <p style="margin-top: 10px;">Tempo gasto: <span class="bold">${timeSpent}</span></p>

    <h3 class="bold">Ccmpartilhe os resultados nas redes sociais!</h3>
    <a class="share-link fb-bg" href="${fbShareURL}" target="_blank">Facebook</a>
        <a class="share-link zipzop-bg" href="${zipzopShareURL}" target="_blank">WhatsApp</a>
    <a class="share-link twitter-bg" href="${twitterShareURL}" target="_blank">Twitter</a>

    <button type="button" id="start-over-btn" class="btn blue-btn">Começar de novo</button>
    </section>`;
  }

  function goToNextQuestion() {
    currentQuestion++;
    questionIndex++;
    questionIsAnswered = 0;

    let notification = document.getElementById("notification");
    notification.parentElement.removeChild(notification);

    let questionNumber = document.getElementById("questionNumber");
    questionNumber.textContent = `${currentQuestion}/${questions.length}`;

    displayQuestion();
  }

  function submitAnswer(e) {
    let selectedAnswer = Number(e.target.value);
    let rightAnswer = questions[questionIndex].correctAnswer;
    let answers = document.getElementsByName("answers");
    let progress = document.getElementById("progress");

    questionIsAnswered = 1;

    progress.style.width = progressPercentage() + "%";

    let notification = document.createElement("div");
    let message = document.createElement("p");
    let label = e.target.nextElementSibling;
    notification.id = "notification";

    if (selectedAnswer === rightAnswer) {
      score++;
      message.textContent = "Certa resposta!";
      label.classList.add("green-bg");
    } else {
      message.textContent = "Resposta errada. Confira ao final o motivo";
      label.classList.add("red-bg");

      answers.forEach(answer => {
        if (Number(answer.value) !== rightAnswer) return;

        answer.nextElementSibling.classList.add("green-bg");
      });
    }

    let button = document.createElement("button");
    button.classList.add("blue-btn");

    if (isLastQuestion()) {
      button.id = "show-results-btn";
      button.textContent = "Show results";
      clearInterval(quizTimer);
      quizTimer = null;
    } else {
      button.id = "next-btn";
      button.textContent = "Continue";
    }

    notification.appendChild(message);
    notification.appendChild(button);
    quiz.insertAdjacentElement("afterend", notification);

    button.focus();

    answers.forEach(answer => (answer.disabled = "disabled"));

    document.getElementById("score").textContent = score;
  }

  let scorePercentage = () => (score / questions.length * 100).toFixed(0);
  let progressPercentage = () =>
    (currentQuestion / questions.length * 100).toFixed(0);
  let isLastQuestion = () => currentQuestion === questions.length;

  function spaceBarHandler() {
    if (document.querySelector(".quiz-intro")) {
      initQuiz();
    }

    if (questionIsAnswered && quizTimer) {
      goToNextQuestion();
    }

    if (!quizTimer && !isQuizDone) {
      displayResults();
      console.log("last");
    }
  }

  function numericKeyHandler(e) {
    let answers = document.getElementsByName("answers");

    answers.forEach(answer => {
      if (answer.value === e.key) {
        if (questionIsAnswered) return;

        answer.checked = "checked";

        let event = new Event("change");
        answer.dispatchEvent(event);
        submitAnswer(event);

        questionIsAnswered = 1;
      }
    });
  }

  document.addEventListener("click", function(e) {
    if (
      e.target.matches("#start-quiz-btn") ||
      e.target.matches("#start-over-btn")
    )
      initQuiz();
    if (e.target.matches("#next-btn")) goToNextQuestion();
    if (e.target.matches("#show-results-btn")) displayResults();
  });

  document.addEventListener("change", function(e) {
    if (e.target.matches('input[type="radio"]')) submitAnswer(e);
  });

  document.addEventListener("keyup", function(e) {
    if (e.keyCode === 32) spaceBarHandler(); // init quiz / go to next question
    if (e.keyCode >= 48 && e.keyCode <= 57) numericKeyHandler(e); // choose an answer
  });

  document
    .getElementById("shortcuts-info-btn")
    .addEventListener("click", function() {
      let info = document.querySelector(".shortcuts-info");
      info.classList.toggle("display-block");
    });
})();
