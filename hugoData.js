#!/usr/bin/env node

// from https://github.com/kidsil/hugo-data-to-pages/blob/master/hugo.js
// MIT License
// Copyright (c) 2019 Asaf Zamir
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



'use strict';

let config = {
  root: '', //Root hugo folder, can be empty
  dataFolder: 'data', //Data folder path (will fetch ALL files from here)
  type: 'categories', //Type name [basically layout] (save it under "layouts/NAME/single.html" or themes/THEME/layouts/NAME/single.html). Can be overridden on individual pages by defining "type" under "fields"
  pages: 'categories', //Pages elemenet in your data, in case it's "posts" or "articles" etc.
  contentPath: 'content', //Path to content directory (in case it's not "content")
  hugoPath: '/usr/local/bin/hugo' //Path to hugo binary (if global, e.g. /snap/bin/hugo)
}

const fs = require('fs');
const fse = require('fs-extra');
const prompts = require('prompts');

const converToObject = (file) => {
  const jsyml = require('js-yaml');
  const jstml = require('toml');
  const filetype = file.split('.').pop();
  const fileContent = fs.readFileSync(config.root + config.dataFolder + '/' + file, 'utf8');
  if (filetype === 'json') return JSON.parse(fileContent);
  if (filetype === 'yml' || filetype === 'yaml') return jsyml.safeLoad(fileContent);
  if (filetype === 'toml') return jstml.parse(fileContent);
  if (filetype === 'csv') console.log('skipping csv');
};
const build = async (add, force) => {
  if (typeof add === 'undefined') add = true;
  if (typeof force === 'undefined') force = false;
  if (!config.contentPath || config.contentPath === '/') return console.log('Error: config.contentPath cannot be \'\' or \'/\')!');
  let dataFiles;
  try {
    dataFiles = fs.readdirSync(config.root + config.dataFolder);
  } catch (e) {
    return console.log('e', e);
  }
  if (dataFiles.length < 1) return console.log('No data files');
  for (let i in dataFiles) {
    let data = converToObject(dataFiles[i]);
    let pages = config.pages ? data : data;
    for (let j in pages) {
      if (!pages[j].CategoryName) return console.log('Error: Pages must include path!');
      if (!pages[j].CategoryDescription) return console.log('Error: Pages must include fields!');
      
      const pagePath = config.root + config.contentPath + '/' + config.pages + '/' + pages[j].CategoryName;
      if (add) {
        fse.ensureDirSync(pagePath);
        fs.writeFileSync(pagePath + '/index.md', '--- \n' + 'title: ' + JSON.stringify(pages[j].CategoryName) + '\ndescription: ' + JSON.stringify(pages[j].CategoryDescription) + '\nqualifier: ' + JSON.stringify(pages[j].Qualifier) + '\n---');
        console.log('Created file: ' + pagePath + '/index.md');
      } else if (fs.existsSync(pagePath)) {
        let response;
        if (!force) {
          response = await prompts({
            type: 'confirm',
            name: 'value',
            message: 'Delete ' + pagePath + ' ?'
          });
        }
 
        if (force || response.value) {
          fse.removeSync(pagePath);
          console.log('Removed folder: ' + pagePath);
        }
      }
    }
  }

};
const main = async (argvs) => {
  const mode = typeof argvs._[0] === 'undefined' ? 'default' : argvs._[0];
  const force = typeof argvs['force'] === 'undefined' ? false : true;
  const configFile = typeof argvs['configFile'] === 'undefined' ? false : require('./' + argvs['configFile']);
  Object.assign(config, configFile); //overriding default settings
  config.root = (!!config.root ? config.root : '.') + '/';
  const { execSync } = require('child_process');
  if (mode === 'server') {
    //server mode - create data-generated files, run hugo server, remove data-generated files on stop
    console.log('Building data-generated files...');
    await build();
    console.log('Running Hugo Server...');
    process.on('SIGINT', () => {}); //Not exiting on ctrl+c (instead, going to "catch" clause)
    try {
      await execSync('(cd ' + config.root + ' && ' + config.hugoPath + ' server)');
    } catch (e) {
      console.log('Removing data-generated files...');
      await build(false, force);
    }
  } else if (mode === 'generate') {
    //generate - just create data-generated files (no hugo running, and no removal)
    console.log('Building data-generated files...');
    await build();
  } else if (mode === 'clean') {
    //clean - just remove data-generated files
    console.log('Removing data-generated files...');
    await build(false, force);
  } else {
    //default behavior - create data-generated files, run hugo build, remove data-generated files
    console.log('Building data-generated files...');
    await build();
    console.log('Running Hugo (build)...');
    await execSync('(cd ' + config.root + ' && ' + config.hugoPath + ')');
    console.log('Removing data-generated files...');
    await build(false, force);
  }

  console.log('Done!');
};

// Defining commands and flags
const argvs = require('yargs')
  .command('$0', 'Generate folders/files from data, then run `hugo build`')
  .command('generate', 'Generate folders/files from data (does not run hugo build)')
  .command('server', 'Generate folders/files from data, run `hugo server`, then cleanup on exit')
  .command('clean', 'Trigger cleanup manually')
  .option('force', {
    alias: 'f',
    description: 'Use this flag to skip folder removal prompts (be careful with this one!)'
  })
  .option('configFile', {
    alias: 'c',
    description: 'Optionally use an external config file (JSON format only)'
  })
  .argv;

main(argvs);