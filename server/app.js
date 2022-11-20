const express = require('express')
const app = express()
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const http = require('http')
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../dist/uploader')))

var corsOptions =
{
    origin:'http://localhost:4200',
    optionsSuccessStatus:200
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/uploader/index.html'));
});

app.use(cors(corsOptions))

const storage = multer.diskStorage({
    destination: function(req, file, cb)
    {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb)
    {
        cb(null, file.originalname)
    },

})

const upload = multer({storage})


app.post('/file', upload.single('file'),(req, res)=>
{
    const file = res.file;

    if(file)
    {
        res.json(file);
    }
    else{
        throw new Error(res.error);
    }
})

app.post('/multifiles', upload.array('files'),(req, res)=>
{
    const files = res.files;

    if(Array.isArray(files) && files.length > 0)
    {
        res.json(files);
    }
    else{
        throw new Error('File uploaded unsuccessful');
    }
})

const server = http.createServer(app)

server.listen(PORT, (req, res)=>
{
    console.log(`Server running on port: ${PORT}`)
})
