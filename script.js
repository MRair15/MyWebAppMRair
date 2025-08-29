// Инициализация Telegram WebApp
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand(); // раскрыть на весь экран
}

// Установка минимальной даты — сегодня
document.getElementById('date').min = new Date().toISOString().split('T')[0];

// Кнопка "Записаться"
document.getElementById('submitBtn').onclick = function () {
    const service = document.getElementById('service').value;
    const master = document.getElementById('master').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone || !date) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Формируем данные
    const data = {
        service,
        master,
        date,
        time,
        name,
        phone,
        telegram_user: tg.initDataUnsafe.user?.username || 'не указан'
    };

    // Отправляем в бота
    tg.sendData(JSON.stringify(data));

    // Показываем успех
    document.querySelector('.form').classList.add('hidden');
    document.getElementById('success').classList.remove('hidden');
};

// Закрыть Mini App
function closeApp() {
    tg.close();
}