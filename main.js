const { app, BrowserWindow, ipcMain, remote, screen } = require('electron')
const path = require('path')

global.process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

function createWindow () {
    let mode = process.argv[1] === '.'

    const loadWin = new BrowserWindow({width: 800, height: 350, frame: false, transparent: true})
    loadWin.loadFile('./loading/loading.html').then(() => {
        loadWin.show();
    })

    let width = 1600
    let height = 1000
    try {
        width = screen.getAllDisplays()[0].size.width - 100
        height = screen.getAllDisplays()[0].size.height - 100
    } catch (error) {

    }

    const win = new BrowserWindow({
        width,
        height,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            sandbox: false,
            preload: path.join(__dirname, 'build/main.js'),
        }
    })

    win.hide()
    if (mode) {
        win.loadURL('http://localhost:5173').then(() => {
            win.show();
            loadWin.close();
            win.webContents.openDevTools()
        })
        console.log("dev mode......")
        ipcMain.once('initTodo', (event, port) => {
            console.log('ipcMain.once initTodo', port, mode)
        })
    } else {
        let preJsOver = false;
        let indexLoadOver = false;
        let initTodoOver = false;
        const showWin = () => {
            if (preJsOver && indexLoadOver && initTodoOver) {
                loadWin.close();
                win.show();
            }
        }
        ipcMain.once('initTodo', (event, port) => {
            console.log('ipcMain.once initTodo', port, mode)
            initTodoOver = true;
            showWin();
        })
        win.webContents.on('did-finish-load', () => {
            preJsOver = true;
            showWin()
        });
        win.loadFile('./static/index.html').then(() => {
            console.log("index.html load over")
            indexLoadOver = true;
            showWin()
        })
    }




}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('getPath', (event, arg) => {
    let path = app.getAppPath()
    if (path.endsWith('/Resources/app.asar')) {
        path = path.replace('/Resources/app.asar', '')
    } else if (path.endsWith('\\resources\\app.asar')) {
        path = path.replace('\\resources\\app.asar', '')
    }
    event.returnValue = path
})


