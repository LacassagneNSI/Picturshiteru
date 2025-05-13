const promptInput = document.getElementById("promptInput");
const seedInput = document.getElementById("seedInput");
const addSeedBtn = document.getElementById("addSeedBtn");
const generateBtn = document.getElementById("generateBtn");
const seedList = document.getElementById("seedList");
const imageContainer = document.getElementById("imageContainer");
const imageTemplate = document.getElementById("imageTemplate");

let seeds = [Math.floor(Math.random() * 1000000000)]; 

function updateSeedList() {
    seedList.innerHTML = "";
    seeds.forEach((seed, index) => {
        const li = document.createElement("li");
        li.textContent = seed;
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖";
        removeBtn.addEventListener("click", () => {
            seeds.splice(index, 1);
            updateSeedList();
        });
        li.appendChild(removeBtn);
        seedList.appendChild(li);
    });
}

function generateImages(prompt, model = "flux", width = 1024, height = 1024) {
    const encodedPrompt = encodeURI(prompt);

    seeds.forEach((seed) => {
        const url = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=${model}&seed=${seed}&width=${width}&height=${height}`;
        const clone = imageTemplate.content.cloneNode(true);
        const img = clone.querySelector("img");
        const caption = clone.querySelector(".caption");

        img.src = url;
        img.alt = prompt;
        caption.textContent = `Prompt : "${prompt}" | Seed : ${seed}`;

        imageContainer.prepend(clone);
    });
}

addSeedBtn.addEventListener("click", () => {
    const seedValue = parseInt(seedInput.value.trim());
    if (!isNaN(seedValue) && seedValue > 0 && !seeds.includes(seedValue)) {
        seeds.push(seedValue);
        updateSeedList();
        seedInput.value = "";
    }
});

generateBtn.addEventListener("click", () => {
    const prompt = promptInput.value.trim();
    if (prompt && seeds.length > 0) {
        generateImages(prompt);
        promptInput.value = "";
    }
});

promptInput.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        generateBtn.click();
    }
});

updateSeedList();
