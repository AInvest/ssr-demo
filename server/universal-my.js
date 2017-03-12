// process.env.BABEL_DISABLE_CACHE = 1
require('ignore-styles')
require('babel-register')({ ignore: /\/(build|node_modules)\//, presets: ['react-app'] })

const path = require('path')
const fs = require('fs')

import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

import createRoutes from '../src/routes'
import configureStore from '../src/store'
import {Provider} from 'react-redux'

const routes = createRoutes({})
/*
const response = {
  statusCode: 200,
  body: JSON.stringify({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    input: event
  })
}
*/
function slsResponse (status, body) {
  return {
    headers: {
      'content-type': 'text/html'
    },
    statusCode: status || 404,
    body
  }
}

module.exports = function universalLoader (url, cb) {
  //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return cb(err, slsResponse(404))
    }
    match({ routes, location: url }, (err, redirect, renderProps) => {
      if(err) {
        console.error('match err', err)
        return cb(null, slsResponse(404))
      } else if(redirect) {
        return cb(null, slsResponse(200, 'redirect'))
      } else if(renderProps) {
        let store = configureStore()
        const ReactApp = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const RenderedApp = htmlData.replace('{{SSR}}', ReactApp)
        cb(null, slsResponse(200, RenderedApp))
      } else {
        return cb(null, slsResponse(404))
      }
    })
  })
}

