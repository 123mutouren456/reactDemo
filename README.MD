# react 框架搭建ke

## 依赖环境
```
"axios": "^0.16.2",
"es3ify-webpack-plugin": "^0.0.1",
"es5-shim": "^4.5.9",
"export-from-ie8": "^1.0.5",
"react": "0.x.x",
"react-dom": "0.x.x",g
"react-redux": "^5.0.6",
"react-router-dom": "^4.2.2",
"redux": "^3.7.2",
"redux-thunk": "^2.2.0"
```

## 开发环境启动

1. `npm install`
2. `npm start`
3. 浏览器打开[http://localhost:8000](http://localhost:8000)

备注：如果要在局域网访问，请修改`package.json`-`start`命令，增加`--public 192.168.x.x`，后面为你的局域网`ip`。

## 生产环境部署

1. `npm run build`

2. 拷贝dist文件夹至服务器即可
