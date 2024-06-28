require('dotenv').config();
//---------importing the required modules---------------
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const cors = require('cors');



//---------import file route----------------------
const errorMiddleware = require('./middlewares/error.middleware')
const databaseConnection = require('./databases/database');

const authRoute = require('./routes/auth.routes');
const profileRoute = require('./routes/profile.routes');
//------------------------------------------
const app = express();
const port = process.env.PORT || 3000;


//---------initial-middlewares----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine", "ejs");
app.set("views", path.resolve("./src/views"));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.CORS_ORIGIN || true,
    credentials: true
};
app.use(cors(corsOptions));



//--------route handler----------------------
app.get("/", (req, res, next) => {
    return res.render('home')
})
app.use('/auth', authRoute, errorMiddleware);
app.use("/profile", profileRoute, errorMiddleware);

//-----------Connecting Database and start server---------
app.listen(port, () => {
    console.log(`=================================`);
    console.log(`🚀 App listening on the port ${port} \n  Link : http://localhost:${port}`);
    databaseConnection();
    console.log(`=================================`);
    console.log(`Database on Running`);
    console.log(`=================================`);
})
