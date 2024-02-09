import { Router } from "express";
import { deleteNote, getAllNotes, getById, newNote, updateNote } from "../Controllers/new.controller";

let noteRoute = Router()

noteRoute.post('/newnote', newNote)
noteRoute.get('', getAllNotes );
noteRoute.get('/:id', getById);
noteRoute.put('/update/:id', updateNote)
noteRoute.delete('/delete/:id', deleteNote)

export default noteRoute
