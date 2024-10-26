import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

app.get("/", (req, res) => {
  res.json("jokes");
});

app.get("/jokes", async function (request, response) {
  const result = await db.query("SELECT * FROM jokes");
  const jokes = result.rows;
  response.json(jokes);
  console.log("success!");
});

app.post("/jokes", async function (req, res) {
  console.log(req);
  const humorcategory = req.body.humorcategory;
  const joke = req.body.joke;
  const punchline = req.body.punchline;
  const name = req.body.name;
  console.log(req.body);
  const result = await db.query(
    "INSERT INTO jokes (name, joke, punchline, humorcategory) VALUES ($1, $2, $3, $4)",
    [name, joke, punchline, humorcategory]
  );
  res.json(result);
});

app.listen(8080, () => {
  console.log("running on 8080");
});
