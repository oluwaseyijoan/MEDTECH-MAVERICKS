const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser')
require("dotenv").config();

const doctorRoutes = require("./routes/doctorRoutes");
const authRoutes = require("./routes/authRoutes")
const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors({
  origin: "http://localhost:5173",  
  credentials: true                 
}))
app.use(express.json());
app.use(cookieParser())


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log(' Connected to MongoDB'))
.catch(err => console.error(' Error connecting to MongoDB:', err));


app.use("/api/doctors", doctorRoutes);
app.use("/api/users", authRoutes);

app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
