# 项目运行所需 vscode 插件

为了保证项目的完整开发体验，你需要安装以下插件

- Tailwind Css Intellisense
- Prettier
- ESlint
- Stylelint
- Editorconfig for Vscode

> 其中 `Editorconfig` 插件旨在解决代码编码格式的问题

# 布局设计

在传统后台的基础上增加了一些细节。

1. 菜单栏的滚动条借由第三方库 `overlayscrollbars-react` 实现，使内容的滚动更加平滑。

> 该滚动条并未应用于全局，非原生会造成性能损失，所以仅在视觉感知影响较大的 Menu 组件中启用此方式。

2. 并未采用 `::-webkit-scrollbar` 来复写滚动条样式，因为是非标准，可见 MDN [::-webkit-scrollbar](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)。而是采用 `scrollbar-width` 仅对其宽度进行“瘦身”（可自定义程度为 0 ）。但是可以设置 `scrollbar-color` 来跟随主题改变滚动条颜色。

# 样式

集成了 `tailwindcss` `less` 和 `antd-style` 的 css in js 写法，与主题相关的样式由 `antd-style` 书写。
