import fetch from 'node-fetch'
const url = 'http://localhost:5000/check'

const data = await fetch(url)
let chunkNo = 1
for await (let chunk of data.body) {
  console.log(
    `chunk number ${chunkNo} Received: `, JSON.parse(Buffer.from(chunk).toString())
  )
  chunkNo++
}

console.log('1st end now')

function b () {
  console.log('2nd end now')
}
b()