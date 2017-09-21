import React from 'react'
import CSSModules from 'react-css-modules'
import { Header } from '../../../lib/components'

import styles from '../../css/protocols/partner.css'

@CSSModules(styles, { "allowMultiple": true, "errorWhenNotFound": false })
export default class Partner extends React.Component {

    componentDidMount() {
        document.title = '借款确认书'
    }
    render() {
        let { history } = this.props;
        return <div styleName="bg">
            <Header title="借款确认书" history={history} />
            <div styleName="protocol-article">
                <div style={{ textAlign: 'left', textIndent: '0' }}>致深圳市众利财富管理有限公司：</div>
                <div>本人为贵司经营的放心花平台的注册用户，有借款的需求，经过贵司平台审核，我同意通过贵司平台向贵平台推荐的出借人借款，并保证按期归还本金及利息。本人确认本人的借款基本信息如下：</div>
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td colspan="2" style={{ textAlign: "center" }}>
                                借款基本信息
                            </td>
                        </tr>
                        <tr>
                            <td styleName="td-title">借款本金数额（人民币）：</td>
                            <td width="">￥0.00</td>
                        </tr>
                        <tr>
                            <td>实际打款金额：</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>逾期账户管理费</td>
                            <td>1%</td>
                        </tr>
                        <tr>
                            <td>借款期限</td>
                            <td>21</td>
                        </tr>
                        <tr>
                            <td>每日罚息费率</td>
                            <td>0.5% - 0.85%   (最高100%封顶）</td>
                        </tr>
                        <tr>
                            <td>还款日</td>
                            <td>  年    月   日</td>
                        </tr>
                        <tr>
                            <td>币种</td>
                            <td>人民币</td>
                        </tr>
                        <tr>
                            <td>利息利率</td>
                            <td>1.08%</td>
                        </tr>
                        <tr>
                            <td>账户管理费</td>
                            <td>0.8%</td>
                        </tr>
                        <tr>
                            <td>快速信审费</td>
                            <td>1.72%</td>
                        </tr>
                        <tr>
                            <td>代收支付通道费</td>
                            <td>0.7%</td>
                        </tr>
                        <tr>
                            <td>质保服务专款</td>
                            <td>1.7%</td>
                        </tr>
                        <tr>
                            <td>用途</td>
                            <td>消费</td>
                        </tr>
                        <tr>
                            <td>借款人收款银行账户</td>
                            <td>
                                账户名：<br />
                                开户行：<br />
                                银行账户：
                            </td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <div>本人通过贵司放心花平台线上点击确认此借款确认书，视为本人已明确并确认以上借款的基本信息，且本人同意并授权贵司及贵司受托人代本人与出借人等签署相应的借款及相关协议。本授权为一次性、不可撤销的授权。</div>
                <br />
                <div styleName="item-end">借款确认人：<span></span></div>
                <div styleName="item-end">身份证号：<span></span></div>
                <div styleName="item-end">手机号：<span></span></div>
                <div styleName="item-end">日期：<span>年月日</span></div>
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>
        </div>
    }
}