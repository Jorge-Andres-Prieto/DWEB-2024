import express from 'express'
import logger from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import dotenv from 'dotenv'
import { createClient } from '@libsql/client'

dotenv.config()

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
    connectionStateRecovery: {}
});

const db = createClient({
    url: "libsql://tight-slipstream-danielchancir.turso.io",
    authToken: process.env.DB_TOKEN
})

await db.execute(`
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT
    );
`);

io.on('connection', async (socket) => {
    console.log('Un forastero');

    socket.on('Ganado dijo', async (msg) => {
        let result;
        try {
            console.log(msg)

            result = await db.execute({
                sql: `INSERT INTO messages (content) VALUES (:content)`,
                args: { content: msg }
            });
        } catch (e) {
            console.log(e);
            return
        }
       io.emit('Ganado dijo', msg, result.lastInsertRowid.toString())
    })

    if (!socket.recovered) {
        try {
            const results = await db.execute({
                sql: `SELECT id, content FROM messages WHERE id > ?`,
                args: [socket.handshake.auth.serverOffset ?? 0]
            })

            results.rows.forEach(row => {
                socket.emit('Ganado dijo', row.content, row.id)
            })
        } catch (e) {
            console.error(e)
        }
    }

    socket.on('disconnect', () => {
        console.log('Cogedlo');
    })
})

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/starter.html');
});

server.listen(port, () => {
    console.log('Te escucho');
})