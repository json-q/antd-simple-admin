# 项目运行所需 vscode 插件

为了保证项目的完整开发体验，你需要安装以下插件

- Tailwind Css Intellisense
- Prettier
- ESlint
- Stylelint
- Editorconfig for Vscode

> 其中 `Editorconfig` 插件旨在解决代码编码格式的问题

# 布局设计

部分交互参考 antd design pro，并在其基础上增加了一些细节。

- 侧边栏滚动条借由第三方库 `overlayscrollbars-react` 实现，使滚动条的显示效果更加平滑。
  > 该滚动条并未应用于全局，非原生会造成性能损失，所以仅在视觉感知影响较大的 Sider 组件中启用此方式。

# 样式

集成了 `tailwindcss` `less` 和 `antd-style` 的 css in js 写法，与主题相关的样式由 `antd-style` 书写。

# Mock

采用 `vite-plugin-fake-server` 结合 `@faker-js/faker` 模拟数据请求

> 为什么不使用 `vite-plugin-mock` + `mockjs`。详见：vite-plugin-mock [issue](https://github.com/vbenjs/vite-plugin-mock/issues/127)，且 `@faker-js/faker` 上手成本比 `mockjs` 更低。
