import { FB } from "./fb.js";
import { R, PLANS, SHOP_DEFAULT } from "./data.js";

// ---------- constantes
const P = { N: { name: "Noel", full: "Noel" }, K: { name: "Ninoska", full: "Ninoska" }, S: { name: "Stefanie", full: "Stefanie" } };
const SLOTS = { N: ["d", "a", "c"], K: ["d", "a", "c"], S: ["p", "d", "a", "m", "c"] };
const SLOTN = { p: "Pre-entreno", d: "Desayuno", a: "Almuerzo", m: "Merienda", c: "Cena" };
const SLOTT = { S: { p: "7:00", d: "8:00", a: "12:00", m: "16:00", c: "19:00" } };
const DAYN = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MOODS = [["😣", "Muy mal"], ["😕", "Mal"], ["😐", "Normal"], ["🙂", "Bien"], ["😄", "Muy bien"]];
const SLEEP = [["😫", "Pésimo"], ["😪", "Malo"], ["😐", "Regular"], ["😌", "Bueno"], ["😴", "Excelente"]];
const ENERGY = [["🪫", "Muy baja"], ["🔋", "Baja"], ["⚡", "Normal"], ["💪", "Alta"], ["🚀", "Muy alta"]];
const CH = { basicos: "Básicos", desayunos: "Desayunos y bebidas", almuerzos: "Almuerzos", acompanantes: "Vegetales y ensaladas", cenas: "Cenas",
  "s-pre": "Stefanie · Pre-entreno", "s-desayunos": "Stefanie · Desayunos", "s-almuerzos": "Stefanie · Almuerzos", "s-meriendas": "Stefanie · Meriendas", "s-cenas": "Stefanie · Cenas" };
const RBY = Object.fromEntries(R.map(r => [r.id, r]));

const I = {
  hoy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/><path d="M8.5 15l2.2 2.2 4.8-4.7"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5C17 4 14 4.5 12 6z"/><path d="M12 6v14.5"/></svg>',
  cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h2l2.4 11h10.8L21 7H6.2"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>',
  chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 20V11M10 20V5M16 20v-6M22 20H2"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  pill: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="8" width="18" height="8" rx="4" transform="rotate(-45 12 12)"/><path d="M9.2 9.2l5.6 5.6"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
  run: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="4" r="2"/><path d="M7 21l3-6 3 2v4M6 11l3-3 4 1 2 4 3 1"/></svg>',
  walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="4" r="2"/><path d="M10 21l1.5-6L9 12l1-5 3 2 3 1M13.5 15L15 21"/></svg>',
  fork: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 3c-2 0-3 3-3 6s1 4 3 4v8"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>',
  pot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 10h16v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-5zM2 10h20M9 6c0-1 1-1 1-2M14 6c0-1 1-1 1-2"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>'
};

// ---------- utilidades
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const pad = n => String(n).padStart(2, "0");
const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addDays = (s, n) => { const d = fromIso(s); d.setDate(d.getDate() + n); return iso(d); };
const dow = s => (fromIso(s).getDay() + 6) % 7;
const nice = s => { const d = fromIso(s); return `${d.getDate()} de ${MONTHS[d.getMonth()]}`; };
const TODAY = iso(new Date());
const clone = o => JSON.parse(JSON.stringify(o));
function toast(t) { const el = document.getElementById("toast"); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2400); }
const AUTH_ERR = { "auth/invalid-credential": "Correo o contraseña incorrectos.", "auth/wrong-password": "Correo o contraseña incorrectos.", "auth/user-not-found": "No hay una cuenta con ese correo.", "auth/email-already-in-use": "Ya existe una cuenta con ese correo. Tocá «Ya tengo cuenta».", "auth/weak-password": "La contraseña debe tener al menos 6 caracteres.", "auth/invalid-email": "Revisá el correo, no parece válido.", "auth/network-request-failed": "No hay conexión a internet.", "auth/too-many-requests": "Demasiados intentos. Esperá unos minutos." };

// ---------- estado
const S = { user: null, person: null, tab: "hoy", date: TODAY, day: null, plans: { N: [], K: [], S: [] }, history: [], shop: null,
  shopFilter: "all", rq: "", ch: "all", planWho: null, planView: null, editing: null, unsubs: [], dayUnsub: null, authMode: "in", authErr: "", taken: {} };
let saveTimer = null, saveChain = Promise.resolve(), pendingDel = null;

const visibleOwners = () => S.person === "S" ? ["S", "N", "K"] : S.person === "K" ? ["K", "N"] : ["N", "K"];
const editableOwners = () => S.person === "S" ? ["S"] : ["N", "K"];
function plansOf(p) { return [...PLANS[p], ...(S.plans[p] || [])].sort((a, b) => a.start < b.start ? -1 : 1); }
function planFor(p, date) { const list = plansOf(p); let cur = list[0]; for (const x of list) if (x.start <= date) cur = x; return cur; }
function meal(p, date, k) { const pl = planFor(p, date); return pl?.days?.[dow(date)]?.[k] || { t: "", r: [] }; }
function supsFor(p, date) { const pl = planFor(p, date); const di = dow(date); return (pl?.supl || []).map((x, i) => ({ ...x, key: `${i}-${x.w}` })).filter(x => x.d.includes(di)); }
const isFixed = t => /^(ayuno|comida libre)$/i.test((t || "").trim());

function emptyDay(date) { const pl = planFor(S.person, date); return { date, person: S.person, planId: pl.id, planName: pl.name, meals: {}, supl: {}, water: 0, exercise: { on: false, type: "", min: "" }, walk: { on: false, min: "", steps: "" }, out: [], sleep: { hours: "", q: 0 }, mood: { v: 0, energy: 0, note: "" }, updated: 0 }; }

