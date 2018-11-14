const wrapTypeform = document.getElementById('typeform');
const state = [];
let nextQueastionAble = true;
let currentIdGlobal;
// Generate array from 'a' to 'z'
const _ = 'abcdefghijklmnopqrstuvwxyz';
const __ = [..._];

// Get size of form and calculate min and max value
const heightTypeform = wrapTypeform.getBoundingClientRect().height;
const params = {
  heightTypeform,
  answers: document.querySelectorAll('.question .answer'),
  min: (heightTypeform - 200) / 2,
  max: heightTypeform - (heightTypeform - 200) / 2,
  currentTop: wrapTypeform.scrollTop
};

// Create state from DOM
const createState = ({
  attributes,
  children
}, id) => {
  if (attributes['data-type'].value === 'question') {
    return {
      type: 'question',
      value: attributes['data-value'].value,
      dataType: attributes['data-input-type'].value,
      formData: attributes['data-form-value'].value,
      id: id.toString(),
      idDOM: `tf-q-${id}`
    };
  } else if (attributes['data-type'].value === 'group') {
    const group = [];
    let idS = 0;
    for (let element in children) {
      if (children.hasOwnProperty(element)) {
        group.push(createState(children[element], id + __[idS]));
        idS++;
      };
    };

    return {type: 'group', value: attributes['data-value'].value, questions: group, id: id.toString()};
  };
};

const questions = wrapTypeform.children;

let id = 0;
for (let element in questions) {
  if (questions.hasOwnProperty(element)) {
    id++;
    state.push(createState(questions[element], id));
  };
};

// Remove old structure
wrapTypeform.innerHTML = '';

// Generate new DOM base on state

// Create DOM element for questions
const createQuestion = ({dataType, type, value, id, formData}) => {
  const wrap = document.createElement('div');
  wrap.className = 'question empty';
  wrap.id = `tf-q-${id}`;

  let answer;
  switch (dataType) {
    case 'short-text':
      answer = `<input type="text" data-regex="${dataType}" data-form-value="${formData}" class="answer" />`;
      break;
    case 'long-text':
      answer = `
        <p class="hint">To add a paragraph, press SHIFT+ENTER</p>
        <textarea class="answer" data-regex="${dataType}" data-form-value="${formData}"></textarea>
      `;
      break;
    case 'email':
      answer = `<input type="text" data-regex="${dataType}" data-form-value="${formData}" class="answer" />`;
      break;
    default:
      return '';
  };

  const title = `
    <h2 class="question-title">
      <span class="number">${id}</span>
      ${value}
     </h2>
  `;
  const hintOK = `
    <div class="hint-ok">
      <p class="next">ok</p>
      <span class="hint">press ENTER</span>
    </div>
  `;
  const hintError = `
    <div class="hint-err">
      <p id="text-error">Someting wrong!</p>
    </div>
  `;

  wrap.innerHTML = title + answer + hintOK + hintError;
  return wrap;
};

// Create DOM element for group
const createGroup = ({value, questions, id}) => {
  const groupElement = document.createElement('div');
  groupElement.className = 'group';
  const titleGroup = `
    <h2 class="group-title">
      <span class="number">${id}</span>
      ${value}
    </h2>
  `;

  groupElement.innerHTML = titleGroup;

  questions.forEach((question, index) => {
    const questionElement = createQuestion(question);
    groupElement.appendChild(questionElement);
  });

  return groupElement;
};

// Append top title for current group
const appendTitleCurrentGroup = () => {
  const titleGroup = document.createElement('div');
  titleGroup.className = 'current-group';
  wrapTypeform.appendChild(titleGroup);
  $('#typeform .current-group').hide();
};

appendTitleCurrentGroup();

// Append questions and groups
state.forEach((structure, index) => {
  if (structure.type === 'question')
    wrapTypeform.appendChild(createQuestion(structure, index + 1, index + 1));
  else if (structure.type === 'group')
    wrapTypeform.appendChild(createGroup(structure, index + 1));
  }
);

// Append number of done questions and control arrows - footer

const appendFooter = () => {
  const footer = document.createElement('div');
  footer.className = 'typeform-footer';
  const contentOfFooter = `
    <div class="content">
      <div class="answers">
        <div class="close-form">
          <div id="close-form">
            <img src="img/icons/close-typeform.png" />
          </div>
        </div>
        <div class="counter">
          <span class="count-answers"></span>
          <div class="count-line">
            <div class="current"></div>
          </div>
        </div>
      </div>
      <div class="arrows">
        <div class="arrow" id="prev-question">
          <img src="img/icons/typeform-arrow-up.png" />
        </div>
        <div class="arrow" id="next-question">
          <img src="img/icons/typeform-arrow-down.png" />
        </div>
      </div>
    </div>
  `;
  footer.innerHTML = contentOfFooter;
  wrapTypeform.appendChild(footer);
};
appendFooter();

