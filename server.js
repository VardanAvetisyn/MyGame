const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)


app.use(express.static('.'))
app.get("/", function (req, res) {
    res.redirect('index.html')
})



server.listen(3000, () => {
    console.log('server in listening to port 3000');
})