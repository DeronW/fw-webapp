import React from 'react'
import CSSModules from 'react-css-modules'
import {observer, inject} from 'mobx-react'
import styles from '../../css/reserve/protocol.css'
import Header from '../../components/header'

@CSSModules(styles, {"allowMultiple": true, "errorWhenNotFound": false})
class ReserveProtocol extends React.Component {
    render() {
        return <div styleName="protocol-box">
            <Header title="预约出借服务协议" history={history} show_close={false}/>
            <div>
                <div styleName="number">编号：【】</div>
                <div styleName="bold">甲方：</div>
                <div>工场微金用户名：</div>
                <div>证件类型：</div>
                <div>证件号码：</div>
                <div styleName="bold">乙方： 北京凤凰信用管理有限公司</div>
                <div>地址：</div>

                <div>
                    乙方是工场微金平台（网址：www.gongchangp2p.cn）的运营主体。甲方是工场微金平台的合法注册用户。甲方拟通过乙方平台的预约出借服务完成资金出借，为保障协议相关方的合法权益，双方约定如下：
                </div>
                <div styleName="bold"> 一．预约出借服务规则</div>
                <div>1、预约出借服务是指乙方根据甲方授权并根据甲方自行选择确认的预约出借标的、预约标的期限、预约有效期、预约出借金额等信息，为甲方提供的可通过平台系统实现自动出借功能的服务。</div>
                <div>2、甲方使用预约出借服务前应确保已开通电子签章功能和已开立乙方合作存管银行电子存管账户，并确保电子存管账户可用金额不小于预约出借金额。</div>
                <div>3、甲方可通过平台自行选择预约有效期，预约有效期选择范围以平台展示的可选期限为准。乙方在预约有效期内通过系统自动为甲方进行出借匹配操作。</div>
                <div>4、预约出借最小金额为人民币100元，预约出借最高限额以乙方根据借款项目情况设定为准。</div>
                <div>5、预约出借标的情况（包括但不限于借款人情况、借款期限、借款利率等）以乙方平台展示为准，甲方可自行选择，乙方在甲方选择标的范围内通过系统为甲方自动匹配出借标的。</div>
                <div>6、甲方可对预约标的进行多次预约。预约成功后两小时内，甲方不可取消预约，两小时后至预约出借资金成功出借前，对于尚未完成出借的预约出借资金，甲方可随时取消预约，已完成出借部分资金则不可撤销。
                </div>
                <div>7、预约结束包括预约有效期到期、实际出借金额达到预约出借金额及甲方按照平台规则自动取消预约。预约结束后，甲方可再次申请预约。</div>
                <div styleName="bold">二．授权条款</div>
                <div>1、预约成功后，甲方授权乙方指示其合作的存管银行冻结甲方电子存管账户中与预约出借金额等额的资金。该冻结资金在预约有效期内至成功出借前不计息。</div>
                <div>
                    2、如甲方预约时其电子存管银行账户可用金额小于预约出借金额，以差额部分资金为限，甲方不可撤销地同意并授权乙方合作方指示存管银行从甲方在乙方合作方平台开立的电子存管账户中将差额部分资金划转至甲方在乙方平台开立的电子存管账户中并对该划转资金进行冻结。
                </div>
                <div>
                    3、预约成功后，甲方授权乙方按照预约出借服务规则通过乙方系统自动匹配出借项目完成资金出借。甲方预约出借时应一并对乙方平台向甲方展示的出借项目相关协议进行确认。甲方授权乙方通过系统对甲方确认完毕的出借项目相关协议文本以电子签章方式进行签署。甲方对此等签署方式无任何异议，认可其法律效力。
                </div>
                <div>4、预约结束后，对于已冻结的未完成出借的资金，甲方授权乙方指令其合作的存管银行解冻该部分资金，并将该部分资金存管于甲方在乙方平台开立的电子存管账户中，甲方可自行支配。</div>
                <div styleName="bold">三．其他</div>
                <div>1、本协议有效期自本协议生效之日起至预约结束之日止。</div>
                <div>2、本协议由甲方在乙方平台通过在线点击方式确认，以电子签章方式签署。</div>
                <div>3、乙方平台发布的与本协议有关的其他规则是本协议的组成部分，与本协议具有同等法律效力。（以下无正文）</div>
                <div styleName="signature-left">
                    <div>甲方（签章）：</div>
                    <div>日期：</div>
                </div>
                <div styleName="signature-right">
                    <div>乙方（签章）：</div>
                    <div>日期：</div>
                </div>
            </div>
        </div>
    }
}

export default ReserveProtocol