const fs = require('fs');
const https = require('https');
const httpProxy = require('http-proxy');

// 프록시 서버 생성
const proxy = httpProxy.createProxyServer({});

// HTTPS 서버 옵션
const httpsOptions = {
    key: fs.readFileSync('key.pem'), // 개인 키
    cert: fs.readFileSync('cert.pem') // 공개 키 인증서
};

// HTTPS 서버 생성
const server = https.createServer(httpsOptions, (req, res) => {
    // /app/register 경로로 들어오는 요청만 타겟 서버로 프록시합니다.
    if (req.url === '/app/register' && req.method === 'POST') {
        proxy.web(req, res, { target: 'https://1.231.29.229:18443', secure: false });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(8443, () => {
    console.log('HTTPS Proxy server listening on port 8443');
});
