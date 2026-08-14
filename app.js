/* ==========================================
   LA VIDA QUE QUIERO
   APP V1.0
========================================== */


/* ==========================================
   ESTADO
========================================== */

const STORAGE_KEY = "lvq_state_v1";

const defaultState = {
  name: "",
  objective: "",
  time: "",
  xp: 0,
  disciplineDays: [],
  completedMissions: [],
  booksRead: [],
  events: [],
  lastActiveDate: null
};


let state = loadState();


const disciplineMissions = [
  "Ordená tu habitación y tendé tu cama.",
  "Terminá una tarea pendiente antes de distraerte.",
  "Trabajá 30 minutos sin redes sociales.",
  "Hacé primero una tarea que venís evitando.",
  "Controlá hoy una distracción innecesaria.",
  "Cumplí una tarea importante aunque no tengas ganas.",
  "Hacé una acción que represente la persona que querés ser."
];


const dailyMissions = [
  {
    category: "Disciplina",
    title: "Hacé primero lo importante",
    text: "Elegí una tarea importante y terminala antes de distraerte."
  },
  {
    category: "Mente",
    title: "Respirá y frená",
    text: "Tomate 5 minutos para respirar lentamente y volver al presente."
  },
  {
    category: "Finanzas",
    title: "Mirá tu dinero",
    text: "Registrá todos tus gastos del día."
  },
  {
    category: "Cuerpo",
    title: "Movete",
    text: "Hacé al menos 30 minutos de actividad física."
  },
  {
    category: "Relaciones",
    title: "Una conversación real",
    text: "Escribile o hablá con alguien importante para vos."
  },
  {
    category: "Propósito",
    title: "Pensá a largo plazo",
    text: "Escribí una cosa que querés conseguir durante los próximos 12 meses."
  }
];


