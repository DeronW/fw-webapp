const API_PATH = document.getElementById('api-path').value;

$FW.DOMReady(function () {
    if ($FW.Browser.inApp()) {
        NativeBridge.setTitle('推荐人招募计划')
    } else {
        ReactDOM.render(<Header title={'推荐人招募计划'}/>, document.getElementById('header'))
    }
    $FW.Ajax({
        url :  API_PATH +"/mpwap/api/v1/getOpenAccountInfo.shtml",
        method: "GET",
        success: function(data) {
            console.log(data);
            console.log(data.userInfo.realName);
            console.log(data.userInfo.phoneNum);
            document.querySelector("#namePart").innerText=data.userInfo.realName;
            document.querySelector("#phonePart").innerText=data.userInfo.phoneNum;
        },
    });

    var formdata={
        wechat:document.querySelector("#wechatNumber"),
        mailPart:document.querySelector("#mailPart"),
        city:document.querySelector("#cityPart"),
        phonePart:document.querySelector("#phonePart"),
        username:document.querySelector("#namePart"),
        weChatNo:document.querySelector("#wechatNumber"),
        wechatblurHandel:function () {
            formdata.wechat.onblur=function () {
                if(this.value==""){
                    $FW.Component.Toast("微信必填");

                }
            }
        },
        mailblurHandel:function () {
            formdata.mailPart.onblur=function () {
                if(this.value==""){
                    $FW.Component.Toast("邮箱必填");
                }else if(!CheckMail(this.value)){
                    $FW.Component.Toast("请输入正确的邮箱地址");
                }
            }
        },
        cityblurHandel:function () {
            formdata.city.onblur=function () {
                if(this.value==""){
                    $FW.Component.Toast("所在城市必填");
                }
            }
        }

    };
    console.log(formdata);
    formdata.wechatblurHandel();
    formdata.mailblurHandel();
    formdata.cityblurHandel();

    var submitButton=document.getElementById("submitButton");
    
    submitButton.onclick=function () {
        if(formdata.wechat.value==""){
            $FW.Component.Toast("微信必填");
        }else if(formdata.mailPart.value==""){
            $FW.Component.Toast("邮箱必填");
        }else if(!CheckMail(formdata.mailPart.value)){
            $FW.Component.Toast("请输入正确的邮箱地址");
        }else if(formdata.city.value==""){
            $FW.Component.Toast("所在城市必填");
        }else{

            $FW.Ajax({
                url :  API_PATH +"/mpwap/api/v1/collectUserInfo.shtml",
                method: "GET",
                data : {
                    city:formdata.city.value,
                    email:formdata.mailPart.value,
                    phoneNo:formdata.phonePart.innerText,
                    username:formdata.username.innerText,
                    weChatNo:formdata.weChatNo.value
                },
                success: function(data) {
                    console.log(data);

                }
            });

        }


    }

    function CheckMail(mail) {
        var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (filter.test(mail)) return true;
        else {
            return false;}
    }










});

function gotoMall() {
    if ($FW.Browser.inApp()) {
        NativeBridge.gotoMall();
    } else {
        location.href = 'http://mmall.9888.cn'
    }
}