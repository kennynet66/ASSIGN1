import e, { Request, Response } from "express";
import { v4 } from "uuid";
import { noteInterface } from "../interface/note.interface";
import timeStamp from 'time-stamp';
import mssql from 'mssql'
import { sqlConfig } from "../Config/sql.config";

// let notes: noteInterface[] = []

export const newNote = (async (req: Request, res: Response) => {
    try {
        let note_id = v4()
        let createdAt = timeStamp()

        const { title, content }: noteInterface = req.body

        const pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
            .input("id", mssql.VarChar, note_id)
            .input("title", mssql.VarChar, title)
            .input("content", mssql.VarChar, content)
            .input("createdAt", mssql.VarChar, createdAt)
            .execute("saveNote")).recordset

        res.status(200).json({
            message: "Note created successfully",
            result
        })
    } catch (error) {
        res.json({
            error
        })
    }
})

export const getAllNotes = (async (req: Request, res: Response) => {
    try {
        const pool = await mssql.connect(sqlConfig);

        let result = (await pool.request().query("SELECT * FROM Notes")).recordset

        res.status(200).json({
            message: "All notes",
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const getById = (async (req: Request, res: Response)=>{
    try {
        let id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("id", mssql.VarChar, id)
        .execute("getById")).recordset

        res.status(200).json({
            message: "One note",
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const updateNote = (async (req: Request, res: Response)=>{
    try {
        let id = req.params.id
        let createdAt = timeStamp()

        const { title, content }: noteInterface = req.body

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("id", mssql.VarChar, id)
        .input("title", mssql.VarChar, title)
        .input("content", mssql.VarChar, content)
        .input("createdAt", mssql.VarChar, createdAt)
        .execute("updateNote")).recordset

        res.status(200).json({
            message: "Note updated",
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});

export const deleteNote = (async (req: Request, res: Response)=>{
    try {
        let id = req.params.id

        const pool = await mssql.connect(sqlConfig)

        let result = (await pool.request()
        .input("id", mssql.VarChar, id)
        .execute("deleteNote")).recordset

        res.status(200).json({
            message: "Note deleted",
            result
        })
    } catch (error) {
        res.status(500).json({
            error
        })
    }
});
