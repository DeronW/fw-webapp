import Browser from './browser.js'
import NativeBridge from './native-bridge.js'


const PROTOCOL = location.protocol;

const LINKS = {
    '投资': {
        web: PROTOCOL + '//www.9888keji.com/prdClaims/list.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap',
        app: '投资'
    },
    '登录': {
        web: 'https://passport.9888keji.com/passport/login',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/orderuser/toLogin.shtml',
        app: '登录'
    },
    '注册': {
        web: 'https://www.9888keji.com/depository/regist/toRegist.shtml?sourceSite=jrgc',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/orderuser/toRegister.shtml?source=0',
        app: '注册'
    },
    '后退': {
        web: PROTOCOL + '//www.9888keji.com',
        mobile: PROTOCOL + '//m.9888.cn',
        app: '后退至首页'
    },
    '查看优惠券': {
        web: PROTOCOL + '//www.9888keji.com/beans/beanByUserIdList.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/newBeans/toReturnMoneyList.shtml?status=0',
        app: '优惠券'
    },
    '查看工豆': {
        web: PROTOCOL + '//www.9888keji.com/beans/list.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/newBeans/toBeansList.shtml',
        app: '用户工豆'
    },
    '查看红包': {
        web: PROTOCOL + '//www.9888keji.com/redPackage/redPackages.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/newBeans/toMyRedPackage.shtml',
        app: '红包'
    },
    '会员等级': {
        web: '',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/vipLevel/qryVipLevelMess.shtml',
        app: '用户等级'
    },
    '充值': {
        web: PROTOCOL + '//www.9888keji.com/payBill/recharges.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/orderuser/toRecharges.shtml',
        app: '充值'
    },
    '工场码': {
        web: PROTOCOL + '//www.9888keji.com/factoryCode/info.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/promotionCode/home.do',
        app: '工厂码'
    },
    '豆哥商城': {
        web: PROTOCOL + '//mall.9888.cn',
        mobile: PROTOCOL + '//mmall.9888.cn',
        app: '商城'
    },
    '工分': {
        web: PROTOCOL + '//www.9888keji.com/user/credit/creditDetail.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap/score/myScore.shtml',
        app: '工分'
    },
    '刮刮卡去投资': {
        web: PROTOCOL + '//www.9888keji.com/prdClaims/list.shtml',
        mobile: PROTOCOL + '//m.9888.cn/mpwap',
        app: '投资'
    }
}

/*
 给APP发消息
 */
function send2app(action, value) {
    switch (action) {
        case 'toNative':
            NativeBridge.toNative(value);
            break;
        case 'login':
            NativeBridge.login();
            break;
        case 'close':
            NativeBridge.close();
            break;
        case 'goto':
            NativeBridge.goto(value);
            break;
        case 'setTitle':
            NativeBridge.setTitle(value);
            break;
        default:
            console.log('not handle to native message', action, value)
    }
}

const TO_NATIVE_VALUE = {
    '注册': 'app_register',
    '投资': 'app_invest_immediately',
    '优惠券': 'app_coupon',
    '用户工豆': 'app_bean',
    '红包': 'app_red_package',
    '用户等级': 'app_vip_level',
    '充值': 'app_recharge',
    '工厂码': 'app_factory_barcode',
    '工分': 'app_scores',
    '升级攻略': 'app_upgrade_strategy',
    '贡献值': 'app_contribute_detail',
    '邀请返利': 'app_invite_interest'
};

const TO_NATIVE_ACTION = {
    '登录': 'login',
    '商城': 'gotoMall',
    '关闭页面': 'close',
    '显示后退按钮': 'show_back_button',
    '隐藏后退按钮': 'hide_back_button',
    '设置标题': 'set_title'
};

function tellApp(word, value) {
    if (TO_NATIVE_ACTION[word]) {
        word == '设置标题' ?
            send2app('setTitle', value) :
            send2app(TO_NATIVE_ACTION[word])
    } else if (TO_NATIVE_VALUE[word]) {
        send2app('toNative', TO_NATIVE_VALUE[word])
    } else {
        alert('ERROR: ' + word + ' not recognize with app message')
    }
}

export default (word, value) => {
    if (Browser.inJRGCApp) {
        tellApp(LINKS[word].app)
    } else {
        let link = Browser.inMobile ?
            LINKS[word].mobile :
            LINKS[word].web;

        if (word == '登录') link = `${LINKS[word].web}?service=${value}`

        location.href = link
    }
}
