'use strict';

const Mall = React.createClass({

    render: function () {
        let data = this.props.data;
        let score = data.score ? <span className="score"> + {data.score}分</span> : "";
        let markList = (list, index)=><div>{list}</div>;
        let descData = data.desc.split(/[;|；]/);
        let desc = descData.map(function (i, index) {
            return <div key={index}>{i}</div>
        });

        return (
            <div className="detail-box">
                <header className="header">商品详情<a href="#" className="btn-back"
                                                  style={{background:"url(../images/ico-blue-back.png) no-repeat 30px center"}}> </a>
                </header>
                <CarouselDetail data={this.props.data}/>
                <div className="detail-inf">
                    <div className="detail-inf-name">{data.title}</div>
                    <div className="detail-inf-des">{data.sub_title} </div>
                    <div className="detail-inf-price">
                        <span className="money">&yen;</span><span
                        className="price">{$FW.Format.currency(data.price)}</span>
                        {score}
                    </div>
                    <div className="detail-inf1">
                        <div className="market-price"><span>市价：</span><span
                            className="market-price-num">&yen;{data.market_price}</span>
                        </div>
                        <div className="total"><span>累计销量</span><span className="total-num">{data.sales}</span></div>
                    </div>
                    <div className="detail-inf1">
                        <div className="market-price"><span>快递：</span><span>{data.ems}</span>
                        </div>
                        <div className="total"><span>配送范围：</span><span>{data.range}</span></div>
                    </div>
                </div>
                <div className="detail-mark">
                    {data.mark.map(markList)}
                </div>
                <div className="detail-explain">
                    <div className="detail-explain-h">活动说明</div>
                    <div className="detail-explain-cont">{desc}</div>
                </div>
                <div className="detail-des">
                    {data.rich_detail}
                </div>
                <PlusMinus MaxNum={data.stock} stock={data.stock} />
            </div>
        )
    }
});
const PlusMinus = React.createClass({
    getInitialState: function () {
        return {
            value: 1,
            disable: false,
            minus: false,
            plus: true
        }
    },
    changeValue: function (e) {
        if (this.props.MaxNum == 0) {
            this.setState({
                value: 0,
                disable: true,
                minus: false,
                plus: false
            })
        } else if (e.target.value == "") {
            this.setState({
                value: e.target.value,
            });
        } else if (parseInt(e.target.value) == 1 && parseInt(e.target.value) < this.props.MaxNum) {
            this.setState({
                value: 1,
                minus: false,
                plus: true
            });
        } else if (parseInt(e.target.value) >= this.props.MaxNum) {
            this.setState({
                value: this.props.MaxNum,
                minus: true,
                plus: false
            });
        } else if (1 < parseInt(e.target.value) && parseInt(e.target.value) < this.props.MaxNum) {
            this.setState({
                value: e.target.value,
                minus: true,
                plus: true
            });
        } else {
            this.setState({
                value: 1,
                minus: false,
                plus: true
            });
        }
    },
    changePlus: function () {
        if (this.props.MaxNum == 0) {
            this.setState({
                value: 0,
                disable: true,
                minus: false,
                plus: false
            })
        } else if (this.props.MaxNum == 1) {
            this.setState({
                value: 1,
                disable: false,
                minus: false,
                plus: false
            })
        } else if (parseInt(this.state.value) < this.props.MaxNum) {
            this.setState({
                value: parseInt(this.state.value) + 1,
                disable: false,
                minus: true,
                plus: true
            })
        } else if (parseInt(this.state.value) == this.props.MaxNum) {
            this.setState({
                value: parseInt(this.state.value),
                disable: false,
                minus: true,
                plus: false
            })
        }

    },
    changeMinus: function () {
        if (this.props.MaxNum == 0) {
            this.setState({
                value: 0,
                disable: true,
                minus: false,
                plus: false
            })
        } else if (this.props.MaxNum == 1) {
            this.setState({
                value: 1,
                disable: false,
                minus: false,
                plus: false
            })
        } else if (parseInt(this.state.value) == 2) {
            this.setState({
                value: parseInt(this.state.value) - 1,
                disable: false,
                minus: false,
                plus: true
            })
        } else if (parseInt(this.state.value) > 2) {
            this.setState({
                value: parseInt(this.state.value) - 1,
                disable: false,
                minus: true,
                plus: true
            })
        }
    },

    blur: function (e) {
        if (this.props.MaxNum == 0) {
            this.setState({
                value: 0,
                disable: true,
                minus: false,
                plus: false
            })
        } else if (e.target.value == "") {
            this.setState({
                value: 1,
            })
        }
    },
    render: function () {
        let disable = "#";
        let btnBuy = "btn-buy btn-buy-dis";
        if (this.props.MaxNum > 0) {
            disable = this.state.disable ? "http://m.9888.cn/mpwap/" : "#";
            btnBuy = this.state.disable ? "btn-buy btn-buy-dis" : "btn-buy";
        }
        let stock = this.props.MaxNum;
        let _this = this;
        let minusb = this.state.minus ? "blue-minus" : "gray-minus";
        let plusb = this.state.plus ? "blue-plus" : "gray-plus";

        return (
            <div className="detail-foot">
                <div className="detail-num-change">
                    <div className="minus" onClick={_this.changeMinus}
                         style={{background:"url(../images/"+minusb+".png) no-repeat center"}}></div>
                    <div className="input-num"><input type="text" value={_this.state.value} onChange={_this.changeValue}
                                                      onBlur={_this.blur}/></div>
                    <div className="plus" onClick={_this.changePlus}
                         style={{background:"url(../images/"+plusb+".png) no-repeat center"}}></div>
                </div>
                <div className="stock-box">
                    <span>库存</span>
                    <span className="stock">{this.props.stock}</span>
                    <span className="unit">件</span>
                </div>
                <a href={disable} className={btnBuy}>立即购买</a>
            </div>
        )
    }
});

const CarouselDetail = React.createClass({
    getInitialState: function () {
        return {
            banners: this.props.data.head_images,
            cur_index: 0
        }
    },

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },

    render: function () {
        let banner = (dot, index) => <div key={index} className={(this.state.cur_index == index) ? "on" : ''}></div>;
        let ba = (d, index) => <div key={index}><a href={d.href}><img src={d.img}/></a>
            <div className="label"></div>
        </div>;

        return (
            <div className="banner-carousel-detail">
                <ReactSwipe wrapperClassName={'wrap'} auto={3000} speed={1000} callback={this.changeCurrentIndex}>
                    {this.state.banners.map(ba) }
                </ReactSwipe>
                <div className="points">
                    {this.state.banners.map(banner)}
                </div>
            </div>
        );
    }
});


$FW.DOMReady(function () {
    $FW.BatchGet([
        'http://10.10.100.112/mockjs/4/api/v1/product/?product_id='
    ], function (data) {
        var data = data[0];
        ReactDOM.render(<Mall data={data}/>, document.getElementById('cnt'));
    });
});