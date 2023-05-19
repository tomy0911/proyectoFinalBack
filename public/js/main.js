const socket = io();

const divChat = document.querySelector("#chat");
const boton = document.querySelector("#enviar");

boton.addEventListener("click", (event) => {
  const mensaje = document.querySelector("#texto").value;
  const mail = document.getElementById("mail");
  const message = {
    email: mail,
    texto: mensaje,
    timestamp: new Date().toLocaleString(),
  };
  socket.emit("newMessage", message);
});

socket.on("messages", (messages) => {
  if (messages == null) {
    divChat.innerHTML = " ";
  } else {
    divChat.innerHTML = messages
      .map((message) => {
        return `<div>
                <span style="color:blue; font-weight: bold;">${message.email}</span>
                <span style="color:brown">${message.timestamp}</span>
                <span style="color:green; font-style: italic;">${message.texto}</span>
                </div>
                `;
      })
      .join(" ");
  }
});

socket.on("newMessages", (messages) => {
  divChat.innerHTML = messages
    .map((message) => {
      return `<div>
            <span style="color:blue; font-weight: bold;">${message.email}</span>
            <span style="color:brown">${message.timestamp}</span>
            <span style="color:green; font-style: italic;">${message.texto}</span>
            </div>
            `;
    })
    .join(" ");
});
