"use strict";

// ---------- Seção: Upload da imagem de perfil ----------
// Input escondido responsável por selecionar a imagem
const imgInput = document.querySelector('#imgInput');
// Imagem de pré-visualização exibida no card
const imgPreview = document.querySelector('img');
const imgPlaceholder = document.querySelector('.imgPlaceholder');

// Abre o seletor de arquivos quando a área da imagem é clicada
function chooseImg() {
    imgInput.click();
}

// Carrega e exibe a imagem escolhida
imgInput.addEventListener("change", () => {
    const file = imgInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        imgPreview.src = reader.result;
        imgPlaceholder.style.display = "none";
        imgPreview.removeAttribute('hidden');
    };
    reader.readAsDataURL(file);
});

// ---------- Seção: Gerador de código aleatório ----------
const codeField = document.querySelector(".userCode");
const codeUl = codeField.querySelector("ul");

const codeRandom = [];
while (codeRandom.length < 6) {
    const digit = Math.floor(Math.random() * 9) + 1;
    if (!codeRandom.includes(digit)) {
        codeRandom.push(digit);
    }
}

codeRandom.slice().reverse().forEach(d => {
    codeUl.insertAdjacentHTML("afterbegin", `<li>${d}</li>`);
});

// ---------- Seção: Localização do usuário ----------
const locationField = document.querySelector('.inputLocation');
const locationLabel = locationField.querySelector('label');

function onLocationSuccess(position) {
    const { latitude, longitude } = position.coords;
    const url =
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            const locationDone = `${data.city} - ${data.countryName}`;
            locationLabel.textContent = locationDone;
        });

    localVerify.classList.add("verifyCorrect");
    localP.classList.add("pCorrect");
    localVerify.classList.remove("verifyError");
    localP.classList.remove("pError");
}

function onLocationError() {
    locationLabel.textContent = "Error with your location 👀";

    localVerify.classList.remove("verifyCorrect");
    localP.classList.remove("pCorrect");
    localVerify.classList.add("verifyError");
    localP.classList.add("pError");
}

navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);

// ---------- Seção: Validação dos campos do formulário ----------
const form = document.querySelector(".container");
const nameField = form.querySelector(".inputName");
const nameVerify = nameField.querySelector(".verify");
const nameInput = nameField.querySelector("input");
const nameP = nameField.querySelector("p");

const localField = form.querySelector(".inputLocation");
const localVerify = localField.querySelector(".verify");
const localInput = localField.querySelector("input");
const localP = localField.querySelector("p");

const pronounField = form.querySelector(".inputPronoun");
const pronounVerify = pronounField.querySelector(".verify");
const pronounInput = pronounField.querySelector("input");
const pronounP = pronounField.querySelector("p");

const ageField = form.querySelector(".inputAge");
const ageVerify = ageField.querySelector(".verify");
const ageInput = ageField.querySelector("input");
const ageP = ageField.querySelector("p");

const emojiField = form.querySelector(".inputEmoji");
const emojiInput = emojiField.querySelector("input");

function setVerify(element, paragraph, valid) {
    if (valid) {
        element.classList.add("verifyCorrect");
        element.classList.remove("verifyError");
        paragraph.classList.add("pCorrect");
        paragraph.classList.remove("pError");
    } else {
        element.classList.add("verifyError");
        element.classList.remove("verifyCorrect");
        paragraph.classList.add("pError");
        paragraph.classList.remove("pCorrect");
    }
}

function validateName() {
    const patternText = /^[A-Za-zÀ-ÿ ]+$/;
    setVerify(nameVerify, nameP, patternText.test(nameInput.value));
}

function validateAge() {
    const age = parseInt(ageInput.value, 10);
    const valid = !isNaN(age) && age > 0;
    setVerify(ageVerify, ageP, valid);
}

function validatePronoun() {
    if (pronounInput.value.includes(" ")) {
        pronounInput.value = pronounInput.value.replace(/\s+/, '/');
    }
    const patternPronoun = /^[A-Za-zÀ-ÿ]+\/[A-Za-zÀ-ÿ]+$/;
    setVerify(pronounVerify, pronounP, patternPronoun.test(pronounInput.value));
}

// Limita o campo nome apenas a letras durante a digitação
nameInput.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ ]+/g, "");
    validateName();
});

// Garante que o campo idade receba apenas números
ageInput.addEventListener("input", e => {
    e.target.value = e.target.value.replace(/\D+/g, "");
    validateAge();
});

pronounInput.addEventListener("input", validatePronoun);

// Valida os campos principais e aplica estilos de erro/sucesso
function enviar() {
    validateName();
    validateAge();
    validatePronoun();
}

// ---------- Seção: Adição de tags ----------
const tagsField = document.querySelector(".inputTags");
const tagsUl = tagsField.querySelector("ul");
const tagsInput = tagsUl.querySelector("input");
const countNumb = tagsField.querySelector(".countNumb");

let tags = [];
const maxTags = 5;

// Atualiza o contador de tags restantes
function countTag() {
    countNumb.textContent = maxTags - tags.length;
}

// Constrói o HTML das tags existentes
function buildTag() {
    tagsUl.querySelectorAll("li").forEach(li => li.remove());

    tags.slice().reverse().forEach(tag => {
        const tagLi = `<li>${tag} <i class="uit uit-multiply" onclick="removeTag(this, '${tag}')"></i></li>`;
        tagsUl.insertAdjacentHTML("afterbegin", tagLi);
    });

    countTag();
}

// Remove tag específica
function removeTag(element, tag) {
    const index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    element.parentElement.remove();
    countTag();
}

// Adiciona tag quando usuário pressiona Enter, vírgula ou espaço
function addTagsFromValue(value) {
    value.split(/[\s,]+/).forEach(t => {
        const tag = t.trim();
        if (tag && !tags.includes(tag) && tags.length < maxTags) {
            tags.push(tag);
        }
    });
    buildTag();
}

function handleTagInput(e) {
    if (["Enter", ",", " "].includes(e.key)) {
        e.preventDefault();
        addTagsFromValue(e.target.value);
        e.target.value = "";
    }
}

function handleTagBlur(e) {
    addTagsFromValue(e.target.value);
    e.target.value = "";
}

tagsInput.addEventListener("keydown", handleTagInput);
tagsInput.addEventListener("blur", handleTagBlur);
countTag();

// ---------- Seção: Geração de PDF ----------
function generatePDF() {
    enviar();
    const card = document.querySelector('.card');
    html2canvas(card).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        const rect = card.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const orientation = width > height ? 'landscape' : 'portrait';

        const pdf = new jspdf.jsPDF({
            orientation,
            unit: 'px',
            format: [width, height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('card.pdf');
    });
}
