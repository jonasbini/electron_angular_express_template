const { app, BrowserWindow } = require("electron");
const express = require('express');
const cors = require('cors');
const path = require("path");
const url = require("url");

const expressApp = express();
expressApp.use(cors());
const server = expressApp.listen(3000, () => {
  console.log('Server listening on port 3000');
});

expressApp.get('/', (req, res) => {
  res.send({text: 'Hello World!'});
});

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/angular/dist/angular/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  if (mainWindow === null) {
    createWindow();
  }
});
