"use strict";

// ---------- Seção: Upload da imagem de perfil ----------
// Input escondido responsável por selecionar a imagem
const imgInput = document.querySelector('#imgInput');
// Imagem de pré-visualização exibida no card
const imgPreview = document.querySelector('img');

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

// Valida os campos principais e aplica estilos de erro/sucesso
function enviar() {
    // Nome deve conter apenas letras e espaços
    const patternText = /^[A-z ]+$/g;
    if (!nameInput.value.match(patternText)) {
        nameVerify.classList.add("verifyError");
        nameVerify.classList.remove("verifyCorrect");
        nameP.classList.add("pError");
        nameP.classList.remove("pCorrect");
    } else {
        nameVerify.classList.remove("verifyError");
        nameVerify.classList.add("verifyCorrect");
        nameP.classList.remove("pError");
        nameP.classList.add("pCorrect");
    }

    // Idade deve ser um número positivo
    const patternNumber = /^[1-9]/;
    if (!ageInput.value.match(patternNumber) || ageInput.value < 1) {
        ageVerify.classList.add("verifyError");
        ageVerify.classList.remove("verifyCorrect");
        ageP.classList.add("pError");
        ageP.classList.remove("pCorrect");
    } else {
        ageVerify.classList.remove("verifyError");
        ageVerify.classList.add("verifyCorrect");
        ageP.classList.remove("pError");
        ageP.classList.add("pCorrect");
    }

    // Pronome no formato "xx/yy" (ex.: ela/dela)
    const patternPronoun = /^[A-z]*[\/][A-z]*/i;
    if (!pronounInput.value.match(patternPronoun)) {
        pronounVerify.classList.add("verifyError");
        pronounVerify.classList.remove("verifyCorrect");
        pronounP.classList.add("pError");
        pronounP.classList.remove("pCorrect");
    } else {
        pronounVerify.classList.remove("verifyError");
        pronounVerify.classList.add("verifyCorrect");
        pronounP.classList.remove("pError");
        pronounP.classList.add("pCorrect");
    }
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

// Cria nova tag quando o usuário pressiona Enter
function createTag(e) {
    if (e.key === "Enter") {
        const tag = e.target.value.replace(/\s+/g, ' ');
        if (tag.length > 0 && !tags.includes(tag) && tags.length < maxTags) {
            tag.split(',').forEach(t => {
                tags.push(t);
                buildTag();
            });
        }
        e.target.value = '';
    }
}

tagsInput.addEventListener("keyup", createTag);
countTag();
