const STORAGE = {
  questions: "examai_questions",
  durations: "examai_durations",
  results: "examai_results",
  theme: "examai_theme"
};

const sectionSubjects = {
  RRB: ["General Knowledge", "Mathematics", "Reasoning", "General Science", "Computer Fundamentals"],
  NEET: ["Physics", "Chemistry", "Biology"],
  JEE: ["Physics", "Chemistry", "Mathematics"],
  SSC: ["General Knowledge", "Mathematics", "English", "Reasoning"],
  UPSC: ["History", "Geography", "Indian Polity", "Economy", "Current Affairs", "Environment"],
  Banking: ["Quantitative Aptitude", "Reasoning", "English", "Computer Fundamentals", "Banking Awareness"],
  "General Practice": ["General Knowledge", "Computer Fundamentals", "C Programming", "Mathematics", "English"]
};
const subjects = [...new Set(Object.values(sectionSubjects).flat())];
const sectionExams = {
  RRB: ["RRB NTPC", "RRB Group D", "RRB ALP", "RRB Technician", "RRB JE"],
  NEET: ["NEET UG", "NEET PG", "NEET MDS", "NEET SS"],
  JEE: ["JEE Main", "JEE Advanced", "JEE Mock Test", "JEE Chapter Practice"],
  SSC: ["SSC CGL", "SSC CHSL", "SSC MTS", "SSC GD", "SSC CPO"],
  UPSC: ["UPSC CSE Prelims", "UPSC CSE Mains", "UPSC NDA", "UPSC CDS", "UPSC CAPF"],
  Banking: ["IBPS PO", "IBPS Clerk", "SBI PO", "SBI Clerk", "RBI Assistant"],
  "General Practice": ["General Mock Test", "Subject Practice", "Mixed Practice"]
};
const examPools = {
  RRB: sectionSubjects.RRB,
  NEET: sectionSubjects.NEET,
  JEE: sectionSubjects.JEE,
  SSC: sectionSubjects.SSC,
  UPSC: sectionSubjects.UPSC,
  Banking: sectionSubjects.Banking,
  "General Practice": sectionSubjects["General Practice"]
};
const defaultDurations = { 25: 25, 50: 50, 90: 90 };
const passMark = 40;

