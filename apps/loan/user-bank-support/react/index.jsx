const BankList = React.createClass({
    getInitialState() {
        return {
            bankList: []
        }
    },
    componentDidMount() {
        let user = $FW.Store.getUserDict();
        $FW.Ajax({
            url: `${API_PATH}api/bankcard/v1/supportbank.json`,
            method: "POST",
            enable_loading:"mini",
            data: {
                token: user.token,
                userGid: user.gid,
                userId: user.id,
                page: 1,
                pageSize: 100,
                sourceType: 3
            }
        }).then((data) => {
            this.setState({
                bankList: data.pageData.result
            });
        }, (error) => {

        })
    },
    render: function () {
        let bankLi = (todo, index) => {
            return <div className="bank-branch">
                <div className="bank-icon">
                    <img src={todo.logoUrl} />
                </div>

                <div className="bank-name">{todo.bankName}</div>
            </div>
        }

        return (
            <div>
                <div className="banklist">
                    {
                        this.state.bankList.map((todo, index) => {
                            return bankLi(todo, index)
                        })
                    }
                </div>
                <div className="know-btn" onClick={() => { window.history.back() }}>我知道了</div>
            </div>
        )
    }
});

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"支持银行卡"} />, HEADER_NODE);
    ReactDOM.render(<BankList />, CONTENT_NODE);
});
