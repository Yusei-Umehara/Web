document.addEventListener("DOMContentLoaded", () => {
    createSquare();
    
    function createSquare(){
        const gameBoard = document.getElementById("board")
        
        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            
            square.classList.add("animate__animated");     // Animate.css library line...
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);

        }
    }
// CREAR PALABRA AL AZAR:   120 PALABRAS  ,  osea del  0 al 119
    const randomLetter = ["about", "above", "abuse", "actor", "acute", "admit", "adopt", "adult", "after", "again", 
                          "agent", "agree", "ahead", "alarm", "album", "alert", "alike", "baker", "bases", "basic", 
                          "basis", "beach", "began", "begin", "begun", "being", "below", "bench", "billy", "birth", 
                          "black", "blame", "blind", "block","blood", "board", "boost", "booth", "bound", "brain", 
                          "brand", "bread", "break", "breed", "brief", "bring", "broad", "broke", "brown", "build", 
                          "built", "buyer", "cable", "calif", "carry", "catch", "cause", "chain", "chair", "chart", 
                          "chase", "cheap", "check", "chest", "chief", "child", "china", "chose", "civil", "claim", 
                          "class", "clean", "clear", "click", "clock", "close", "coach", "coast", "could", "count", 
                          "court", "cover", "craft", "crash", "cream", "crime", "cross", "crowd", "crown", "curve", 
                          "cycle", "daily", "dance", "dated","dealt", "death", "debut", "delay", "depth", "doing", 
                          "doubt", "dozen", "draft", "drama", "drawn", "dream", "dress", "drill", "drink", "drive", 
                          "drove", "dying", "eager", "early","earth", "eight","elite", "empty", "enemy", "start"];
    var min = 0; max = 119;
    let random_letter_result;
    let random_value;
    function selectRandomWord(){
        
        random_value = Math.floor(Math.random() * (max -min + 1) + min);
        randomLetter[random_value];
        random_letter_result = randomLetter[random_value];
        console.log(random_letter_result);
        
        return random_letter_result;

    }

// Cambiar a tema oscuro
    let modo = document.getElementById("modo");
    let body = document.body;

    modo.addEventListener("click", function(){
        //alert();
        let val=body.classList.toggle("dark"); 
        // la primera vez que lo seleccionemos agregara o borrara la calse segun su estado.

        localStorage.setItem("modo",val);
    });
    // LOCAL STORAGE:
    // Permite Almacenar calores de string en nuestro navegador. para verlo en el navegador, ctrl + shift + i / application / local storage.
    let valor = localStorage.getItem("modo");


    if (valor=="true"){
        body.classList.add("dark");
    }
    else{
        body.classList.remove("dark");
    }


    selectRandomWord();
//  ACTUALIZAR PANTALLA:
    let guessedWords = [[]];
    let availableSpace = 1;

    let word = random_letter_result;
    let guessedWordCount = 0;

    function getCuttentWordArr() {
        const numberOfGuessedWords = guessedWords.length;
        return guessedWords[numberOfGuessedWords - 1];
    }
    function updateGuessedWords(letter) {
        const currentWordArr = getCuttentWordArr();

        if (currentWordArr && currentWordArr.length < 5 ) {
            currentWordArr.push(letter);

            const availableSpaceEl = document.getElementById(String(availableSpace));  // 1 por available
            availableSpace = availableSpace + 1;

            availableSpaceEl.textContent = letter;
        }
    } //
// CREAR COLORES: 
        function getTileColor(letter, index){
            const isCorrectLetter = word.includes(letter);
            //const body_class_value = document.getElementsByClassName("dark");

            if (!isCorrectLetter) {
                //console.log("letra erronea");
                if( body.className == "dark" ){
                    return "rgb(58, 58, 60)"; // grey
                }
                else
                    return "rgb(198, 198, 200)"; // grey_clear
            }

            const letterInThatPosition = word.charAt(index);
            const isCorrectPosition = letter === letterInThatPosition;
            
            if (isCorrectPosition) {
                //console.log("posicion correcta "); 
                return "rgb(83, 141, 78)"; // verde
            }

            //console.log("letra correcta"); 
            return "rgb(181, 159, 59)"; // amarillo o naranja 
        }

// VERIFICAR LETRA | LOGICA DE LAS LETRAS :
        function handleSubmitWord () {
            const currentWordArr = getCuttentWordArr();
            if (currentWordArr.length !== 5 ) {
                window.alert("word must be 5 letters");
                return;
            }
           

            const currentWord = currentWordArr.join("");
            
            const firstLetterId = guessedWordCount * 5 + 1;
            const interval = 200;
            currentWordArr.forEach((letter, index) => {
                setTimeout(() => {
                    /* const tileColor = "rgb(58, 58, 60)"; */
                    const tileColor = getTileColor(letter, index);

                    const letterId = firstLetterId + index;
                    const letterEl = document.getElementById(letterId);
                    letterEl.classList.add("animate__flipInX");
                    letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
                }, interval * index );
            });

            guessedWordCount += 1;

            if (currentWord === word) {
                you_win = true;
                setTimeout(() => {
                    window.alert("Congratulations, you win!");
                }, interval * 6 ); 
            }

            if (guessedWords.length === 6 ) {
                window.alert(`Sorry, you have no more guesses! The word is ${word}.`);
            }

            guessedWords.push([]);

        } 
//
// ERASE KEY 
        function handleDeleteLeter(){
            const currentWordArr = getCuttentWordArr();
            const removedLetter = currentWordArr.pop();
        
            guessedWords[guessedWords.length -1 ] = currentWordArr;

            const lastLetterEl = document.getElementById(String(availableSpace - 1 ));

            lastLetterEl.textContent = "";
            availableSpace = availableSpace -1;
        }

// KEYBOARD FROM SCREEN & KEYS LOGIC
        const keys = document.querySelectorAll(".keyboard-row button");
        let you_win = false;
        let word_mayor5 = false;

        for (let i = 0; i < keys.length; i++ ) {
            keys[i].onclick =({ target }) => {
                const letter = target.getAttribute("data-key");
                
                if (letter === "enter" && you_win == false) {
                    console.log("enter digital-key PRESSED")
                    handleSubmitWord();
                    return;
                }

                if (letter === "del" && you_win == false) {
                    handleDeleteLeter();
                    return;
                }

                console.log(letter);
                if( you_win == false ){
                    updateGuessedWords(letter); // se encuentra en: Actualizar pantalla
                }

            };
        }
    //
// KEYBOARD FROM PC:
        let valid_charcters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
                               "a", "s", "d", "f", "g", "g", "h", "j", "k", "l",
                               "z", "x", "c", "v", "v", "b", "n", "m"   ]
        let key_pc = document.addEventListener("keydown", (evento) =>{
            const keyName = evento.key;
            console.log("key_event is:\n  " + "key: " + keyName);
            /* alert("keydown event\n\n" + "key: " + keyName); */    
            if(valid_charcters.indexOf(keyName) < 0 && keyName != "Enter" && keyName != "Backspace" ){
                alert("That is no a valid character");
            }
            else if (keyName === "Enter" && you_win == false) {
                console.log("enter analog-key PRESSED")
                handleSubmitWord();
                return;
            }
            else if (keyName === "Backspace" && you_win == false) {
                handleDeleteLeter();
                return;
            }
            else
                updateGuessedWords(keyName); // se encuentra en: Actualizar pantalla  
            
        }); 

//
});

