@echo off


set SOURCE_DIR=%~dp0

echo %SOURCE_DIR
echo Current directory: %cd%
:: Copy the file
copy "%cd%\assets\js\cadesplugin_api.js" "%cd%\build\flutter_assets\assets\js\cadesplugin_api.js"
copy "%cd%\assets\js\crypto-pro.js" "%cd%\build\flutter_assets\assets\js\crypto-pro.js"
copy "%cd%\assets\js\test.js" "%cd%\build\flutter_assets\assets\js\test.js"


echo File copied successfully.
exit