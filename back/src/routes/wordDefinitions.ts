import express from "express";

const router = express.Router();

router.post("/", () => {
  console.log("Creation d'un mot de vocabulaire");
});

router.get("/", () => {
  console.log("Voici tous les mots");
});

export default router;
