console.log("JS работает ✅");
let count = 0; // переменная для хранения количества кликов

const button = document.getElementById("clickButton");      // кнопка
const display = document.getElementById("clickCount");       // место вывода

button.addEventListener("click", () => {
    count++;
    display.textContent = count;
    const output = document.getElementById("randomOutput");
    const randomItem = getRandomItem(myFavorites);
    output.textContent = `🎲 Случайный выбор: ${randomItem}`;
});

function getRandomItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

const myFavorites = [
    "Властелин колец",
    "Ведьмак",
    "Дом, в котором...",
    "Baldur's Gate 3",
    "Берсерк (аниме)"
];