// ---------- arranque
FB.onUser(async u => {
  S.unsubs.forEach(f => f()); S.unsubs = []; if (S.dayUnsub) S.dayUnsub(); S.dayUnsub = null;
  S.user = u; S.person = null; S.day = null; S.tab = "hoy"; S.editing = null;
  document.getElementById("tabs").hidden = true;
  if (!u) { renderAuth(); return; }
  try {
    const m = await FB.get("members/" + u.uid);
    if (m && m.person) { S.person = m.person; startData(); }
    else { await loadTaken(); renderPick(); }
  } catch (e) { console.warn(e); document.getElementById("app").innerHTML = `<div class="splash"><p>No se pudo conectar. Revisá tu internet y volvé a abrir la app.</p><button class="btn" data-logout="1">Salir</button></div>`; }
});
async function loadTaken() { S.taken = {}; for (const p of ["N", "K", "S"]) { try { S.taken[p] = !!(await FB.get("people/" + p)); } catch (e) { S.taken[p] = false; } } }

function startData() {
  const err = e => console.warn(e);
  for (const o of visibleOwners()) S.unsubs.push(FB.watchQuery("plans", [["owner", "==", o]], null, null, list => { S.plans[o] = list; render(); }, err));
  S.unsubs.push(FB.watch("shop/list", d => { if (!d) { FB.set("shop/list", { ...clone(SHOP_DEFAULT), updated: Date.now() }).catch(err); return; } S.shop = d; if (S.tab === "super") render(true); }, err));
  S.unsubs.push(FB.watchQuery(`users/${S.user.uid}/days`, [], ["date", "desc"], 120, list => { S.history = list; if (S.tab === "historial") render(true); }, err));
  document.getElementById("tabs").hidden = false;
  openDay(S.date);
}
function openDay(date) {
  S.date = date; if (S.dayUnsub) S.dayUnsub(); S.day = null;
  S.dayUnsub = FB.watch(`users/${S.user.uid}/days/${date}`, (d, pending) => {
    if (saveTimer && S.day) return;
    if (pending && S.day) return;
    S.day = d ? clone(d) : emptyDay(date);
    if (S.tab === "hoy") render(true);
  }, e => console.warn(e));
  render();
}
function changed() {
  S.day.updated = Date.now(); S.day.person = S.person;
  clearTimeout(saveTimer); const snap = clone(S.day);
  setSync("Guardando…");
  saveTimer = setTimeout(() => { saveTimer = null; saveChain = saveChain.then(() => FB.set(`users/${S.user.uid}/days/${snap.date}`, snap)).then(() => setSync("✓ Guardado")).catch(e => { setSync("Sin conexión: se guarda al volver"); console.warn(e); }); }, 600);
}
function setSync(t) { const el = document.getElementById("sync"); if (el) el.textContent = t; }

// ---------- auth
function renderAuth() {
  const up = S.authMode === "up";
  document.getElementById("app").innerHTML = `<div class="auth">
   <div class="brand"><img src="icons/icon-192.png" alt=""><h1>Mi Plan</h1><p class="muted" style="margin:0">El plan de comidas, recetas y súper de la familia</p></div>
   <form id="authform" class="card" novalidate>
    <h2>${up ? "Crear mi cuenta" : "Entrar"}</h2>
    <label class="f">Correo<input type="email" id="a-email" autocomplete="email" inputmode="email" required></label>
    <label class="f">Contraseña<input type="password" id="a-pass" autocomplete="${up ? "new-password" : "current-password"}" required minlength="6"></label>
    ${up ? `<p class="small muted" style="margin:0">Usá una contraseña de al menos 6 caracteres que no uses en otro lado.</p>` : ""}
    ${S.authErr ? `<p class="err" role="alert">${esc(S.authErr)}</p>` : ""}
    <button class="btn primary block" type="submit">${up ? "Crear cuenta" : "Entrar"}</button>
    ${up ? "" : `<button type="button" class="link" data-reset="1">Olvidé mi contraseña</button>`}
   </form>
   <p style="text-align:center;margin:0">${up ? "¿Ya tenés cuenta?" : "¿Primera vez?"} <button type="button" class="link" data-authmode="${up ? "in" : "up"}">${up ? "Ya tengo cuenta" : "Crear mi cuenta"}</button></p>
  </div>`;
}
function renderPick() {
  document.getElementById("app").innerHTML = `<div class="auth"><div class="brand"><h1>¿Quién sos?</h1><p class="muted" style="margin:0">Elegí tu nombre una sola vez. Así la app te muestra tu plan.</p></div>
   <div class="pick">${["N", "K", "S"].map(p => `<button type="button" data-claim="${p}" ${S.taken[p] ? "disabled" : ""}><span class="avatar av-${p}">${P[p].name[0]}</span><span>${P[p].name}${S.taken[p] ? '<br><span class="small muted">Ya tiene cuenta</span>' : ""}</span></button>`).join("")}</div>
   <button type="button" class="link" data-logout="1">Salir</button></div>`;
}

// ---------- render principal
function renderTabs() {
  const t = [["hoy", "Hoy", I.hoy], ["recetas", "Recetas", I.book], ["super", "Súper", I.cart], ["historial", "Historial", I.chart], ["perfil", "Perfil", I.user]];
  document.getElementById("tabs").innerHTML = t.map(([k, l, ic]) => `<button type="button" data-tab="${k}" ${S.tab === k ? 'aria-current="page"' : ""}>${ic}<span>${l}</span></button>`).join("");
}
function render(keep) {
  if (!S.person) return;
  renderTabs();
  const y = window.scrollY;
  document.getElementById("app").innerHTML = ({ hoy: viewHoy, recetas: viewRecetas, super: viewSuper, historial: viewHistorial, perfil: viewPerfil })[S.tab]();
  if (keep) window.scrollTo(0, y);
}

