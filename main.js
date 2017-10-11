"use strct";

//Electronのモジュール
const electron = require("electron");

//アプリケーションをコントロールするモジュール
const app = electron.app;

//ウィンドウを作成するモジュール
const BrowserWindow = electron.BrowserWindow;

//メインウィンドウはGCされないようにグローバル宣言
let mainWindow = null;

//すべてのウィンドウが閉じたら終了
app.on("window-all-closed", () => {
	if(process.platform != "darwin") {
		app.quit();
	}
});

//Electronの初期化完了後に実行
app.on("ready", () => {
  //ウィンドウサイズを1280*720（フレームサイズを含まない）に設定する
  mainWindow = new BrowserWindow({width: 1280, height: 720, useContentSize: true});
  //使用するhtmlファイルを指定する
  mainWindow.loadURL(`file://${__dirname}/index.html`);

 // デバッグツールを起動（開発中のみ必要な機能）
  mainWindow.webContents.openDevTools();

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
});