const sampleQuestions = [
  q("General Knowledge", "Who is known as the Father of the Indian Constitution?", ["B. R. Ambedkar", "Mahatma Gandhi", "Jawaharlal Nehru", "Sardar Patel"], 0),
  q("General Knowledge", "Which planet is called the Red Planet?", ["Mars", "Venus", "Jupiter", "Mercury"], 0),
  q("General Knowledge", "The United Nations was established in which year?", ["1945", "1950", "1939", "1965"], 0),
  q("General Knowledge", "Which river is the longest in the world?", ["Nile", "Amazon", "Ganga", "Yangtze"], 0),
  q("General Knowledge", "Which is the largest democracy in the world?", ["India", "United States", "Brazil", "Japan"], 0),
  q("General Knowledge", "What is the capital of Australia?", ["Canberra", "Sydney", "Melbourne", "Perth"], 0),
  q("General Knowledge", "Which gas is most abundant in Earth's atmosphere?", ["Nitrogen", "Oxygen", "Carbon dioxide", "Hydrogen"], 0),
  q("General Knowledge", "Who wrote the national song Vande Mataram?", ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"], 0),
  q("General Knowledge", "Which Indian state has the longest coastline?", ["Gujarat", "Tamil Nadu", "Maharashtra", "Kerala"], 0),
  q("General Knowledge", "The Olympic Games are held every how many years?", ["4", "2", "3", "5"], 0),

  q("Computer Fundamentals", "CPU stands for:", ["Central Processing Unit", "Central Program Utility", "Computer Primary Unit", "Control Processing User"], 0),
  q("Computer Fundamentals", "Which memory is volatile?", ["RAM", "ROM", "Hard disk", "DVD"], 0),
  q("Computer Fundamentals", "Which device is used to connect networks?", ["Router", "Printer", "Scanner", "Monitor"], 0),
  q("Computer Fundamentals", "HTML is primarily used to create:", ["Web pages", "Operating systems", "Databases", "Antivirus tools"], 0),
  q("Computer Fundamentals", "Which is an input device?", ["Keyboard", "Monitor", "Speaker", "Projector"], 0),
  q("Computer Fundamentals", "1 byte equals:", ["8 bits", "4 bits", "16 bits", "32 bits"], 0),
  q("Computer Fundamentals", "Which software manages computer hardware?", ["Operating system", "Spreadsheet", "Browser", "Compiler"], 0),
  q("Computer Fundamentals", "What does URL stand for?", ["Uniform Resource Locator", "Universal Record Link", "User Resource Line", "Uniform Readable List"], 0),
  q("Computer Fundamentals", "Which protocol is used for secure web browsing?", ["HTTPS", "FTP", "SMTP", "POP3"], 0),
  q("Computer Fundamentals", "Which storage is usually fastest?", ["Cache memory", "DVD", "Magnetic tape", "External HDD"], 0),

  q("C Programming", "Which symbol ends a statement in C?", ["Semicolon", "Colon", "Comma", "Period"], 0),
  q("C Programming", "Which header file is used for printf and scanf?", ["stdio.h", "stdlib.h", "string.h", "math.h"], 0),
  q("C Programming", "Array index in C starts from:", ["0", "1", "-1", "Depends on compiler"], 0),
  q("C Programming", "Which keyword is used to return a value from a function?", ["return", "break", "continue", "switch"], 0),
  q("C Programming", "Which operator gives the address of a variable?", ["&", "*", "%", "#"], 0),
  q("C Programming", "Which loop executes at least once?", ["do while", "for", "while", "if"], 0),
  q("C Programming", "Which format specifier is used for integer?", ["%d", "%f", "%c", "%s"], 0),
  q("C Programming", "What is a pointer?", ["Variable storing an address", "Loop counter", "Header file", "Data type only for strings"], 0),
  q("C Programming", "Which function reads a character from stdin?", ["getchar()", "puts()", "strlen()", "malloc()"], 0),
  q("C Programming", "Which keyword defines a constant value?", ["const", "static", "auto", "extern"], 0),

  q("Mathematics", "What is 15% of 200?", ["30", "20", "25", "35"], 0),
  q("Mathematics", "The value of 12 × 8 is:", ["96", "86", "108", "88"], 0),
  q("Mathematics", "If x + 7 = 15, x equals:", ["8", "7", "9", "22"], 0),
  q("Mathematics", "The square root of 144 is:", ["12", "14", "16", "10"], 0),
  q("Mathematics", "A triangle has how many sides?", ["3", "4", "5", "6"], 0),
  q("Mathematics", "The next prime number after 7 is:", ["11", "9", "10", "13"], 0),
  q("Mathematics", "What is the perimeter of a square with side 6?", ["24", "12", "18", "36"], 0),
  q("Mathematics", "Which is equivalent to 3/4?", ["0.75", "0.25", "0.50", "1.25"], 0),
  q("Mathematics", "The average of 10, 20, and 30 is:", ["20", "15", "25", "30"], 0),
  q("Mathematics", "What is 2 cubed?", ["8", "4", "6", "9"], 0),

  q("English", "Choose the correct synonym of 'rapid'.", ["Fast", "Slow", "Late", "Weak"], 0),
  q("English", "Choose the antonym of 'ancient'.", ["Modern", "Old", "Historic", "Past"], 0),
  q("English", "Select the correct spelling.", ["Necessary", "Necesary", "Neccessary", "Necessery"], 0),
  q("English", "Identify the noun: 'The teacher smiled.'", ["teacher", "smiled", "the", "none"], 0),
  q("English", "Fill in the blank: She ___ to school daily.", ["goes", "go", "going", "gone"], 0),
  q("English", "Which sentence is correct?", ["He has finished his work.", "He have finished his work.", "He finished has work.", "He finish his work."], 0),
  q("English", "A group of words with a subject and predicate is a:", ["Clause", "Letter", "Prefix", "Syllable"], 0),
  q("English", "Choose the correct article: ___ honest man.", ["An", "A", "The", "No article"], 0),
  q("English", "The plural of 'child' is:", ["children", "childs", "childes", "childrens"], 0),
  q("English", "Choose the correct preposition: He is good ___ mathematics.", ["at", "in", "on", "by"], 0),

  q("Physics", "The SI unit of force is:", ["Newton", "Joule", "Watt", "Pascal"], 0),
  q("Physics", "Acceleration due to gravity near Earth is approximately:", ["9.8 m/s²", "3.0 m/s²", "12.5 m/s²", "1.6 m/s²"], 0),
  q("Physics", "Which quantity is measured in ohms?", ["Resistance", "Current", "Voltage", "Power"], 0),
  q("Physics", "Light year is a unit of:", ["Distance", "Time", "Speed", "Mass"], 0),
  q("Physics", "The device used to measure electric current is:", ["Ammeter", "Voltmeter", "Barometer", "Thermometer"], 0),

  q("Chemistry", "The chemical symbol of sodium is:", ["Na", "So", "S", "N"], 0),
  q("Chemistry", "Water has the chemical formula:", ["H2O", "CO2", "NaCl", "O2"], 0),
  q("Chemistry", "A pH less than 7 indicates:", ["Acidic nature", "Basic nature", "Neutral nature", "Metallic nature"], 0),
  q("Chemistry", "The atomic number of carbon is:", ["6", "8", "12", "14"], 0),
  q("Chemistry", "Which gas is released during photosynthesis?", ["Oxygen", "Nitrogen", "Hydrogen", "Methane"], 0),

  q("Biology", "The basic unit of life is:", ["Cell", "Tissue", "Organ", "Organ system"], 0),
  q("Biology", "Which organ pumps blood in the human body?", ["Heart", "Liver", "Lung", "Kidney"], 0),
  q("Biology", "DNA stands for:", ["Deoxyribonucleic acid", "Dynamic nuclear acid", "Double nutrient acid", "Deoxy natural acid"], 0),
  q("Biology", "Plants prepare food by:", ["Photosynthesis", "Respiration", "Transpiration", "Fermentation"], 0),
  q("Biology", "The largest organ of the human body is:", ["Skin", "Brain", "Liver", "Heart"], 0),

  q("Reasoning", "Find the next term: 2, 4, 8, 16, __", ["32", "24", "30", "20"], 0),
  q("Reasoning", "If CAT is coded as DBU, DOG is coded as:", ["EPH", "CNE", "FQI", "DPI"], 0),
  q("Reasoning", "Odd one out:", ["Square", "Triangle", "Circle", "Rectangle"], 2),
  q("Reasoning", "A is brother of B. B is sister of C. A is C's:", ["Brother", "Sister", "Father", "Mother"], 0),
  q("Reasoning", "Which direction is opposite to North-East?", ["South-West", "South-East", "North-West", "West"], 0),

  q("General Science", "Which vitamin is produced in skin by sunlight?", ["Vitamin D", "Vitamin A", "Vitamin C", "Vitamin K"], 0),
  q("General Science", "Boiling point of water at sea level is:", ["100°C", "90°C", "80°C", "120°C"], 0),
  q("General Science", "Which part of plant absorbs water?", ["Root", "Leaf", "Flower", "Fruit"], 0),
  q("General Science", "Sound cannot travel through:", ["Vacuum", "Water", "Air", "Steel"], 0),
  q("General Science", "The main source of energy on Earth is:", ["Sun", "Moon", "Wind", "Coal"], 0),

  q("History", "The Battle of Plassey was fought in:", ["1757", "1857", "1764", "1947"], 0),
  q("History", "Who founded the Maurya Empire?", ["Chandragupta Maurya", "Ashoka", "Bindusara", "Harsha"], 0),
  q("Geography", "Which is the largest continent?", ["Asia", "Africa", "Europe", "Australia"], 0),
  q("Geography", "The Tropic of Cancer passes through:", ["India", "Australia", "Russia", "Argentina"], 0),
  q("Indian Polity", "India is described as a ___ in the Constitution.", ["Sovereign socialist secular democratic republic", "Monarchy", "Confederation", "Military state"], 0),
  q("Indian Polity", "Fundamental Rights are in which part of the Constitution?", ["Part III", "Part I", "Part IV", "Part V"], 0),
  q("Economy", "GDP stands for:", ["Gross Domestic Product", "General Domestic Price", "Gross Development Plan", "Global Demand Product"], 0),
  q("Economy", "RBI is India's:", ["Central bank", "Tax department", "Insurance company", "Stock exchange"], 0),
  q("Current Affairs", "Current affairs questions mainly test:", ["Recent events", "Only grammar", "Only algebra", "Only coding"], 0),
  q("Environment", "The greenhouse gas among these is:", ["Carbon dioxide", "Oxygen", "Nitrogen", "Argon"], 0),

  q("Quantitative Aptitude", "A number increased by 20% becomes 120. The number is:", ["100", "90", "110", "80"], 0),
  q("Quantitative Aptitude", "Simple interest on 1000 at 10% for 2 years is:", ["200", "100", "120", "220"], 0),
  q("Quantitative Aptitude", "If 5 workers finish work in 10 days, 10 workers finish it in:", ["5 days", "10 days", "15 days", "20 days"], 0),
  q("Banking Awareness", "KYC in banking stands for:", ["Know Your Customer", "Keep Your Cash", "Key Yield Credit", "Know Your Cheque"], 0),
  q("Banking Awareness", "ATM stands for:", ["Automated Teller Machine", "Automatic Tax Machine", "Account Transfer Mode", "Automated Trade Market"], 0)
];

let state = {
  questions: [],
  durations: { ...defaultDurations },
  results: [],
  currentExam: null,
  timerId: null
};

function q(subject, text, options, correct) {
  return { id: crypto.randomUUID(), subject, text, options, correct };
}

function loadState() {
  state.questions = JSON.parse(localStorage.getItem(STORAGE.questions) || "null") || sampleQuestions;
  const existingKeys = new Set(state.questions.map(item => `${item.subject}|${item.text}`));
  const missingSamples = sampleQuestions.filter(item => !existingKeys.has(`${item.subject}|${item.text}`));
  if (missingSamples.length) {
    state.questions = [...state.questions, ...missingSamples];
    saveQuestions();
  }
  state.durations = JSON.parse(localStorage.getItem(STORAGE.durations) || "null") || { ...defaultDurations };
  state.results = JSON.parse(localStorage.getItem(STORAGE.results) || "[]");
  document.documentElement.dataset.theme = localStorage.getItem(STORAGE.theme) || "light";
  document.querySelector("#themeToggle").textContent = document.documentElement.dataset.theme === "dark" ? "☀" : "☾";
}

function saveQuestions() { localStorage.setItem(STORAGE.questions, JSON.stringify(state.questions)); }
function saveDurations() { localStorage.setItem(STORAGE.durations, JSON.stringify(state.durations)); }
function saveResults() { localStorage.setItem(STORAGE.results, JSON.stringify(state.results)); }

function showView(name) {
  document.querySelectorAll(".view").forEach(view => view.classList.remove("active"));
  document.querySelector(`#${name}View`).classList.add("active");
  if (name === "admin") renderAdmin();
  if (name === "leaderboard") renderLeaderboard();
}

function renderExamNames() {
  const section = document.querySelector("#examSectionSelect").value;
  const exams = sectionExams[section] || sectionExams["General Practice"];
  document.querySelector("#examNameSelect").innerHTML = exams.map(exam => `<option>${exam}</option>`).join("");
}

function renderSubjects() {
  const section = document.querySelector("#examSectionSelect").value;
  const options = [...(sectionSubjects[section] || sectionSubjects["General Practice"]), "Mixed Subjects"];
  document.querySelector("#subjectSelect").innerHTML = options.map(subject => `<option>${subject}</option>`).join("");
}

function renderAdminSubjects() {
  document.querySelector("#adminSubject").innerHTML = subjects.map(subject => `<option>${subject}</option>`).join("");
  const filter = document.querySelector("#filterSubject");
  filter.innerHTML = `<option value="All">All Subjects</option>${subjects.map(subject => `<option>${subject}</option>`).join("")}`;
}

function renderSectionControls() {
  renderExamNames();
  renderSubjects();
}

function toast(message) {
  const box = document.querySelector("#toast");
  box.textContent = message;
  box.classList.add("show");
  setTimeout(() => box.classList.remove("show"), 2800);
}

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildExamQuestions(section, subject, count) {
  const allowedSubjects = examPools[section] || subjects;
  const sectionPool = state.questions.filter(item => allowedSubjects.includes(item.subject));
  const pool = subject === "Mixed Subjects"
    ? sectionPool
    : allowedSubjects.includes(subject)
      ? sectionPool.filter(item => item.subject === subject)
      : [];
  const expanded = [];
  while (expanded.length < count) {
    expanded.push(...shuffle(pool));
    if (!pool.length) break;
  }
  return shuffle(expanded).slice(0, count).map(item => {
    const indexed = item.options.map((text, index) => ({ text, originalIndex: index }));
    const options = shuffle(indexed);
    return {
      ...item,
      instanceId: crypto.randomUUID(),
      options: options.map(option => option.text),
      correct: options.findIndex(option => option.originalIndex === item.correct)
    };
  });
}

function startExam(event) {
  event.preventDefault();
  const name = document.querySelector("#studentName").value.trim();
  const section = document.querySelector("#examSectionSelect").value;
  const examName = document.querySelector("#examNameSelect").value;
  const subject = document.querySelector("#subjectSelect").value;
  const count = Number(document.querySelector("#questionCount").value);
  const questions = buildExamQuestions(section, subject, count);

  if (questions.length < count) {
    toast("Add more questions in Admin before starting this exam.");
    return;
  }

  state.currentExam = {
    id: crypto.randomUUID(),
    name,
    section,
    examName,
    subject,
    count,
    questions,
    answers: Array(count).fill(null),
    review: Array(count).fill(false),
    current: 0,
    warnings: 0,
    remaining: (state.durations[count] || count) * 60,
    startedAt: new Date().toISOString()
  };

  document.querySelector("#examStudent").textContent = name;
  document.querySelector("#examSubject").textContent = `${section} - ${examName} - ${subject} - ${count} questions`;
  showView("exam");
  renderExam();
  startTimer();
}

function startTimer() {
  clearInterval(state.timerId);
  state.timerId = setInterval(() => {
    if (!state.currentExam) return;
    state.currentExam.remaining -= 1;
    renderTimer();
    if (state.currentExam.remaining <= 0) {
      clearInterval(state.timerId);
      submitExam(true);
    }
  }, 1000);
  renderTimer();
}

function renderTimer() {
  const seconds = Math.max(0, state.currentExam?.remaining || 0);
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  document.querySelector("#timer").textContent = `${min}:${sec}`;
}

function renderExam() {
  const exam = state.currentExam;
  const index = exam.current;
  const question = exam.questions[index];
  const attempted = exam.answers.filter(answer => answer !== null).length;

  document.querySelector("#questionMeta").textContent = `Question ${index + 1} of ${exam.count}`;
  document.querySelector("#subjectBadge").textContent = question.subject;
  document.querySelector("#questionText").textContent = question.text;
  document.querySelector("#answeredCount").textContent = `${attempted} answered`;
  document.querySelector("#progressBar").style.width = `${Math.round((attempted / exam.count) * 100)}%`;
  document.querySelector("#reviewBtn").textContent = exam.review[index] ? "Unmark Review" : "Mark for Review";
  document.querySelector("#prevBtn").disabled = index === 0;
  document.querySelector("#nextBtn").disabled = index === exam.count - 1;

  const options = document.querySelector("#optionsList");
  options.innerHTML = question.options.map((option, optionIndex) => `
    <button class="option ${exam.answers[index] === optionIndex ? "selected" : ""}" type="button" data-option="${optionIndex}">
      <strong>${String.fromCharCode(65 + optionIndex)}</strong>
      <span>${escapeHtml(option)}</span>
    </button>
  `).join("");

  const palette = document.querySelector("#questionPalette");
  palette.innerHTML = exam.questions.map((_, i) => {
    const classes = [
      i === index ? "current" : "",
      exam.answers[i] !== null ? "answered" : "",
      exam.review[i] ? "review" : ""
    ].join(" ");
    return `<button type="button" class="${classes}" data-question="${i}">${i + 1}</button>`;
  }).join("");
}

function submitExam(auto = false) {
  const exam = state.currentExam;
  if (!exam) return;
  clearInterval(state.timerId);

  const attempted = exam.answers.filter(answer => answer !== null).length;
  let correct = 0;
  exam.questions.forEach((question, index) => {
    if (exam.answers[index] === question.correct) correct += 1;
  });
  const wrong = attempted - correct;
  const unanswered = exam.count - attempted;
  const percentage = Math.round((correct / exam.count) * 10000) / 100;
  const result = {
    id: exam.id,
    name: exam.name,
    section: exam.section,
    examName: exam.examName,
    subject: exam.subject,
    total: exam.count,
    attempted,
    correct,
    wrong,
    unanswered,
    percentage,
    passed: percentage >= passMark,
    warnings: exam.warnings,
    date: new Date().toLocaleString(),
    autoSubmitted: auto,
    questions: exam.questions,
    answers: exam.answers
  };

  state.results.unshift(result);
  saveResults();
  state.currentExam = null;
  renderResult(result);
  showView("result");
  if (auto) toast("Time is over. Your exam was submitted automatically.");
}

function renderResult(result) {
  document.querySelector("#resultTitle").textContent = `${result.name} - ${result.examName || result.section || "General Practice"} - ${result.subject}`;
  document.querySelector("#scorePercent").textContent = `${result.percentage}%`;
  document.querySelector(".score-ring").style.setProperty("--score", `${result.percentage}%`);
  const status = document.querySelector("#passStatus");
  status.textContent = result.passed ? "PASS" : "FAIL";
  status.style.background = result.passed ? "rgba(22, 138, 91, .16)" : "rgba(195, 57, 57, .16)";
  status.style.color = result.passed ? "var(--success)" : "var(--danger)";

  const metrics = [
    ["Total", result.total],
    ["Attempted", result.attempted],
    ["Correct", result.correct],
    ["Wrong", result.wrong],
    ["Unanswered", result.unanswered]
  ];
  document.querySelector("#summaryCards").innerHTML = metrics.map(([label, value]) => `
    <div class="metric"><strong>${value}</strong><span>${label}</span></div>
  `).join("");

  document.querySelector("#answerReview").innerHTML = result.questions.map((question, index) => {
    const answer = result.answers[index];
    const statusClass = answer === null ? "unanswered" : answer === question.correct ? "correct" : "wrong";
    const userAnswer = answer === null ? "Not answered" : `${letter(answer)}. ${question.options[answer]}`;
    return `
      <div class="review-item ${statusClass}">
        <strong>Q${index + 1}. ${escapeHtml(question.text)}</strong>
        <p>Your answer: ${escapeHtml(userAnswer)}</p>
        <p>Correct answer: ${letter(question.correct)}. ${escapeHtml(question.options[question.correct])}</p>
      </div>
    `;
  }).join("");

  drawChart(result);
  window.latestResult = result;
}

function drawChart(result) {
  const canvas = document.querySelector("#summaryChart");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const data = [
    ["Correct", result.correct, "#168a5b"],
    ["Wrong", result.wrong, "#c33939"],
    ["Unanswered", result.unanswered, "#d48806"]
  ];
  const max = Math.max(1, result.total);
  ctx.font = "600 14px Inter, sans-serif";
  data.forEach((row, i) => {
    const [label, value, color] = row;
    const y = 42 + i * 68;
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--muted");
    ctx.fillText(label, 26, y);
    ctx.fillStyle = color;
    ctx.fillRect(140, y - 18, Math.max(2, (value / max) * 330), 28);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--text");
    ctx.fillText(String(value), 485, y);
  });
}

function renderLeaderboard() {
  const top = [...state.results].sort((a, b) => b.percentage - a.percentage || b.correct - a.correct).slice(0, 20);
  document.querySelector("#leaderboardTable").innerHTML = top.length ? top.map((result, index) => `
    <tr>
      <td>#${index + 1}</td><td>${escapeHtml(result.name)}</td><td>${result.examName || result.section || "General Practice"} - ${result.subject}</td>
      <td>${result.total}</td><td>${result.percentage}%</td><td>${result.date}</td>
    </tr>
  `).join("") : `<tr><td colspan="6">No results yet.</td></tr>`;
}

function renderAdmin() {
  document.querySelector("#duration25").value = state.durations[25];
  document.querySelector("#duration50").value = state.durations[50];
  document.querySelector("#duration90").value = state.durations[90];
  const filter = document.querySelector("#filterSubject").value;
  const list = filter === "All" ? state.questions : state.questions.filter(item => item.subject === filter);
  document.querySelector("#adminQuestions").innerHTML = list.map(item => `
    <div class="admin-question">
      <div>
        <strong>${escapeHtml(item.text)}</strong>
        <p>${item.subject} - Correct: ${letter(item.correct)}. ${escapeHtml(item.options[item.correct])}</p>
      </div>
      <div class="admin-actions">
        <button class="secondary-btn" type="button" data-edit="${item.id}">Edit</button>
        <button class="ghost-btn" type="button" data-delete="${item.id}">Delete</button>
      </div>
    </div>
  `).join("");

  document.querySelector("#resultsTable").innerHTML = state.results.length ? state.results.map(result => `
    <tr>
      <td>${escapeHtml(result.name)}</td><td>${result.examName || result.section || "General Practice"} - ${result.subject}</td><td>${result.total}</td>
      <td>${result.attempted}</td><td>${result.correct}</td><td>${result.percentage}%</td>
      <td>${result.passed ? "Pass" : "Fail"}</td><td>${result.date}</td>
    </tr>
  `).join("") : `<tr><td colspan="8">No student results yet.</td></tr>`;
}

function saveAdminQuestion(event) {
  event.preventDefault();
  const id = document.querySelector("#editQuestionId").value;
  const next = {
    id: id || crypto.randomUUID(),
    subject: document.querySelector("#adminSubject").value,
    text: document.querySelector("#adminQuestion").value.trim(),
    options: ["#optA", "#optB", "#optC", "#optD"].map(selector => document.querySelector(selector).value.trim()),
    correct: Number(document.querySelector("#correctOption").value)
  };
  if (id) {
    state.questions = state.questions.map(item => item.id === id ? next : item);
  } else {
    state.questions.unshift(next);
  }
  saveQuestions();
  event.target.reset();
  document.querySelector("#editQuestionId").value = "";
  renderAdmin();
  toast("Question saved.");
}

function parseCsv(text) {
  const rows = [];
  let cell = "";
  let row = [];
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      i++;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (cell || row.length) {
        row.push(cell.trim());
        rows.push(row);
        row = [];
        cell = "";
      }
    } else {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

function importCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = parseCsv(reader.result).filter(row => row.length >= 7);
    const hasHeader = rows[0]?.[0]?.toLowerCase() === "subject";
    const imported = rows.slice(hasHeader ? 1 : 0).map(row => ({
      id: crypto.randomUUID(),
      subject: row[0],
      text: row[1],
      options: [row[2], row[3], row[4], row[5]],
      correct: /^[ABCD]$/i.test(row[6]) ? row[6].toUpperCase().charCodeAt(0) - 65 : Number(row[6])
    })).filter(item => subjects.includes(item.subject) && item.text && item.options.every(Boolean) && item.correct >= 0 && item.correct <= 3);
    state.questions.unshift(...imported);
    saveQuestions();
    renderAdmin();
    toast(`${imported.length} questions imported.`);
  };
  reader.readAsText(file);
}

