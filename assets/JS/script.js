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
        const computerChoice = choices[Math.floor(Math.random() * choices.length)];
        
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

    
    function runSlotMachine() {
        var reel = document.querySelector('.reel');
        reel.classList.add('spin-animation');

        setTimeout(function() {
            reel.classList.remove('spin-animation');
            var computerChoice = getRandomComputerChoice(); // Implement this function to get computer's choice
            updateMainImage(getImageSrcForChoice(computerChoice)); // Update main image with computer's choice
            document.getElementById('computerChoice').innerText = "Computer's Choice: " + computerChoice; // Display computer's choice

            const resultText = getResult(playerChoice, computerChoice);
        document.getElementById('result').textContent = resultText;
        updateScore(resultText);
        checkWinner();
            handleResultAfterSlotMachine(computerChoice);
        }, 5000); // Change 5000 to the duration of your slot machine animation in milliseconds
    }
    
    function updatePlayerChoiceImage(choice) {
        var playerChoiceImage = document.getElementById('playerChoiceIMG');
        playerChoiceImage.src = `assets/Images/SlotMachine/RPSLS_Choice${choice}.png`;
        playerChoiceImage.alt = choice;
    }
    
    function playerChooses(choice) {
        updatePlayerChoiceImage(choice);
        document.getElementById('playerChoice').innerText = "Player's Choice: " + choice;
        // Hide the main image
        const mainImage = document.getElementById('mainImage');
        mainImage.style.display = 'none';
        // Make the slot machine visible
        const slotMachine = document.querySelector('.slot-machine');
        slotMachine.style.visibility = 'visible';
        // Run the slot machine animation
        runSlotMachine();
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
