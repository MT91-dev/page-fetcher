const net = require('net');
const fs = require('fs');

const input = process.argv.slice(2);

let rawUrl = input[0];
rawUrl = rawUrl.split("");
const urlLength = rawUrl.length;
const filePath = input[1];
let sanitizedUrl = "";

for (let index = 11; index <= rawUrl.length - 2; index++) {
  sanitizedUrl += rawUrl[index];
};


const conn = net.createConnection({
  host: sanitizedUrl,
  port: 80
});
conn.setEncoding('UTF8');

conn.on('connect', () => {
  console.log(`Connected to server!`);

  conn.write(`GET / HTTP/1.1\r\n`);
  conn.write(`Host: example.edu\r\n`);
  conn.write(`\r\n`);
});

conn.on('data', (data) => {
  console.log(data);

  fs.writeFile('./index.html', data, err => {
    if (err) {
      console.error(err);
    }
    // file written successfully
  });

  console.log(`Downloaded and saved ${urlLength} bytes to ${filePath}`);

  conn.end();
});