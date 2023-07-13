let letters_typed = "";
let letterCase = "upper";
let pressedEnter = false;

// array containing all HTML elements with class "key"

const keys = document.getElementsByClassName("key");

const greetings = ["I like the way you code, ", "We meet at last, ", "Greetings and salutations, "]


// function to change case of keyboard letters

function toggleCase() {
   if (letterCase === "upper") {
    letterCase = "lower";
    for (i=0; i<keys.length; i++) {

        if (!(keys[i].classList.contains("nonletter"))) {
            keys[i].innerHTML = keys[i].innerHTML.toLowerCase();
                }   
            }
        }
    else if (letterCase === "lower") {
        letterCase = "upper";
        for (i=0; i<keys.length; i++) {
            if (!(keys[i].classList.contains("nonletter"))) {
                keys[i].innerHTML = keys[i].innerHTML.toUpperCase();
                }   
            }
        }
    }

// add event listener to all keyboard keys and reset button

for (let i=0; i<keys.length; i++) {
    keys[i].addEventListener("click", keyClicked);   
    }

// function to handle key clicks

function keyClicked(){

    let keyInnerHTML = this.innerHTML;

    // if "case" key is clicked

    if (keyInnerHTML === "case") {
        toggleCase();
        playSound("jump")
        
    }

    // if "del" key is clicked

    else if (keyInnerHTML === "del") {
        if (pressedEnter === false) {
            letters_typed = letters_typed.slice(0, -1);
            playSound("snare")
        }
    }

    // if enter key is clicked

    else if (keyInnerHTML === "enter") {
        if (letters_typed.length > 0 && pressedEnter === false) {
            pressedEnter = true;
            let greetingChoice = Math.floor(Math.random() * 3);

            letters_typed = greetings[greetingChoice] + letters_typed + "!";
            }
            playSound("horn")
    }

    // if "space" key is clicked

    else if (keyInnerHTML === "space") {
        if (letters_typed.length <= 20 && pressedEnter === false){
            letters_typed += " ";
            playSound("crash");
        }
    }

    // if reset button is clicked 

    else if (keyInnerHTML === "click here to reset") {
        pressedEnter = false;
        letters_typed = "";
        playSound("boing");
    }

    // if a letter key is pressed

    else if (letters_typed.length <= 20 && pressedEnter === false) {
        letters_typed += keyInnerHTML;
        playSound("snare");
    }

    // update the display text 

    display = document.getElementsByClassName("display")[0]

    if (letters_typed.length > 0) {
        display.innerHTML = letters_typed;
        display.style.color = "white";
        }

    else {
        display.style.color = "gray";
        display.innerHTML = "Please type your name..."
    }
}

function playSound(sound) {
    var soundEffect = new Audio(sound + ".mp3");
    soundEffect.play();
}