function letter(index) {
  return String.fromCharCode(65 + index);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[char]));
}

document.addEventListener("click", event => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) showView(viewButton.dataset.view);

  const pickedExam = event.target.closest("[data-pick-section]");
  if (pickedExam) {
    document.querySelector("#examSectionSelect").value = pickedExam.dataset.pickSection;
    renderSectionControls();
    document.querySelector(".exam-card").scrollIntoView({ behavior: "smooth", block: "center" });
    toast(`${pickedExam.dataset.pickSection} section selected.`);
  }

  const option = event.target.closest("[data-option]");
  if (option && state.currentExam) {
    state.currentExam.answers[state.currentExam.current] = Number(option.dataset.option);
    renderExam();
  }

  const palette = event.target.closest("[data-question]");
  if (palette && state.currentExam) {
    state.currentExam.current = Number(palette.dataset.question);
    renderExam();
  }

  const edit = event.target.closest("[data-edit]");
  if (edit) {
    const item = state.questions.find(question => question.id === edit.dataset.edit);
    document.querySelector("#editQuestionId").value = item.id;
    document.querySelector("#adminSubject").value = item.subject;
    document.querySelector("#adminQuestion").value = item.text;
    ["#optA", "#optB", "#optC", "#optD"].forEach((selector, index) => document.querySelector(selector).value = item.options[index]);
    document.querySelector("#correctOption").value = item.correct;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const del = event.target.closest("[data-delete]");
  if (del) {
    state.questions = state.questions.filter(question => question.id !== del.dataset.delete);
    saveQuestions();
    renderAdmin();
    toast("Question deleted.");
  }
});

