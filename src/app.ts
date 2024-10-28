import { createServer, IncomingMessage, ServerResponse } from 'http'
import { parse } from 'url'
import { usersRouter } from './routes/user'


export const errorMiddleware = (error: Error, req: IncomingMessage, res: ServerResponse) => {
    console.error(`Error processing request for ${req.url}:`, error.message);

    res.statusCode = 500; // Internal Server Error
    res.setHeader('Content-Type', 'application/json');
    res.end(
        JSON.stringify({
            error: true,
            message: error.message,
        })
    );
}

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    try{
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
    }catch(e){
        errorMiddleware(e,req,res)
    }
   
};

const server = createServer(requestListener)

export default server