// ---------- HOY
function score(day, person) {
  let tot = 0, ok = 0;
  SLOTS[person].forEach(k => { const m = meal(person, day.date, k); if (isFixed(m.t)) return; tot++; const s = day.meals?.[k]?.s; if (s === "ok") ok++; else if (s === "cambio") ok += .5; });
  const sp = supsFor(person, day.date); tot += sp.length; sp.forEach(x => { if (day.supl?.[x.key]) ok++; });
  tot += 1; ok += Math.min(1, (day.water || 0) / 8);
  return tot ? Math.round(ok / tot * 100) : 0;
}
function ring(pct) { const r = 30, c = 2 * Math.PI * r; return `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--leaf-soft)" stroke-width="8"/><circle cx="36" cy="36" r="${r}" fill="none" stroke="var(--leaf)" stroke-width="8" stroke-linecap="round" stroke-dasharray="${c * pct / 100} ${c}" transform="rotate(-90 36 36)"/><text x="36" y="41" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">${pct}%</text></svg>`; }
function recipeChips(ids) { const rs = (ids || []).filter(id => RBY[id] && canSee(RBY[id])); return rs.length ? `<div class="recipes">${rs.map(id => `<button type="button" class="chipbtn" data-recipe="${id}">${I.book}${esc(RBY[id].n)}</button>`).join("")}</div>` : ""; }

function viewHoy() {
  const d = S.day, di = dow(S.date), isToday = S.date === TODAY, me = S.person;
  const pl = planFor(me, S.date);
  const head = `<div class="top"><div class="hello"><span class="avatar av-${me}">${P[me].name[0]}</span><div><div class="small muted">Hola,</div><h2>${P[me].name}</h2></div></div><span class="small muted" id="sync"></span></div>
   <div class="card" style="gap:10px"><div class="datebar"><button type="button" class="icon-btn" data-go="-1" aria-label="Día anterior">${I.left}</button>
   <div class="mid"><div class="day">${DAYN[di]}</div><div class="muted small">${nice(S.date)}${isToday ? " · hoy" : ""}</div></div>
   <button type="button" class="icon-btn" data-go="1" aria-label="Día siguiente">${I.right}</button></div>
   ${isToday ? "" : `<button type="button" class="btn small ghost" data-today="1">Volver a hoy</button>`}
   ${d ? `<div class="ring">${ring(score(d, me))}<div><b>${score(d, me) >= 80 ? "¡Vas muy bien!" : score(d, me) >= 40 ? "Vas avanzando" : "Empecemos el día"}</b><div class="small muted">${esc(pl.name)}</div></div></div>` : ""}</div>`;
  if (!d) return head + `<p class="muted" style="text-align:center;padding:30px">Cargando el día…</p>`;
  const meals = SLOTS[me].map(k => {
    const m = d.meals[k] || {};
    const src = me === "S" && ["d", "a", "c"].includes(k) ? (m.src || "S") : me;
    const pm = meal(src, S.date, k);
    const fixed = isFixed(pm.t);
    const opt = me === "S" && ["d", "a", "c"].includes(k) ? `<div class="opt" role="group" aria-label="Elegir opción">${["S", "N", "K"].map(o => `<button type="button" class="c-${o}" data-src="${k}" data-o="${o}" aria-pressed="${src === o}">${o === "S" ? "Mi plan" : "Opción de " + P[o].name}</button>`).join("")}</div>` : "";
    return `<section class="card"><div class="meal-head"><span class="label">${I.fork}${SLOTN[k]}</span>${SLOTT[me]?.[k] ? `<span class="meal-time">${SLOTT[me][k]}</span>` : ""}</div>
     ${opt}<div class="meal-text">${esc(pm.t) || '<span class="muted">Sin indicación en el plan</span>'}</div>${recipeChips(pm.r)}
     ${fixed ? `<label class="f">Nota (opcional)<textarea data-mnote="${k}" placeholder="Ej. qué comiste">${esc(m.note)}</textarea></label>` :
      `<div class="seg status" role="group" aria-label="${SLOTN[k]}">${[["ok", "✓ Cumplí"], ["cambio", "✎ Cambié"], ["no", "✗ No comí"]].map(([v, x]) => `<button type="button" data-meal="${k}" data-v="${v}" aria-pressed="${m.s === v}">${x}</button>`).join("")}</div>
      ${m.s === "cambio" || m.s === "no" ? `<label class="f">${m.s === "cambio" ? "¿Qué comiste en su lugar?" : "¿Por qué? (opcional)"}<textarea data-mnote="${k}">${esc(m.note)}</textarea></label>` : ""}`}</section>`;
  }).join("");
  const cook = me === "K" ? `<section class="card" style="border-color:var(--noel)"><span class="label c-N">${I.pot}Para cocinar hoy · menú de Noel</span>${SLOTS.N.map(k => { const pm = meal("N", S.date, k); return `<div style="display:grid;gap:6px"><b class="c-N">${SLOTN[k]}</b><div>${esc(pm.t)}</div>${recipeChips(pm.r)}</div>`; }).join("")}<p class="small muted" style="margin:0">Solo para ver. Noel marca lo suyo desde su cuenta.</p></section>` : "";
  const sp = supsFor(me, S.date);
  const supl = `<section class="card"><span class="label">${I.pill}Suplementos</span>${sp.length ? sp.map(x => `<label class="check ${d.supl[x.key] ? "on" : ""}"><input type="checkbox" data-supl="${x.key}" ${d.supl[x.key] ? "checked" : ""}><span><b>${esc(x.n)}</b><br><span class="small muted">${esc(x.w)}</span></span></label>`).join("") : '<p class="muted small" style="margin:0">Hoy no hay suplementos en tu plan.</p>'}</section>`;
  const w = d.water || 0;
  const water = `<section class="card"><div class="card-h"><span class="label">${I.drop}Agua</span><span><span class="water-n">${w}</span> <span class="muted small">vasos</span></span></div>
   <div class="glasses">${Array.from({ length: Math.max(8, w) }, (_, i) => `<button type="button" class="glass ${i < w ? "on" : ""}" data-water="${i + 1}" aria-label="${i + 1} vasos"></button>`).join("")}</div>
   <div class="row"><button type="button" class="btn small" data-wadd="-1">− 1</button><button type="button" class="btn small primary" data-wadd="1">+ 1 vaso</button><span class="small muted">Meta: 8 vasos</span></div></section>`;
  const act = `<section class="card"><span class="label">${I.run}Actividad</span>
   <div class="toggle"><b>${I.run}Hice ejercicio</b><button type="button" class="switch" role="switch" aria-label="Hice ejercicio" aria-checked="${!!d.exercise.on}" data-sw="exercise"></button></div>
   ${d.exercise.on ? `<div class="grid2"><label class="f">Tipo<input type="text" data-f="exercise.type" value="${esc(d.exercise.type)}" placeholder="Pesas, bici…"></label><label class="f">Minutos<input type="number" inputmode="numeric" data-f="exercise.min" value="${esc(d.exercise.min)}"></label></div>` : ""}
   <div class="toggle"><b>${I.walk}Caminé</b><button type="button" class="switch" role="switch" aria-label="Caminé" aria-checked="${!!d.walk.on}" data-sw="walk"></button></div>
   ${d.walk.on ? `<div class="grid2"><label class="f">Minutos<input type="number" inputmode="numeric" data-f="walk.min" value="${esc(d.walk.min)}"></label><label class="f">Pasos<input type="number" inputmode="numeric" data-f="walk.steps" value="${esc(d.walk.steps)}"></label></div>` : ""}</section>`;
  const out = `<section class="card"><span class="label">${I.fork}Comí fuera de casa</span>
   ${(d.out || []).map((o, i) => `<div class="out"><div class="row between"><b>${esc(o.meal)}</b><button type="button" class="del ${pendingDel === "out" + i ? "confirm" : ""}" data-delout="${i}">${pendingDel === "out" + i ? "¿Borrar?" : "✕"}</button></div><div>${esc(o.what)}</div>${o.where ? `<div class="small muted">📍 ${esc(o.where)}</div>` : ""}</div>`).join("")}
   <form id="outform" class="stack" style="gap:8px"><div class="grid2"><select id="out-meal" aria-label="Comida">${SLOTS[me].map(k => `<option>${SLOTN[k]}</option>`).join("")}<option>Antojo</option></select><input type="text" id="out-where" placeholder="Dónde"></div><input type="text" id="out-what" placeholder="¿Qué comiste?"><button class="btn" type="submit">+ Agregar</button></form></section>`;
  const sl = d.sleep || {};
  const sleep = `<section class="card"><span class="label">${I.moon}Sueño de anoche</span>
   <label class="f">Horas dormidas<input type="number" inputmode="decimal" step="0.5" data-f="sleep.hours" value="${esc(sl.hours)}" placeholder="Ej. 7.5"></label>
   <div class="small muted">Calidad</div><div class="scale">${SLEEP.map(([e, t], i) => `<button type="button" data-sleep="${i + 1}" aria-pressed="${sl.q === i + 1}"><span>${e}</span>${t}</button>`).join("")}</div></section>`;
  const md = d.mood || {};
  const mood = `<section class="card"><span class="label">${I.heart}¿Cómo te sentiste hoy?</span>
   <div class="scale">${MOODS.map(([e, t], i) => `<button type="button" data-mood="${i + 1}" aria-pressed="${md.v === i + 1}"><span>${e}</span>${t}</button>`).join("")}</div>
   <div class="small muted">Energía</div><div class="scale">${ENERGY.map(([e, t], i) => `<button type="button" data-energy="${i + 1}" aria-pressed="${md.energy === i + 1}"><span>${e}</span>${t}</button>`).join("")}</div>
   <label class="f">Notas del día<textarea data-f="mood.note" placeholder="Hambre, antojos, digestión…">${esc(md.note)}</textarea></label></section>`;
  return `<div class="stack">${head}${meals}${cook}${supl}${water}${act}${out}${sleep}${mood}</div>`;
}

