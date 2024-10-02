const question = [
  {
    question: "Qual é a estrutura de dados usada no modelo de código fornecido?",
    answers: [
      "Objeto",
      "Array",
      "String"
    ],
    right: 0
  },
  {
    question: "Quantas respostas estão disponíveis para cada pergunta no modelo de código?",
    answers: [
      "Uma",
      "Duas",
      "Três"
    ],
    right: 2
  },
  {
    question: "Qual é a chave que armazena as respostas no modelo de código?",
    answers: [
      "pergunta",
      "respostas",
      "direita"
    ],
    right: 1
  },
  {
    question: "Como é indicada a resposta correta dentro do objeto de pergunta?",
    answers: [
      "Através do valor booleano true",
      "Através de um número que representa a posição da resposta correta no array de respostas",
      "Através da chave 'correta' com o número da resposta correta"
    ],
    right: 1
  },
  {
    question: "Qual é o propósito da chave 'question' no objeto de pergunta?",
    answers: [
      "Armazenar o número da pergunta",
      "Armazenar o texto da pergunta",
      "Armazenar o número da resposta correta"
    ],
    right: 1
  }
];

const quiz = document.querySelector("#quiz");
const section = document.querySelector("section");
const rightAnswers = new Set();
const totalPerguntas = question.length;
const showRightAnswers = document.querySelector("#right-answers span");

showRightAnswers.textContent = `${0} de ${totalPerguntas}`;

for (const item of question) {
  const quizItem = section.cloneNode(true);
  quizItem.querySelector("h3").textContent = item.question;

  const dl = quizItem.querySelector("dl");
  dl.innerHTML = '';

  for (const [index, resposta] of item.answers.entries()) {
    const dt = document.createElement("dt");
    const label = document.createElement("label");
    const input = document.createElement("input");

    input.setAttribute("type", "radio");
    input.setAttribute("name", `question-${question.indexOf(item)}`);
    input.setAttribute("value", index);

    label.textContent = resposta;
    label.setAttribute("for", `question-${question.indexOf(item)}-${index}`);
    input.id = `question-${question.indexOf(item)}-${index}`;

    dt.appendChild(input);
    dt.appendChild(label);
    
    dt.querySelector("input").onchange = (event) => {
      const selectedValue = parseInt(event.target.value);
      rightAnswers.delete(item);
      
      if (selectedValue === item.right) {
        rightAnswers.add(item);
      }

      showRightAnswers.textContent = `${rightAnswers.size} de ${totalPerguntas}`;
    };

    dl.appendChild(dt);
  }

  quiz.appendChild(quizItem);
}