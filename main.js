const { app, BrowserView, BrowserWindow } = require('electron')

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1600,
    height: 800,
    webPreferences: {
      nodeIntegration: false
    }
  })

  let leftView = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  })

  let rightView = new BrowserView({
    webPreferences: {
      nodeIntegration: false
    }
  })

  win.addBrowserView(leftView)
  leftView.setBounds({ x: 0, y: 0, width: 800, height: 800 })
  leftView.setAutoResize({width: true, height: true, horizontal: true, vertical: true})

  win.addBrowserView(rightView)
  rightView.setBounds({ x: 800, y: 0, width: 800, height: 800 })
  rightView.setAutoResize({width: true, height: true, horizontal: true, vertical: true})

  const url = "https://github.com/";
  leftView.webContents.loadURL(url)
  rightView.webContents.loadURL(url)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
