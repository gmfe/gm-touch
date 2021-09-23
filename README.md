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

1. 首先在项目中打开终端并切换到`npm`的环境

2. 在`npm`上登录，如果曾经登录过可以忽略此步骤
    ```sh
    npm login
    ```
    之后输入用户名密码邮箱进行登录
    可以通过
    ```sh
    npm whoami
    ```
    查看登录状态和账户，需要使用特定账号才可以登录，否则无法发布版本

3. beta 版本包的版本发布(用来测试该版本，解决该版本的 bug)

    (1) 更改`pageage.json`中的版本，手动更改
    ```json
    {
      "name": "gm-touch",
      "version": "X.X.X-beta.0",
      ...
    }
    ```
    或者通过终端
    ```sh
    npm version X.X.X-beta.0
    ```
    同时创建一个 git 标签 (请参考 https://docs.npmjs.com/cli/version)。在你的版本末尾添加 beta.0 非常重要。.0 表示它是哪个版本。当我们对 beta 版进行修补发布新的 beta 版本时，我们会将 .0 递增到 .1，以此类推。

    (2) ⚠️ 将该版本的包 push 到远程仓库

    (3) 发布测试版本
    ```sh
    npm publish --tag beta
    ```

    (4) 对版本进行修补时，只需要将beta.0递增到beta.1进行版本发布即可，以此类推

4. 正式版本的发布

    (1) 遵循上面的版本命名规则，修改`pageage.json`中的`version`版本号，或者运行 npm version X.X.X来更新package.json，同时创建一个 git 标签

    (2) ⚠️ 将正式版本 push 到远程仓库

    (3) 使用npm publish发布正式版本

    (4) 在自己的分支上进行发布版本即可，发完后，将分支合并到 master 上！！！


# css

前缀 .t-xxx， t 表示 touch

css 变量都在 variable.less，未来提供主题自定义
