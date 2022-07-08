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

/**----CODE GENERATOR----*/
const codeField = document.querySelector(".userCode"),
    codeUl = codeField.querySelector("ul");

let codeRandom = [];

while (codeRandom.length < 6) {
    let code = Math.floor(Math.random() * 9) + 1;
    if (codeRandom.indexOf(code) === -1) codeRandom.push(code);
    console.log(codeRandom);
}

codeRandom.slice().reverse().forEach(code => {
    let codeLi = `<li>${code}</li>`;
    codeUl.insertAdjacentHTML("afterbegin", codeLi);
});

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

    //VALIDATING NAME
    let patternText = /^[A-z ]+$/g; //Pattern to validate name
    nameInput.onkeyup = () => { //Validating value of this input
        if (!nameInput.value.match(patternText) || nameInput.value == null) { //if name is empty
            nameVerify.classList.add("verifyError");//adding the error class in this variable if this action happens
            nameP.classList.add("pError");//adding the error class in this variable if this action happens

            nameVerify.classList.remove("verifyCorrect");
            nameP.classList.remove("pCorrect");//removing the error class in this variable if this action happens

            console.log("Error name");
        } else {
            nameVerify.classList.add("verifyCorrect");
            nameP.classList.add("pCorrect");

            nameVerify.classList.remove("verifyError");
            nameP.classList.remove("pError");//removing the error class in this variable if this action happens

            console.log("Correct name");
        }
    }

    //VALIDATING AGE
    let patternNumber = /^[1-9]/; //Pattern to validate age
    ageInput.onkeyup = () => { //Validating value of this input
        if (!ageInput.value.match(patternNumber) || ageInput.value < 1) { //if age is empty
            ageVerify.classList.add("verifyError");//adding the error class in this variable if this action happens
            ageP.classList.add("pError");//adding the error class in this variable if this action happens

            ageVerify.classList.remove("verifyCorrect");
            ageP.classList.remove("pCorrect");//removing the error class in this variable if this action happens

            console.log("Error age");
        } else {
            ageVerify.classList.add("verifyCorrect");
            ageP.classList.add("pCorrect");

            ageVerify.classList.remove("verifyError");
            ageP.classList.remove("pError");//removing the error class in this variable if this action happens

            console.log("Correct age");
        }
    }

    //VALIDATING PRONOUN
    let patternPronoun = /^[A-z]*[\/][A-z]*/i; //Pattern to validate pronoun
    pronounInput.onkeyup = () => { //Validating value of this input
        if (!pronounInput.value.match(patternPronoun) || pronounInput.value == null) { //if pronoun is empty
            pronounVerify.classList.add("verifyError");//adding the error class in this variable if this action happens
            pronounP.classList.add("pError");//adding the error class in this variable if this action happens

            pronounVerify.classList.remove("verifyCorrect");
            pronounP.classList.remove("pCorrect");//removing the error class in this variable if this action happens

            console.log("Error pronoun");
        } else {
            pronounVerify.classList.add("verifyCorrect");
            pronounP.classList.add("pCorrect");

            pronounVerify.classList.remove("verifyError");
            pronounP.classList.remove("pError");//removing the error class in this variable if this action happens

            console.log("Correct pronoun");
        }
    }

    //TAGS INPUT
    const tagsField = document.querySelector(".inputTags"),
        tagsUl = tagsField.querySelector("ul"),
        tagsInput = tagsUl.querySelector("input");

    let tags = [],
        maxTags = 10;

    tagsInput.addEventListener("keyup", createTag);

    function createTag(e) { // creating tag in array
        if (e.key == "Enter") { //detecting "enter" key pressing
            let tag = e.target.value.replace(/\s+/g, ' ');//swapping any extra space for one in the input tag

            if (tag.length > 1 && !tags.includes(tag)) {//checking text standardization
                if (tags.length < 10) { //checking the max capacity of the array
                    tag.split(',').forEach(tag => { //action to separate tags after comma 
                        tags.push(tag);
                        buildTag();
                    })
                }
            }
            e.target.value = '';
        }
    }

    function buildTag() { //creating the tag in HTML code
        tagsUl.querySelectorAll("li").forEach(li => li.remove());

        tags.slice().reverse().forEach(tag => {
            let tagIl = `<li>${tag}</li>`;
            tagsUl.insertAdjacentHTML("afterbegin", tagIl);
        });
        countTag();
    }

/*    function remove(element, tag) {
        let index = tags.indexOf(tag);
        tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
        element.parentElement.remove();
        
        countTag();
    }*/


}