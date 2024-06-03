function updatePlayerChoiceImage(choice) {
    const playerChoiceImage = document.getElementById('playerChoiceIMG');
    playerChoiceImage.src = `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    playerChoiceImage.alt = choice;
}

document.addEventListener('DOMContentLoaded', () => {
    const Instructions = document.getElementById('instructions');
    if (Instructions) {
        Instructions.addEventListener('click', function() {
            window.location.href = 'instructions.html';
        });
    }

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
        PlaySVG.addEventListener('mouseenter', hoverPlayButton);
        PlaySVG.addEventListener('mouseleave', unhoverPlayButton);
        PlaySVG.addEventListener('click', function() {
            window.location.href = 'gamePage.html';
        });
    }

    const mainImage = document.getElementById('mainImage');

    function hoverChoice(choice) {
        mainImage.src = `assets/Images/RPSLS_${choice}.png`;
    }

    function unhoverChoice() {
        mainImage.src = 'assets/Images/RPSLS.png';
    }

    function selectChoice(choice) {
        const playerChoice = choice;
        const computerChoiceIndex = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[computerChoiceIndex];
        document.getElementById('game-container').style.display = 'flex';
        document.getElementById('invisible-block1').style.display = 'none';
        playerChooses(playerChoice, computerChoice);
    }

    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    choices.forEach(choice => {
        const svgElement = document.getElementById(`${choice}SVG`);
        if (svgElement) {
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

    function getImageSrcForChoice(choice) {
        return `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    }

    document.getElementById('backButton').addEventListener('click', function() {
        confirmBack();
    });

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

    function runSlotMachine(computerChoiceIndex, playerChoice) {
        if (!slotMachineRunning) {
            var reel = document.querySelector('.reel');
            var translateYValue;

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
    let gamesPlayed = 0;

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

    function updateScore(resultText) {
        if (resultText.startsWith('You win')) {
            playerScore++;
        } else if (resultText.startsWith('You lose')) {
            computerScore++;
        }
        gamesPlayed++;
        document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
    }

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

    function showNextRoundButton() {
        document.getElementById('nextRoundButton').style.display = 'block';
    }

    function hideNextRoundButton() {
        document.getElementById('nextRoundButton').style.display = 'none';
    }

    function showResults() {
        const resultContainer = document.getElementById('result');
        if (resultContainer) {
            resultContainer.style.display = 'block';
        } else {
            console.error("Result container not found.");
        }
    }

    function hideResults() {
        document.getElementById('result').style.display = 'none';
    }

    const nextRoundButton = document.getElementById('nextRoundButton');
    if (nextRoundButton) {
        nextRoundButton.addEventListener('mouseenter', hovernextRoundButton);
        nextRoundButton.addEventListener('mouseleave', unhovernextRoundButton);
    }

    document.getElementById('nextRoundButton').addEventListener('click', function() {
        NextGame();
    });

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

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        gamesPlayed = 0;
        document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
        document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
        document.getElementById('result').textContent = '';
    }

    const results = {
        rock: {scissors: 'crushes', lizard: 'crushes'},
        paper: {rock: 'covers', spock: 'disproves'},
        scissors: {paper: 'cuts', lizard: 'decapitates'},
        lizard: {spock: 'poisons', paper: 'eats'},
        spock: {scissors: 'smashes', rock: 'vaporizes'}
    };

    document.getElementById('playerScore').textContent = `Player Score: ${playerScore}`;
    document.getElementById('computerScore').textContent = `Computer Score: ${computerScore}`;
});