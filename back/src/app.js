import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { awardRouter } from "./routers/awardRouter";
import { projectRouter } from "./routers/projectRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import { indexRouter } from "./routers/index";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

indexRouter(app);
app.use(errorMiddleware);

export { app };
