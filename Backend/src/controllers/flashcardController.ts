import { error } from "console";
import { query } from "../database"
import { Request, Response } from "express";

export const getUserSavedFlashcard = async(req: Request, res:Response) =>{
    //const build_query = `SELECT * FROM m_usersavedflashcards where userid=${userid}`;
   
    try{
        const {userId} = req.query;
        console.log("UserID:", userId)
        if(!userId){
            res.status(400).json({
                message: "Missing UserId."
            })
        }
        const getQuery_build = `
        SELECT * FROM m_usersavedflashcards
        where userid = $1
        `
        const result = await query(getQuery_build, [userId]);
        res.json(result.rows);
    }catch{
        console.log("An error occured: ", error)
        res.status(500).json({
            message:"An error occured"
        })
    }
}

export const getSpecificSavedFlashcard = async (req: Request, res:Response) =>{
    const {question, answer, userId} = req.query;

    if (!question || !answer || !userId){
        console.error("All required params not supplied!")
        res.status(400).json({
            error: "All required params not supplied"
        })
    }
    const getQuery_build = `
    SELECT * FROM m_usersavedflashcards
    WHERE userid = $1 AND question = $2 AND answer = $3;
    `
    const getResult = await query (getQuery_build, [userId, question, answer]);
    res.json(getResult.rows);
}

export const postUserSavedFlashcard = async (req: Request, res:Response)=>{
    try{
        const {question, answer, userId} = req.body;
        if (!question || !answer || !userId) {
            res.status(400).json({ error: "Missing required fields: question, answer, or userId." });
        }
        const insertQuery_build = `
        INSERT INTO m_usersavedflashcards(userid, question, answer)
        VALUES($1, $2, $3)
        RETURNING *;
        `
        const result = await query(insertQuery_build, [userId, question, answer ]);
        res.status(201).json({
            message:"Flaschard added successfully!"
        })
    }catch(error:any){
        console.log("An error occured when posting: ", error.message)
        res.status(500).json({message: "Failed to add flashcard"})
    }

}

export const deleteUserSavedFlashcard = async(req: Request, res:Response)=>{
    try{
        const {question, answer, userId} = req.body;
        if(!question || !answer || !userId){
            res.status(400).json({
                error:"Missing required params!"
            })
        }

        const deleteQuery_build = `
        DELETE m_usersavedflashcards
        WHERE userid=$1 AND question=$2 AND answer=$3;
        `
        const result = await query(deleteQuery_build, [userId, question, answer]);
        res.status(201).json({
            message: "Flashcard Deleted Successfully"
        })
    }catch(error:any){
        console.error("An error when deleting: ", error.message)
        res.status(500).json({
            message:"Failed to delete flashcard"
        })
    }
}

export const postUserGeneratedFlashcards = async (req: Request, res:Response)=>{
    try{
        const {question, answer, userId} = req.body;
        if (!question || !answer || !userId) {
            res.status(400).json({ error: "Missing required fields: question, answer, or userId." });
        }
        const insertQuery_build = `
        WITH inserted_flashcard AS(
            INSERT INTO m_allflashcards(question, answer)
            VALUES($1, $2)
            RETURNING m_allflashcards_pkey
        )
        INSERT INTO m_usergeneratedflashcards(userid, qnareference)
        SELECT $3, m_allflashcards_pkey FROM inserted_flashcard;
        `
        const result = await query(insertQuery_build, [ question, answer, userId ]);
        res.status(201).json({
            message:"Flaschard added successfully!"
        })
    }catch(error:any){
        console.log("An error occured when posting: ", error.message)
        res.status(500).json({message: "Failed to add flashcard"})
    }

}

export const getUserGeneratedFlashcards = async (req: Request, res:Response)=>{
    try{
        const {userId} = req.query;
        if (!userId) {
            res.status(400).json({ error: "Missing required field: userId." });
        }
        const insertQuery_build = `
        SELECT m.userid, flashcard.question, flashcard.answer, flashcard.created_date as date FROM m_usergeneratedflashcards m
        LEFT JOIN m_allflashcards flashcard on m.qnareference = flashcard.m_allflashcards_pkey
        where m.userid = $1
        `
        const getResult = await query(insertQuery_build, [ userId ]);
        res.json(getResult.rows);
    }catch(error:any){
        console.log("An error occured when getting: ", error.message)
        res.status(500).json({message: "Failed to get flashcard"})
    }
}

export const getUserLoggedInDates = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            res.status(400).json({
                message: "Missing UserId."
            });
        }
        const getQuery_build = `
            SELECT DISTINCT TO_CHAR(login_date, 'YYYY-MM-DD') AS login_date
            FROM m_userlogindates
            WHERE user_id = $1
            ORDER BY login_date;
        `;
        const result = await query(getQuery_build, [userId]);

        const loggedInDates = result.rows.map((row: any) => row.login_date);
        res.json(loggedInDates);
    } catch (error: any) {
        console.error("An error occurred when fetching login dates: ", error.message);
        res.status(500).json({
            message: "Failed to fetch login dates."
        });
    }
}

export const postUserFlashcardDeck = async (req: Request, res:Response)=>{
    try{
        const {question, answer, userId, deck_name} = req.body;
        if (!question || !answer || !userId) {
            res.status(400).json({ error: "Missing required fields: question, answer, or userId." });
        }
        const insertQuery_build = `
        WITH inserted_flashcard AS(
            INSERT INTO m_allflashcards( question, answer )
            VALUES($1, $2)
            RETURNING m_allflashcards_pkey
        )
        INSERT INTO m_usergeneratedflashcards(userid, qnareference, deck_name)
        SELECT $3, m_allflashcards_pkey, $4 FROM inserted_flashcard;
        `
        const result = await query(insertQuery_build, [ question, answer, userId, deck_name ]);
        res.status(201).json({
            message:"Flaschard added successfully!"
        })
    }catch(error:any){
        console.log("An error occured when posting: ", error.message)
        res.status(500).json({message: "Failed to add flashcard"})
    }

}

export const getUserFlashcardDeck = async (req: Request, res:Response)=>{
    try{
        const {userId, deck_name} = req.query;
        if (!userId) {
            res.status(400).json({ error: "Missing required field: userId." });
        }
        const insertQuery_build = `
        SELECT m.userid, flashcard.question, flashcard.answer, flashcard.created_date as date, m.deck_name FROM m_usergeneratedflashcards m
        LEFT JOIN m_allflashcards flashcard on m.qnareference = flashcard.m_allflashcards_pkey
        where m.userid = $1 and m.deck_name = $2
        `
        const getResult = await query(insertQuery_build, [ userId, deck_name ]);
        res.json(getResult.rows);
    }catch(error:any){
        console.log("An error occured when getting: ", error.message)
        res.status(500).json({message: "Failed to get flashcard"})
    }
}

