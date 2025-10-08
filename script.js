// script.js

// ⚠️ ВАЖНО: Вставьте сюда ваш HTTPS адрес от ngrok
const API_BASE_URL = "https://unnibbled-nonbarbarous-rosana.ngrok-free.dev";

let tg = window.Telegram.WebApp;
tg.expand();

const yandexBtn = document.getElementById('check-yandex');
const ozonBtn = document.getElementById('check-ozon');
const resultsDiv = document.getElementById('results');
const mainButtons = document.querySelector('.button-group');

// Функция для отображения загрузки
function showLoading() {
    resultsDiv.innerHTML = '<div class="loader"></div>';
    mainButtons.style.display = 'none'; // Скрываем главные кнопки
}

// Функция для отображения списка отгрузок
function displayShipments(shipments, marketplace) {
    resultsDiv.innerHTML = ''; // Очищаем
    if (!shipments || shipments.length === 0) {
        resultsDiv.innerHTML = `<p>Активных отгрузок для ${marketplace} не найдено.</p>`;
        return;
    }

    const list = document.createElement('ul');
    list.className = 'shipment-list';
    shipments.forEach(shipment => {
        const listItem = document.createElement('li');
        listItem.className = 'shipment-item';
        listItem.innerText = `Отгрузка №${shipment.id} от ${shipment.date}`;
        // В будущем сюда можно добавить обработчик нажатия для получения деталей
        list.appendChild(listItem);
    });
    resultsDiv.appendChild(list);
}

yandexBtn.addEventListener('click', () => {
    showLoading();
    // Делаем GET-запрос к нашему Python-серверу
    fetch(`${API_BASE_URL}/get_yandex_shipments`)
        .then(response => response.json())
        .then(data => {
            displayShipments(data.shipments, 'Яндекс');
        })
        .catch(error => {
            console.error('Error fetching Yandex data:', error);
            resultsDiv.innerHTML = '<p>Ошибка при загрузке данных от Яндекса.</p>';
        });
});

ozonBtn.addEventListener('click', () => {
    showLoading();
    fetch(`${API_BASE_URL}/get_ozon_shipments`)
        .then(response => response.json())
        .then(data => {
            displayShipments(data.shipments, 'Ozon');
        })
        .catch(error => {
            console.error('Error fetching Ozon data:', error);
            resultsDiv.innerHTML = '<p>Ошибка при загрузке данных от Ozon.</p>';
        });
});

// Добавим стили для списка и лоадера в CSS
