class BankList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bankList: []
        }
        this.back_handler = this.back_handler.bind(this);
    }
    componentDidMount() {
        let user = $FW.Store.getUserDict();
        $FXH.Post(`${API_PATH}/api/bankcard/v1/supportbank.json`, {
            page: 1,
            pageSize: 100
        }).then(data => {
            this.setState({
                bankList: data.pageData.result
            });
        }, (error) => {

        })
    }
    back_handler() {
        window.history.back()
    }
    render() {
        let bankLi = (todo, index) => {
            return <div className="bank-branch">
                <div className="bank-icon">
                    <img src={todo.logoUrl || 'images/logo.png'} />
                </div>
                <div className="bank-name">{todo.bankName}</div>
            </div>
        }

        return (
            <div>
                <div className="banklist">
                    {this.state.bankList.map((todo, index) => bankLi(todo, index))}
                </div>
                <div className="know-btn-wrap">
                    <div className="know-btn" onClick={this.back_handler}>
                        我知道了</div>
                </div>
            </div>
        )
    }
}

$FW.DOMReady(function () {
    NativeBridge.setTitle('支持储蓄卡');
    ReactDOM.render(<Header title={"支持储蓄卡"} />, HEADER_NODE);
    ReactDOM.render(<BankList />, CONTENT_NODE);
});
