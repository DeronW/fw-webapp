const Content = React.createClass({
    getInitialState: function () {
        var tab = location.hash == '#transfer' ? '债权转让' : '最新投资';
        return {
            tab: tab
        }
    },
    componentDidMount: function () {
    },
    tabClickHandler: function (name) {
        if (name == '豆哥商城') {
            location.href = 'http://mmall.9888.cn'
        } else if (name == '个人中心') {
            location.href = '/mpwap/orderuser/getUserInfo.shtml'
        } else {
            this.setState({tab: name})
        }
    },
    render: function () {
        let tab = (name, index) => {
            var cn = this.state.tab == name ? 'active' : null;
            return <div className={cn} key={index} onClick={()=>this.tabClickHandler(name)}>{name}</div>;
        };

        return (
            <div>
                <div className="tab-panel">
                    <div className="fixed-tab-panel">
                        {['最新投资', '债权转让', '豆哥商城', '个人中心'].map(tab)}
                    </div>
                </div>
                <div>

                </div>
                {this.state.tab == '最新投资' ? <Content.Invest /> : null}
                {this.state.tab == '债权转让' ? <Content.Transfer /> : null}
            </div>
        )
    }
});

Content.Invest = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    componentDidMount: function () {
    },
    render: function () {
        let item = (i, index) => {
            return (
                <div key={index}>
                    {i}
                </div>
            )
        };
        return (
            <div>
                <BannerGroup images={[]}/>
                {this.state.items.map(item)}

                <div className="project">
                    <div className="title">
                        利随享8531
                        <i className="icon-bao"> </i>
                        <i className="icon-gu"> </i>
                        <i className="icon-ling"> </i>
                        <i className="icon-tie"> </i>

                        <div className="tag"> 限时抢购</div>
                    </div>
                    <div className="detail">
                        <div className="progress">
                            <SVGCircleProgress radius={70} percent={60} />
                        </div>
                        <div className="profit">9.8%</div>
                        <div className="duration">6个月</div>
                        <div className="remain">剩44.8万</div>
                        <div className="keywords">
                            <span>100元起投</span>
                            <span>一次结清</span>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
});

Content.Transfer = React.createClass({
    getInitialState: function () {
        return {
            items: []
        }
    },
    render: function () {
        let item = (i, index) => {
            return (
                <div key={index}>
                    {i}
                </div>
            )
        };
        return (
            <div>
                <BannerGroup images={[]}/>
                {this.state.items.map(item)}
            </div>
        )
    }
});

$FW.DOMReady(function () {

    ReactDOM.render(<Content />, document.getElementById('cnt'));
});