class PolicyBox extends React.Component {
    render() {
        let fl = [{text:"1.中华人民共和国网络安全法",url:"1"}, {text:"2.中华人民共和国广告法",url:"2"}, {text:"3.中华人民共和国电子签名法",url:"3"}, {text:"4.中国人民共和国反洗钱法",url:"4"}, {text:"5.央行等十部委《关于促进互联网金融健康发展的指导意见》",url:"5"}, {text:"6.网络借贷信息中介机构业务活动管理暂行办法",url:"6"}, {text:"7.国务院办公厅互联网金融风险专项整治工作实施方案",url:"7"}, {text:"8.中华人民共和国电子签名法",url:"8"}, {text:"9.中华人民共和国电子签名法",url:"9"}, {text:"10.中华人民共和国电子签名法",url:"10"}, {text:"11.中华人民共和国电子签名法",url:"11"}, {text:"12.中华人民共和国电子签名法",url:"12"}, {text:"13.中华人民共和国电子签名法",url:"13"}]
        let flmap = (item, index) => {
            return <div className="policy-link">
                <a href={item.url} className="link-detail">{item.text}</a>
            </div>
        }
        return <div className="policy-box">
            <div className="line"></div>
            {fl.map(flmap)}
        </div>
    }
}
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'政策法规'}/>, HEADER_NODE);
    }
    ReactDOM.render(<PolicyBox />, CONTENT_NODE)
});
