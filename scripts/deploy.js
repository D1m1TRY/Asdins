const { host, username, password, port } = require('../config/ssh-config');
const path = require('path');
const colors = require('colors');
const uniq = require('lodash/uniq');
const Client = require('ssh2-sftp-client');

const { putDir, progress, done, error, finish } = require('./helpers');

const sftp = new Client();

const remotePath = '/var/public/asdfreelance'; // Remote path

console.log('\x1Bc');
console.log(colors.green('____________________________'));
console.log('');
console.log(' H O S T:         '.bgGreen.black, host.cyan);
console.log(' P O R T:         '.bgGreen.black, `${port}`.cyan);
console.log(' U S E R N A M E: '.bgGreen.black, username.cyan);
console.log(' P A S S W O R D: '.bgGreen.black, password.cyan);
console.log(colors.green('____________________________'));

sftp.connect({ host, port, username, password })
  .then(() => {
    progress(' Updating "index.html"... ');
    try {
      return sftp.delete(`${remotePath}/index.html`)
    } catch (e) {
      console.log(`${remotePath}/index.html - already deleted.`.yellow)
    }
  })
  .then(() => sftp.put(path.join(__dirname, '../index.html'), `${remotePath}/index.html`))
  .then(() => {
    progress(' Updating "package.json"... ');
    try {
      return sftp.delete(`${remotePath}/package.json`)
    } catch (e) {
      console.log(`${remotePath}/package.json - already deleted.`.yellow)
    }
  })
  .then(() => sftp.put(path.join(__dirname, '../package.json'), `${remotePath}/package.json`))
  .then(() => {
    done();
    progress(' Updating "img" folder... ')
    try {
      return sftp.rmdir(`${remotePath}/img`, true);
    } catch (e) {
      console.log(' "img" folder already removed. ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/img`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../img'), `${remotePath}/img`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "css" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/css`, true);
    } catch (e) {
      console.log(' "css" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/css`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../css'), `${remotePath}/css`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "js" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/js`, true);
    } catch (e) {
      console.log(' "js" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/js`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../js'), `${remotePath}/js`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "mail" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/mail`, true);
    } catch (e) {
      console.log(' "mail" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/mail`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../mail'), `${remotePath}/mail`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "slick" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/slick`, true);
    } catch (e) {
      console.log(' "slick" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/slick`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../slick'), `${remotePath}/slick`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "vendor" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/vendor`, true);
    } catch (e) {
      console.log(' "vendor" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/vendor`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../vendor'), `${remotePath}/vendor`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "video" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/video`, true);
    } catch (e) {
      console.log(' "video" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/video`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../video'), `${remotePath}/video`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "scripts" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/scripts`, true);
    } catch (e) {
      console.log(' "scripts" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/scripts`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../scripts'), `${remotePath}/scripts`, sftp);
  })
  .then(() => {
    done();
    progress(' Updating "config" folder... ');
    try {
      return sftp.rmdir(`${remotePath}/config`, true);
    } catch (e) {
      console.log(' "config" folder already removed ');
    }
  })
  .then(() => {
    return sftp.mkdir(`${remotePath}/config`);
  })
  .then(() => {
    return putDir(path.join(__dirname, '../config'), `${remotePath}/config`, sftp);
  })
  .then(() => {
    finish();
    sftp.end();
  })
  .catch((err) => {
    error();
    sftp.end();
    console.log('Error: ', err);
  });
