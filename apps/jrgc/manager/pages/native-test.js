import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'
import { NativeBridge,Browser }  from '../helpers'

function gotoHandler(link){
    if (link.indexOf('://') < 0) {
        link = location.protocol + '//' + location.hostname + link;
    }
    if (Browser.inApp) {
        NativeBridge.trigger('goto',link)
    } else {
        location.href = encodeURI(link);
    }
}
class Test extends React.Component {
    shareHandler = ()=> {
        // NativeBridge.share({
        //     title: '快去注册！金融工场免费赠送200元投资礼包啦！',
        //     image: 'https://static.9888.cn/images/manager/share.jpg',
        //     link: `https://m.9888.cn/mpwap/orderuser/toRegister.shtml?gcm=123456`,
        //     desc: '金融工场-中国领先的综合金融信息服务平台，回款提现免手续费。'
        // })

        window.NNN = NativeBridge

        NativeBridge.trigger('share', JSON.stringify({
            title: '快去注册！金融工场免费赠送200元投资礼包啦！',
            image: 'https://static.9888.cn/images/manager/share.jpg',
            link: `https://m.9888.cn/mpwap/orderuser/toRegister.shtml?gcm=123456`,
            desc: '金融工场-中国领先的综合金融信息服务平台，回款提现免手续费。'
        }), true)
    }
    gotoUrl = () => {
        gotoHandler('https://www.baidu.com/')
    }
    render() {
        return <div>
            <button style={{width:'300px',height:'300px'}} onClick={this.shareHandler}>邀请分享</button>
            <button style={{width:'300px',height:'300px'}} onClick={this.gotoUrl}>跳转</button>
        </div>

    }
}
export default Test