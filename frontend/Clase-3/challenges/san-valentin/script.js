const message = document.querySelector('#message');
const buttons = document.querySelector('#buttons');
const noBtn = document.querySelector('.no');
const yesBtn = document.querySelector('.yes');

const setRandomPosition = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const newX = Math.random() * (windowWidth - btnWidth);
    const newY = Math.random() * (windowHeight - btnHeight);

    noBtn.style.left = `${newX}px`;
    noBtn.style.top = `${newY}px`;
};

window.onload = setRandomPosition;


noBtn.addEventListener('click', setRandomPosition);

yesBtn.addEventListener('click', () => {
    message.innerHTML = 'TE AMO MI VIDA 💖';
    buttons.style.display = 'none';
});
