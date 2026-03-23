/* ============================================
   PART 1: IMPORT FIREBASE LIBRARIES
============================================ */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, signInAnonymously, onAuthStateChanged }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { getDatabase, ref, onValue, ___ }
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";


/* ============================================
   PART 2: FIREBASE CONFIGURATION
   REPLACE WITH YOUR OWN PROJECT SETTINGS
============================================ */

const firebaseConfig = {
  apiKey: "___________",
  authDomain: "___________.firebaseapp.com",
  databaseURL: "https://___________.region.firebasedatabase.app",
  projectId: "___________",
  storageBucket: "___________.appspot.com",
  messagingSenderId: "___________",
  appId: "___________"
};


/* ============================================
   INITIALIZE FIREBASE
============================================ */

const app = initializeApp(___);
const auth = getAuth(___);
const db = getDatabase(___);


/* ============================================
   PART 3: GET HTML ELEMENTS
============================================ */

const statusEl    = document.getElementById("___");
const angleSlider = document.getElementById("___");
const angleValue  = document.getElementById("___");
const servoAngle  = document.getElementById("___");
const irDetected  = document.getElementById("___");
const irRaw       = document.getElementById("___");
const messages    = document.getElementById("___");
const msgInput    = document.getElementById("___");
const sendBtn     = document.getElementById("___");

let lastEspMsg = "";


/* ============================================
   FUNCTION: DISPLAY MESSAGE
============================================ */

function addMessage(text, source) {
  if (messages.textContent === "No messages yet.") {
    messages.textContent = "";
  }
  messages.textContent += `[${___}] ${text}\n`;
  messages.scrollTop = messages.scrollHeight;
}


/* ============================================
   FUNCTION: SEND MESSAGE FROM WEB
============================================ */

function sendWebMessage() {
  const text = msgInput.value.___();
  if (___text) return;
  addMessage(text, "Web");
  msgInput.value = "";
  set(ref(db, "serial/message"), {
    text: ___,
    source: ___
  });
}


/* ============================================
   SERVO SLIDER CONTROL
   Path: "servo/msgTitle"
============================================ */

angleSlider.addEventListener("___", () => {
  const angle = Number(angleSlider.value);
  angleValue.textContent = ___;
  set(ref(db, "___/msgTitle"), angle);
});


/* ============================================
   BUTTON EVENTS
============================================ */

sendBtn.addEventListener("click", ___________);
msgInput.addEventListener("___", (e) => {
  if (e.key === "___") {
    sendWebMessage();
  }
});


/* ============================================
   LOGIN TO FIREBASE
============================================ */

signInAnonymously(auth).catch(err => {
  console.error(err);
  statusEl.textContent = "Auth failed";
});


/* ============================================
   AFTER LOGIN - ATTACH REAL-TIME LISTENERS
============================================ */

onAuthStateChanged(auth, (user) => {
  if (!user) {
    statusEl.textContent = "Connecting...";
    return;
  }
  statusEl.textContent = "Connected";

  /* ----- SERVO LISTENER ----- */
  onValue(ref(db, "servo/msgTitle"), (snap) => {
    const val = snap.___();
    if (val === ___) return;
    angleSlider.value = ___;
    angleValue.textContent = ___;
    servoAngle.textContent = ___;
  });

  /* ----- IR SENSOR LISTENER ----- */
  onValue(ref(db, "sensor/obstacle"), (snap) => {
    const val = snap.val();
    if (val === null) return;
    irRaw.textContent = ___;
    irDetected.textContent = val === 0 ? "___" : "___";
  });

  /* ----- MESSAGE LISTENER ----- */
  onValue(ref(db, "serial/message"), (snap) => {
    const data = snap.val();
    if (!data || !data.text) return;
    if (data.source === "___" && data.text !== lastEspMsg) {
      lastEspMsg = data.text;
      addMessage(data.text, "___");
    }
  });
});