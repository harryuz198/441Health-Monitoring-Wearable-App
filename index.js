const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// 使用body-parser中间件解析POST请求的JSON数据
app.use(bodyParser.json());

// 模拟用户数据存储
let users = [
  { id: 1, username: 'john_doe', password: 'password123', healthData: [] },
  // 添加更多用户数据...
];

// 处理获取用户健康数据的请求
app.get('/health-data/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json({ healthData: user.healthData });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 处理添加新健康数据的请求
app.post('/health-data/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { metric, value, timestamp } = req.body;

  const user = users.find((u) => u.id === userId);

  if (user) {
    const newHealthData = { metric, value, timestamp };
    user.healthData.push(newHealthData);
    res.json({ message: 'Health data added successfully', healthData: newHealthData });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// 启动Express应用程序
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
