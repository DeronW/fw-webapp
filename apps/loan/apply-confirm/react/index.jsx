function gotoHandler(link) {
    location.href = encodeURI(link);
}

const USER = $FW.Store.getUserDict();

$FW.DOMReady(function () {
    ReactDOM.render(<Header title={"确认信息"} />, HEADER_NODE);

    let query = $FW.Format.urlQuery();
    let loanNum = query.loanNum;
    let orioleOrderGid = query.orioleOrderGid;
    let withdrawCardGid = query.withdrawCardGid;

    Promise.all([
        $FW.Post(`${API_PATH}api/loan/v1/tryLoanBudget.json`, {
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE,
            orioleOrderGid: orioleOrderGid,
            loanAmount: loanNum
        }),
        $FW.Post(`${API_PATH}api/bankcard/v1/bankcardlist.json`, {
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        }),
        $FW.Post(`${API_PATH}api/repayment/v1/latedescription.json`, {
            token: USER.token,
            userGid: USER.gid,
            userId: USER.id,
            sourceType: SOURCE_TYPE
        })
    ]).then(d => {
        ReactDOM.render(<ConfirmLoanWrap {...d[0]} {...d[1]} {...d[2]} />, CONTENT_NODE);
    });
});
