import express from "express";
import wordDefintions from "./routes/wordDefinitions";

console.log(wordDefintions);

const app = express();
const port = 3500;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/word_definition", wordDefintions);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
