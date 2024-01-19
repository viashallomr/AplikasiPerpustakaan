import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import userRoute from "./routes/UserRoute.js";
import BukuRoute from "./routes/BukuRoute.js";
import AnggotaRoute from "./routes/AnggotaRoute.js";
import PeminjamanRoute from "./routes/PeminjamanRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import db from "./config/Database.js";
dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db:db
});

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(userRoute);
app.use(BukuRoute);
app.use(AnggotaRoute);
app.use(PeminjamanRoute);
app.use(AuthRoute);

//store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...')
});