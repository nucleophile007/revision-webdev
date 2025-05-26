import http from 'http';
import fs from 'fs/promises';

const serveFile = async (filePath, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'text/html' });
        res.end('<h1>Internal Server Error</h1>');
    }
};

const server = http.createServer(async (req, res) => {
    const routes = {
        '/': 'index.html',
        '/home': 'home.html',
        '/about': 'about.html',
        '/contact': 'contact.html',
    };

    const filePath = routes[req.url];
    if (filePath) {
        return serveFile(filePath, res);
    }

    try {
        const notFoundPage = await fs.readFile('404.html', 'utf-8');
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(notFoundPage);
    } catch {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

const PORT = 4000;
server.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
