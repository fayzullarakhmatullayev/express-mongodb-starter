import express from 'express';
import mongoose from 'mongoose';

import userRoutes from './routes/user.routes.js';
import { errorMiddleware } from './middleware/error.middleware.js';

const app = express();
const PORT = 8080;

app.use(express.json());

app.get('/', (_, res) => res.json({ message: 'ok' }));
app.use('/users', userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  mongoose
    .connect('mongodb://localhost:27017/express_db')
    .then(() => console.log('DB Connection succefully established!'))
    .catch((err) => {
      console.log('Error DB connection: ', err);
    });

  console.log(`App is running on http://localhost:${PORT}`);
});
