# 项目运行所需 vscode 插件

为了保证项目的完整开发体验，你需要安装以下插件

- Tailwind Css Intellisense
- Prettier
- ESlint
- Stylelint
- Editorconfig for Vscode

> 其中 `Editorconfig` 插件旨在解决代码编码格式的问题

# 布局设计

UI 参考

- Ant Design Pro
- vben admin

- 侧边栏滚动条使用 `overlayscrollbars-react` 实现，使滚动条的显示效果更加平滑。
  - 非原生会造成性能损失，所以仅在视觉感知影响较大的 Sider 组件中使用此组件。

# 动态主题

由 `antd-style` 实现，更易控制 antd 主题和统一主题样式。

# 样式

集成了 `tailwindcss` 和 `antd-style` 的 cssinjs 写法，与主题相关的样式推荐使用 cssinjs 书写。

# Mock

采用 `vite-plugin-fake-server` 结合 `@faker-js/faker` 模拟数据请求，所有请求都延迟 1.5s 来模拟低网速下可能潜在的问题。

> 为什么不使用 `vite-plugin-mock` + `mockjs`。详见：vite-plugin-mock [issue](https://github.com/vbenjs/vite-plugin-mock/issues/127)，且 `@faker-js/faker` 上手成本比 `mockjs` 更低。

# 计划

- [x] 重构路由的配置方式，使用 `RouterProvider` 重构
- [x] 重构面包屑配置方式
- [x] 动态主题切换
- [x] 全局页面搜索
- [ ] 通知栏简单示例
- [ ] 国际化
