'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

var dataJson = {
    vip: {
        imgUrl: [
            "../images/vip.jpg"
        ],
        title: [
            "豆哥在你的生日当天，为你准备了生日大礼包哦，一 起来金融工场开派对吧!"
        ],
        info: [
            ["<em className='c-fe606b'>100</em>元返现券."]
        ]
    },
    vip1: {
        imgUrl: [
            "../images/vip-1-a.jpg",
            "../images/vip-1-b.jpg",
            "../images/vip-1-c.jpg"
        ],
        title: [
            "豆哥在你的生日当天，为你准备了生日大礼包哦，一 起来金融工场开派对吧!",
            "提升至VIP1会员，可领取升级大礼包，只可领取一次。",
            "每笔投资都可享受等级加息奖励，加息奖励以工豆形式发放，每笔订单在起息后发放至您的账户。",
        ],
        info: [
            [
                "<em className='c-fe606b'>40</em>元返现券."
            ],
            [
                "<em className='c-fe606b'>40</em>元返现券.",
                "<em className='c-fe606b'>60</em>元返现券.",
                "<em className='c-fe606b'>0.3%</em>返息券."
            ],
            [
                "<em className='c-fe606b'>0.25%</em>返息券."
            ]
        ]
    },
    vip2: {
        imgUrl: [
            "../images/vip-2-a.jpg",
            "../images/vip-2-b.jpg",
            "../images/vip-2-c.jpg"
        ],
        title: [
            "豆哥在你的生日当天，为你准备了生日大礼包哦，一 起来金融工场开派对吧!",
            "提升至VIP1会员，可领取升级大礼包，只可领取一次。",
            "每笔投资都可享受等级加息奖励，加息奖励以工豆形式发放，每笔订单在起息后发放至您的账户。",
        ],
        info: [
            [
                "<em className='c-fe606b'>140</em>元返现券."
            ],
            [
                "<em className='c-fe606b'>60</em>元返现券.",
                "<em className='c-fe606b'>60</em>元返现券.",
                "<em className='c-fe606b'>0.6%</em>返息券."
            ],
            [
                "<em className='c-fe606b'>0.3%</em>返息券."
            ]
        ]
    },
    vip3: {
        imgUrl: [
            "../images/vip-3-a.jpg",
            "../images/vip-3-b.jpg",
            "../images/vip-3-c.jpg"
        ],
        title: [
            "豆哥在你的生日当天，为你准备了生日大礼包哦，一 起来金融工场开派对吧!",
            "提升至VIP1会员，可领取升级大礼包，只可领取一次。",
            "每笔投资都可享受等级加息奖励，加息奖励以工豆形式发放，每笔订单在起息后发放至您的账户。",
        ],
        info: [
            [
                "<em className='c-fe606b'>160</em>元返现券."
            ],
            [
                "<em className='c-fe606b'>80</em>元返现券.",
                "<em className='c-fe606b'>120</em>元返现券.",
                "<em className='c-fe606b'>0.8%</em>返息券."
            ],
            [
                "<em className='c-fe606b'>0.35%</em>返息券."
            ]
        ]
    },
    vip4: {
        imgUrl: [
            "../images/vip-4-a.jpg",
            "../images/vip-4-b.jpg",
            "../images/vip-4-c.jpg"
        ],
        title: [
            "豆哥在你的生日当天，为你准备了生日大礼包哦，一 起来金融工场开派对吧!",
            "提升至VIP1会员，可领取升级大礼包，只可领取一次。",
            "每笔投资都可享受等级加息奖励，加息奖励以工豆形式发放，每笔订单在起息后发放至您的账户。",
        ],
        info: [
            [
                "<em className='c-fe606b'>180</em>元返现券."
            ],
            [
                "<em className='c-fe606b'>100</em>元返现券.",
                "<em className='c-fe606b'>180</em>元返现券.",
                "<em className='c-fe606b'>1%</em>返息券."
            ],
            [
                "<em className='c-fe606b'>0.4%</em>返息券."
            ]
        ]
    }
};

const NavTitle = React.createClass({
    render: function () {
        return (
            <div className="nav-title">
                <span className="back-btn">
                    <img src="../images/back-btn.png"/>
                </span>
                <h1 className="title">{this.props.title}</h1>
            </div>
        );
    }
});

const PrivilegePageContent = React.createClass({
    render: function () {
        return (
            <div>
                <div className="privilege-banner">
                    <img src="../images/banner.jpg"/>
                </div>

                <div className="privilege-introduction t-b-content">
                    <div className="title">
                        <h2 className="text"><img src="../images/privilege-icon.png"/> 特权介绍</h2>
                    </div>

                    <div className="content-block">
                        <p className="content-text">豆哥在你的生日当天,为你准备了生日大礼包哦, 一起来金融工场开派对吧!</p>
                    </div>
                </div>

                <div className="privilege-reward t-b-content">
                    <div className="title">
                        <h2 className="text"><img src="../images/privilege-icon-1.png"/> 特权奖励</h2>
                    </div>

                    <div className="content-block">
                        <p className="content-text">
                            <img src="../images/point.png"/>
                            <em className="c-fe606b">100</em>元返现券
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});

const PrivilegePage = React.createClass({
    render: function () {
        return (
            <div>
                <NavTitle title="特权详情"/>

                <PrivilegePageContent/>
            </div>
        );
    }
});


ReactDOM.render(
    <PrivilegePage/>,
    document.getElementById("main")
);
