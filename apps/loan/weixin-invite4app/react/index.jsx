$FW.DOMReady(function () {
    let inviteCode = $FW.Format.urlQuery().yqm;
    document.getElementById('yqm').innerHTML(inviteCode);
})
