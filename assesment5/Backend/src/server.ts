import express, { NextFunction, Request, Response, json } from "express"
import dotenv from 'dotenv'
import newNoteRoute from "./routes/note.routes";
dotenv.config()

const app = express();

app.use(json());

app.use('/note', newNoteRoute);

app.use((error: Error, req: Request, res: Response, next: NextFunction)=> {
    res.json({
        error
})
})

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`);
    
})