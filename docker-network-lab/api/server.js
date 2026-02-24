const express = require("express");
const { Client } = require("pg");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("API is reachable");
});

app.get("/db-check", async (req, res) => {
    try {
        const client = new Client({
            host: "db",
            user: "postgres",
            password: "postgres",
            database: "postgres",
        });

        await client.connect();
        const result = await client.query("SELECT NOW()");
        await client.end();

        res.json({
            status: "DB reachable",
            time: result.rows[0].now,
        });
    } catch (err) {
        res.status(500).json({
            status: "DB unreachable",
            error: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});