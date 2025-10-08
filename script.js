// Получаем объект приложения Telegram
let tg = window.Telegram.WebApp;

// Расширяем приложение на весь экран
tg.expand();

// Находим наши кнопки
const yandexBtn = document.getElementById('check-yandex');
const ozonBtn = document.getElementById('check-ozon');
const resultsDiv = document.getElementById('results');

// Обработчик нажатия на кнопку "Проверить Яндекс"
yandexBtn.addEventListener('click', () => {
    // Показываем временное сообщение
    resultsDiv.innerText = "Запрашиваю данные у Яндекса...";
    // Отправляем данные в Python-бот
    // Бот получит простую строку 'check_yandex'
    tg.sendData("check_yandex");
});

// Обработчик нажатия на кнопку "Проверить Ozon"
ozonBtn.addEventListener('click', () => {
    resultsDiv.innerText = "Запрашиваю данные у Ozon...";
    // Бот получит простую строку 'check_ozon'
    tg.sendData("check_ozon");
});

// На данном этапе бот будет отвечать в сам чат, а не в это окно.
// В будущем мы можем настроить отображение данных прямо здесь.