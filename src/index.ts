import { createServer, IncomingMessage, ServerResponse } from 'http'
import cluster from 'node:cluster';
import * as os from 'os'
import { parse } from 'url'
import { usersRouter } from './routes/user'
import * as dotenv from 'dotenv';

dotenv.config()

const PORT = process.env.PORT || 3000


export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    const { url } = req;
    const parsedUrl = parse(url || '', true);
    const path = parsedUrl.pathname || '';


    if (path.startsWith('/api/users')) {
        usersRouter(req, res);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Resource not found' }));
    }
};



const cpunum = os.cpus().length
if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers
    for (let i = 0; i < cpunum; i++) {
        cluster.fork();
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });

} else {
    const server = createServer(requestListener)
    server.listen(PORT, () => {
        console.log(
            'Server started on port ' + PORT
        )
    })

    console.log(`Worker ${process.pid} started`);
}