const appendSubmitWindow = () => {
  const submit = document.createElement('div');
  submit.className = 'submit';
  const content = `
    <div>
      <h2>Thank you!</h2>
      <div class="buttons">
        <div class="sbm-btn submit-button" id="submit-form">submit</div>
        <div class="sbm-btn cancel-button" id="cancel-submit-form">cancel</div>
      </div>
    </div>
  `;
  submit.innerHTML = content;
  wrapTypeform.appendChild(submit)
};
appendSubmitWindow();
$('#typeform .submit').hide();

// Validation input
const getRegex = (type) => {
  switch (type) {
    case 'email':
      return /^([\w_\.\-\+])+\@([\w\-]+\.)+([\w]{2,10})+$/;
    default:
      return false;
  };
};

const answers = document.querySelectorAll('#typeform .answer')

const disableActive = () => {
  const activeInput = document.querySelector('#typeform .question.active');
  const activeGroup = document.querySelector('#typeform .group.active');
  if (activeInput)
    activeInput.classList.remove('active');

  if (activeGroup)
    activeGroup.classList.remove('active');
  };

const copyTitleToTop = (el) => {
  const title = document.querySelector('#typeform .current-group');
  title.innerHTML = el.innerHTML;
  $(title).fadeIn(200);
};

const hideTitle = () => {
  const title = document.querySelector('#typeform .current-group');
  $(title).fadeOut(200, () => {
    title.innerHTML = '';
  });
};

const updateAnsweredQuestions = () => {
  const answers = document.querySelectorAll('#typeform .question .answer')
  let count = 0;
  answers.forEach(answer => {
    if (answer.value)
      count++;
    }
  );
  const max = answers.length;
  const percent = 100 * count / max;
  const currentLine = document.querySelector('#typeform .typeform-footer .content .answers .count-line .current');
  currentLine.style.width = `${percent}%`;
  const currentNumber = document.querySelector('#typeform .typeform-footer .content .answers .count-answers');
  currentNumber.innerHTML = `${count} of ${max} answered`;
};
updateAnsweredQuestions();

const validationAllAnswersBeforeFinish = () => {
  const answers = document.querySelectorAll('#typeform .answer')
  let empty = false;
  let valid = true;
  answers.forEach(answer => {
    if (answer.value)
      empty = true;

    const typeRegEx = answer.attributes['data-regex'].value;
    const regex = getRegex(typeRegEx);
    const input = answer.value;
    if (regex && input)
      if (!regex.test(input))
        valid = false;
      }
    );
  const groups = document.querySelectorAll('#typeform .group');

  let groupRequired = [];
  groups.forEach(group => {
    let f = false;
    const questions = group.querySelectorAll('.question');
    questions.forEach(q => {
      if (q.querySelector('.answer').value)
        f = true;
      }
    );
    groupRequired.push(f);
  });

  return empty && valid && groupRequired.every(e => e);
};

const finishForm = () => {
  const can = validationAllAnswersBeforeFinish();
  if (can) {
    $('#typeform > div:not(.submit)').fadeOut(200, () => {
      $('#typeform .submit').fadeIn(200);
    });
  } else {
    $('#typeform .notification').html(`
      <span class="notify">Make sure you fill all required fields.</span>
    `);
    $('#typeform .notification').fadeIn(200);
  }
};

const hideTypeform = () => {
  $('#typeform .submit').fadeOut(200, () => {
    $('#typeform > div:not(.submit, .current-group)').show();
    $('#typeform').hide();
    document.getElementById('contact').style.height = 'auto';
    $('#contact .title').fadeIn(400);
    $('#contact .wrap-content').fadeIn(400);
  });
};

const closeTypeform = document.getElementById('close-form');
closeTypeform.onclick = () => {
  hideTypeform();
};

const submit = () => {
  const data = new FormData()
  const answers = document.querySelectorAll('#typeform .answer');
  answers.forEach(item => {
    data.append(item.attributes['data-form-value'].value, item.value)
    item.value = '';
  });
  console.log(data)
  fetch("/mail/contact_me.php", {
    method: 'POST',
    body: data
  }).then(res => console.log(res)).catch(err => console.error(err));

  hideTypeform();
};

const submitFormButton = document.getElementById('submit-form');
submitFormButton.onclick = () => {
  submit();
};

const cancelSubmit = () => {
  $('#typeform .submit').fadeOut(200, () => {
    $('#typeform > div:not(.submit, .current-group)').fadeIn(200, () => {
      goToCurrentQuestion();
    });
  });
};

const cancelSubmitFormButton = document.getElementById('cancel-submit-form');
cancelSubmitFormButton.onclick = () => {
  cancelSubmit();
};