const areas = {

  cuerpo: {
    eyebrow: "CUERPO",
    title: "💪 Construí un físico fuerte",
    intro: "No necesitás entrenar perfecto. Necesitás aprender a entrenar de forma consistente y cuidar tu recuperación.",
    blocks: [
      {
        title: "🏋️ Entrenamiento",
        text: "Aprendé los fundamentos de fuerza, progresión, técnica y recuperación."
      },
      {
        title: "🥗 Alimentación",
        text: "Entendé proteínas, carbohidratos, grasas, calorías, hidratación y cómo organizar comidas simples."
      },
      {
        title: "😴 Sueño",
        text: "Dormir bien es parte del entrenamiento. Trabajaremos rutinas de descanso y recuperación."
      },
      {
        title: "🎯 Primer objetivo",
        text: "Elegí una meta concreta: ganar músculo, perder grasa, mejorar fuerza o simplemente estar más activo."
      }
    ]
  },


  mente: {
    eyebrow: "MENTE Y CALMA",
    title: "🧠 Aprendé a manejar tu mente",
    intro: "No necesitás controlar cada pensamiento. Necesitás aprender a relacionarte mejor con ellos.",
    blocks: [
      {
        title: "🌬️ Respiración",
        text: "Probá una respiración lenta y cómoda, prestando atención especialmente a una exhalación prolongada."
      },
      {
        title: "🧘 Meditación",
        text: "Sentate unos minutos, observá tu respiración y cuando aparezcan pensamientos volvé suavemente al presente."
      },
      {
        title: "🧠 Pensamiento",
        text: "Aprendé a separar hechos de interpretaciones y a cuestionar pensamientos automáticos."
      },
      {
        title: "⚠️ Importante",
        text: "Estas herramientas son educativas y no reemplazan la evaluación o el tratamiento de un profesional de salud."
      }
    ]
  },


  disciplina: {
    eyebrow: "DISCIPLINA",
    title: "🔥 Construí constancia",
    intro: "La disciplina no consiste en tener ganas todos los días. Consiste en aprender a actuar de acuerdo con tus objetivos.",
    blocks: [
      {
        title: "🔥 Desafío recomendado",
        text: "Completá el desafío de 7 días y ganá XP por cada día completado."
      },
      {
        title: "🎯 Principio",
        text: "Empezá pequeño. Repetí. Aumentá la dificultad cuando la constancia se vuelva más fácil."
      },
      {
        title: "🧠 Identidad",
        text: "En vez de pensar solo en resultados, empezá a construir la identidad de la persona que querés ser."
      }
    ]
  },


  finanzas: {
    eyebrow: "FINANZAS",
    title: "💰 Construí libertad financiera",
    intro: "El dinero es una herramienta. El objetivo es construir estabilidad, patrimonio y más opciones sobre tu tiempo.",
    blocks: [
      {
        title: "🧱 Etapa 1 — Control",
        text: "Registrá ingresos y gastos. Entendé cuánto necesitás realmente para vivir."
      },
      {
        title: "🛡️ Etapa 2 — Protección",
        text: "Trabajá un fondo de emergencia, control de deudas y seguridad financiera."
      },
      {
        title: "📈 Etapa 3 — Inversión",
        text: "Aprendé qué son bonos, acciones, ETFs, fondos, criptomonedas, diversificación y riesgo."
      },
      {
        title: "📊 Trading",
        text: "Trading no es lo mismo que inversión. Aprendé gestión del riesgo, tamaño de posición, psicología y práctica antes de arriesgar dinero real."
      },
      {
        title: "⏰ Etapa 4 — Libertad",
        text: "El objetivo final no es simplemente tener más dinero, sino construir suficientes recursos y capacidades para tener más libertad de tiempo y elección."
      }
    ]
  },


  negocios: {
    eyebrow: "NEGOCIOS",
    title: "💼 Aumentá tus capacidades",
    intro: "Una de las mejores formas de mejorar tus finanzas es desarrollar habilidades que el mercado valore.",
    blocks: [
      {
        title: "💡 Habilidades",
        text: "Ventas, comunicación, marketing, tecnología, liderazgo y resolución de problemas."
      },
      {
        title: "📈 Ingresos",
        text: "Aprendé a aumentar el valor que podés ofrecer antes de obsesionarte con ganar rápido."
      },
      {
        title: "🚀 Emprender",
        text: "Detectá problemas, validá ideas y aprendé a crear soluciones que las personas realmente quieran."
      }
    ]
  },


  relaciones: {
    eyebrow: "RELACIONES",
    title: "❤️ Construí vínculos sanos",
    intro: "Las relaciones de calidad se construyen con respeto, comunicación, límites y responsabilidad.",
    blocks: [
      {
        title: "🤝 Relaciones saludables",
        text: "Reciprocidad, respeto, comunicación, confianza y capacidad para resolver conflictos."
      },
      {
        title: "⚠️ Señales de alerta",
        text: "Control excesivo, chantaje emocional, aislamiento, invalidación constante y manipulación repetida."
      },
      {
        title: "🧠 Narcisismo",
        text: "Podemos enseñar sobre rasgos y patrones narcisistas, pero no diagnosticar trastornos ni convertir la plataforma en un test de diagnóstico."
      },
      {
        title: "💔 Después de una ruptura",
        text: "Recuperar rutinas, procesar lo sucedido, aprender, poner límites y reconstruir tu vida."
      }
    ]
  },


  proposito: {
    eyebrow: "PROPÓSITO",
    title: "🎯 Decidí qué querés construir",
    intro: "Tu propósito no tiene que aparecer mágicamente. Se puede construir explorando valores, intereses, capacidades y experiencias.",
    blocks: [
      {
        title: "🧭 Valores",
        text: "Elegí qué principios querés que guíen tus decisiones: integridad, respeto, valentía, responsabilidad, humildad y autocontrol."
      },
      {
        title: "🎯 Objetivos",
        text: "Transformá deseos vagos en objetivos concretos y medibles."
      },
      {
        title: "🌎 Visión",
        text: "Imaginá cómo querés que se vea tu vida dentro de 1, 5 y 10 años."
      }
    ]
  },


  imagen: {
    eyebrow: "IMAGEN Y ESTILO",
    title: "👔 Mejorá tu presencia",
    intro: "No necesitás ropa cara para verte bien. Necesitás entender ajuste, combinación, higiene y contexto.",
    blocks: [
      {
        title: "👕 Vestimenta",
        text: "Aprendé colores, combinaciones, básicos, proporciones y cómo vestirte según la ocasión."
      },
      {
        title: "🧼 Grooming",
        text: "Higiene, dientes, cabello, barba, piel, uñas y cuidado personal."
      },
      {
        title: "🌹 Perfume",
        text: "Aprendé a elegir fragancias según clima, ocasión, horario y estilo personal."
      },
      {
        title: "💡 Regla principal",
        text: "Estilo no significa gastar mucho. Significa cuidarte y presentarte de manera coherente con quién querés ser."
      }
    ]
  }

};


