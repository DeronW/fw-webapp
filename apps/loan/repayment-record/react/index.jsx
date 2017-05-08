function RecordList(props) {
    let fxhBanner_el = (
        <div className="fxh-banner-wrap">
            <img src='./images/fxh-banner.png'></img>
        </div>
    );
    let generate_list_item = (item) => (
        <div className="record-list-item" key={item.updateTime}>
            <div className="left-els">
                <div className="amount">{item.repaymentAmt.toFixed(2)}</div>
                <div className="time">{item.updateTime}</div>
            </div>
            <div className="right-els">
                <span>{item.bankShortName}</span>
                <span>{`(尾号${item.cardNo})`}</span>
            </div>
        </div>
    );
    return (
        <div>
            { fxhBanner_el }
            <div className="record-list">
                {props.list.map(generate_list_item)}
            </div>
        </div>
    )
}

$FW.DOMReady(() => {
    ReactDOM.render(<Header title="还款记录" />, HEADER_NODE);

    let loanUuid = $FW.Format.urlQuery().repaymentid;
    $FW.Post(`${API_PATH}/api/repayment/v1/repaymentrecordlist.json`, {
        sourceType: SOURCE_TYPE,
        loanUuid: loanUuid
    }).then((data) => {
        ReactDOM.render(<RecordList list={data.repaymentRecordList} />, CONTENT_NODE);
    }, e => $FW.Component.Toast(e.message));
})
