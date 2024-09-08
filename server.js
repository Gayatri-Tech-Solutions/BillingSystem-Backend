import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from './routes/index.js';

dotenv.config();

const app = express();


const allowedOrigins = process.env.FRONTEND_URLS.split(',');

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Allow requests from allowed origins or requests without an origin header (e.g., from non-browser clients)
      callback(null, true);
    } else {
      // Block requests from other origins
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