document.querySelector("#startForm").addEventListener("submit", startExam);
document.querySelector("#questionForm").addEventListener("submit", saveAdminQuestion);
document.querySelector("#filterSubject").addEventListener("change", renderAdmin);
document.querySelector("#examSectionSelect").addEventListener("change", renderSectionControls);
document.querySelector("#csvUpload").addEventListener("change", event => event.target.files[0] && importCsv(event.target.files[0]));

document.querySelector("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  localStorage.setItem(STORAGE.theme, next);
  document.querySelector("#themeToggle").textContent = next === "dark" ? "☀" : "☾";
  if (window.latestResult) drawChart(window.latestResult);
});

document.querySelector("#durationForm").addEventListener("submit", event => {
  event.preventDefault();
  state.durations = {
    25: Number(document.querySelector("#duration25").value),
    50: Number(document.querySelector("#duration50").value),
    90: Number(document.querySelector("#duration90").value)
  };
  saveDurations();
  toast("Exam durations saved.");
});

document.querySelector("#resetBankBtn").addEventListener("click", () => {
  state.questions = sampleQuestions;
  saveQuestions();
  renderAdmin();
  toast("Sample question bank restored.");
});

document.querySelector("#prevBtn").addEventListener("click", () => {
  if (state.currentExam.current > 0) state.currentExam.current -= 1;
  renderExam();
});

