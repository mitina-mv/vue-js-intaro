import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 3000; // Порт, на котором будет работать ваш сервер

// Разрешить CORS для всех доменов (*), но вы можете настроить ограничения
app.use(cors());

app.get('/getVkData', async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.vk.com/method/database.getCities?access_token=${req.query.apiKey}&v=5.131&country_id=${req.query.countryCode}&need_all=0`
    );
    
    // Переслать ответ от VK API на клиент
    res.json(response.data);
  } catch (error) {
    // Обработка ошибок
    console.error(error);
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
