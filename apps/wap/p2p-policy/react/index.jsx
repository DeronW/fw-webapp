class PolicyBox extends React.Component {
    render() {
        let base_url= "https://m.9888.cn/static/wap/p2p-pdf/index.html?file=";
        let policy_list = [
            "1.中华人民共和国网络安全法",
            "2.中华人民共和国广告法",
            "3.中华人民共和国电子签名法",
            "4.中国人民共和国反洗钱法",
            "5.央行等十部委《关于促进互联网金融健康发展的指导意见》",
            "6.网络借贷信息中介机构业务活动管理暂行办法",
            "7.国务院办公厅互联网金融风险专项整治工作实施方案",
            "8.通过互联网开展资产管理及跨界从事金融业务风险专项整治工作实施方案",
            "9.工商总局等开展互联网金融广告及以投资理财名义从事金融活动风险专项整治工作实施方案",
            "10.北京市互联网金融风险专项整治工作实施方案",
            "11-1.中国互联网金融协会信息披露自律管理规范",
            "11-2.中国互联网金融信息披露标准：个人网络借贷",
            "12.P2P网络借贷风险专项整治工作实施方案",
            "13.网络借贷资金存管业务指引（正式版）",
           ]
        let policy_list_method = (item, index) => {
            return <div className="policy-link" key={index}>
                <a target="_blank" type="application/pdf" href={base_url+item+'.pdf'}
                    className="link-detail">{item}</a>
            </div>
        }
        return <div className="policy-box">
            <div className="line"></div>
            {policy_list.map(policy_list_method)}
        </div>
    }
}
$FW.DOMReady(function () {
    if (!$FW.Browser.inApp()) {
        ReactDOM.render(<Header title={'政策法规'}/>, HEADER_NODE);
    }
    ReactDOM.render(<PolicyBox />, CONTENT_NODE)
});


