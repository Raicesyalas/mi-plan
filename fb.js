// Conexión con Firebase (usuarios y base de datos)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDoc, setDoc, onSnapshot, collection, query, where, orderBy, limit, writeBatch } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe2HGhmQX36ck_UKZyyfiyC-S3LkzPq6I",
  authDomain: "mi-plan-b9b8a.firebaseapp.com",
  projectId: "mi-plan-b9b8a",
  storageBucket: "mi-plan-b9b8a.firebasestorage.app",
  messagingSenderId: "344471409611",
  appId: "1:344471409611:web:828c681eca641974985c4e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let db;
try { db = initializeFirestore(app, { localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }) }); }
catch (e) { db = initializeFirestore(app, {}); }

export const FB = {
  onUser: cb => onAuthStateChanged(auth, cb),
  signIn: (e, p) => signInWithEmailAndPassword(auth, e, p),
  signUp: (e, p) => createUserWithEmailAndPassword(auth, e, p),
  reset: e => sendPasswordResetEmail(auth, e),
  signOut: () => signOut(auth),
  get: async path => { const s = await getDoc(doc(db, path)); return s.exists() ? s.data() : null; },
  set: (path, data) => setDoc(doc(db, path), data),
  watch: (path, cb, err) => onSnapshot(doc(db, path), s => cb(s.exists() ? s.data() : null, s.metadata.hasPendingWrites), err),
  watchQuery: (col, filters, ord, lim, cb, err) => {
    const c = filters.map(([f, o, v]) => where(f, o, v));
    if (ord) c.push(orderBy(ord[0], ord[1]));
    if (lim) c.push(limit(lim));
    return onSnapshot(query(collection(db, col), ...c), q => cb(q.docs.map(d => d.data())), err);
  },
  claim: async (uid, person) => {
    const b = writeBatch(db);
    b.set(doc(db, "people/" + person), { uid, at: Date.now() });
    b.set(doc(db, "members/" + uid), { person, at: Date.now() });
    await b.commit();
  }
};
