import { type BrowserWindow, ipcMain, shell } from 'electron'
import os from 'os'

const handleIPC = (channel: string, handler: (...args: any[]) => void) => {
  ipcMain.handle(channel, handler)
}

export const registerWindowIPC = (mainWindow: BrowserWindow) => {
  // Hide the native menu bar
  mainWindow.setMenuBarVisibility(false)
  
  // Register minimal IPC for development tools
  const webContents = mainWindow.webContents
  handleIPC('web-toggle-devtools', () => webContents.toggleDevTools())
  handleIPC('web-open-url', (_e, url) => shell.openExternal(url))
}
