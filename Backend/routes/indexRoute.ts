import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send(
        "<h1>Blockchain Voting System</h1><p>Backend API of BlockChain Voting System</p>"
    );
});

export default router;
