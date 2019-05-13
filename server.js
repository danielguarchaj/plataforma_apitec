
const express = require('express')
const PORT = process.env.PORT || 5000
const path = require('path');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});

express()
    .use(express.static(__dirname))
    .listen(PORT, () => console.log(`Listening on ${PORT}`))