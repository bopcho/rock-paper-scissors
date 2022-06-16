const selectionButtons = document.querySelectorAll('[data-selection]');
const finalColumn = document.querySelector('[data-final-column]');
const computerScoreSpan = document.querySelector('[data-computer-score]');
const yourScoreSpan = document.querySelector('[data-your-score]');
const description = document.getElementById('description');
const SELECTIONS = [
    {
        name: 'Rock',
        emoji: '🪨',
        beats: 'Scissors'
    },
    {
        name: 'Paper',
        emoji: '📜',
        beats: 'Rock'
    },
    {
        name: 'Scissors',
        emoji: '✂️',
        beats: 'Paper'
    }
];

selectionButtons.forEach(selectionButton => {
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection;
        const selection = SELECTIONS.find(selection => selection.name === selectionName);
        makeSelection(selection);
    })
});

function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection);
    const copmuterWinner = isWinner(computerSelection, selection);

    addSelectionResult(computerSelection, copmuterWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) {
        incrementScore(yourScoreSpan);
        description.innerText = `You won! You chose ${selection.emoji} and the computer chose ${computerSelection.emoji}`;
    } else if (copmuterWinner) {
        incrementScore(computerScoreSpan);
        description.innerText = `You lost! You chose ${selection.emoji} and the computer chose ${computerSelection.emoji}`;
    } else {
        description.innerText = `It's a tie! You chose ${selection.emoji} and the computer chose ${computerSelection.emoji}`;
    }

};

function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

function addSelectionResult(selection, winner) {
    const div = document.createElement('div');
    div.innerText = selection.emoji;
    div.classList.add('result-selection')
    if (winner) div.classList.add('winner')
    finalColumn.after(div);
}

function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name;
}

function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length);
    return SELECTIONS[randomIndex];
}
