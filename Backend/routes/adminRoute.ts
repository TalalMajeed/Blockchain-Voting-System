import express, { Request, Response, Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const router: Router = express.Router();

interface RequestBody {
  wallet: string;
}

router.post("/", (req: Request, res: Response) => {
  const { wallet } = req.body as RequestBody;

  if (!wallet) {
    return res.status(400).json({ error: "Admin Wallet Required" });
  }

  if (wallet === process.env.ADMIN_WALLET) {
    return res.status(200).json({ message: "Admin Wallet Verified" });
  } else {
    return res.status(400).json({ error: "Invalid Admin Wallet" });
  }
});

export default router;
