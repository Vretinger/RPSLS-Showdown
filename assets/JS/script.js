function updatePlayerChoiceImage(choice) {
    const playerChoiceImage = document.getElementById('playerChoiceIMG');
    playerChoiceImage.src = `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    playerChoiceImage.alt = choice;
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');

    function hoverPlayButton() {
        console.log('Hover function called');
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.style.transform = 'scale(1.1)';
        }
    }

    function unhoverPlayButton() {
        console.log('Unhover function called');
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.style.transform = 'scale(1)';
        }
    }

    function updateMainImage(imageSrc) {
        document.getElementById('mainImage').src = imageSrc;
    }

    // Check if PlaySVG exists before adding event listeners
    const PlaySVG = document.getElementById('PlaySVG');
    if (PlaySVG) {
        PlaySVG.addEventListener('mouseenter', hoverPlayButton);
        PlaySVG.addEventListener('mouseleave', unhoverPlayButton);
        PlaySVG.addEventListener('click', function() {
            console.log('SVG clicked');
            window.location.href = 'gamePage.html';
        });
    } else {
        console.log('PlaySVG not found');
    }

    const mainImage = document.getElementById('mainImage');

    function hoverChoice(choice) {
        console.log(`Hover over ${choice}`);
        mainImage.src = `assets/Images/RPSLS_${choice}.png`;
    }

    function unhoverChoice() {
        console.log('Unhover');
        mainImage.src = 'assets/Images/RPSLS.png';
    }

    function selectChoice(choice) {
        console.log(`Choice selected: ${choice}`);
        const playerChoice = choice;
        const computerChoiceIndex = Math.floor(Math.random() * choices.length);
        const computerChoice = choices[computerChoiceIndex];
        document.getElementById('game-container').style.display = 'flex';
        playerChooses(playerChoice, computerChoice); // Pass both player's and computer's choices
    }

    // Add event listeners to the invisible SVG elements
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

    choices.forEach(choice => {
        const svgElement = document.getElementById(`${choice}SVG`);
        if (svgElement) {
            svgElement.addEventListener('mouseenter', () => hoverChoice(choice));
            svgElement.addEventListener('mouseleave', unhoverChoice);
            svgElement.addEventListener('click', () => {
                selectChoice(choice);
                playerChooses(choice);              
            });
        } else {
            console.log(`${choice}SVG not found`);
        }
    });

    function getImageSrcForChoice(choice) {
        return `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
    }
    

    let slotMachineRunning = false; // Flag to track whether the slot machine animation is running
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
    
            reel.style.setProperty('--index', translateYValue); // Set the value of the CSS variable
            reel.style.animation = `spin-reel 5s forwards`;
    
            var duration = 5000;
    
            setTimeout(function() {
                var computerChoice = choices[computerChoiceIndex];
                updateMainImage(getImageSrcForChoice(computerChoice));
                document.getElementById('computerChoice').innerText = "Computer's Choice: " + computerChoice;
    
                const resultText = getResult(playerChoice, computerChoice);
                document.getElementById('result').textContent = resultText;
                updateScore(resultText);
                checkWinner();
                slotMachineRunning = false;
            }, duration);
    
            slotMachineRunning = true;
        }
    }
    
    
    
    
    
    
    
    
    
    

    function playerChooses(playerChoice, computerChoice) {
        updatePlayerChoiceImage(playerChoice);
        document.getElementById('playerChoice').innerText = "Player's Choice: " + playerChoice;
        document.getElementById('computerChoice').innerText = "Computer's Choice: " + computerChoice;
    
        // Check if the slot machine animation is not already running
        if (!slotMachineRunning) {
            // Hide the main image
            const mainImage = document.getElementById('mainImage');
            mainImage.style.display = 'none';
            // Make the slot machine visible
            const slotMachine = document.querySelector('.slot-machine');
            slotMachine.style.visibility = 'visible';
            // Run the slot machine animation
            runSlotMachine(choices.indexOf(computerChoice), playerChoice);
        }
    }
    

    // Initialize score variables
    let playerScore = 0;
    let computerScore = 0;
    let gamesPlayed = 0;

    function getResult(player, computer) {
        if (player === computer) {
            return `It's a tie! Both chose ${player}.`;
        } else if (results[player] && results[player][computer]) {
            return `You win! ${player.charAt(0).toUpperCase() + player.slice(1)} ${results[player][computer]} ${computer}.`;
        } else {
            return `You lose! ${computer.charAt(0).toUpperCase() + computer.slice(1)} ${results[computer][player]} ${player}.`;
        }
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
        if (playerScore === 5) {
            alert('Congratulations! You won the best of 9 series!');
            resetGame();
        } else if (computerScore === 5) {
            alert('Sorry, the computer won the best of 9 series.');
            resetGame();
        } else if (gamesPlayed === 9) {
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

