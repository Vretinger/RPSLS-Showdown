// Function to update the player's choice image
function updatePlayerChoiceImage(choice) {
    const playerChoiceImage = document.getElementById('playerChoiceIMG');
    playerChoiceImage.src = `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    playerChoiceImage.alt = choice;
}

// Event listener for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    const Instructions = document.getElementById('instructions');
    if (Instructions) {
        // Navigate to instructions page on click
        Instructions.addEventListener('click', function() {
            window.location.href = 'instructions.html';
        });
    }

    // Functions to handle hover effects on the play button
    function hoverPlayButton() {
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.style.transform = 'scale(1.1)';
        }
    }

    function unhoverPlayButton() {
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.style.transform = 'scale(1)';
        }
    }

    const PlaySVG = document.getElementById('PlaySVG');
    if (PlaySVG) {
        // Add hover and click event listeners to the play button SVG
        PlaySVG.addEventListener('mouseenter', hoverPlayButton);
        PlaySVG.addEventListener('mouseleave', unhoverPlayButton);
        PlaySVG.addEventListener('click', function() {
            window.location.href = 'gamePage.html';
        });
    }

    const mainImage = document.getElementById('mainImage');

    // Functions to handle hover effects on choice options
    function hoverChoice(choice) {
        mainImage.src = `assets/Images/RPSLS_${choice}.png`;
    }

    function unhoverChoice() {
        mainImage.src = 'assets/Images/RPSLS.png';
    }

    
    let lastRoundWasTie = false; 

    // Function to handle the selection of a choice
    function selectChoice(choice) {
        const playerChoice = choice;
        let computerChoiceIndex = Math.floor(Math.random() * choices.length);
        let computerChoice = choices[computerChoiceIndex];
        document.getElementById('game-container').style.display = 'flex';
        document.getElementById('invisible-block1').style.display = 'none';
    
        // Check for a tie
        if (playerChoice === computerChoice) {
            if (lastRoundWasTie) {
                // If the last round was also a tie, change the computer's choice
                computerChoiceIndex = (computerChoiceIndex !== 5) ? computerChoiceIndex + 1 : computerChoiceIndex - 1;
                computerChoice = choices[computerChoiceIndex];
            }
            lastRoundWasTie = true;
        } else {
            lastRoundWasTie = false;
        }
    
        playerChooses(playerChoice, computerChoice);
    }

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    choices.forEach(choice => {
        const svgElement = document.getElementById(`${choice}SVG`);
        if (svgElement) {
            // Add hover and click event listeners to each choice SVG
            svgElement.addEventListener('mouseenter', () => hoverChoice(choice));
            svgElement.addEventListener('mouseleave', unhoverChoice);
            svgElement.addEventListener('click', () => {
                document.querySelector('.under-image').style.left = '-850px';
                document.getElementById('invisible-block2').style.display = 'block';
                selectChoice(choice);
                playerChooses(choice);
            });
        }
    });

    // Function to get the image source for a given choice
    function getImageSrcForChoice(choice) {
        return `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    }

    // Add click event listener to the back button
    document.getElementById('backButton').addEventListener('click', function() {
        confirmBack();
    });
    
    // Function to confirm the back navigation
    function confirmBack() {
        if (window.location.pathname === "/instructions.html") {
            window.location.href = 'index.html';
        } else {
            if (confirm("Are you sure you want to go back?")) {
                window.location.href = 'index.html';
            }
        }
    }

    let slotMachineRunning = false;

    // Function to run the slot machine animation
    function runSlotMachine(computerChoiceIndex, playerChoice) {
        if (!slotMachineRunning) {
            var reel = document.querySelector('.reel');
            var translateYValue;

            // Determine the translateY value based on the computer's choice
            switch (choices[computerChoiceIndex]) {
                case 'lizard':
                    translateYValue = '-0%';
                    break;
                case 'rock':
                    translateYValue = '-6.9%';
                    break;
                case 'paper':
                    translateYValue = '-13.8%';
                    break;
                case 'scissors':
                    translateYValue = '-20.4%';
                    break;
                case 'spock':
                    translateYValue = '-27.2%';
                    break;
                default:
                    translateYValue = '-0%';
            }

            reel.style.setProperty('--index', translateYValue);
            reel.style.animation = `spin-reel 5s forwards`;

            var duration = 5000;

            setTimeout(function() {
                var computerChoice = choices[computerChoiceIndex];
                document.querySelector('#computerChoice span').innerText = "Computer's\n Choice: " + computerChoice;
                const resultText = getResult(playerChoice, computerChoice);
                document.getElementById('result').textContent = resultText;
                slotMachineRunning = false;
                setTimeout(function() {
                    updateScore(resultText);
                    checkWinner();
                    showResults();
                }, 500);
            }, duration);

            slotMachineRunning = true;
        }
    }

    // Function to handle the player's choice and run the slot machine
    function playerChooses(playerChoice, computerChoice) {
        updatePlayerChoiceImage(playerChoice);
        document.getElementById('playerChoice').innerText = "Player's\n Choice: " + playerChoice;
        document.querySelector('#computerChoice span').innerText = 
        computerChoice !== undefined ? "Computer's Choice: " + computerChoice : "Computer's\n Choice: picking...";

        if (!slotMachineRunning) {
            const mainImage = document.getElementById('mainImage');
            mainImage.style.display = 'none';
            const slotMachine = document.querySelector('.slot-machine');
            slotMachine.style.visibility = 'visible';
            runSlotMachine(choices.indexOf(computerChoice), playerChoice);
        }
    }

    let playerScore = 0;
    let computerScore = 0;

    // Function to get the result of the game
    function getResult(player, computer) {
        const resultElement = document.getElementById('result');
        let resultText;

        if (player === computer) {
            resultText = `It's a tie! Both chose ${player}.`;
            resultElement.style.color = 'orange';
        } else if (results[player] && results[player][computer]) {
            resultText = `You win! ${player.charAt(0).toUpperCase() + player.slice(1)} ${results[player][computer]} ${computer}.`;
            resultElement.style.color = 'green';
        } else {
            resultText = `You lose! ${computer.charAt(0).toUpperCase() + computer.slice(1)} ${results[computer][player]} ${player}.`;
            resultElement.style.color = 'red';
        }

        resultElement.textContent = resultText;
        return resultText;
    }

    // Function to update the score based on the game result
    function updateScore(resultText) {
        if (resultText.startsWith('You win')) {
            playerScore++;
        } else if (resultText.startsWith('You lose')) {
            computerScore++;
        }
        document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
    }

    // Function to check if there is a winner and handle the end of the game
    function checkWinner() {
        if (playerScore === 3) {
            setTimeout(function() {
                window.location.href = 'endGamePage.html?winner=You';
            }, 2000);
        } else if (computerScore === 3) {
            setTimeout(function() {
                window.location.href = 'endGamePage.html';
            }, 2000);
        } else {
            showNextRoundButton();
        }
    }

    // Functions to handle hover effects on the next round button
    function hovernextRoundButton() {
        const nextRoundButton = document.getElementById('nextRoundButton');
        if (nextRoundButton) {
            nextRoundButton.style.transform = 'scale(1.1)';
        }
    }

    function unhovernextRoundButton() {
        const nextRoundButton = document.getElementById('nextRoundButton');
        if (nextRoundButton) {
            nextRoundButton.style.transform = 'scale(1)';
        }
    }

    // Function to show the next round button
    function showNextRoundButton() {
        document.getElementById('nextRoundButton').style.display = 'block';
    }

    // Function to hide the next round button
    function hideNextRoundButton() {
        document.getElementById('nextRoundButton').style.display = 'none';
    }

    // Function to show the game result
    function showResults() {
        const resultContainer = document.getElementById('result');
        if (resultContainer) {
            resultContainer.style.display = 'block';
        } else {
            console.error("Result container not found.");
        }
    }

    // Function to hide the game result
    function hideResults() {
        document.getElementById('result').style.display = 'none';
    }

    const nextRoundButton = document.getElementById('nextRoundButton');
    if (nextRoundButton) {
        // Add hover event listeners to the next round button
        nextRoundButton.addEventListener('mouseenter', hovernextRoundButton);
        nextRoundButton.addEventListener('mouseleave', unhovernextRoundButton);
    }

    // Add click event listener to the next round button
    document.getElementById('nextRoundButton').addEventListener('click', function() {
        NextGame();
    });

     // Add click event listener to the Reset button
     document.getElementById('resetButton').addEventListener('click', function() {
        resetGame();
    });

    // Function to reset the game for the next round
    function NextGame() {
        document.querySelector('.under-image').style.left = '-850px';
        document.getElementById('invisible-block1').style.display = 'block';
        document.getElementById('invisible-block2').style.display = 'none';
        document.getElementById('game-container').style.display = 'none';
        const mainImage = document.getElementById('mainImage');
        mainImage.style.display = 'inline-block';

        hideResults();
        hideNextRoundButton();
    }

// Function to reset the game scores
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
}

    // Game result logic dictionary
    const results = {
        rock: {scissors: 'crushes', lizard: 'crushes'},
        paper: {rock: 'covers', spock: 'disproves'},
        scissors: {paper: 'cuts', lizard: 'decapitates'},
        lizard: {spock: 'poisons', paper: 'eats'},
        spock: {scissors: 'smashes', rock: 'vaporizes'}
    };

    // Initialize score display
    document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
});
