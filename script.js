class MemoryGame {
    constructor() {
        this.cards = document.querySelectorAll('.card');
        this.gameBoard = document.querySelector('#game');
        this.winMessage = document.querySelector('#winMessage');
        this.cardImages = [
            'img/bow.png',
            'img/cooking.png',
            'img/iceCream.png',
            'img/liloStitch.png',
            'img/music.png',
            'img/puppyEyes.png'
        ];

        this.flippedCards = [];
        this.matchedPairs = 0;
        this.canFlip = true;

        this.init();
    }

    init() {
        this.setUpCards();
        this.addEventListeners();
    }

    setUpCards() {
        const imagePairs = [...this.cardImages, ...this.cardImages];
        const shuffledImages = this.shuffleArray(imagePairs);

        this.cards.forEach((card, index) => {
            const frontFace = card.querySelector('.card__face--front');
            frontFace.style.backgroundImage = `url('${shuffledImages[index]}')`;
            card.dataset.cardImage = shuffledImages[index];
        });
    }

    shuffleArray(array) {
        const shuffled = [...array];

        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        return shuffled;
    }

    addEventListeners() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => this.flipCard(card));
        });
        
        const resetButton = document.querySelector('#resetButton');
        resetButton.addEventListener('click', () => this.resetGame());
    }

    flipCard(card) {
        if (!this.canFlip || card.classList.contains('flipped')) {
            return;
        }
        
        card.classList.add('flipped');
        
        this.flippedCards.push(card);
        
        if (this.flippedCards.length === 2) {
            this.canFlip = false;
            this.checkForMatch();
        }
    }

    checkForMatch() {
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];

        const image1 = card1.dataset.cardImage;
        const image2 = card2.dataset.cardImage;

        if (image1 === image2) {
            this.handleMatch();   
        } else {
            this.handleMismatch();
        }
    }

    handleMatch() {
        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];

        card1.classList.add('matched');
        card2.classList.add('matched');

        setTimeout(() => {
            card1.classList.add('fade-out');
            card2.classList.add('fade-out');
        }, 100);

        this.matchedPairs++;

        this.resetFlippedCards();

        if (this.matchedPairs === 6) {
            this.handleWin();
        }
    }

    handleMismatch() {
        setTimeout(() => {
            this.flippedCards.forEach(card => {
                card.classList.remove('flipped');
            });
            this.resetFlippedCards();
        }, 1000);
    }

    resetFlippedCards() {
        this.flippedCards = [];
        this.canFlip = true;
    }

    handleWin() {
        setTimeout(() => {
            this.winMessage.style.display = 'flex';
        }, 500);
    }

    resetGame() {
        this.winMessage.style.display = 'none';
        
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.canFlip = true;
        
        this.cards.forEach(card => {
            card.classList.remove('flipped', 'matched', 'fade-out');
            card.style.opacity = '';
            card.style.visibility = '';
        });
        
        this.setUpCards();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MemoryGame();
});