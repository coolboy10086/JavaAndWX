# JavaAndWx
 基于java开发的小程序及公众号管理

## 项目简介
这是一个基于微信小程序的项目，主要功能包括商品浏览、购物车管理和用户信息管理。用户可以查看商品、添加到购物车、查看历史记录等。

## 项目结构
```
.
├── @components          # 组件目录
│   ├── product          # 商品组件
│   ├── mycomponent      # 自定义组件
│   └── statused         # 历史记录组件
├── @images              # 图片资源目录
├── @pages               # 页面目录
│   ├── cart             # 购物车页面
│   ├── index            # 首页
│   ├── logs             # 日志页面
│   ├── my               # 用户信息页面
│   └── statused         # 历史记录页面
├── @utils               # 工具函数目录
├── app.js               # 小程序入口文件
├── app.json             # 小程序配置文件
├── app.wxss             # 全局样式文件
├── .eslintrc.js         # ESLint 配置文件
├── project.config.json   # 项目配置文件
└── project.private.config.json # 项目私有配置文件
└── sitemap.json         # 小程序页面路径配置
```

### 详细说明

- **组件**:
  - **product**: 该组件用于展示商品信息，包括商品的图片、名称、价格等。用户可以通过点击按钮将商品添加到购物车。
  - **mycomponent**: 该组件用于展示购物车中的商品项，支持选择和数量调整。
  - **statused**: 该组件用于展示用户的历史记录，显示用户过去的购买记录。

- **页面**:
  - **index**: 首页包含一个轮播图和商品列表，商品信息通过 `wx:for` 循环动态生成。
  - **cart**: 购物车页面展示用户已添加的商品，用户可以选择商品并进行数量调整。
  - **my**: 用户信息页面提供用户注册和信息展示功能，用户可以查看和编辑个人信息。
  - **statused**: 历史记录页面展示用户的购买历史，用户可以查看过去的订单信息。

- **工具函数**:
  - **utils/util.js**: 包含一些常用的工具函数，例如时间格式化函数。

希望这些详细信息能帮助你更好地理解项目结构和功能！如果有其他问题，请随时问我。

## 主要文件说明

- **app.js**: 小程序的入口文件，包含小程序的生命周期函数和全局变量的定义。
- **app.json**: 小程序的全局配置文件，定义了页面路径、窗口样式、标签栏等。
- **app.wxss**: 全局样式文件，定义了小程序的整体样式。
- **.eslintrc.js**: ESLint 配置文件，用于代码风格检查。
- **project.config.json**: 项目的基本配置文件。
- **project.private.config.json**: 项目的私有配置文件，覆盖公共配置。
- **sitemap.json**: 小程序的页面路径配置文件。

## 组件
- **@components**: 存放可复用的组件，如商品组件、状态组件等。
  - **product**: 商品展示组件，包含商品的图片、名称、价格等信息。
  - **mycomponent**: 自定义组件，用于购物车项的展示。
  - **statused**: 用于展示用户的历史记录。

## 页面
- **@pages**: 存放小程序的各个页面，包括：
  - **index**: 首页，展示商品列表，包含商品的轮播图和商品信息。
  - **cart**: 购物车页面，管理用户的购物车，展示已添加的商品。
  - **my**: 用户信息页面，展示用户的个人信息和注册表单。
  - **statused**: 历史记录页面，展示用户的历史操作记录。
  - **logs**: 日志页面，展示日志信息。


