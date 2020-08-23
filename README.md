# 六博出土位置考

liubo

## 准备工作

出土[六博](https://zh.wikipedia.org/wiki/%E5%85%AD%E5%8D%9A)出土的地点与年代可视化。

<del>发现这是本弱鸡第一次写网站，收集资料后决定用 Mapbox。</del>

- 主页
  - 地图
  - 滚动条
  - 更多信息
- 长文页面（参考各种 storytelling skills）

## Usage

```javascript
// 根目录新建 config.js
const config = {
  accessToken: "YOUR_MAPBOX_ACCESS_TOKEN",
};

export { config };
```

```shell
# 安装npm依赖
npm install
# webpack打包（生产环境）
npm run build
```
