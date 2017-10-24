WebAPP
=========

## 金融工场 移动端项目代码库

**包含项目**:

* 豆哥商城
* 金融工场移动端
* 放心花
* 微云汽车保险
* 专题活动
* 工场管家

### API说明

#### 返回格式

#### 正确返回格式

    {
        "ret": true,
        "code": 10000,
        "message": "null",
        "data": {
            "total": 200,
            "next_cursor": '143123123341',
            "products": [
                {
                    "name": 'NAME', 
                    "tag": ['hot', 'new', 'sales']
                }
            ]
        }
    }

#### 错误返回值格式

    JSON
    {
        "code" : 40101,
        "message" : "need login",
        "data": null,
        "ret": false
    }


### 错误码

错误码为5位数字

*系统级错误代码*
- 10000 正常
- 10001 系统错误
- 10002 服务暂停
- 10003 任务过多，系统繁忙
- 10004 任务超时
- 10100 接口不存在
- 10102 请求的HTTP METHOD不支持，请检查是否选择了正确的POST/GET方式
- 10103 缺失必选参数 (%s)，请参考API文档
- 10104 参数 (%s)类型不正确，请参考API文档


*服务级错误代码*
- 40101 用户未登录
- 40102 用户无权限
- 40301 产品库存不足
- 待补充...

*服务异常*
- 50000 系统异常
- 50001 等级系统异常

*验证错误码*

- 60101 短信验证码不存在
- 60102 短信验证码不正确
- 60103 短信验证码已过期

- 60201 支付失败...

- 603xx 市场专题活动相关错误码


### 环境配置

安装 Node.js

    https://nodejs.org/en/download/

安装 Git

    下载Git， https://git-scm.com/downloads

配置项目开发环境

1. 安装项目的依赖库 *npm install*
2. 查看全部可用 gulp 指令： *npm run gulp*

常用指令说明：

    clean 清空生成的打包文件
    build:mall 构建豆哥商城项目
    build:main 构建移动端网站项目
    [project]:xxx:watch 开发时使用的监控指令
    [project]:xxx 一次性编译文件指令

添加新页面：

1. 在 *apps* 目录下创建新目录，目录结构参考其它目录
2. 在 *gulp/tasks/mall.js* 文件内,给 *apps* 变量添加一行新数据, 字符串, 跟新建目录同名
3. 查看 gulp 默认指令, 已经新添加了新页面的指令

本地启动项目

商城：npm run gulp mall:[文件名]:watch
wap站：npm run gulp wap是扥:[文件名]:watch
放心花：npm run gulp loan:[文件名]:watch


## 金融工场前端组开发及发布流程

### 标准流程

1. 请在各个项目的master分支当中进行开发，推送到远程仓库之前记得拉取线上最新代码。
2. 在测试Jenkins上编译master分支代码，在测试环境测试相关功能。
3. 如果功能尚未完善或者JIRA上还有当前项目的相关BUG，持续以上两步。
4. 测试环境通过测试之后，把代码合并到相关项目的release分支，推送到远程仓库。
5. 在发布Jenkins上编译release分支的代码。

### 应急流程

1. 请在各个项目的release分支中进行开发，推送到远程仓库之前记得拉取线上最新代码。
2. 在测试Jenkins上编译release分支代码，在测试环境测试相关功能。
3. 测试通过以后在发布Jenkins上编译release分支的代码。


## 项目目录结果说明
- apps
- public
- scripts
    - clean.js 清除上次编译结果文件
    - gen-differential-compile-cmd.js 检查当前分支与git仓库远程分支的文件差异, 并生成差量编译脚本
    - webpack.config.js
- tasks
- gulpfiles
    - loan.js
    - mall.js
    - wap.js
    - settings.default.js
- .editorconfig
- .eslintrc
- .gitignore
- gulpfile.js
- Jenkinsfile
- package.json
- README.md // 项目说明