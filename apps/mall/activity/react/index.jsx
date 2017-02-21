const Banner = React.createClass({
    getInitialState: function () {
        return {
            image: null,
            show: false,
            desc: ''
        }
    },
    componentDidMount: function () {
        $FW.Ajax(`${API_PATH}mall/api/index/v1/activity.json?bizNo=${BIZ_NO}`)
            .then(data => this.setState({
                image: data.img,
                desc: data.desc
            }));
    },
    clickHandler: function () {
        this.setState({show: !this.state.show});
    },
    render: function () {
        let {image, desc, show} = this.state;

        function trim(s) {
            return s.replace(/(^\s*)|(\s*$)/g, '')
        }

        let img = (
            <a className="act-img-detail">
                <img src={image || 'images/default-banner.jpg'}/>
            </a>
        );

        let detail = null;

        if (show && desc) {
            detail =
                <div className="act-explain-cont show">
                    {desc.split(/[;|；]/).map((i, index) => <div key={index}>{trim(i)}</div>)}
                </div>
        }

        return (
            <div>
                {image ? img : null}
                <div className="act-explain-box">
                    <div className="act-explain-head" onClick={this.clickHandler}>
                        <div className="act-explain-h">活动说明</div>
                        <div className={`act-explain-btn ${show && 'on'}`}></div>
                    </div>
                    {detail}
                </div>
            </div>
        )
    }
})

const Content = React.createClass({
    getInitialState: function () {
        return {
            page: 1,
            has_more: true,
            products: []
        }
    },
    componentDidMount: function () {
        this.loadProducts();
        $FW.Event.touchBottom(this.loadProducts);
    },
    loadProducts: function (done) {
        if (!this.state.has_more) return;

        $FW.Ajax({
            url: `${API_PATH}mall/api/index/v1/search.json`,
            data: {
                page: this.state.page,
                actIds: BIZ_NO,
                searchSourceType: 5,
                prefectureType: 5,
                order: -1,
            }
        }).then(data => {
            let np = data.products || [];
            this.setState({
                page: this.state.page + 1,
                products: this.state.products.concat(np),
                has_more: !!np.length
            })
            done && done();
        });
    },
    render: function () {
        let {products} = this.state;

        let ProductItem = (props, index) => {
            let price, score, angle;
            if (props.price > 0) {
                price = <span className="list-price-num">{$FW.Format.currency(props.price)}</span>
            }

            if (parseFloat(props.score) > 0) {
                score =
                    <span className="list-price-score">
                        {props.price > 0 && <span>+</span>}
                        {props.score}工分
                    </span>
            }

            if (props.angle_text) {
                angle = <div className="list-label">{props.angle_text}</div>
            }

            let cover_bg = `url(${props.img || 'images/default-product.jpg'})`;
            let href = `/static/mall/product-detail/index.html?bizNo=${props.bizNo}`;

            return (
                <a href={href} className="index-actList-a"
                   key={index}>
                    <div className="list-img" style={{ backgroundImage: cover_bg }}></div>
                    {angle}
                    <div className="list-name">{props.title}</div>
                    <div className="list-mark">
                        {(props.tags || []).map((d, index) => <div key={index}>{d}</div>)}
                    </div>
                    <div className="list-price-box">
                        <div className="list-price">
                            {props.price > 0 && <span className="list-price-mark">&yen;</span>}
                            {price}
                            {score}
                        </div>
                        <div className="list-sold">
                            <span>累计销量 </span>
                            <span>{props.sales}</span>
                        </div>
                    </div>
                </a>
            )
        };

        return (
            <div>
                <Banner />
                <div className="products-act">
                    <div className="index-actList-list">
                        {products.map(ProductItem)}
                    </div>
                    <div className="auth-info only-in-ios-app">以上活动由金融工场主办 与Apple Inc.无关</div>
                </div>
            </div>
        )
    }
})

const BIZ_NO = $FW.Format.urlQuery().bizNo;

$FW.DOMReady(() => {
    $FW.Ajax(`${API_PATH}mall/api/index/v1/activity.json?bizNo=${BIZ_NO}`)
        .then(data => ReactDOM.render(<Header title={data.title}/>, HEADER_NODE));
    ReactDOM.render(<Content />, CONTENT_NODE);
})
