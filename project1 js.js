// Flashcard data
const flashcards = [];
let currentCardIndex = -1;

// DOM Elements
const flashcardElement = document.getElementById("flashcard");
const showAnswerButton = document.getElementById("show-answer");
const nextCardButton = document.getElementById("next-card");
const addWordForm = document.getElementById("add-word-form");
const wordListElement = document.getElementById("word-list");

// Functions
function displayFlashcard(index) {
    if (flashcards.length === 0) {
        flashcardElement.innerHTML = "No words available. Add some!";
        return;
    }

    const flashcard = flashcards[index];
    flashcardElement.innerHTML = flashcard.word;
}

function showAnswer() {
    if (currentCardIndex >= 0 && flashcards.length > 0) {
        const flashcard = flashcards[currentCardIndex];
        flashcardElement.innerHTML = `${flashcard.word} - ${flashcard.translation}`;
    }
}

function nextCard() {
    if (flashcards.length === 0) {
        flashcardElement.innerHTML = "No words available. Add some!";
        return;
    }

    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    displayFlashcard(currentCardIndex);
}

function addWord(event) {
    event.preventDefault();

    const newWord = document.getElementById("new-word").value.trim();
    const translation = document.getElementById("translation").value.trim();

    if (newWord && translation) {
        flashcards.push({ word: newWord, translation: translation });
        updateWordList();
        addWordForm.reset();
    } else {
        alert("Please fill out both fields.");
    }
}

function updateWordList() {
    wordListElement.innerHTML = "";

    flashcards.forEach((flashcard, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${flashcard.word} - ${flashcard.translation}`;
        wordListElement.appendChild(listItem);
    });
}

// Event Listeners
showAnswerButton.addEventListener("click", showAnswer);
nextCardButton.addEventListener("click", nextCard);
addWordForm.addEventListener("submit", addWord);

// Initial Setup
flashcardElement.innerHTML = "Click Start to Begin";
