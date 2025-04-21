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

    function renderUserCollections() {
        userCollectionOutput.innerHTML = "";

        const categories = {
            books: "Книги",
            movies: "Фильмы",
            series: "Сериалы"
        };

        for (const key in categories) {
            const items = userCollections[key] || [];

            const section = document.createElement("div");
            section.classList.add("user-collection-section");

            const heading = document.createElement("h3");
            heading.textContent = `📁 ${categories[key]}`;

            const clearBtn = document.createElement("button");
            clearBtn.innerHTML = "🗑️ Очистить";
            clearBtn.classList.add("clear-btn");

            if (items.length === 0) {
                clearBtn.disabled = true;
                clearBtn.classList.add("disabled");
            } else {
                clearBtn.addEventListener("click", () => {
                    userCollections[key] = [];
                    localStorage.setItem("userCollections", JSON.stringify(userCollections));
                    renderUserCollections();
                });
            }

            heading.appendChild(clearBtn);
            section.appendChild(heading);

            if (items.length === 0) {
                const emptyMsg = document.createElement("p");
                emptyMsg.textContent = "📭 Коллекция пуста";
                emptyMsg.classList.add("empty-message");
                section.appendChild(emptyMsg);
            } else {
                const ul = document.createElement("ul");

                items.forEach((item) => {
                    const li = document.createElement("li");
                    li.classList.add("collection-item");

                    const itemWrapper = document.createElement("div");
                    itemWrapper.classList.add("item-wrapper");

                    const titleSpan = document.createElement("span");
                    titleSpan.textContent = item.title;

                    const deleteBtn = document.createElement("button");
                    deleteBtn.textContent = "✖";
                    deleteBtn.classList.add("delete-btn");
                    deleteBtn.addEventListener("click", () => {
                        const index = items.indexOf(item);
                        if (index > -1) {
                            items.splice(index, 1);
                            localStorage.setItem("userCollections", JSON.stringify(userCollections));
                            renderUserCollections();
                        }
                    });

                    itemWrapper.appendChild(titleSpan);
                    itemWrapper.appendChild(deleteBtn);
                    li.appendChild(itemWrapper);
                    ul.appendChild(li);
                });

                section.appendChild(ul);
            }

            userCollectionOutput.appendChild(section);
        }
    }
});
