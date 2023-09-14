import { server } from "./server.js";
const form = document.querySelector("#form");
const input = document.querySelector("#url");
const content = document.querySelector("#content");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const videoURL = input.value;

  if (!videoURL.includes("youtube.com/shorts")) {
    return content.textContent = "Esse video não é um short do youtube";
  }

  const params = videoURL.split("/shorts/")[1]
  const VideoID = params.split("?")[0]

  content.textContent = "Obtendo o texto do video..."

  const transcription = await server.get("/summary/" + VideoID)

  content.textContent = "Realizando o resumo..."

   const summary = await server.post("/summary", {
     text: transcription.data.result
   })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")

})