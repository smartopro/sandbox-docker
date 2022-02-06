// EXPRESS
import express from "express";
import fs from "fs/promises";
import path from "path";
const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "pages"));

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT ?? 3000;
const logPath = path.resolve(__dirname, "data", "log.txt");

app.get("/", async (req, res) => {
    const data = await fs.readFile(logPath, "utf-8");
    const logs = data.split("\r\n").filter(item => !!item);
    res.render("index", {logs});
});

app.post("/", async (req, res) => {
    const text = req.body.text;
    await fs.appendFile(logPath, `${text}\r\n`);
    res.redirect("/");
});
app.listen(port, () => {
    console.log(`App started on port ${port}...`);
});
