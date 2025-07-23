import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import connectDB from "./config/db.js";
import 'dotenv/config';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
})

app.use("/api/notes",notesRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 5001");
    });
}).catch((error) => {
    console.error("MongoDB connection error:", error);
});

