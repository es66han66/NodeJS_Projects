import fetch from 'node-fetch'
const url = 'http://127.0.0.1:8000/checkSSE'

const data = await fetch(url)
let chunkNo = 1
for await (let chunk of data.body) {
  console.log(
    `chunk number ${chunkNo} Received: `, Buffer.from(chunk).toString()
  )
  chunkNo++
}

console.log('1st end now')

function b () {
  console.log('2nd end now')
}
b()