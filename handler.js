// 'use strict';
process.env.BABEL_DISABLE_CACHE = 1
process.env.NODE_ENV = 'development'
require('ignore-styles')
require('babel-register')({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] })

// const universal = require('./server/universal-my')
// module.exports.hello = (event, context, callback) => {
//   console.log('wtf')
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify({
//       message: 'Go Serverless v1.0! Your function executed successfully!',
//       input: event
//     })
//   }
//   const path = event.path || '/'
//   universal(path, callback)
//   // callback(null, response)

//   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
//   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// }

const serverless = require('serverless-http')
const app = require('./server/app')

// // var express = require('express')
// // var app = express()

// // app.get('/', function (req, res) {
// //   res.send('Hello World')
// // })

// // this is it!
module.exports.handler = serverless(app)