const goToNextQuestion = () => {
  if (nextQueastionAble) {
    const currentId = document.querySelector('#typeform .question.active').id;
    const questions = document.querySelectorAll('#typeform .question');
    let nextId = currentId;
    questions.forEach((element, index) => {
      const id = element.id;
      if (id === currentId)
        nextId = questions[index + 1]
          ? questions[index + 1].id
          : false;
      }
    );
    if (nextId) {
      const topToNext = $(`#${nextId}`).position().top;

      const scrollTop = nextId !== questions[questions.length - 1].id
        ? (topToNext - params.min + params.currentTop)
        : wrapTypeform.scrollHeight;

      $(wrapTypeform).animate({
        scrollTop: scrollTop
      }, 200)
      params.currentTop = scrollTop;
    } else {
      finishForm();
    };
    currentIdGlobal = nextId;
    updateAnsweredQuestions();
  }
};

const goToPrevQuestion = () => {
  if (nextQueastionAble) {
    const currentId = document.querySelector('.question.active').id;
    const questions = document.querySelectorAll('#typeform .question');
    let prevId = currentId;
    questions.forEach((element, index) => {
      const id = element.id;
      if (id === currentId)
        prevId = questions[index - 1]
          ? questions[index - 1].id
          : false;
      }
    );
    if (prevId) {
      const topToNext = $(`#${prevId}`).position().top;

      const scrollTop = prevId !== questions[0].id
        ? (topToNext - params.min + params.currentTop)
        : 0;

      $(wrapTypeform).animate({
        scrollTop: scrollTop
      }, 200)
      params.currentTop = scrollTop;
    };
    currentIdGlobal = prevId;
    updateAnsweredQuestions();
  };
};

const goToCurrentQuestion = () => {
  const questions = document.querySelectorAll('#typeform .question');
  let localId = document.querySelector('#typeform .question.active').id;
  questions.forEach((element, index) => {
    const id = element.id;
    if (id === currentIdGlobal)
      localId = questions[index].id
  });

  const topToNext = $(`#${localId}`).position().top;

  let scrollTop = localId !== questions[0].id
    ? (topToNext - params.min + params.currentTop)
    : 0;

  scrollTop = localId !== questions[questions.length - 1].id
    ? scrollTop
    : wrapTypeform.scrollHeight;

  wrapTypeform.scrollTop = scrollTop;

  params.currentTop = scrollTop;
  currentIdGlobal = localId;
  updateAnsweredQuestions();
}

// Add event handler
answers.forEach(item => {
  // input event - validation input
  item.oninput = function() {
    const typeRegEx = item.attributes['data-regex'].value;
    const regex = getRegex(typeRegEx);
    const input = this.value;
    item.parentNode.classList.remove('valid', 'notvalid', 'empty');

    if (regex && input) {
      if (regex.test(input)) {
        item.parentNode.classList.add('valid');
        nextQueastionAble = true;
      } else {
        item.parentNode.classList.add('notvalid');
        nextQueastionAble = false;
      };
    } else if (!input) {
      item.parentNode.classList.add('empty');
      nextQueastionAble = true;
    } else if (!regex) {
      item.parentNode.classList.add('valid');
      nextQueastionAble = true;
    };
  };
  // focus event - activation input
  item.onfocus = function() {
    disableActive();
    const parent = item.parentNode;
    if (parent.parentNode.classList.contains('group')) {
      copyTitleToTop(parent.parentNode.children[0]);
      parent.classList.add('active');
      parent.parentNode.classList.add('active');
    } else {
      parent.classList.add('active');
      hideTitle();
    };
  };

  // keypress event - next question if enter, new line iif shift+enter
  item.onkeypress = function(e) {
    if (item.attributes['data-regex'].value === 'long-text')
      if (e.shiftKey && e.code === 'Enter') {
        const pStart = item.selectionStart;
        const pEnd = item.selectionEnd;
        const str = item.value;
        item.value = pEnd !== str.length
          ? str.slice(0, pStart) + str.slice(pEnd, str.length)
          : str.slice(0, pStart) + '\n' + str.slice(pEnd, str.length)
        item.selectionStart = pStart;
        item.selectionEnd = pStart;
      }

    if (e.code === 'Enter' && nextQueastionAble && !e.shiftKey) {
      e.preventDefault();
      goToNextQuestion();
    };
  };

  // Disable TAB event
  item.onkeydown = function(e) {
    if (e.code === 'Tab')
      e.preventDefault();
    };
});

const arrowUp = document.getElementById('prev-question')
arrowUp.onclick = _ => {
  goToPrevQuestion();
};

const arrowDown = document.getElementById('next-question')

arrowDown.onclick = _ => {
  goToNextQuestion();
};

const next = document.querySelectorAll('#typeform .question .hint-ok .next');
next.forEach(e => {
  e.onclick = () => {
    goToNextQuestion();
  };
});

const getRange = (min, max) => [...new Array(max).keys()].slice(min, max);

// Focus input when scrolling
wrapTypeform.onscroll = function() {
  const range = getRange(params.min, params.max);
  params.currentTop = this.scrollTop;
  if (this.scrollTop > 0)
    answers.forEach(answer => {
      const topAnswer = $(answer).position().top;
      if (range.includes(topAnswer))
        answer.focus();
      }
    );
  else
    answers[0].focus();
  }
;

$('#typeform').hide();
