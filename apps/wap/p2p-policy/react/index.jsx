class PolicyBox extends React.Component {
    render() {
        let fl = [{ text: "1.中华人民共和国网络安全法", url: "https://m.9888.cn/static/wap/p2p-pdf/index.html?file=1.中华人民共和国网络安全法.pdf" },
        { text: "2.中华人民共和国广告法", url: "https://m.9888.cn/static/wap/p2p-pdf/index.html?file=2.中华人民共和国广告法.pdf" }, {
            text: "3.中华人民共和国电子签名法",
            url: "3"
        }, { text: "4.中国人民共和国反洗钱法", url: "4" }, {
            text: "5.央行等十部委《关于促进互联网金融健康发展的指导意见》",
            url: "5"
        }, { text: "6.网络借贷信息中介机构业务活s动管理暂行办法", url: "6" }, {
            text: "7.国务院办公厅互联网金融风险专项整治工作实施方案",
            url: "7"
        }, { text: "8.通过互联网开展资产管理及跨界从事金融业务风险专项整治工作实施方案", url: "8" }, {
            text: "9.工商总局等开展互联网金融广告及以投资理财名义从事金融活动风险专项整治工作实施方案",
            url: "9"
        },
        { text: "10.北京市互联网金融风险专项整治工作实施方案", url: "10" },
        {
            text: "11-1.中国互联网金融协会信息披露自律管理规范",
            url: "11-1"
        }, { text: "11-2.中国互联网金融信息披露标准：个人网络借贷", url: "11-2" }, {
            text: "12.P2P网络借贷风险专项整治工作实施方案",
            url: "12"
        }, { text: "13.网络借贷资金存管业务指引（正式版）", url: "13" }]
        let flmap = (item, index) => {
            return <div className="policy-link" key={index}>
                <a target="_blank" type="application/pdf" href={item.url} className="link-detail">{item.text}</a>
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
        ReactDOM.render(<Header title={'政策法规'} />, HEADER_NODE);
    }
    ReactDOM.render(<PolicyBox />, CONTENT_NODE)
});


