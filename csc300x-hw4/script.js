document.addEventListener('DOMContentLoaded', function() {
    const choices = document.querySelectorAll('.choice');
    const computerChoice = document.getElementById('computer-choice');
    const result = document.getElementById('result');
    const winsDisplay = document.getElementById('wins');
    const lossesDisplay = document.getElementById('losses');
    const tiesDisplay = document.getElementById('ties');
    const resetButton = document.getElementById('reset');

    let wins = 0;
    let losses = 0;
    let ties = 0;

    function computerPlay() {
        const randomNumber = Math.floor(Math.random() * 3);
        const choicesArray = ['rock', 'paper', 'scissors'];
        return choicesArray[randomNumber];
    }

    function updateScore() {
        winsDisplay.textContent = wins;
        lossesDisplay.textContent = losses;
        tiesDisplay.textContent = ties;
    }

    function resetScore() {
        wins = 0;
        losses = 0;
        ties = 0;
        updateScore();
    }

    function resetGame() {
        result.textContent = '';
        computerChoice.src = 'images/question-mark.PNG';
        choices.forEach(choice => choice.classList.remove('active'));

        const computerChoiceImg = document.querySelector('.computer-choice');
        computerChoiceImg.classList.remove('selected');
    }

    function determineWinner(playerChoice, computerChoice) {
        if (playerChoice === computerChoice) {
            result.textContent = "It's a tie!";
            ties++;
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result.textContent = 'Player wins!';
            wins++;
        } else {
            result.textContent = 'Computer wins!';
            losses++;
        }
        updateScore();

        const computerChoiceImg = document.getElementById('computer-choice');
        computerChoiceImg.parentElement.classList.add('selected');

    }

    
    resetGame();

    choices.forEach(choice => {
        choice.addEventListener('click', function() {
            const playerChoice = this.id;
            choices.forEach(choice => choice.classList.remove('active'));
            this.classList.add('active');

            
            const imageFilenames = ['rock.PNG', 'paper.PNG', 'scissors.PNG'];
            let index = 0;
            const shuffleInterval = setInterval(() => {
                const imagePath = `images/${imageFilenames[index]}`;
                console.log('Computed image path:', imagePath);
                computerChoice.src = imagePath;
                index = (index + 1) % imageFilenames.length;
            }, 500);

            
            setTimeout(() => {
                clearInterval(shuffleInterval);
                const computerMove = computerPlay();
                computerChoice.src = `images/${computerMove}.PNG`;
                determineWinner(playerChoice, computerMove);
            }, 3000);
        });
    });

    resetButton.addEventListener('click', () => {
        resetScore();
        resetGame();
    });
});
