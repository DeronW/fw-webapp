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


### APP消息互传

#### webview给native发消息

全部字母小写,
第一个参数固定为all,
第二个参数是动作关键字,
第三个参数是动作参数

消息格式:

  keywork[:params]

例子:

去登录

login

登录后跳转到商城页面

login:mall

后退页面

backward

backward:level

关闭当前页面

close

close:next_view

显示后退按钮

show_back_button

隐藏后退按钮

hide_back_button

显示关闭按钮

show_close_button

隐藏关闭按钮

hide_close_button

页面加载动画

显示

loading:show_cover

隐藏

loading:hide_cover

加载完成

loading:complete

设置标题

set_title:[xxx]

#### native给webview发消息

调用全局的js方法

onNativeMessageReceive('action', 'params')

设置登录用的token 

onNativeMessageReceive('login_token', 'params')


### url定义

商城首页 [http://m.mall.9888.cn](http://m.mall.9888.cn)

专题活动页 [http://m.mall.9888.cn/activity](http://m.mall.9888.cn/activity)

VIP专区页 [http://m.mall.9888.cn/vip](http://m.mall.9888.cn/vip)

商品列表页 [http://m.mall.9888.cn/products](http://m.mall.9888.cn/products)

商品详情页 [http://m.mall.9888.cn/product/uid](http://m.mall.9888.cn/product/[uid])

确认订单页 [http://m.mall.9888.cn/order/confirm](http://m.mall.9888.cn/order/confirm)

交易成功页 [http://m.mall.9888.cn/order/complete](http://m.mall.9888.cn/order/complete)

我的订单页 [http://m.mall.9888.cn/order/mine](http://m.mall.9888.cn/order/mine)

订单详情页 [http://m.mall.9888.cn/order/uid](http://m.mall.9888.cn/order/uid)

我的商城页 [http://m.mall.9888.cn/user](http://m.mall.9888.cn/user)

收货地址列表页 [http://m.mall.9888.cn/delivery_address](http://m.mall.9888.cn/delivery_address)

新建收货地址页 [http://m.mall.9888.cn/delivery_address/create](http://m.mall.9888.cn/delivery_address/create)

