import express, { Router } from "express";

const router: Router = express.Router();

router.get("/", (req, res) => {
  res.send(
    "<h1>Blockchain Voting System</h1><p>Backend API of BlockChain Voting System</p>"
  );
});

export default router;
