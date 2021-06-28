const express = require('express');
const cors = require('cors');



const { PeerServer } = require('peer');




require('dotenv').config();

const app = express();


const port=process.env.PORT || 9000;

const peerServer = PeerServer({ port: port, path: '/myapp' });

var bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
