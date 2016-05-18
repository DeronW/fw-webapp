WebAPP
=========
# 金融工场 移动端商城

**用途**:

嵌入到APP的商城系统

###

### RESTful接口

#### URL

http://m.mall.9888.cn/mall/api/v1/products.json

#### 支持格式

JSON

#### HTTP请求方式

POST

#### 是否需要登录

是

#### 请求参数

    cursor  字符串,    非必填,    默认起始位置, 游标位置,本次数据从这个游标开始获取数据
    filter  过滤条件,   非必填,    默认不过滤,  筛选某一种类产品


#### 注意事项

需要通过游标, 标记下拉刷新商品的位置

#### 正确返回格式

    {
        "ret": true,
        "code": 10000,
        "message": null,
        "data": {
            "total": 200,
            "next_cursor": '143123123341',
            "products": [
                {
                    "name": 'NAME',
                    "market_price": 2300,
                    "sold_price": 999,
                    "stock": 20,
                    "desc": 'many text',
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


*验证错误码*

- 60101 短信验证码不存在
- 60102 短信验证码不正确
- 60103 短信验证码已过期

- 60201 支付失败...

- 603xx 市场专题活动相关错误码

### APP和Native消息互传

#### webview给native发消息

消息格式:

    {
        action: "",
        value: ""
    }

action 消息指令

value 消息格式

#### 发给Native例子

去登录

    {
        action: "login"
    }

登录后跳转到商城页面

    {
        action: "login",
        value: "url"
    }

跳转到指定页面页面

    {
        action: "goto",
        value: "url"
    }

关闭当前页面

    {
        action: "close"
    }

显示后退按钮

    {
        action: "show_back_button"
    }

隐藏后退按钮

    {
        action: "hide_back_button"
    }

显示关闭按钮

    {
        action: "show_close_button"
    }

隐藏关闭按钮

    {
        action: "hide_close_button"
    }

设置标题

    {
        action: "set_title",
        value: "xxx"
    }

#### 发给webview

后退消息

  "history:back"


#### native给webview发消息

调用全局的js方法

设置网页标题
NativeBridge.setTitle('new title')

设置登录用的token

onNativeMessageReceive('login_token', 'params')


### url定义

商城首页 [http://m.mall.9888.cn](http://m.mall.9888.cn)

专题活动页 [http://m.mall.9888.cn/activity](http://m.mall.9888.cn/activity)

VIP专区页 [http://m.mall.9888.cn/product-vip](http://m.mall.9888.cn/product-vip)

商品列表页 [http://m.mall.9888.cn/products](http://m.mall.9888.cn/products)

商品详情页 [http://m.mall.9888.cn/product?bizNo=id](http://m.mall.9888.cn/product/bizNo=[uid])

确认订单页 [http://m.mall.9888.cn/order/confirm](http://m.mall.9888.cn/order/confirm)

交易成功页 [http://m.mall.9888.cn/order/complete](http://m.mall.9888.cn/order/complete)

我的订单页 [http://m.mall.9888.cn/order/mine](http://m.mall.9888.cn/order/mine)

订单详情页 [http://m.mall.9888.cn/order?bizNo=id](http://m.mall.9888.cn/order/bizNo=id)

我的商城页 [http://m.mall.9888.cn/user](http://m.mall.9888.cn/user)

收货地址列表页 [http://m.mall.9888.cn/delivery_address](http://m.mall.9888.cn/delivery_address)

新建收货地址页 [http://m.mall.9888.cn/delivery_address/create](http://m.mall.9888.cn/delivery_address/create)


### 环境配置

安装 Node.js

1. 下载bin包 https://nodejs.org/en/
2. 安装后配置path（环境变量）

安装 Git

1. 下载Git， https://git-scm.com/downloads
2. 查看安装帮助文档， https://help.github.com/articles/set-up-git/
3. 配置Git后 clone 项目，项目地址： http://10.10.100.105/web/webapp

配置项目开发环境

1. 安装Node.js库，在项目根目录下执行 *npm install*
2. 查看全部可用 gulp 指令： *node node_modules/gulp/bin/gulp.js*

常用指令说明：

    clean 清空生成的打包文件
    build:mall 构建豆哥商城项目
    xxx:watch 开发时使用的监控指令
    xxx 一次性编译文件指令

添加新页面：

1. 在 *apps* 目录下创建新目录，目录结构参考其它目录
2. 在 *gulp/tasks/mall.js* 文件内,给 *apps* 变量添加一行新数据, 字符串, 跟新建目录同名
3. 查看 gulp 默认指令, 已经新添加了新页面的指令

测试添加1
测试添加2
测试添加3
测试111添加4