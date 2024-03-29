// File: minimalReactApp.js
// Description: Setup npm package, create project directories and files, and install dependencies.

'use strict'

const fs = require('fs')
const cp = require('child_process')
const path = require('path');
const utils = require('./utils')

const [, , ...args] = process.argv
const projectName = args[0]

if (args.length < 1) {
  console.log('ERROR: missing project name argument')
  process.exit(1)
}

// creates project
cp.exec(`mkdir -p ${projectName} && cd ${projectName}`,
  (initErr, initStdout, initStderr) => {
    if (initErr) {
      // todo: write more professional error messages
      console.error('you dun goofed')
      console.error('check permissions probably')
      return
    }

    // copy src and base dirs to project directory
    utils.copyDirectory(path.join(__dirname, 'assets/src'), projectName)
    utils.copyDirectory(path.join(__dirname, 'assets/base/package.json'), `${projectName}`)
    utils.copyDirectory(path.join(__dirname, 'assets/base/.babelrc'), `${projectName}`)
    utils.copyDirectory(path.join(__dirname, 'assets/base/webpack.config.js'), `${projectName}`)
    utils.copyDirectory(path.join(__dirname, 'assets/public'), projectName)

    let packageJSON = JSON.parse(fs.readFileSync(path.join(projectName, 'package.json')))
    packageJSON['name'] = projectName
    
    fs.writeFile(path.join(projectName, 'package.json'), JSON.stringify(packageJSON, null, 2), (err) => {
      if (err) {
        console.log('fuck')
      }
    })
  }
)

// runs npm install on project install
cp.exec(`npm install --prefix ${projectName}`,
  (initErr, initStdout, initStderr) => {
    if (initErr) {
      // todo: write more professional error messages
      console.error('you dun goofed')
      console.error('check permissions probably')
      return
    }

    console.log(initStdout)
    console.log(initStderr)
  }
)
