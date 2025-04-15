window.addEventListener("DOMContentLoaded", () => {
    // ...весь твой код внутрь этой функции

    let collections = {};
    const categorySelect = document.getElementById("categorySelect");
    const button = document.getElementById("clickButton");
    const clickButton = document.getElementById("clickButton");
    const clickCountDisplay = document.getElementById("clickCount");
    const output = document.getElementById("randomOutput");

    let count = parseInt(localStorage.getItem("clickCount")) || 0;
    clickCountDisplay.textContent = count;

    // Загружаем коллекции из JSON
    fetch("collections.json")
        .then(response => {
            if (!response.ok) throw new Error("Ошибка загрузки данных");
            return response.json();
        })
        .then(data => {
            collections = data;

            // Восстановление выбранной категории
            const savedCategory = localStorage.getItem("selectedCategory");
            if (savedCategory && collections[savedCategory]) {
                categorySelect.value = savedCategory;
            }
        })
        .catch(error => {
            console.error("Ошибка при загрузке данных:", error);
            output.textContent = "Не удалось загрузить коллекции 😢";
        });

    // Сохраняем выбранную категорию при изменении
    categorySelect.addEventListener("change", () => {
        localStorage.setItem("selectedCategory", categorySelect.value);
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
        clickCountDisplay.textContent = count;
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
});
