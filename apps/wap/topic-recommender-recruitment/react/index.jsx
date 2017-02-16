$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('推荐人招募计划')
    } else {
        ReactDOM.render(<Header title={'推荐人招募计划'} />, HEADER_NODE)
    }
    $FW.Ajax({
        url: API_PATH + "/mpwap/api/v1/getOpenAccountInfo.shtml",
        method: "GET",
        success: function (data) {
            document.querySelector("#namePart").innerText = data.userInfo.realName;
            document.querySelector("#phonePart").innerText = data.userInfo.phoneNum;
        },
    });

    var formdata = {
        wechat: document.querySelector("#wechatNumber"),
        mailPart: document.querySelector("#mailPart"),
        city: document.querySelector("#cityPart"),
        phonePart: document.querySelector("#phonePart"),
        username: document.querySelector("#namePart"),
        weChatNo: document.querySelector("#wechatNumber"),
        wechatblurHandel: function () {
            formdata.wechat.onblur = function () {
                if (this.value == "") {
                    $FW.Component.Alert("微信必填");

                }
            }
        },
        mailblurHandel: function () {
            formdata.mailPart.onblur = function () {
                if (this.value == "") {
                    $FW.Component.Alert("邮箱必填");
                } else if (!CheckMail(this.value)) {
                    $FW.Component.Alert("请输入正确的邮箱地址");
                }
            }
        },
        cityblurHandel: function () {
            formdata.city.onblur = function () {
                if (this.value == "") {
                    $FW.Component.Alert("所在城市必填");
                }
            }
        }

    };
    formdata.wechatblurHandel();
    formdata.mailblurHandel();
    formdata.cityblurHandel();

    var submitButton = document.getElementById("submitButton");

    submitButton.onclick = function () {
        if (formdata.wechat.value == "") {
            $FW.Component.Alert("微信必填");
        } else if (formdata.mailPart.value == "") {
            $FW.Component.Alert("邮箱必填");
        } else if (!CheckMail(formdata.mailPart.value)) {
            $FW.Component.Alert("请输入正确的邮箱地址");
        } else if (formdata.city.value == "") {
            $FW.Component.Alert("所在城市必填");
        } else {

            $FW.Ajax({
                url: API_PATH + "/mpwap/api/v1/collectUserInfo.shtml",
                data: {
                    city: formdata.city.value,
                    email: formdata.mailPart.value,
                    phoneNo: formdata.phonePart.innerText,
                    username: formdata.username.innerText,
                    weChatNo: formdata.weChatNo.value
                }
            }).then(data => $FW.Component.Alert('申请成功，请耐心等待审核！'));

        }


    }

    function CheckMail(mail) {
        return /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(mail)
    }
});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'https://mmall.9888.cn'
    }
}
