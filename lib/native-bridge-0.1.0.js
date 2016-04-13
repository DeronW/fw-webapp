if (typeof($FW) == 'undefined') {
    alert('should load financial-workspace-xxx.js first');
    throw('should load financial-workspace-xxx.js first');
}


window.onNativeMessageReceive = function (action, params) {
    console.log(arguments);

    switch (action) {
        case 'login':
            __fw_hidden_native_methods.login(params);
            break;
    }
};

var __fw_hidden_native_methods = {
    login: function (token) {
        $FW.Ajax({
            url: '',
            method: 'post',
            data: {
                token: token
            },
            complete: function (d) {
                console.log(d)
            }
        })
    }
};