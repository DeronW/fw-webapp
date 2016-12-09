const WorkerBox = React.createClass({
    getInitialState: function () {
        return {
            wealthImg: [],
            northImg: [],
            eastImg: []
        }
    },
    componentDidMount: function () {
        this.ajaxWealthImg();
        this.ajaxNorthImg();
        this.ajaxEastImg();
    },
    ajaxWealthImg: function () {
        $FW.getJSONP('http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=28', function (data) {
            this.setState({wealthImg: data});
        }.bind(this))
    },
    ajaxNorthImg: function () {
        $FW.getJSONP('http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=29', function (data) {
            this.setState({northImg: data});
        }.bind(this))
    },
    ajaxEastImg: function () {
        $FW.getJSONP('http://fore.9888.cn/cms/api/gyh_banner.php?key=0ca175b9c0f726a831d895e&id=30', function (data) {
            this.setState({eastImg: data});
        }.bind(this))
    },
    gotoHandle: function (link, need_login) {
        if (link.indexOf('://') < 0) {
            alert(1);
            link = location.protocol + '//' + location.hostname + link;
        }
        if (navigator.userAgent.indexOf('FinancialWorkshop') >= 0) {
            alert(2);
            NativeBridge.goto(link, need_login)
        } else {
            alert(3);
            location.href = link;
        }
    },
    render: function () {
        var introduction = [
            {
                pic: './images/pic1.png',
                name: '魏薇',
                job: '董事长'
            },
            {
                pic: './images/pic2.png',
                name: '崔海晨',
                job: 'CEO'
            },
            {
                pic: './images/pic3.png',
                name: '邹晓东',
                job: '首席风控'
            },
            {
                pic: './images/pic4.png',
                name: '李建光',
                job: '副总裁'
            }
        ];
        return (
            <div className="workerBox">
                <div className="banner">
                    <img src="./images/banner.png" alt=""/>
                </div>
                <div className="question">
                    <div className="questionTitle">什么是工友汇？</div>
                    <div className="questionText">
                        “工友汇”是金融工场与用户面对面、零距离交流活动。在这里，能认识同城投资伙伴，还可以直面工场管理层；在这里，你的财富愿景与专业指导、透明信息交流汇聚分享。金融工场是香港上市金融公司中国信贷（08207.HK）旗下互联网金融平台。成立四年以来，坚持严格自律，并以最真诚的态度面向所有用户。“工友汇”，将与全国各地的工友们零距离接触，面对面走近您身边！
                    </div>
                </div>
                <div className="wealth">
                    <div className="wealthTitle">
                        <span>自律创造财富</span>
                        <img src="./images/city.png" alt=""/>
                    </div>
                    <div className="wealthContent">
                        {
                            introduction.map((item, index) => {
                                return <div key={index} className="wealthContentPerson">
                                    <img src={item.pic} alt=""/>

                                    <div className="name">{item.name}</div>
                                    <div className="job">{item.job}</div>
                                </div>
                            })
                        }
                    </div>
                    <div className="wealthText">
                        <span>10月29日，工场“工友汇”第一站在北京正式启动。50多位工友齐聚一堂，与金融工场高级管理人员面对面交流探讨。金融工场董事长魏薇、CEO崔海晨、首席风控官邹晓东、副总裁李建光出席活动，并对金融工场上线银行存管、风控体系、监管政策、行业发展以及日常服务，进行交流答疑。
                        </span>
                        <span>在会上，魏薇从“金融”、“科技”、“安全”、“服务”四个方面分析了行业未来的发展趋势，并阐述了金融工场未来的发展方向。此后，金融工场CEO崔海晨就金融工场的发展作出总结，“成立四年累计完成158亿的交易额，为近百万用户赚取了超过4亿元的收益”。首席风控官邹晓东则从资产结构、流程与制度、资金交易保障和合规化调整四个方面，详细介绍了金融工场风险控制体系。副总裁李建光对于近期上线的徽商银行资金存管系统做出最后精彩分享。
                        期间，四位高管还对诸如公司背景、产品逻辑、安全保障、用户体验和信息安全等用户关心的话题与到场用户进行了面对面的交流。
                        </span>
                    </div>
                    <div className="wealthImg">
                        {
                            this.state.wealthImg.map((item, index) => {
                                return <img key={index} src={item.thumb} alt=""/>
                            })
                        }
                    </div>
                    <a onClick={() => {this.gotoHandle("http://bbs.9888.cn/forum.php?mod=viewthread&tid=5615",true)}} className="moreBtn">了解更多现场情况</a>
                </div>
                <div className="northEast">
                    <div className="northEastTitle">大连站、哈尔滨站——走进东北</div>
                    <div className="northTitle">12月8日，“工友汇”第二站走进美丽的海港城市——大连。</div>
                    <div className="northImg">
                        {
                            this.state.northImg.map((item, index) => {
                                return <img key={index} src={item.thumb} alt=""/>
                            })
                        }
                    </div>
                    <a onClick={() => {this.gotoHandle("http://bbs.9888.cn/forum.php?mod=viewthread&tid=5615",true)}} className="moreBtn">了解更多现场情况</a>

                    <div className="northTitle">12月10日，工友汇”第三站走进童话的冰雪之城——哈尔滨。</div>
                    <div className="northImg">
                        {
                            this.state.eastImg.map((item, index) => {
                                return <img key={index} src={item.thumb} alt=""/>
                            })
                        }
                    </div>
                    <a onClick={() => {this.gotoHandle("http://bbs.9888.cn/forum.php?mod=viewthread&tid=5615",true)}} className="moreBtn">了解更多现场情况</a>
                </div>
                <div className="aboutMe">
                    <div className="aboutTitle">关于我们</div>
                    <img src="./images/logo.png" alt=""/>

                    <div className="aboutText">
                        金融工场是由香港上市公司——中国信贷科技控股有限公司(Credit
                        China，股票代码：08207.HK)战略控股，由北京凤凰信用管理有限公司（简称：凤凰信用）倾力打造的，专注于网络借贷信息撮合的互联网金融平台。
                    </div>
                </div>
            </div>
        )
    }
});
$FW.DOMReady(function () {
    ReactDOM.render(
        <WorkerBox />,
        document.getElementById("cnt")
    );
});
