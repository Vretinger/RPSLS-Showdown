document.addEventListener('DOMContentLoaded', () => {

    // Check if invisibleSVG exists before adding an event listener
    const invisibleSVG = document.getElementById('invisibleSVG');
    if (invisibleSVG) {
        invisibleSVG.addEventListener('click', function() {
            window.location.href = 'gamePage.html';
        });
    }

    // List of all possible choices
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    // Object defining the winning relationships between choices
    const results = {
        rock: {scissors: 'crushes', lizard: 'crushes'},
        paper: {rock: 'covers', spock: 'disproves'},
        scissors: {paper: 'cuts', lizard: 'decapitates'},
        lizard: {spock: 'poisons', paper: 'eats'},
        spock: {scissors: 'smashes', rock: 'vaporizes'}
    };

    // Add event listeners to each choice button
    const buttons = document.querySelectorAll('.choices button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the player's choice from the button's id
            const playerChoice = button.id;
            // Randomly select a choice for the computer
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            // Get the result of the game
            const resultText = getResult(playerChoice, computerChoice);
            // Display the result
            document.getElementById('result').textContent = resultText;
        });
    });

    // Function to determine the result of the game
    function getResult(player, computer) {
        // If both choices are the same, it's a tie
        if (player === computer) {
            return `It's a tie! Both chose ${player}.`;
        }
        // Check if the player's choice beats the computer's choice
        else if (results[player] && results[player][computer]) {
            return `You win! ${player.charAt(0).toUpperCase() + player.slice(1)} ${results[player][computer]} ${computer}.`;
        }
        // Otherwise, the computer's choice beats the player's choice
        else {
            return `You lose! ${computer.charAt(0).toUpperCase() + computer.slice(1)} ${results[computer][player]} ${player}.`;
        }
    }
});
