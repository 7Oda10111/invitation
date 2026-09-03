import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBgoxqtVSqaMWgzBv81cv9qlBww7u73tvM",
  authDomain: "invatation-b6cc9.firebaseapp.com",
  projectId: "invatation-b6cc9",
  storageBucket: "invatation-b6cc9.firebasestorage.app",
  messagingSenderId: "594112290860",
  appId: "1:594112290860:web:3622c3129ee0e7eef17189"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const commentsRef = collection(db, "comments");

// ==========================
// عناصر الفورم والعرض
// ==========================
const form = document.getElementById("commentForm");
const nameInput = document.getElementById("nameInput");
const commentInput = document.getElementById("commentInput");
const commentsList = document.getElementById("commentsList");

// ==========================
// إرسال كومنت جديد
// ==========================
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment) return;

  try {
    await addDoc(commentsRef, {
      name: name,
      comment: comment,
      createdAt: serverTimestamp()
    });

    form.reset();
  } catch (error) {
    console.error("حصل خطأ أثناء إرسال الكومنت:", error);
  }
});

// ==========================
// قراءة الكومنتات لايف (أحدث كومنت فوق)
// ==========================
const q = query(commentsRef, orderBy("createdAt", "desc"));

onSnapshot(q, (snapshot) => {
  commentsList.innerHTML = "";

  snapshot.forEach((doc) => {
    const data = doc.data();

    const commentCard = document.createElement("div");
    commentCard.className = "comment-card";
    commentCard.innerHTML = `
      <p class="comment-name">${data.name}</p>
      <p class="comment-text">${data.comment}</p>
    `;

    commentsList.appendChild(commentCard);
  });
});