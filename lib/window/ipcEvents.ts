import { type BrowserWindow, ipcMain, shell } from 'electron'

const handleIPC = (channel: string, handler: (...args: any[]) => void) => {
  ipcMain.handle(channel, handler)
}

export const registerWindowIPC = (mainWindow: BrowserWindow) => {
  // Hide the native menu bar
  mainWindow.setMenuBarVisibility(false)

  // Register window control IPC handlers
  handleIPC('window-minimize', () => mainWindow.minimize())
  handleIPC('window-maximize-toggle', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
    } else {
      mainWindow.maximize()
    }
  })
  handleIPC('window-close', () => mainWindow.close())

  // Register minimal IPC for development tools
  const webContents = mainWindow.webContents
  handleIPC('web-toggle-devtools', () => webContents.toggleDevTools())
  handleIPC('web-open-url', (_e, url) => shell.openExternal(url))
}
