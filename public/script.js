const main = document.querySelector('main');
const startButton = document.querySelector('.start-game');

let currentScore = 0;

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

startButton.addEventListener('click', () => gameplay.init());

const gameplay = {
  async init() {
    main.innerHTML = `
      <h2>Skor: <span class="score">${currentScore}</span></h2>
      <div id="playground"></div>
      <button class="action reset-game">Coba Lagi</button>
    `;
    this.scoreContainer = document.querySelector('.score');
    this.playground = document.querySelector('#playground');
    await this.countdown();
    await this.mechanical();
  },

  async countdown() {
    let currentCount = 1;
    const countdownEvent = async (count) => {
      this.playground.innerHTML = `<div class="countdown">${count}</div>`;
      const countdownContainer = document.querySelector('.countdown');
      await delay(100);
      countdownContainer.classList.toggle('show');
      await delay(800);
      countdownContainer.classList.toggle('show');
      currentCount += 1;
    }
    for(let i = 0; i < 3; i += 1) {
      await delay(100);
      await countdownEvent(currentCount);
    }
    await delay(100);
    this.playground.innerHTML = '';
  },

  async mechanical() {
    const targetInterval = setInterval(async () => {
      this.isPassed = false;
      await this.targetEvent();
      if (!this.isPassed) {
        clearInterval(targetInterval);
        currentScore = 0;
        this.playground.innerHTML = `
          <p class="game-over">Ayo fokus, kita coba lagi!</p>
          <p class="message">#FokusHadapiCOVID19</p>
        `;
        const resetButton = document.querySelector('.reset-game');
        resetButton.classList.toggle('show');
        resetButton.addEventListener('click', async () => {
          resetButton.classList.toggle('show');
          await gameplay.init();
        });
      }
    }, 1200);
  },

  async targetEvent() {
    await this.showTarget();
    const target = document.querySelector('.target');
    target.addEventListener('click', () => this.killEvent());
    await delay(700);
  },

  async showTarget() {
    this.playground.innerHTML = '<button class="target"><img src="images/virus.svg" alt="Virus"></button>';
    const target = document.querySelector('.target');
    const topPosition = Math.round(Math.random() * 75);
    const leftPosition = Math.round(Math.random() * 70);
    target.style.top = `${topPosition}%`;
    target.style.left = `${leftPosition}%`;
    await delay(100);
    target.classList.toggle('show')
  },
  
  async hideTarget() {
    const target = document.querySelector('.target');
    target.classList.toggle('show');
    await delay(100);
    target.remove();
  },

  killEvent() {
    currentScore += 1;
    this.scoreContainer.innerHTML = currentScore;
    this.isPassed = true;
    this.hideTarget();
  },
};