const books = {

  habitos: {
    category: "HÁBITOS Y DISCIPLINA",
    title: "Hábitos Atómicos",
    author: "James Clear",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Es un excelente punto de partida para entender cómo pequeños cambios
          sostenidos pueden producir grandes resultados.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Te cuesta mantener constancia, querés crear hábitos o eliminar hábitos
          que no te ayudan.
        </p>
      </div>
    `
  },


  dinero: {
    category: "FINANZAS",
    title: "La Psicología del Dinero",
    author: "Morgan Housel",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Ayuda a comprender cómo las emociones, experiencias y comportamientos
          influyen en las decisiones financieras.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Querés mejorar tu relación con el dinero y tomar decisiones más
          conscientes.
        </p>
      </div>
    `
  },


  babilonia: {
    category: "FINANZAS",
    title: "El Hombre Más Rico de Babilonia",
    author: "George S. Clason",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Presenta principios sencillos sobre ahorro, administración del dinero
          y construcción de patrimonio.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Estás comenzando a estudiar finanzas personales.
        </p>
      </div>
    `
  },


  piense: {
    category: "MENTALIDAD",
    title: "Piense y Hágase Rico",
    author: "Napoleon Hill",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Un clásico sobre metas, perseverancia y mentalidad orientada a resultados.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Querés trabajar tu relación con los objetivos y la determinación.
        </p>
      </div>
    `
  },


  "7habitos": {
    category: "EFECTIVIDAD",
    title: "Los 7 hábitos de la gente altamente efectiva",
    author: "Stephen R. Covey",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Propone principios para trabajar responsabilidad personal, prioridades,
          comunicación y efectividad.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Querés ordenar mejor tus prioridades y tu vida.
        </p>
      </div>
    `
  },


  carnegie: {
    category: "RELACIONES",
    title: "Cómo ganar amigos e influir sobre las personas",
    author: "Dale Carnegie",
    description: `
      <div class="book-description">
        <p><strong>¿Por qué leerlo?</strong></p>
        <p>
          Un clásico sobre comunicación y relaciones interpersonales.
        </p>
        <br>
        <p><strong>Ideal si:</strong></p>
        <p>
          Querés mejorar tu capacidad de comunicarte y relacionarte con otros.
        </p>
      </div>
    `
  }

};


/* ==========================================
   STORAGE
========================================== */

function loadState() {

  try {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return { ...defaultState };
    }

    return {
      ...defaultState,
      ...JSON.parse(saved)
    };

  } catch (error) {

    console.error("No se pudo cargar el estado:", error);

    return { ...defaultState };

  }

}


function saveState() {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(state)
  );

}


/* ==========================================
   ANALYTICS LOCAL
========================================== */

function trackEvent(name, data = {}) {

  const event = {
    name,
    timestamp: new Date().toISOString(),
    data
  };

  state.events.push(event);

  if (state.events.length > 500) {
    state.events = state.events.slice(-500);
  }

  saveState();

}


/* ==========================================
   FECHA
========================================== */

function todayKey() {

  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;

}


/* ==========================================
   NAVEGACIÓN
========================================== */

function showPage(page) {

  document.querySelectorAll(".page").forEach(section => {
    section.classList.remove("active");
  });


  const target = document.getElementById(`page-${page}`);

  if (!target) return;


  target.classList.add("active");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  trackEvent("page_view", { page });


  updateUI();

}


/* ==========================================
   MOBILE MENU
========================================== */

function toggleMobileMenu() {

  document
    .getElementById("mobileMenu")
    .classList.toggle("open");

}


/* ==========================================
   MODALS
========================================== */

function openModal(id) {

  document
    .getElementById(id)
    .classList.add("open");

}


function closeModal(id) {

  document
    .getElementById(id)
    .classList.remove("open");

}


/* ==========================================
   ONBOARDING
========================================== */

let selectedGoal = "";
let selectedTime = "";


function openOnboarding() {

  trackEvent("onboarding_open");

  document
    .getElementById("onboardingModal")
    .classList.add("open");


  document
    .querySelectorAll(".onboarding-step")
    .forEach(step => {
      step.classList.remove("active");
    });


  document
    .getElementById("onboarding1")
    .classList.add("active");

}


function nextOnboarding(step) {

  if (step === 2) {

    const name = document
      .getElementById("nameInput")
      .value
      .trim();


    if (!name) {

      alert("Escribí tu nombre primero.");

      return;

    }


    state.name = name;

    saveState();

  }


  if (step === 3 && !selectedGoal) {

    alert("Elegí un objetivo.");

    return;

  }


  document
    .querySelectorAll(".onboarding-step")
    .forEach(item => {
      item.classList.remove("active");
    });


  document
    .getElementById(`onboarding${step}`)
    .classList.add("active");

}


function selectGoal(button, value) {

  document
    .querySelectorAll("#onboarding2 .choice-grid button")
    .forEach(btn => {
      btn.classList.remove("selected");
    });


  button.classList.add("selected");

  selectedGoal = value;

}


function selectTime(button, value) {

  document
    .querySelectorAll("#onboarding3 .choice-grid button")
    .forEach(btn => {
      btn.classList.remove("selected");
    });


  button.classList.add("selected");

  selectedTime = value;

}


function finishOnboarding() {

  if (!selectedTime) {

    alert("Elegí cuánto tiempo podés dedicar.");

    return;

  }


  state.objective = selectedGoal;
  state.time = selectedTime;


  saveState();


  trackEvent(
    "onboarding_completed",
    {
      objective: selectedGoal,
      time: selectedTime
    }
  );


  closeModal("onboardingModal");

  showPage("camino");

}


/* ==========================================
   AREAS
========================================== */

function openArea(areaKey) {

  trackEvent(
    "area_open",
    {
      area: areaKey
    }
  );


  if (areaKey === "disciplina") {

    openDisciplineChallenge();

    return;

  }


  const area = areas[areaKey];

  if (!area) return;


  document
    .getElementById("areaEyebrow")
    .innerText = area.eyebrow;


  document
    .getElementById("areaTitle")
    .innerText = area.title;


  document
    .getElementById("areaIntro")
    .innerText = area.intro;


  const container =
    document.getElementById("areaContent");


  container.innerHTML = "";


  area.blocks.forEach(block => {

    const article =
      document.createElement("article");

    article.className = "content-block";


    article.innerHTML = `
      <h3>${block.title}</h3>
      <p>${block.text}</p>
    `;


    container.appendChild(article);

  });


  openModal("areaModal");

}


/* ==========================================
   DISCIPLINA
========================================== */

function openDisciplineChallenge() {

  trackEvent("discipline_open");

  renderDiscipline();

  openModal("disciplineModal");

}


function renderDiscipline() {

  const container =
    document.getElementById("disciplineDays");


  container.innerHTML = "";


  disciplineMissions.forEach((mission, index) => {

    const day = index + 1;

    const completed =
      state.disciplineDays.includes(day);


    const article =
      document.createElement("article");


    article.className =
      `day-card ${completed ? "completed" : ""}`;


    article.innerHTML = `

      <div>

        <div class="day-label">
          DÍA ${day}
        </div>

        <h4>
          Misión del día
        </h4>

        <p>
          ${mission}
        </p>

      </div>

      <button
        class="complete-day-btn"
        onclick="completeDisciplineDay(${day})"
      >
        ${completed ? "✓ Completado" : "Completar"}
      </button>

    `;


    container.appendChild(article);

  });


  const completedCount =
    state.disciplineDays.length;


  const percentage =
    (completedCount / disciplineMissions.length) * 100;


  document
    .getElementById("disciplineProgressText")
    .innerText =
    `${completedCount} / 7`;


  document
    .getElementById("disciplineProgress")
    .style.width =
    `${percentage}%`;


  document
    .getElementById("disciplineSuccess")
    .classList
    .toggle(
      "show",
      completedCount === 7
    );

}


function completeDisciplineDay(day) {

  if (
    state.disciplineDays.includes(day)
  ) {

    return;

  }


  state.disciplineDays.push(day);

  state.disciplineDays.sort((a, b) => a - b);


  addXp(100);


  updateStreak();


  trackEvent(
    "discipline_day_completed",
    {
      day
    }
  );


  renderDiscipline();

  updateUI();

}


function resetDiscipline() {

  if (
    !confirm("¿Querés reiniciar el desafío?")
  ) {

    return;

  }


  state.disciplineDays = [];

  saveState();


  trackEvent("discipline_reset");


  renderDiscipline();

  updateUI();

}


/* ==========================================
   MISIONES
========================================== */

function getTodayMission() {

  const date = new Date();

  const index =
    date.getDate() %
    dailyMissions.length;


  return dailyMissions[index];

}


function renderTodayMission() {

  const mission =
    getTodayMission();


  const completed =
    state.completedMissions
      .includes(todayKey());


  document
    .getElementById("missionTitle")
    .innerText =
    mission.title;


  document
    .getElementById("missionDescription")
    .innerText =
    mission.text;


  document
    .getElementById("missionCategory")
    .innerText =
    mission.category;


  const button =
    document.getElementById("missionButton");


  if (completed) {

    button.innerText =
      "✓ MISIÓN COMPLETADA";


    button.disabled = true;

  } else {

    button.innerText =
      "COMPLETAR MISIÓN";


    button.disabled = false;

  }


  document
    .getElementById("homeMissionTitle")
    .innerText =
    mission.title;


  document
    .getElementById("homeMissionText")
    .innerText =
    mission.text;

}


function openDailyMission() {

  const mission =
    getTodayMission();


  document
    .getElementById("modalMissionTitle")
    .innerText =
    mission.title;


  document
    .getElementById("modalMissionText")
    .innerText =
    mission.text;


  trackEvent("daily_mission_open");

  openModal("missionModal");

}


function completeTodayMission(closeAfter = false) {

  const today =
    todayKey();


  if (
    state.completedMissions
      .includes(today)
  ) {

    return;

  }


  state.completedMissions.push(today);


  addXp(100);

  updateStreak();


  trackEvent(
    "daily_mission_completed"
  );


  saveState();

  renderTodayMission();

  updateUI();


  if (closeAfter) {

    closeModal("missionModal");

  }

}


/* ==========================================
   XP
========================================== */

function addXp(amount) {

  state.xp += amount;

  saveState();

}


function getLevelData() {

  const xp = state.xp;

  if (xp >= 5000) {

    return {
      level: 5,
      name: "Dominio"
    };

  }

  if (xp >= 2500) {

    return {
      level: 4,
      name: "Evolución"
    };

  }

  if (xp >= 1000) {

    return {
      level: 3,
      name: "Disciplinado"
    };

  }

  if (xp >= 300) {

    return {
      level: 2,
      name: "Constructor"
    };

  }

  return {
    level: 1,
    name: "Comienzo"
  };

}


/* ==========================================
   RACHA
========================================== */

function updateStreak() {

  state.lastActiveDate =
    todayKey();


  saveState();

}


/*
  En esta V1 la racha se representa
  por cantidad de días con actividad.
  Más adelante podremos convertirla
  en una racha real consecutiva.
*/

function getStreak() {

  const totalDays = new Set();


  state.completedMissions.forEach(date => {
    totalDays.add(date);
  });


  return totalDays.size;

}


/* ==========================================
   PERFIL / UI
========================================== */

function updateUI() {

  const level =
    getLevelData();


  const streak =
    getStreak();


  const missions =
    state.completedMissions.length +
    state.disciplineDays.length;


  document
    .getElementById("statXp")
    .innerText =
    state.xp;


  document
    .getElementById("statLevel")
    .innerText =
    level.level;


  document
    .getElementById("statLevelName")
    .innerText =
    level.name;


  document
    .getElementById("statMissions")
    .innerText =
    missions;


  document
    .getElementById("statStreak")
    .innerText =
    streak;


  document
    .getElementById("profileName")
    .innerText =
    state.name ||
    "Constructor";


  document
    .getElementById("profileObjective")
    .innerText =
    state.objective
      ? `Objetivo: ${state.objective}`
      : "Objetivo: Elegí tu objetivo";


  document
    .getElementById("profileXp")
    .innerText =
    state.xp;


  document
    .getElementById("profileLevel")
    .innerText =
    level.level;


  document
    .getElementById("profileLevelName")
    .innerText =
    level.name;


  document
    .getElementById("profileStreak")
    .innerText =
    streak;


  const initials =
    state.name
      ? state.name
          .split(" ")
          .map(word => word[0])
          .join("")
          .slice(0, 3)
          .toUpperCase()
      : "LVQ";


  document
    .getElementById("avatar")
    .innerText =
    initials;


  document
    .getElementById("pathGreeting")
    .innerText =
    state.name
      ? `Tu camino, ${state.name}.`
      : "Creá tu camino.";


  if (state.objective) {

    document
      .getElementById("pathDescription")
      .innerText =
      `Tu objetivo principal es ${state.objective}. Tenés ${state.time || "tiempo disponible"} para trabajar en él.`;

  } else {

    document
      .getElementById("pathDescription")
      .innerText =
      "Elegí un objetivo y empezá a construirlo paso a paso.";

  }


  document
    .getElementById("streakProgress")
    .style.width =
    `${Math.min(streak * 10, 100)}%`;


  updateRecommendation();

  renderTodayMission();

}


/* ==========================================
   RECOMENDACIÓN
========================================== */

function updateRecommendation() {

  const title =
    document.getElementById(
      "recommendationTitle"
    );

  const text =
    document.getElementById(
      "recommendationText"
    );

  const badge =
    document.getElementById(
      "recommendationBadge"
    );


  if (!state.objective) {

    title.innerText =
      "Empezá con disciplina.";


    text.innerText =
      "La disciplina es una buena base para empezar a construir otras áreas.";


    badge.innerText =
      "NIVEL 1";

    return;

  }


  const recommendations = {

    "Cuerpo": {
      title: "Construí una base física.",
      text: "Empezá con entrenamiento, movimiento, alimentación y sueño.",
      badge: "CUERPO"
    },

    "Mente": {
      title: "Entrená tu calma.",
      text: "Comenzá con respiración, atención y hábitos para manejar mejor tu mente.",
      badge: "MENTE"
    },

    "Disciplina": {
      title: "7 días de disciplina.",
      text: "Tu primera prueba: completar pequeñas acciones durante siete días.",
      badge: "DISCIPLINA"
    },

    "Finanzas": {
      title: "Ordená tu dinero.",
      text: "El primer paso hacia la libertad financiera es entender cómo entra y sale tu dinero.",
      badge: "FINANZAS"
    },

    "Negocios": {
      title: "Construí una habilidad.",
      text: "Elegí una habilidad que pueda aumentar el valor que ofrecés al mercado.",
      badge: "NEGOCIOS"
    },

    "Relaciones": {
      title: "Mejorá tus vínculos.",
      text: "Trabajá comunicación, límites, respeto y reciprocidad.",
      badge: "RELACIONES"
    },

    "Propósito": {
      title: "Definí tu dirección.",
      text: "Empezá a trabajar en tus valores, objetivos y visión de vida.",
      badge: "PROPÓSITO"
    },

    "Imagen": {
      title: "Mejorá tu presencia.",
      text: "Vestimenta, higiene, grooming y estilo pueden ayudarte a presentarte mejor.",
      badge: "IMAGEN"
    }

  };


  const item =
    recommendations[state.objective];


  if (!item) return;


  title.innerText =
    item.title;


  text.innerText =
    item.text;


  badge.innerText =
    item.badge;

}


/* ==========================================
   LIBROS
========================================== */

function openBook(bookKey) {

  const book =
    books[bookKey];


  if (!book) return;


  trackEvent(
    "book_open",
    {
      book: book.title
    }
  );


  document
    .getElementById("bookCategory")
    .innerText =
    book.category;


  document
    .getElementById("bookTitle")
    .innerText =
    book.title;


  document
    .getElementById("bookAuthor")
    .innerText =
    book.author;


  document
    .getElementById("bookDescription")
    .innerHTML =
    book.description;


  const button =
    document.getElementById(
      "bookActionButton"
    );


  const alreadyRead =
    state.booksRead.includes(
      bookKey
    );


  button.innerText =
    alreadyRead
      ? "✓ MARCADO COMO LEÍDO"
      : "MARCAR COMO LEÍDO";


  button.onclick = () => {

    toggleBookRead(bookKey);

  };


  openModal("bookModal");

}


function toggleBookRead(bookKey) {

  if (
    state.booksRead.includes(bookKey)
  ) {

    state.booksRead =
      state.booksRead.filter(
        key => key !== bookKey
      );

  } else {

    state.booksRead.push(bookKey);

    addXp(50);

    trackEvent(
      "book_completed",
      {
        book: books[bookKey].title
      }
    );

  }


  saveState();

  openBook(bookKey);

  updateUI();

}


/* ==========================================
   CERRAR MODALES HACIENDO CLICK AFUERA
========================================== */

document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (event.target === modal) {

          modal.classList.remove(
            "open"
          );

        }

      }
    );

  });


/* ==========================================
   ESC
========================================== */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape") return;

    document
      .querySelectorAll(".modal.open")
      .forEach(modal => {

        modal.classList.remove(
          "open"
        );

      });

  }
);


/* ==========================================
   SESIÓN
========================================== */

trackEvent("session_start");


/* ==========================================
   INICIALIZACIÓN
========================================== */

updateUI();

showPage("inicio");
