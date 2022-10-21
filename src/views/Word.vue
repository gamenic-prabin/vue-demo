<template>
    <div class="flex flex-col h-screen max-w-md mx-auto justify-evenly">
        <div>
            <word-row v-for="(guess, i) in state.guesses" :key="i" :value="guess" :solution="state.solution"
                :submitted="i < state.currentGuessIndex"></word-row>
        </div>
        <div v-if="state.currentGuessIndex >= 3"> {{ state.solution }}</div>
        <p v-if="wonGame" class="text-center">
            Congratus you solved it!
        </p>
        <p v-else-if="lostGame" class="text-center">
            Out of tries.
        </p>
        <simple-keyboard @onKeyPress="handleInput" :guessedLetters="state.guessedLetters" />
    </div>
</template>


<script setup>
import SimpleKeyboard from './SimpleKeyboard.vue';
import WordRow from './WordRow.vue';
import { reactive, onMounted, computed } from "vue";
import consttext from "@/assets/english-word.txt";

const state = reactive({
    solution: "books",
    guesses: ["", "", "", "", ""],
    currentGuessIndex: 0,
    guessedLetters: {
        found: [],
        hint: [],
        miss: []
    },
    words: []
})

fetch(consttext)
    .then(response => response.text())
    .then((data) => {
        state.words.push(...data.split("\n"))
    }).finally(() => {
        // Random number from 5757 to 0, act as index to get the word of that index.
        const index = Math.floor(Math.random() * 5757 + 0)
        state.solution = state.words[index]

        // Random Index to change a single correct letter.
        var changeIndex = Math.floor(Math.random() * 6 + 0)
        var tempRandomText = randomText()
        tempRandomText = tempRandomText.substring(0, changeIndex) + state.solution[changeIndex] + tempRandomText.substring(changeIndex+1);

        // Put random text on first index of gussed array.
        state.guesses[0] = tempRandomText
        const currentGuess = state.guesses[state.currentGuessIndex];
        getGuessedLetter(currentGuess)
    });

const wonGame = computed(
    () =>
        state.guesses[state.currentGuessIndex - 1] === state.solution
)

const lostGame = computed(
    () =>
        !wonGame.value && state.currentGuessIndex >= 6
)

const handleInput = (key) => {
    if (state.currentGuessIndex >= 6 || wonGame.value) {
        return;
    }
    const currentGuess = state.guesses[state.currentGuessIndex];

    if (key == "{enter}") {
        getGuessedLetter(currentGuess)
    } else if (key == "{bskp}") {
        state.guesses[state.currentGuessIndex] = currentGuess.splice(0, -1)
    } else if (currentGuess.length < 5) {
        const alphaRange = /[a-zA-Z]/;
        if (alphaRange.test(key)) {
            state.guesses[state.currentGuessIndex] += key;
        }
    }
};

function getGuessedLetter(currentGuess) {
    if (currentGuess.length == 5) {
        state.currentGuessIndex++
        for (var i = 0; i < currentGuess.length; i++) {
            let c = currentGuess.charAt(i)
            if (c == state.solution.charAt(i)) {
                state.guessedLetters.found.push(c)
            } else if (state.solution.indexOf(c) != -1) {
                state.guessedLetters.hint.push(c)
            } else {
                state.guessedLetters.miss.push(c);
            }
        }
    }
}

function randomText() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  for (var i = 0; i < 5; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

onMounted(() => {
    window.addEventListener("keyup", (e) => {
        e.preventDefault();
        let key =
            e.keyCode == 13
                ? "{enter}"
                : e.keyCode == 8
                    ? "{bksp}"
                    : String.fromCharCode(e.keyCode).toLowerCase();

        handleInput(key)
    })
})

</script>