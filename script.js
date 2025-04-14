// Подтягиваем элементы
const button = document.getElementById("clickButton");
const display = document.getElementById("clickCount");
const categorySelect = document.getElementById("categorySelect");
const output = document.getElementById("randomOutput");

// Загружаем счётчик и выбранную категорию
let count = parseInt(localStorage.getItem("clickCount")) || 0;
display.textContent = count;

const savedCategory = localStorage.getItem("preferredCategory");
if (savedCategory) categorySelect.value = savedCategory;

// Объект всех коллекций
const collections = {
    books,
    movies,
    series,
    games,
    cartoons,
    anime
};

// Обработка выбора категории (сохраняем в localStorage)
categorySelect.addEventListener("change", () => {
    localStorage.setItem("preferredCategory", categorySelect.value);
});

// Функция выбора случайного элемента
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Отображение карточки
function renderItemCard(item) {
    const details = item.author || item.director || item.creator || item.studio || "неизвестно";
    const year = item.year ? ` (${item.year})` : "";
    output.textContent = `${item.title} — ${details}${year}`;

    // Удалим предыдущую анимацию и добавим заново
    output.classList.remove("animate");
    void output.offsetWidth; // хак для перезапуска анимации
    output.classList.add("animate");
}

// Обработка нажатия на кнопку
button.addEventListener("click", () => {
    count++;
    display.textContent = count;
    localStorage.setItem("clickCount", count);

    const selectedCategory = categorySelect.value;
    const selectedArray = collections[selectedCategory];

    if (!selectedArray || selectedArray.length === 0) {
        output.textContent = "Категория пуста или не найдена.";
        return;
    }

    const randomItem = getRandomItem(selectedArray);
    renderItemCard(randomItem);
});
