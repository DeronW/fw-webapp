'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Product = React.createClass({

    getInitialState: function () {
        return {}
    },

    render: function () {
        let data = this.props.data;
        let score = data.score ? <span className="score"> + {data.score}分</span> : "";
        let markList = (list, index)=><div key={index}>{list}</div>;
        let desc = null;

        if (data.desc) {
            let text = (i, index) => <div key={index}>{i}</div>;
            desc = (
                <div className="detail-explain">
                    <div className="detail-explain-h">活动说明</div>
                    <div className="detail-explain-cont">{data.desc.split(/[;|；]/).map(text)}</div>
                </div>
            )
        }

        return (
            <div className="detail-box">
                {$FW.Browser.inApp() ? null : <Header title={'商品详情'} background={'transparent'}/>}

                {this.props.data.head_images.length ?
                    <CarouselDetail head_images={this.props.data.head_images}/> :
                    <div className="no-head-images">暂无图片</div>}

                <div className="detail-inf">
                    <div className="detail-inf-name">{data.title}</div>
                    <div className="detail-inf-des">{data.sub_title} </div>
                    <div className="detail-inf-price">
                        <span className="money">&yen;</span>
                        <span className="price">{$FW.Format.currency(data.price)}</span>
                        {score}
                    </div>
                    <div className="detail-inf1">
                        <div className="market-price">
                            <span>市价：</span>
                            <span className="market-price-num">&yen;{data.market_price}</span>
                        </div>
                        <div className="total">
                            <span>累计销量</span>
                            <span className="total-num">{data.sales}</span>
                        </div>
                    </div>
                    <div className="detail-inf1">
                        <div className="market-price">
                            <span>快递：</span>
                            <span>免快递费</span>
                        </div>
                        <div className="total">
                            <span>配送范围：</span>
                            <span>全国</span>
                        </div>
                    </div>
                    <div className="detail-inf1">
                        <div className="operators">运营商：</div>
                        <div className="operators-name">{data.operators}</div>
                    </div>
                </div>
                <div className="detail-mark">
                    {data.tags.map(markList)}
                </div>
                {desc}
                <div className="detail-des">
                    {data.rich_detail.map((i, index) => <img src={i} key={index}/>)}
                </div>
                <PlusMinus stock={data.stock}/>
            </div>
        )
    }
});
const PlusMinus = React.createClass({
    getInitialState: function () {
        let stock = this.props.stock;

        return {
            value: stock > 0 ? 1 : 0,
            minus: stock > 0,
            plus: stock > 0
        }
    },

    changeValue: function (e) {
        this.updateCount(e.target.value);
    },

    updateCount: function (c) {
        c = parseInt(c) || 1;
        if (c < 1) c = 1;
        if (c > this.props.stock) c = this.props.stock;
        this.setState({
            value: c,
            minus: c > 1,
            plus: c < this.props.stock
        });
    },

    changePlus: function () {
        this.updateCount(this.state.value + 1)
    },
    changeMinus: function () {
        this.updateCount(this.state.value - 1)
    },
    buyHandler: function () {
        if (this.state.value < 1) return;
        let bizNo = $FW.Format.urlQuery().bizNo;
        location.href = '/order/confirm?productBizNo=' + bizNo + '&count=' + this.state.value
    },

    blur: function (e) {
        this.updateCount(e.target.value)
    },
    render: function () {
        let btnMinusBg = "url(" + STATIC_PATH + "images/" + (this.state.minus ? "blue-minus" : "gray-minus") + ".png)";
        let btnPlusBg = "url(" + STATIC_PATH + "images/" + (this.state.plus ? "blue-plus" : "gray-plus") + ".png)";

        return (
            <div className="detail-foot">
                <div className="detail-num-change">
                    <div className="minus" onClick={this.changeMinus} style={{background:btnMinusBg}}></div>
                    <div className="input-num">
                        <input type="text" value={this.state.value} onChange={this.changeValue} onBlur={this.blur}/>
                    </div>
                    <div className="plus" onClick={this.changePlus} style={{background:btnPlusBg}}></div>
                </div>
                <div className="stock-box">
                    <span>库存</span>
                    <span className="stock">{this.props.stock}</span>
                    <span className="unit">件</span>
                </div>
                <a onClick={this.buyHandler}
                   className={this.props.stock < 1 ? "btn-buy btn-buy-dis" : "btn-buy"}>立即购买</a>
            </div>
        )
    }
});

const CarouselDetail = React.createClass({
    getInitialState: function () {
        return {
            banners: this.props.head_images,
            cur_index: 0
        }
    },

    changeCurrentIndex: function (index) {
        this.setState({cur_index: index})
    },

    render: function () {
        let point = (dot, index) => <div key={index} className={(this.state.cur_index == index) ? "on" : ''}></div>;
        let ba = (i, index) => <div key={index}><a href={i.href}><img src={i}/></a>
            <div className="label"></div>
        </div>;

        return (
            <div className="banner-carousel-detail">
                <ReactSwipe wrapperClassName={'wrap'} speed={1000} callback={this.changeCurrentIndex}>
                    {this.state.banners.map(ba) }
                </ReactSwipe>
                <div className="points">
                    {this.state.banners.map(point)}
                </div>
            </div>
        );
    }
});

$FW.DOMReady(function () {
    let bizNo = $FW.Format.urlQuery().bizNo;
    if (!bizNo) {
        alert('bizNo is missing');
        return;
    }

    NativeBridge.ajaxStart();
    NativeBridge.setTitle('产品详情');

    $FW.Ajax({
        url: API_PATH + 'mall/api/detail/v1/item_detail.json?bizNo=' + bizNo,
        success: function (data) {
            if (!data) {
                alert('这个产品没有任何详情');
                return;
            }
            ReactDOM.render(<Product data={data}/>, document.getElementById('cnt'));
            NativeBridge.ajaxComplete();
        }
    });
});

window.onNativeMessageReceive = function (msg) {
    if (msg == 'history:back') history.back();
};
