import React from 'react'
import CSSModules from 'react-css-modules'
import { observer, inject } from 'mobx-react'

import { Header } from '../../components'
import styles from '../../css/features/about-us.css'


@CSSModules(styles, {
    allowMultiple: true,
    errorWhenNotFound: false
})
class AboutUs extends React.Component {

    render() {
        return <div styleName="bg">
            <Header noClose title="关于我们" history={this.props.history} />

            <div styleName="title">平台简介</div>
            <div styleName="desc">
                <div>
                    金融工场是由香港上市公司——中国信贷科技控股有限公司（Credit China，股票代码：08207.HK）战略控股，由北京凤凰信用管理有限公司（简称：凤凰信用）倾力打造的，专注于网络借贷信息撮合的互联网金融平台。金融工场致力于通过专业高效的投融资咨询服务，解决企业、个人融资门槛高、融资渠道少、融资速度慢等难题；为资金闲置、有投资需求的投资者提供精选的优质信贷资产。平台基于不同类型用户群体、需求特征与收益预期，打造多样化在线投资产品以及特色化的资金出借咨询服务。 </div>
                <img src={require("../../images/features/about-us/part2.jpg")} width="720" height="auto" />
            </div>


            <div styleName="title">客服电话</div>
            <div styleName="desc">
                <a href="tel:400-0322-988">400-0322-988</a>
                周一至周日 9:00-18:00 </div>
            <div styleName="title">公司地址</div>
            <div styleName="desc"> 北京市朝阳区朝阳门外大街18号11层1105内008号</div>

            <div styleName="footer">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <a href='https://www.9888.cn/top/index.do?pc=1'>PC首页</a>
                            </td>
                            <td>
                                <a href='https://bbs.9888.cn'>工友之家</a>
                            </td>
                            <td>
                                <a href="/static/wap/app-download/index.html">下载App</a>
                            </td>
                            <td>
                                <a href="/static/wap/about-us/index.html">关于我们</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div styleName="copyright">©2016 金融工场版权所有</div>
                <div styleName="copyright">北京凤凰信用管理有限公司</div>
            </div>

            <a styleName="app-download-link" href="/static/wap/app-download/index.html">
                <img src={require("../../images/features/about-us/ico-loadapp.png")} />
            </a>
        </div>
    }
}

export default AboutUs