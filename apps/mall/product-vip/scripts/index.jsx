'use strict';

const API_PATH = document.getElementById('api-path').value;

const MallVip = React.createClass({
    getInitialState: function () {
        return {
            products: [],
            index: 0
        }
    },
    handleClickTab: function (index) {
        this.setState({index: index});
    },
    componentDidMount: function () {
        $FW.Ajax({
            url: 'http://10.10.100.112/mockjs/4/api/v1/products?count=&cursor=&type=',
            success: (data) => {
                window.Products.all = data.products;
                this.setState({products: window.Products.all});
            }
        });
    },
    render: function () {
        let that = this;

        let btn_vip = (name, index) => (
            <div key={index}
                className={index == this.state.index ? "on" : ""}
                onClick={function(){that.handleClickTab(index)}}
                style={{background:"#fff url(images/tab-gray-dot.png) no-repeat right 0"}}>
                <span>{name.title}</span>
            </div>
        );

        return (
            <div>
                <div className="vip-box">
                    <MallVip.UserLevel level={this.props.vip_level}/>

                    <div className="vip-tab-box">
                        <ul className="vip-tab">
                            {['all', 'vip1', 'vip2', 'vip3'].map(btn_vip)}
                        </ul>
                    </div>

                    <div className="vip-cont">
                        <div className="index-actList-list show">
                            {this.state.products.map((data, index) => <ProductItem {...data} key={index}/>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

MallVip.UserLevel = React.createClass({
    getInitialState: function () {
        return {show_user_level: true}
    },

    hideHandler: function () {
        this.setState({show_user_level: false})
    },

    render: function () {
        if (!this.state.show_user_level) return null;

        return (
            <div className="vip-header">
                <div className="vip-tip-box">
                    <div className="vip-tip">您当前等级是
                        <span className="vip-tip-mylevel">{this.props.level}</span>
                        ，可购买该等级及以下等级商品！
                        <div className="vip-tip-close" onClick={this.hideHandler}
                             style={{background:"url(images/ico-white-close.png) no-repeat center"}}></div>
                    </div>
                </div>
            </div>
        )
    }
});


const ProductItem = React.createClass({
    render: function () {
        var price = (parseFloat(this.props.score) > 0) ? (
            <span className="list-price-score">&#43;{this.props.score}工分</span>) : null;
        var Angle = (this.props.angle_text) ? (<div className="list-label">{this.props.angle_text}</div>) : null;

        return (
            <li>
                <a href={this.props.link} className="index-actList-a">
                    <div className="list-img"><img src={this.props.img}/></div>
                    {Angle}
                    <div className="list-name">{this.props.title}</div>
                    <div className="list-mark">
                        { this.props.tags.map((d, index) => <div key={index}>{d}</div>) }
                    </div>
                    <div className="list-price-box">
                        <div className="list-price">
                            <span className="list-price-mark">&yen;</span>
                            <span className="list-price-num">{$FW.Format.currency(this.props.price)}</span>
                            { price }
                        </div>
                        <div className="list-sold">
                            <span>累计销量 </span>
                            <span>{this.props.sales}</span>
                        </div>
                    </div>
                </a>
            </li>
        )
    }
});

window.Products = {
    all: [],
    vip_1: [],
    vip_2: [],
    vip_3: [],
    vip_4: []
};

$FW.DOMReady(function () {
    $FW.Ajax({
        url: 'http://10.10.100.112/mockjs/4/api/v1/user/?user_id=',
        success: function (data) {
            ReactDOM.render(<MallVip vip_level={data.vip_level}/>, document.getElementById('cnt'));
        }
    });
    NativeBridge.setTitle('VIP专区');
});
