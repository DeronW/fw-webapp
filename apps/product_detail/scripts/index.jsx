'use strict';

const STATIC_PATH = document.getElementById('static-path').value;
const API_PATH = document.getElementById('api-path').value;

const Mall = React.createClass({

    render: function () {
        let data = this.props.data;
        let score = data.score ? <span className="score"> + {data.score}分</span> : "";
        let markList = (list, index)=><div key={index}>{list}</div>;
        let descData = data.desc.split(/[;|；]/);
        let desc = descData.map(function (i, index) {
            return <div key={index}>{i}</div>
        });

        return (
            <div className="detail-box">
                <header className="header">商品详情
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
                <PlusMinus MaxNum={data.stock} stock={data.stock}/>
            </div>
        )
    }
});
const PlusMinus = React.createClass({
    getInitialState: function () {
        let stock = this.props.stock;

        return {
            value: 1,
            disable: stock <= 0,
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
                <a className={this.state.stock > 0 ? "btn-buy btn-buy-dis" : "btn-buy"}>立即购买</a>
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