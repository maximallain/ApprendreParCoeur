import express from "express";

const router = express.Router();

router.post("", (_req, _res, next) => {
  console.log("Creation d'un mot de vocabulaire");
  next();
});

router.put("/:id", (req, _res, next) => {
  console.log("Modification d'un mot de vocabulaire, id : " + req.params.id);
  next();
});

router.get("", (_req, res) => {
  console.log("Voici tous les mots");
  res.send("<h1>Voici les mots !</h1>");
});

export default router;
