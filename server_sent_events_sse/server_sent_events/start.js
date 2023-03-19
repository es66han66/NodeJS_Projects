const http = require("http");

const host = "127.0.0.1";
const port = 8000;

let sourceData = 0;
const updateData = () => {
  const delta = Math.random();
  sourceData += delta;
}

const requestListener = function (req, res) {
  if (req.url === '/checkSSE') {
    res.statusCode = 200;
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("connection", "keep-alive");
    res.setHeader("Content-Type", "text/event-stream");

    setInterval(() => {
      const data = JSON.stringify({ ticker: sourceData });
      res.write(`id: ${(new Date()).toLocaleTimeString()}\ndata: ${data}\n\n`);
    }, 1000);
  } else {
    res.statusCode = 404;
    res.end("resource does not exist");
  }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  setInterval(()=> updateData(), 500);
  console.log(`server running at http://${host}:${port}`);
});