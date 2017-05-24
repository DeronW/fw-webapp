function BankList() {
    let generate_bank_items = (bank) => (
        <a
            className="bank-item"
            key={bank.name}
            href={bank.url}>
            <div className="bank-logo-container">
                <img src={`images/${bank.name}-bank-icon.jpg`}/>
            </div>
            <div className="bank-open-area">开放地区：{bank.openArea}</div>
        </a>
    )
    return (
        <div className="bank-list">
            {BANK_LIST.map(generate_bank_items)}
        </div>
    )
}

const BANK_LIST = [
    {
        "name": "minsheng",
        "url": "https://creditcard.cmbc.com.cn/wsonline/index/index.jhtml?tradeFrom=YX-SHYQ4&EnStr=850A65B6A975F2CED47292526C7C20C7&jg=602000002&jgEnStr=80E905D31EBF547A47FB271EE91B9445",
        "openArea": "全国"
    }, {
        "name": "xingye",
        "url": "https://ccshop.cib.com.cn:8010/application/cardapp/Fast/TwoBar/view?id=b6ddf4fec6a64ab8a7362ce26ec8145e",
        "openArea": "全国"
    }, {
        "name": "jiaotong",
        "url": "https://creditcardapp.bankcomm.com/applynew/front/apply/track/record.html?trackCode=A0428160684349",
        "openArea": "全国"
    }, {
        "name": "zhaoshang",
        "url": "http://xyk.cmbchina.com/Latte/card/cardList?WT.mc_id=N3700MMA061J208500HJ",
        "openArea": "全国"
    }, {
        "name": "pufa",
        "url": "https://ecentre.spdbccc.com.cn/creditcard/indexActivity.htm?data=P1411700&itemcode=lcsh170418",
        "openArea": "全国"
    }, {
        "name": "pingan",
        "url": "https://c.pingan.com/apply/mobile/apply/index.html?scc=920000612&ccp=1a2a3a4a5a8a9a10a11a12a13&showt=0",
        "openArea": "全国"
    }, {
        "name": "guangda",
        "url": "https://xyk.cebbank.com/cebmms/apply/ps/card-list.htm?level=124&pro_code=FHTG230000SJ23YQXX",
        "openArea": "全国"
    }, {
        "name": "zhongxin",
        "url": "http://creditcard.ecitic.com/h5/shenqing/tongyong.html?sid=SJUSHYQXX2",
        "openArea": "全国"
    }, {
        "name": "zhongguo",
        "url": "https://apply.mcard.boc.cn/apply/6n2URb",
        "openArea": "上海"
    }, {
        "name": "huaqi",
        "url": "https://www.citibank.com.cn/sim/ICARD/forms/shortform/index.html?ecid=DIYQMCNCCACNFX01",
        "openArea": "北京、上海、广州、深圳"
    }, {
        "name": "shanghai",
        "url": "https://mbank.bankofshanghai.com/pweixin/static/index.html?_TransactionId=CreditCardApply&_CardType=0300001560&YLLink=620072",
        "openArea": "上海、南京、苏州、无锡、常州、南通、杭州、宁波、绍兴、北京、天津、成都、深圳"
    }
]

$FW.DOMReady(() => {
    NativeBridge.setTitle("信用卡申请");
    ReactDOM.render(<Header title="信用卡申请" />, HEADER_NODE)
    ReactDOM.render(<BankList />, CONTENT_NODE)
})
