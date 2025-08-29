const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
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
        tg.showAlert('Заполните все поля!');
        return;
    }

    // Показываем индикатор загрузки
    tg.showPopup({ title: 'Отправка...', message: 'Ждите...' });

    const data = {
        name,
        phone,
        service,
        master,
        date,
        time,
        telegram_user: tg.initDataUnsafe.user?.username || 'не указан'
    };

    // Отправляем на Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbwFUOAnvIbp26og6nRti0OqEfH6yFMQJbUp5DopyfbbEzNOjQ-cqbHXVmmHz4YAGjvV/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        document.querySelector('.form').classList.add('hidden');
        document.getElementById('success').classList.remove('hidden');
    })
    .catch(err => {
        tg.showAlert('Ошибка отправки. Попробуйте позже.');
    });
};

function closeApp() {
    tg.close();
}