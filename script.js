const resultDiv = document.querySelector(".result");
const Word = document.querySelector(".word");
const Pronunce = document.querySelector(".pronunce");
const audio = document.querySelector("audio");
const define = document.querySelector(".definition");
const synonym = document.querySelector(".synonyms");
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const handle = async (e) => {
    if (e.key == "Enter") {
        const word = e.target.value;
        const result = await fetch(url + word);
        const data = await result.json();
        resultDiv.style.removeProperty("display");

        if (result.ok) {
            Word.innerText = data[0].word;
            Pronunce.innerText = data[0].phonetics[0].text;
            audio.src = data[0].phonetics[0].audio;
            define.innerText = data[0].meanings[0].definitions[0].definition;
            const synonymsArr = data[0].meanings[0].definitions[0].synonyms;

            audio.style.removeProperty("display");
            synonym.style.removeProperty("display");
            Pronunce.style.removeProperty("display");
            document.querySelectorAll(".bold")[0].style.removeProperty("display");
            document.querySelectorAll(".bold")[1].style.removeProperty("display");

            let synonymsList = "";
            if (synonymsArr.lenght) {
                for (let i = 0; i < synonymsArr.length; i++) {
                    synonymsList += `<p class="box">${synonymsArr[i]}</p>`
                }
            } else {
                synonymsList = `<p class="box">No synonyms Available</p>`;
            }
            synonym.innerHTML = synonymsList;
            resultDiv.style.display = "block";
        } else {
            audio.style.display = "none";
            synonym.style.display = "none";
            Pronunce.style.display = "none";
            document.querySelectorAll(".bold")[0].style.display = "none";
            document.querySelectorAll(".bold")[1].style.display = "none";
            
            define.innerText = data.message;
            Word.innerText = data.title;
        }
    }
}