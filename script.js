window.addEventListener("DOMContentLoaded", () => {
    // ...весь твой код внутрь этой функции
    // Переменные
    const addItemForm = document.getElementById("addItemForm");
    const titleInput = document.getElementById("titleInput");
    const categoryInput = document.getElementById("categoryInput");
    const userCollectionOutput = document.getElementById("userCollectionOutput");

    // Загружаем сохранённые данные из localStorage
    let userCollections = JSON.parse(localStorage.getItem("userCollections")) || {};

    // Отображаем при старте
    renderUserCollections();

    // Обработка отправки формы
    addItemForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const category = categoryInput.value;

        if (!title || !category) return;

        // Добавляем в коллекцию
        if (!userCollections[category]) {
            userCollections[category] = [];
        }

        userCollections[category].push({ title });

        // Сохраняем в localStorage
        localStorage.setItem("userCollections", JSON.stringify(userCollections));

        // Очищаем поля
        titleInput.value = "";
        categoryInput.value = "";

        // Обновляем отображение
        renderUserCollections();
    });

    // Отображение всех коллекций
    function renderUserCollections() {
        userCollectionOutput.innerHTML = "";

        for (const category in userCollections) {
            const items = userCollections[category];
            if (items.length === 0) continue;

            const section = document.createElement("div");
            section.classList.add("user-collection-section");

            const heading = document.createElement("h3");
            heading.textContent = `📂 ${categoryLabel(category)}`;
            section.appendChild(heading);

            const ul = document.createElement("ul");
            items.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item.title;
                ul.appendChild(li);
            });

            section.appendChild(ul);
            userCollectionOutput.appendChild(section);
        }
    }

    // Преобразование ключа в красивую подпись
    function categoryLabel(key) {
        const labels = {
            books: "Книги",
            movies: "Фильмы",
            series: "Сериалы",
            games: "Игры",
            cartoons: "Мультфильмы",
            anime: "Аниме"
        };
        return labels[key] || key;
    }

});