// ---------- RECETAS
function canSee(r) { return r.vis !== "S" || S.person === "S"; }
function photo(r, cls) { return r.img ? `<img src="${r.img}" alt="" loading="lazy" referrerpolicy="no-referrer" data-fallback="${esc(r.em.join(" "))}">` : `<div class="em">${r.em.slice(0, 3).join("")}</div>`; }
function viewRecetas() {
  const q = S.rq.toLowerCase();
  const chs = Object.keys(CH).filter(c => R.some(r => r.ch === c && canSee(r)));
  const list = R.filter(r => canSee(r) && (S.ch === "all" || r.ch === S.ch) && (!q || (r.n + " " + r.ing.map(i => i[1]).join(" ")).toLowerCase().includes(q)));
  return `<div class="stack"><h1>Libro de recetas</h1>
   <input type="text" id="rq" value="${esc(S.rq)}" placeholder="Buscar receta o ingrediente" aria-label="Buscar receta">
   <div class="chapters" role="group" aria-label="Capítulos"><button type="button" data-ch="all" aria-pressed="${S.ch === "all"}">Todas</button>${chs.map(c => `<button type="button" data-ch="${c}" aria-pressed="${S.ch === c}">${CH[c]}</button>`).join("")}</div>
   ${list.length ? `<div class="book">${list.map(r => `<button type="button" class="rcard" data-recipe="${r.id}"><div class="ph">${photo(r)}${r.who === "S" ? '<span class="tag c-S">Stefanie</span>' : r.who === "N" ? '<span class="tag c-N">Noel</span>' : r.who === "K" ? '<span class="tag c-K">Ninoska</span>' : ""}</div><div class="tx"><b>${esc(r.n)}</b><span class="t">⏱ ${esc(r.time)}</span></div></button>`).join("")}</div>` : '<p class="muted">No hay recetas con esa búsqueda.</p>'}
   <p class="credit">Fotos de referencia: Wikimedia Commons. Pueden no ser exactamente la misma preparación.</p></div>`;
}
function openRecipe(id) {
  const r = RBY[id]; if (!r || !canSee(r)) return;
  const por = (r.por || []).filter(([w]) => w !== "S" || S.person === "S").map(([w, t]) => `<div><span class="pill c-${w === "A" ? "NK" : w}">${w === "A" ? "Los dos" : P[w]?.name}</span> ${esc(t)}</div>`).join("");
  const tbl = r.table ? `<div class="card"><div class="tw"><table class="t"><thead><tr>${r.table.h.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${r.table.rows.map(row => `<tr>${row.map((c, i) => `<td>${i ? esc(c) : "<b>" + esc(c) + "</b>"}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>` : "";
  document.getElementById("sheet").innerHTML = `<div class="sheet" data-close="1"><div class="sheet-in" role="dialog" aria-modal="true" aria-label="${esc(r.n)}">
   <div class="hero">${r.img ? `<img src="${r.img}" alt="" referrerpolicy="no-referrer" data-fallback="${esc(r.em.join(" "))}">` : `<div class="em">${r.em.join("")}</div>`}<button type="button" class="close" data-close="1" aria-label="Cerrar">${I.x}</button></div>
   <div class="sheet-body"><div><span class="small muted">${CH[r.ch]}</span><h1>${esc(r.n)}</h1></div>
   <div class="row small muted">${I.clock.replace("<svg", '<svg width="18" height="18"')} ${esc(r.time)}</div>
   <p class="muted" style="margin:0">${esc(r.when)}</p>
   ${por ? `<div class="stack" style="gap:6px">${por}</div>` : ""}
   <div class="card"><span class="label">Ingredientes</span><ul class="ing">${r.ing.map(([e, t]) => `<li><span class="e">${e}</span><span>${esc(t)}</span></li>`).join("")}</ul></div>
   <div class="card"><span class="label">Preparación</span><ol class="steps">${r.st.map(s => `<li><span>${esc(s)}</span></li>`).join("")}</ol></div>
   ${tbl}${r.tip ? `<div class="card" style="background:var(--leaf-soft)"><div><b style="color:var(--achiote)">Consejo:</b> ${esc(r.tip)}</div></div>` : ""}</div></div></div>`;
  document.body.style.overflow = "hidden";
}
function closeSheet() { document.getElementById("sheet").innerHTML = ""; document.body.style.overflow = ""; }
document.addEventListener("error", ev => { const t = ev.target; if (t.tagName === "IMG" && t.dataset.fallback) { const d = document.createElement("div"); d.className = "em"; d.textContent = t.dataset.fallback.split(" ").slice(0, 3).join(""); t.replaceWith(d); } }, true);

// ---------- SÚPER
const WHO_LABEL = { NK: "Noel y Ninoska", N: "Noel", K: "Ninoska", S: "Stefanie", A: "Todos" };
function viewSuper() {
  if (!S.shop) return `<h1>Súper</h1><p class="muted">Cargando la lista…</p>`;
  const items = S.shop.items || [];
  const f = S.shopFilter;
  const show = i => (f === "all" || (f === "need" && !i.have) || (f === "S" && i.who === "S") || (f === "NK" && i.who !== "S"));
  const cats = [...new Set(items.map(i => i.cat))];
  const need = items.filter(i => !i.have).length;
  return `<div class="stack"><h1>Lista del súper</h1>
   <div class="card" style="gap:10px"><div class="row between"><b>${need} por comprar</b><span class="small muted">${items.length - need} en casa</span></div>
   <p class="small muted" style="margin:0">Compartida entre Noel, Ninoska y Stefanie. Lo que marca uno, lo ven todos.</p>
   <div class="opt" role="group" aria-label="Filtro">${[["all", "Todo"], ["need", "Lo que falta"], ["NK", "Noel y Ninoska"], ["S", "Stefanie"]].map(([k, l]) => `<button type="button" data-sf="${k}" aria-pressed="${f === k}">${l}</button>`).join("")}</div></div>
   <form id="shopform" class="card" style="gap:8px"><span class="label">${I.cart}Agregar producto</span><input type="text" id="sh-name" placeholder="Producto"><div class="grid2"><input type="text" id="sh-qty" placeholder="Cantidad"><select id="sh-cat" aria-label="Sección">${[...new Set([...cats, "Otros"])].map(c => `<option>${esc(c)}</option>`).join("")}</select></div><button class="btn primary" type="submit">+ Agregar</button></form>
   ${cats.map(c => { const its = items.filter(i => i.cat === c && show(i)); if (!its.length) return ""; return `<section class="card" style="gap:0"><span class="label" style="padding-bottom:6px">${esc(c)}</span>${its.map(i => `<label class="shop-item ${i.have ? "have" : ""}"><input type="checkbox" data-have="${esc(i.id)}" ${i.have ? "checked" : ""} aria-label="Ya tengo ${esc(i.name)}"><span><span class="nm"><b>${esc(i.name)}</b></span>${i.who && i.who !== "A" ? `<span class="who-tag c-${i.who}">${WHO_LABEL[i.who] || ""}</span>` : ""}<br><span class="small muted">${esc(i.qty)}</span></span><button type="button" class="del ${pendingDel === "sh" + i.id ? "confirm" : ""}" data-delshop="${esc(i.id)}">${pendingDel === "sh" + i.id ? "¿Quitar?" : "✕"}</button></label>`).join("")}</section>`; }).join("")}
   <button type="button" class="btn ${pendingDel === "reset" ? "primary" : ""}" data-shopreset="1">${pendingDel === "reset" ? "Tocá otra vez para confirmar" : "Semana nueva: todo pasa a «falta»"}</button></div>`;
}
async function saveShop(items) { S.shop = { ...S.shop, items }; render(true); try { await FB.set("shop/list", { items, updated: Date.now() }); } catch (e) { toast("No se pudo guardar la lista"); } }

// ---------- HISTORIAL
function viewHistorial() {
  const h = S.history, by = Object.fromEntries(h.map(x => [x.date, x]));
  const last7 = Array.from({ length: 7 }, (_, i) => addDays(TODAY, i - 6));
  const wk = last7.map(d => by[d]).filter(Boolean);
  const avg = a => a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0;
  const comp = avg(wk.map(x => score(x, S.person))), water = avg(wk.map(x => x.water || 0));
  const sleepH = avg(wk.map(x => parseFloat(x.sleep?.hours)).filter(n => !isNaN(n)));
  const ex = wk.filter(x => x.exercise?.on || x.walk?.on).length;
  const maxW = Math.max(8, ...last7.map(d => by[d]?.water || 0));
  const groups = {}; h.forEach(x => (groups[x.planName || "Plan"] = groups[x.planName || "Plan"] || []).push(x));
  return `<div class="stack"><h1>Mi historial</h1>
   <div class="stats"><div class="stat"><b>${Math.round(comp)}%</b><span class="small muted">plan cumplido · 7 días</span></div><div class="stat"><b>${water.toFixed(1)}</b><span class="small muted">vasos de agua al día</span></div><div class="stat"><b>${sleepH ? sleepH.toFixed(1) + " h" : "—"}</b><span class="small muted">de sueño promedio</span></div><div class="stat"><b>${ex}/7</b><span class="small muted">días con actividad</span></div></div>
   <div class="card"><span class="label">${I.drop}Agua · últimos 7 días</span><div class="bars">${last7.map(d => { const v = by[d]?.water || 0; return `<div><span>${v || ""}</span><i style="height:${v / maxW * 70}px"></i><span>${DAYN[dow(d)].slice(0, 3)}</span></div>`; }).join("")}</div></div>
   ${h.length ? Object.entries(groups).map(([pn, days]) => `<section class="stack" style="gap:8px"><span class="label">${esc(pn)}</span>${days.map(x => { const ms = SLOTS[S.person].map(k => x.meals?.[k]?.s); const ok = ms.filter(s => s === "ok").length, ch = ms.filter(s => s === "cambio").length;
     return `<button type="button" class="hday" data-openday="${x.date}"><div class="row between"><b>${DAYN[dow(x.date)]} ${nice(x.date)}</b><span style="font-size:1.4rem">${x.mood?.v ? MOODS[x.mood.v - 1][0] : ""}</span></div>
     <div class="chips"><span class="chip">🍽️ ${ok}/${SLOTS[S.person].length}${ch ? ` · ${ch} cambio${ch > 1 ? "s" : ""}` : ""}</span><span class="chip">💧 ${x.water || 0}</span>${x.sleep?.hours ? `<span class="chip">😴 ${esc(x.sleep.hours)} h</span>` : ""}${x.exercise?.on ? `<span class="chip">🏋️ ${esc(x.exercise.min || "")}${x.exercise.min ? " min" : ""}</span>` : ""}${x.walk?.on ? `<span class="chip">🚶 ${esc(x.walk.min || "")}${x.walk.min ? " min" : ""}</span>` : ""}${(x.out || []).length ? `<span class="chip">🍴 ${x.out.length} fuera</span>` : ""}</div>
     ${x.mood?.note ? `<div class="small muted">${esc(x.mood.note)}</div>` : ""}</button>`; }).join("")}</section>`).join("") : '<p class="muted">Todavía no hay días registrados. Empezá en la pestaña Hoy.</p>'}</div>`;
}

// ---------- PERFIL Y PLAN
function viewPerfil() {
  if (S.editing) return viewEditor();
  const owners = visibleOwners(); const pw = owners.includes(S.planWho) ? S.planWho : S.person;
  const list = plansOf(pw); const cur = planFor(pw, TODAY); const p = list.find(x => x.id === S.planView) || cur;
  const week = DAYN.map((dn, i) => `<details class="card" ${dow(TODAY) === i && p.id === cur.id ? "open" : ""}><summary>${dn}</summary>${SLOTS[pw].map(k => `<div><span class="label">${SLOTN[k]}</span><div>${esc(p.days[i]?.[k]?.t)}</div></div>`).join("")}</details>`).join("");
  const sup = (p.supl || []).map(x => `<li><b>${esc(x.n)}</b> · ${esc(x.w)} · ${x.d.length === 7 ? "todos los días" : x.d.map(i => DAYN[i].slice(0, 3)).join(", ")}</li>`).join("");
  return `<div class="stack"><h1>Perfil y plan</h1>
   <div class="card"><div class="row between"><div class="row"><span class="avatar av-${S.person}">${P[S.person].name[0]}</span><div><b>${P[S.person].name}</b><div class="small muted">${esc(S.user.email)}</div></div></div><button type="button" class="btn small" data-logout="1">Salir</button></div>
   <p class="small muted" style="margin:0">Tus registros son privados: solo vos los ves, desde cualquier celular donde entrés con tu correo.</p></div>
   ${owners.length > 1 ? `<div class="seg" role="group">${owners.map(o => `<button type="button" data-pw="${o}" aria-pressed="${pw === o}">${o === S.person ? "Mi plan" : "Plan de " + P[o].name}</button>`).join("")}</div>` : ""}
   <div class="card"><span class="label">Versiones del plan de ${P[pw].name}</span>${list.slice().reverse().map(x => `<button type="button" class="hday" data-pv="${x.id}" style="${x.id === p.id ? "border-color:var(--leaf)" : ""}"><b>${esc(x.name)}</b><span class="small muted">Desde el ${nice(x.start)}${x.id === cur.id ? " · vigente" : x.start > TODAY ? " · empieza pronto" : " · anterior"}</span></button>`).join("")}
   ${editableOwners().includes(pw) ? `<button type="button" class="btn primary" data-newplan="${pw}">+ Cargar plan nuevo de ${P[pw].name}</button><p class="small muted" style="margin:0">El plan nuevo empieza en la fecha que elijás. El historial con los planes anteriores se queda guardado.</p>` : ""}</div>
   <h2>${esc(p.name)}</h2>${week}
   <div class="card"><span class="label">${I.pill}Suplementos de este plan</span><ul style="margin:0;padding-left:20px">${sup || "<li>Ninguno</li>"}</ul></div>
   <p class="small muted" style="text-align:center">Para instalar: en iPhone, Safari → Compartir → «Agregar a pantalla de inicio». En Android, Chrome → ⋮ → «Instalar app».</p></div>`;
}
function viewEditor() {
  const e = S.editing;
  return `<div class="stack"><h1>Plan nuevo de ${P[e.owner].name}</h1><p class="muted small" style="margin:0">Copié el plan vigente para que solo cambiés lo nuevo.</p>
   <div class="card"><label class="f">Nombre<input type="text" id="pe-name" value="${esc(e.name)}"></label><label class="f">Empieza el<input type="date" id="pe-start" value="${esc(e.start)}"></label></div>
   ${DAYN.map((dn, i) => `<div class="card"><b>${dn}</b>${SLOTS[e.owner].map(k => `<label class="f">${SLOTN[k]}<textarea data-pe="${i}.${k}">${esc(e.days[i][k]?.t)}</textarea></label>`).join("")}</div>`).join("")}
   <div class="card"><span class="label">${I.pill}Suplementos</span>${e.supl.map((s, j) => `<div class="stack" style="gap:6px;border-top:1px solid var(--line);padding-top:8px"><input type="text" data-ps="${j}.n" value="${esc(s.n)}" aria-label="Suplemento" placeholder="Nombre"><div class="grid2"><select data-ps="${j}.w" aria-label="Momento">${["Mañana", "Mediodía", "Noche"].map(o => `<option ${s.w === o ? "selected" : ""}>${o}</option>`).join("")}</select><button type="button" class="btn small" data-psdel="${j}">Quitar</button></div><div class="row">${DAYN.map((dn, i) => `<label class="small"><input type="checkbox" data-psd="${j}.${i}" ${s.d.includes(i) ? "checked" : ""}> ${dn.slice(0, 3)}</label>`).join("")}</div></div>`).join("")}<button type="button" class="btn small" data-psadd="1">+ Agregar suplemento</button></div>
   <div class="row"><button type="button" class="btn" data-cancelplan="1">Cancelar</button><button type="button" class="btn primary" data-saveplan="1">Guardar plan nuevo</button></div></div>`;
}

// ---------- eventos
document.addEventListener("click", async ev => {
  const t = ev.target.closest("button,[data-close]"); if (!t) return;
  const ds = t.dataset;
  if (ds.close !== undefined && (ev.target === t || t.tagName === "BUTTON")) { closeSheet(); return; }
  if (ds.authmode) { S.authMode = ds.authmode; S.authErr = ""; renderAuth(); return; }
  if (ds.reset) { const e = document.getElementById("a-email").value.trim(); if (!e) { S.authErr = "Escribí tu correo arriba y tocá otra vez «Olvidé mi contraseña»."; renderAuth(); return; } try { await FB.reset(e); toast("Te mandamos un correo para cambiar la contraseña"); } catch (err) { S.authErr = AUTH_ERR[err.code] || "No se pudo enviar el correo."; renderAuth(); } return; }
  if (ds.logout) { await FB.signOut(); return; }
  if (ds.claim) { try { await FB.claim(S.user.uid, ds.claim); S.person = ds.claim; startData(); } catch (e) { toast("Ese nombre ya tiene cuenta. Elegí el tuyo."); await loadTaken(); renderPick(); } return; }
  if (ds.tab) { S.tab = ds.tab; S.editing = null; pendingDel = null; render(); window.scrollTo(0, 0); return; }
  if (ds.recipe) { openRecipe(ds.recipe); return; }
  if (ds.go) { openDay(addDays(S.date, +ds.go)); return; }
  if (ds.today) { openDay(TODAY); return; }
  if (ds.openday) { S.tab = "hoy"; openDay(ds.openday); window.scrollTo(0, 0); return; }
  const d = S.day;
  if (S.tab === "hoy" && d) {
    if (ds.src) { const m = d.meals[ds.src] = d.meals[ds.src] || {}; m.src = ds.o; changed(); render(true); return; }
    if (ds.meal) { const m = d.meals[ds.meal] = d.meals[ds.meal] || {}; m.s = m.s === ds.v ? null : ds.v; changed(); render(true); return; }
    if (ds.water) { const n = +ds.water; d.water = d.water === n ? n - 1 : n; changed(); render(true); return; }
    if (ds.wadd) { d.water = Math.max(0, (d.water || 0) + +ds.wadd); changed(); render(true); return; }
    if (ds.sw) { d[ds.sw].on = !d[ds.sw].on; changed(); render(true); return; }
    if (ds.sleep) { d.sleep.q = d.sleep.q === +ds.sleep ? 0 : +ds.sleep; changed(); render(true); return; }
    if (ds.mood) { d.mood.v = d.mood.v === +ds.mood ? 0 : +ds.mood; changed(); render(true); return; }
    if (ds.energy) { d.mood.energy = d.mood.energy === +ds.energy ? 0 : +ds.energy; changed(); render(true); return; }
    if (ds.delout !== undefined) { const k = "out" + ds.delout; if (pendingDel === k) { d.out.splice(+ds.delout, 1); pendingDel = null; changed(); } else pendingDel = k; render(true); return; }
  }
  if (ds.ch) { S.ch = ds.ch; render(true); return; }
  if (ds.sf) { S.shopFilter = ds.sf; render(true); return; }
  if (ds.delshop) { ev.preventDefault(); const k = "sh" + ds.delshop; if (pendingDel === k) { pendingDel = null; saveShop(S.shop.items.filter(i => i.id !== ds.delshop)); } else { pendingDel = k; render(true); } return; }
  if (ds.shopreset) { if (pendingDel === "reset") { pendingDel = null; saveShop(S.shop.items.map(i => ({ ...i, have: false }))); toast("Lista lista para la semana nueva"); } else { pendingDel = "reset"; render(true); } return; }
  if (ds.pw) { S.planWho = ds.pw; S.planView = null; render(true); return; }
  if (ds.pv) { S.planView = ds.pv; render(true); return; }
  if (ds.newplan) { const o = ds.newplan; const c = clone(planFor(o, TODAY)); S.editing = { owner: o, name: "Plan nuevo", start: addDays(TODAY, 1), days: c.days, supl: c.supl || [] }; render(); window.scrollTo(0, 0); return; }
  if (ds.cancelplan) { S.editing = null; render(); return; }
  if (ds.psadd) { S.editing.supl.push({ n: "", w: "Mañana", d: [0, 1, 2, 3, 4, 5, 6] }); render(true); return; }
  if (ds.psdel) { S.editing.supl.splice(+ds.psdel, 1); render(true); return; }
  if (ds.saveplan) {
    const e = S.editing; const name = (e.name || "").trim() || "Plan nuevo";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(e.start)) { toast("Elegí la fecha de inicio"); return; }
    if (plansOf(e.owner).some(p => p.start === e.start)) { toast("Ya hay un plan que empieza ese día"); return; }
    const id = `${e.owner}-${e.start}`;
    const days = e.days.map(day => Object.fromEntries(SLOTS[e.owner].map(k => [k, { t: day[k]?.t || "", r: day[k]?.r || [] }])));
    const supl = e.supl.filter(s => s.n.trim()).map(s => ({ n: s.n.trim(), w: s.w, d: s.d }));
    try { await FB.set("plans/" + id, { id, owner: e.owner, name, start: e.start, created: Date.now(), days, supl }); S.editing = null; S.planWho = e.owner; S.planView = id; toast("Plan guardado"); render(); } catch (err) { toast("No se pudo guardar el plan"); }
  }
});
document.addEventListener("keydown", ev => { if (ev.key === "Escape") closeSheet(); });
document.addEventListener("change", ev => {
  const t = ev.target, ds = t.dataset;
  if (ds.supl && S.day) { S.day.supl[ds.supl] = t.checked; changed(); render(true); return; }
  if (ds.have) { saveShop(S.shop.items.map(i => i.id === ds.have ? { ...i, have: t.checked } : i)); return; }
  if (S.editing) {
    if (ds.psd) { const [j, i] = ds.psd.split(".").map(Number); const s = S.editing.supl[j]; s.d = t.checked ? [...new Set([...s.d, i])].sort() : s.d.filter(x => x !== i); return; }
    if (ds.ps) { const [j, k] = ds.ps.split("."); S.editing.supl[+j][k] = t.value; return; }
    if (t.id === "pe-start") { S.editing.start = t.value; return; }
  }
});
document.addEventListener("input", ev => {
  const t = ev.target, ds = t.dataset;
  if (t.id === "rq") { S.rq = t.value; const pos = t.selectionStart; render(true); const n = document.getElementById("rq"); n.focus(); n.setSelectionRange(pos, pos); return; }
  if (S.editing) {
    if (ds.pe) { const [i, k] = ds.pe.split("."); S.editing.days[+i][k] = S.editing.days[+i][k] || { t: "", r: [] }; S.editing.days[+i][k].t = t.value; return; }
    if (ds.ps) { const [j, k] = ds.ps.split("."); S.editing.supl[+j][k] = t.value; return; }
    if (t.id === "pe-name") { S.editing.name = t.value; return; }
  }
  if (!S.day) return;
  if (ds.f) { const [a, b] = ds.f.split("."); S.day[a] = S.day[a] || {}; S.day[a][b] = t.value; changed(); return; }
  if (ds.mnote) { const m = S.day.meals[ds.mnote] = S.day.meals[ds.mnote] || {}; m.note = t.value; changed(); return; }
});
document.addEventListener("submit", async ev => {
  ev.preventDefault();
  const id = ev.target.id;
  if (id === "authform") {
    const e = document.getElementById("a-email").value.trim(), p = document.getElementById("a-pass").value;
    if (!e || !p) { S.authErr = "Escribí tu correo y contraseña."; renderAuth(); return; }
    try { S.authErr = ""; if (S.authMode === "up") await FB.signUp(e, p); else await FB.signIn(e, p); }
    catch (err) { S.authErr = AUTH_ERR[err.code] || "No se pudo entrar. Intentá de nuevo."; renderAuth(); document.getElementById("a-email").value = e; }
    return;
  }
  if (id === "outform" && S.day) { const what = document.getElementById("out-what").value.trim(); if (!what) return; S.day.out = S.day.out || []; S.day.out.push({ meal: document.getElementById("out-meal").value, what, where: document.getElementById("out-where").value.trim() }); changed(); render(true); toast("Comida agregada"); return; }
  if (id === "shopform") { const name = document.getElementById("sh-name").value.trim(); if (!name) return; const item = { id: "u" + Date.now().toString(36), cat: document.getElementById("sh-cat").value, name, qty: document.getElementById("sh-qty").value.trim(), who: S.person === "S" ? "S" : "NK", have: false }; saveShop([...(S.shop.items || []), item]); toast("Agregado a la lista"); }
});
