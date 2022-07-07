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



/**----INPUTS VALIDATION----*/
const form = document.querySelector(".container"), //looking for "Container" class inside HTML document
    nameField = form.querySelector(".inputName"), //looking for "inputName" class inside container class
    nameVerify = nameField.querySelector(".verify"), //looking for "inputName" class inside container class
    nameInput = nameField.querySelector("input"),
    nameP = nameField.querySelector("p"),

    localField = form.querySelector(".inputLocation"),
    localVerify = localField.querySelector(".verify"),
    localInput = localField.querySelector("input"),
    localP = localField.querySelector("p"),

    pronounField = form.querySelector(".inputPronoun"),
    pronounVerify = pronounField.querySelector(".verify"),
    pronounInput = pronounField.querySelector("input"),
    pronounP = pronounField.querySelector("p"),

    ageField = form.querySelector(".inputAge"),
    ageVerify = ageField.querySelector(".verify"),
    ageInput = ageField.querySelector("input"),
    ageP = ageField.querySelector("p"),

    emojiField = form.querySelector(".inputEmoji"),
    emojiVerify = emojiField.querySelector(".verify"),
    emojiInput = emojiField.querySelector("input"),
    emojiP = emojiField.querySelector("p");

form.onsubmit = (e) => {
    e.preventDefault();//"preventDefault" Prevent an action from happening
    let patternText = /[^a-zA-Z_]/g; //Pattern to validate name

    nameInput.onkeyup = () => { //Validating value of this input
        if (nameInput.value.match(patternText)) { //if name is empty
            nameVerify.classList.add("verifyError");//adding a new class in this variable if this action happens
            nameP.classList.add("pError");//adding a new class in this variable if this action happens
            console.log("Error name")
        } else {
            nameVerify.classList.remove("verifyError");
            nameP.classList.remove("pError");//adding a new class in this variable if this action happens
            console.log("Correct name")
        }
    }
}