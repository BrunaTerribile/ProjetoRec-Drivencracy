import express  from "express";
import cors from "cors";
import poolsRoutes from "./routes/pools.routes.js";
import choicesRoutes from "./routes/choices.routes.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use(poolsRoutes);
app.use(choicesRoutes)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running in port: ${port}`));