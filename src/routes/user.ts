import { IncomingMessage, ServerResponse } from 'http';
import { parse } from 'url';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../db/userDb';
import { v4 as isUuid } from 'uuid';


export const usersRouter = async(req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;
  const parsedUrl = parse(url || '', true);
  const path = parsedUrl.pathname || '';
  const id = path.split('/')[3];

  res.setHeader('Content-Type', 'application/json');

  if (method === 'GET' && path === '/api/users') {
    // Get all users
    res.writeHead(200);
    res.end(JSON.stringify(getAllUsers()));
  } else if (method === 'GET' && id && path.startsWith('/api/users/')) {
    const user = getUserById(id);
    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else if (method === 'POST' && path === '/api/users') {
    // Create a new user
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age || !hobbies) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid request body' }));
        return;
      }
      const newUser = createUser(username, age, hobbies);
      res.writeHead(201);
      res.end(JSON.stringify(newUser));
    });
  } else if (method === 'PUT' && id && path.startsWith('/api/users/')) {

    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const { username, age, hobbies } = JSON.parse(body);
      if (!username || !age || !hobbies) {
        res.writeHead(400);
        res.end(JSON.stringify({ message: 'Invalid request body' }));
        return;
      }
      const updatedUser = updateUser(id, username, age, hobbies);
      if (updatedUser) {
        res.writeHead(200);
        res.end(JSON.stringify(updatedUser));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'User not found' }));
      }
    });
  } else if (method === 'DELETE' && id && path.startsWith('/api/users/')) {
    const success = deleteUser(id);
    if (success) {
      res.writeHead(204);
      res.end(JSON.stringify({message: 'User has been deleted'}));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } else {
    // If no matching routes, return 404
    res.writeHead(404);
    res.end(JSON.stringify({ message: 'Resource not found' }));
  }
};
