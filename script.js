/**----PROFILE IMAGE UPLOAD----*/
const imgInput = document.querySelector('#imgInput'),
    img = document.querySelector('img');

function chooseImg() {
    imgInput.click();
}

imgInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function () {
            const result = reader.result;
            img.src = result;

        }
        reader.readAsDataURL(file);
    }
})


/**----TAGS AREAS----*/
const divTags = document.querySelector("inputTags"),
    inputTag = tags.querySelector("input");

let maxTags = 5,
    tags = [];





/*const ul = document.querySelector("ul");
let digts;

function createDigt(e) {
    if (e.key == "Enter") {
        digts.slice().reverse().forEach(digts => {
            let newDigt = `<li>10</li>`;
            ul.insertAdjacentHTML("afterbegin", newDigt);
        });
    }
}*/