document.querySelector("#nextBtn").addEventListener("click", () => {
  if (state.currentExam.current < state.currentExam.count - 1) state.currentExam.current += 1;
  renderExam();
});

document.querySelector("#clearBtn").addEventListener("click", () => {
  state.currentExam.answers[state.currentExam.current] = null;
  renderExam();
});

document.querySelector("#reviewBtn").addEventListener("click", () => {
  const exam = state.currentExam;
  exam.review[exam.current] = !exam.review[exam.current];
  renderExam();
});

document.querySelector("#submitBtn").addEventListener("click", () => submitExam(false));
document.querySelector("#downloadPdfBtn").addEventListener("click", () => window.print());
document.querySelector("#certificateBtn").addEventListener("click", () => {
  const result = window.latestResult;
  if (!result?.passed) {
    toast("Certificate is available only for passed students.");
    return;
  }
  document.querySelector("#certName").textContent = result.name;
  document.querySelector("#certSubject").textContent = result.subject;
  document.querySelector("#certScore").textContent = `Score: ${result.percentage}%`;
  document.querySelector("#certificateModal").hidden = false;
});
document.querySelector("#closeCertificate").addEventListener("click", () => document.querySelector("#certificateModal").hidden = true);
document.querySelector("#printCertificate").addEventListener("click", () => window.print());

document.addEventListener("visibilitychange", () => {
  if (document.hidden && state.currentExam) {
    state.currentExam.warnings += 1;
    toast(`Anti-cheating warning ${state.currentExam.warnings}: tab switch detected.`);
  }
});

loadState();
renderAdminSubjects();
renderSectionControls();
showView("landing");
