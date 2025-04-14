console.log("JS работает ✅");

// При загрузке страницы — проверим localStorage
const savedCategory = localStorage.getItem("preferredCategory");

if (savedCategory) {
    document.getElementById("categorySelect").value = savedCategory;
}
// Если значение найдено, то установим его в селектор
// Если значение не найдено, то ничего не делаем

const button = document.getElementById("clickButton");      // кнопка
const display = document.getElementById("clickCount");       // место вывода

// Попробуем получить сохранённое значение
let count = parseInt(localStorage.getItem("clickCount")) || 0;

console.log("🔄 Загружено из localStorage:", count);
// Если значение не было найдено, то оно будет равно 0

// Отображаем начальное значение в DOM
document.getElementById("clickCount").textContent = count;

const categorySelect = document.getElementById("categorySelect");

categorySelect.addEventListener("change", () => {
    const selectedValue = categorySelect.value;
    localStorage.setItem("preferredCategory", selectedValue);
});
// Получаем сохранённое значение категории

const books = [
    { title: "Дом, в котором...", author: "Мариам Петросян", year: 2009 },
    { title: "Властелин колец", author: "Дж. Р. Р. Толкиен", year: 1954 },
    { title: "Бабушка велела кланяться...", author: "Фредрик Бакман", year: 2013 },
    { title: "1984", author: "Джордж Оруэлл", year: 1949 },
    { title: "Подстрочник", author: "Олег Дорман", year: 2009 }
];

const movies = [
    { title: "Властелин колец", director: "Питер Джексон", year: 2001 },
    { title: "Интерстеллар", director: "Кристофер Нолан", year: 2014 },
    { title: "Ла-Ла Ленд", director: "Дэмьен Шазелл", year: 2016 },
    { title: "Август: Графство Осейдж", director: "Джон Уэллс", year: 2013 },
    { title: "Бегущий по лезвию", director: "Дени Вильнёв", year: 2017 }
];

const series = [
    { title: "Братья по оружию", creator: "Стивен Спилберг", year: 2001 },
    { title: "Чёрное зеркало", creator: "Чарли Брукер", year: 2011 },
    { title: "Доктор Хаус", creator: "Дэвид Шор", year: 2004 },
    { title: "Вавилон 5", creator: "Дж. Майкл Стражински", year: 1993 },
    { title: "Тед Лассо", creator: "Билл Лоуренс", year: 2020 }
];

const games = [
    { title: "Baldur's Gate 3", studio: "Larian", year: 2023 },
    { title: "Witcher 3", studio: "CD PROJEKT RED", year: 2015 },
    { title: "Pathfinder: Wrath of the Righteous", studio: "Owlcat", year: 2021 },
    { title: "Heroes of Might and Magic III", studio: "New World Computing", year: 1999 },
    { title: "Football Manager", studio: "Sports Interactive", year: 2024 }
];

const cartoons = [
    { title: "Вверх", studio: "Pixar", year: 2009 },
    { title: "Головоломка", studio: "Pixar", year: 2015 },
    { title: "Головоломка 2", studio: "Pixar", year: 2024 },
    { title: "Про Федота-стрельца", studio: "Телеспектакль", year: 1988 },
    { title: "Женитьба Фигаро", studio: "Телеспектакль", year: 1976 }
];

const anime = [
    { title: "Берсерк", studio: "OLM", year: 1997 },
    { title: "Призрак в доспехах", studio: "Production I.G", year: 1995 },
    { title: "Порко Россо", studio: "Studio Ghibli", year: 1992 },
    { title: "Наусика из долины ветров", studio: "Studio Ghibli", year: 1984 },
    { title: "Унесённые призраками", studio: "Studio Ghibli", year: 2001 }
];


button.addEventListener("click", () => {
    count++;
    display.textContent = count;
    localStorage.setItem("clickCount", count);
    console.log("🔄 Сохранено в localStorage:", count);

    const category = document.getElementById("categorySelect").value;

    let selectedArray = [];

    switch (category) {
        case "books":
            selectedArray = books;
            break;
        case "movies":
            selectedArray = movies;
            break;
        case "series":
            selectedArray = series;
            break;
        case "games":
            selectedArray = games;
            break;
        case "cartoons":
            selectedArray = cartoons;
            break;
        case "anime":
            selectedArray = anime;
            break;
    }

    const randomItem = getRandomItem(selectedArray);
    const output = document.getElementById("randomOutput");

    // Формируем строку с учётом полей
    const extra =
        randomItem.author || randomItem.director || randomItem.creator || randomItem.studio || "";
    const year = randomItem.year || "";

    output.textContent = `${randomItem.title} — ${extra}${year ? ` (${year})` : ""}`;
});


function getRandomItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}


