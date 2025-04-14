console.log("JS работает ✅");

const button = document.getElementById("clickButton");      // кнопка
const display = document.getElementById("clickCount");       // место вывода

// Попробуем получить сохранённое значение
let count = parseInt(localStorage.getItem("clickCount")) || 0;

console.log("🔄 Загружено из localStorage:", count);
// Если значение не было найдено, то оно будет равно 0

// Отображаем начальное значение в DOM
document.getElementById("clickCount").textContent = count;

button.addEventListener("click", () => {
    count++;
    display.textContent = count;

    // Сохраняем новое значение
    localStorage.setItem("clickCount", count);

    console.log("💾 Сохранено в localStorage:", count);

    // Показ случайного элемента 
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
