const express = require('express')
const axios = require('axios')
const cors = require('cors')

const app = express();
const port = 3000; // Порт, на котором будет работать сервер

// Разрешить CORS для всех доменов
app.use(cors());

app.get("/cities", async (req, res) => {
    try {
        let response = null;
        if(req.query.q) {
            response = await axios.get(
                `https://api.vk.com/method/database.getCities?access_token=${req.query.apiKey}&v=5.154&country_id=${req.query.countryCode}&lang=0&q=${req.query.q}`
            );
        } else {
            response = await axios.get(
                `https://api.vk.com/method/database.getCities?access_token=${req.query.apiKey}&v=5.154&country_id=${req.query.countryCode}&lang=0`
            );
        }
        // Переслать ответ от VK API на клиент
        res.json(response.data);
    } catch (error) {
        // Обработка ошибок
        console.error(error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

app.get("/universe", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.vk.com/method/database.getUniversities?access_token=${req.query.apiKey}&v=5.154&country_id=${req.query.countryCode}&lang=0&city_id=${req.query.cityId}&q=${req.query.q}`
        );
        // Переслать ответ от VK API на клиент
        res.json(response.data);
    } catch (error) {
        // Обработка ошибок
        console.error(error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

app.get("/universe/faculties", async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.vk.com/method/database.getFaculties?access_token=${req.query.apiKey}&v=5.154&university_id=${req.query.university}&lang=0`
        );
        // Переслать ответ от VK API на клиент
        res.json(response.data);
    } catch (error) {
        // Обработка ошибок
        console.error(error);
        res.status(500).json({ error: "Внутренняя ошибка сервера" });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
