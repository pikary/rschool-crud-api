import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { usersRouter } from './routes/user'


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

const server = createServer(requestListener)

export default server