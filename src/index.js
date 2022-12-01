import express  from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3333;
app.listen(port, () => console.log(`Server running in port: ${port}`));