function gotoHandler(link) {
    location.href = encodeURI(link);
}

const USER = $FW.Store.getUserDict();

$FW.DOMReady(function () {
    NativeBridge.setTitle('确认信息');
    ReactDOM.render(<Header title={"确认信息"} />, HEADER_NODE);

    let query = $FW.Format.urlQuery();
    let loanNum = query.loanNum;
    let orioleOrderGid = query.orioleOrderGid;
    let withdrawCardGid = query.withdrawCardGid;

    Promise.all([
        $FXH.Post(`${API_PATH}/api/loan/v1/tryLoanBudget.json`, {
            orioleOrderGid: orioleOrderGid,
            loanAmount: loanNum
        }),
        $FXH.Post(`${API_PATH}/api/bankcard/v1/bankcardlist.json`),
        $FXH.Post(`${API_PATH}/api/repayment/v1/latedescription.json`)
    ]).then(d => {
        ReactDOM.render(<ConfirmLoanWrap {...d[0]} {...d[1]} {...d[2]} />, CONTENT_NODE);
    });
});
