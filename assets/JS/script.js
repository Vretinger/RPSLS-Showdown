document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    // Function to update the main image
    function updateMainImage(imageSrc) {
        document.getElementById('mainImage').src = imageSrc;
    }

    // Function to handle the player's choice
    function playerChooses(choice) {
        // Show the player choice container
        const playerChoiceContainer = document.getElementById('player-choice-container');
        playerChoiceContainer.removeAttribute('hidden');
        
        // Update the player's choice image and text
        updateMainImage(`assets/Images/RPSLS_${choice}.png`);
        document.getElementById('playerChoice').innerText = "Player's Choice: " + choice;
        
        // Hide the main image and show the slot machine
        const mainImage = document.getElementById('mainImage');
        mainImage.style.display = 'none';
        const slotMachine = document.querySelector('.slot-machine');
        slotMachine.style.visibility = 'visible';
        
        // Run the slot machine animation
        runSlotMachine();
    }

    // Initialize score variables
    let playerScore = 0;
    let computerScore = 0;

    // Function to update the score and check for the winner
    function updateScore(resultText) {
        if (resultText.startsWith('You win')) {
            playerScore++;
        } else if (resultText.startsWith('You lose')) {
            computerScore++;
        }
        // Update the score display
        document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
        // Check for the winner
        checkWinner();
    }

    // Function to check for the winner of the series
    function checkWinner() {
        if (playerScore === 5) {
            alert('Congratulations! You won the best of 9 series!');
            resetGame();
        } else if (computerScore === 5) {
            alert('Sorry, the computer won the best of 9 series.');
            resetGame();
        } else if ((playerScore + computerScore) === 9) {
            // If no one reaches 5 wins, but 9 games have been played, determine the winner
            if (playerScore > computerScore) {
                alert('Congratulations! You won the best of 9 series!');
            } else if (computerScore > playerScore) {
                alert('Sorry, the computer won the best of 9 series.');
            } else {
                alert("It's a tie in the best of 9 series!");
            }
            resetGame();
        }
    }

    // Function to reset the game
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
        document.getElementById('result').textContent = '';
    }

    // Event listeners for SVG elements representing player choices
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    choices.forEach(choice => {
        const svgElement = document.getElementById(`${choice}SVG`);
        if (svgElement) {
            svgElement.addEventListener('click', () => {
                // When an SVG element is clicked, select the corresponding choice
                playerChooses(choice);
            });
        } else {
            console.log(`${choice}SVG not found`);
        }
    });

    // Function to simulate the slot machine animation
    function runSlotMachine() {
        var reel = document.querySelector('.reel');
        reel.classList.add('spin-animation');

        setTimeout(function() {
            reel.classList.remove('spin-animation');
            // Simulate computer's choice and update the result
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            const resultText = getResult(choice, computerChoice);
            document.getElementById('result').textContent = resultText;
            updateScore(resultText);
        }, 5000); // Change 5000 to the duration of your slot machine animation in milliseconds
    }

    // Function to determine the result of the game
    function getResult(player, computer) {
        if (player === computer) {
            return `It's a tie! Both chose ${player}.`;
        } else if (results[player] && results[player][computer]) {
            return `You win! ${player.charAt(0).toUpperCase() + player.slice(1)} ${results[player][computer]} ${computer}.`;
        } else {
            return `You lose! ${computer.charAt(0).toUpperCase() + computer.slice(1)} ${results[computer][player]} ${player}.`;
        }
    }

    // Result mappings for the game
    const results = {
        rock: {scissors: 'crushes', lizard: 'crushes'},
        paper: {rock: 'covers', spock: 'disproves'},
        scissors: {paper: 'cuts', lizard: 'decapitates'},
        lizard: {spock: 'poisons', paper: 'eats'},
        spock: {scissors: 'smashes', rock: 'vaporizes'}
    };

});
