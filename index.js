const inputText = document.getElementById("input");
const searchBtn = document.getElementById("btn");
const audio = document.getElementById("audio");
const info = document.getElementById("info");
const resultsEl = document.getElementById("results");
const defs = document.getElementById("definitions");

searchBtn.addEventListener("click", async function () {
    defs.innerHTML = "";
    if (inputText.value) {
        info.innerText = `Searching for a word "${inputText.value}"`;
        const result = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputText.value.trim()}`)
        .then((response) => response.json());
        
        info.style.display = "none";
        resultsEl.style.display = "block";

        for (let i = 0; i < result[0].meanings[0].definitions.length; i++) {
            let meaningEl = document.createElement("p");
            meaningEl.classList.add("def");
            meaningEl.innerText = `Meaning ${i}: ` + result[0].meanings[0].definitions[i].definition;
            defs.appendChild(meaningEl);
            
            if (result[0].meanings[0].definitions[i].example) {
                let example = document.createElement("p");
                example.classList.add("def");
                example.innerText = "Example: " + result[0].meanings[0].definitions[i].example;
                defs.appendChild(example);
            }

            let br = document.createElement("br");
            defs.appendChild(br);
        }
        
        audio.setAttribute("src", result[0].phonetics[0].audio);
    }
});
