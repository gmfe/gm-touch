# gm-touch

## 描述

gm-touch是一个UI组件库，用于运行在触屏设备的项目中，包括新架构和老架构的工位屏系统。

项目主要使用了React + Mobx + Javascript技术栈，通过lerna和yarn进行引入库和命令行的管理，并使用npm进行版本管理并发布在npm上。

除了gm-touch外，gmfe中还有其他类型的UI组件库，如[老架构组件库gmfe](https://github.com/gmfe/gmfe)，[新架构组件库gm-pc](https://github.com/gmfe/gm-pc)，[移动端组件库gm-mobile](https://github.com/gmfe/gm-mobile)等。

## 预安装

- [NodeJS](https://nodejs.org/en/)
- [yarn](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/download)（推荐）

## 安装

1. 打开你想安装的目录

2. 在目录下打开Terminal（MacOS）或Command Prompt（Windows）或Virtual Console（Linux）

3. 下载代码到本地目录，如果无法下载，可能是因为没有相关权限，请找相关人员解决
    ```sh
    git clone git@github.com:gmfe/gm-touch.git
    ```
4. 通过VSCode打开项目并打开终端

5. 安装所有依赖
    ```sh
    yarn
    ```

6. 配置依赖
   ```sh
   lerna bootstrap
   ```
   说实话我也不知道为什么要这么做，但是不这么做的话编译时会报错，提示缺少某些依赖

7. 启动项目
    ```sh
    yarn start
    ```
    成功后浏览器会自动弹出页面，如果没有弹出，可以在[这里](http://localhost:57003/)查看，内容是生成的文档

## 版本发布

由于该项目是一个为其他项目服务的库，所以需要发布版本来更好地维护

1. 首先确保当前分支的所有代码已commit并推到的远程分支

2. 在项目中打开终端，建议使用VSCode

3. 在`npm`上登录，如果曾经登录过可以忽略此步骤
    ```sh
    npm login
    ```
    之后输入用户名密码邮箱进行登录
    可以通过
    ```sh
    npm whoami
    ```
    查看登录状态和账户，需要使用特定账号才可以登录，否则无法发布版本

4. gm-touch使用的是lerna而非npm进行发版的操作，其他UI组件库大多也是使用lerna，它们的操作十分类似
    ```sh
    yarn publish-beta
    或
    yarn publish-latest
    ```
    前者为测试版，后者为最终版，根据需要执行对应的指令

5. 选择`Custom Version`并输入自定义的版本号

6. 输入`y`继续并等待版本发布完成

7. 发布完成后可以看到项目中`package.json`中的`version`并没有改变，那是因为实际上并不是发这个项目的版本，而是它下面的几个子项目

8. 进入`/package/任意文件夹/package.json`，可以看到里面的`version`已经变成了刚刚发布的版本

9. 注意：在你的版本末尾添加 beta.0 非常重要。.0 表示它是哪个版本。当我们对 beta 版进行修补发布新的 beta 版本时，我们会将 .0 递增到 .1，以此类推

## 样式

前缀 .t-xxx， t 表示 touch

css 变量都在 variable.less，未来提供主题自定义
