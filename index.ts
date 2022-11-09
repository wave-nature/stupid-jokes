const btn = document.querySelector(".btn")! as HTMLElement;
let joke = "";
interface Data {
  body: Joke[];
}

interface Joke {
  setup: string;
  punchline: string;
}

const requestJoke = (): void => {
  fetch("https://dad-jokes.p.rapidapi.com/random/joke", {
    headers: {
      "X-RapidAPI-Key": "94e1bf12ffmsh232f491070ce74ap1c0091jsn76e354bfb013",
      "X-RapidAPI-Host": "dad-jokes.p.rapidapi.com",
    },
  })
    .then((res) => res.json())
    .then((data: Data) => {
      const body = data.body[0];
      joke = `${body.setup}        ${body.punchline}`;
      if ("speechSynthesis" in window) {
        speak(joke);
      } else {
        const div = document.createElement("div");
        div.classList.add("joke");
        div.textContent = joke;
        document.querySelector(".container")!.appendChild(div);
      }
    })
    .catch((err) => console.log(err));
};

function speak(text: string): void {
  let speakData = new SpeechSynthesisUtterance();
  speakData.text = text;
  speechSynthesis.speak(speakData);
}

btn.addEventListener("click", requestJoke);
