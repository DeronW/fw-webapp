(function(){
    $FW.Store = {
        getUserToken:function(){
            if(!window.localStorage.userToken){
                window.localStorage.setItem("userToken","not-exist-token");
            }
            return window.localStorage.getItem("userToken") || window.localStorage.userToken;
        },
        getUserId: function() {
            if(!window.localStorage.userId){
                window.localStorage.setItem("userId","not-exist-userId");
            }
            return window.localStorage.getItem("userId") || window.localStorage.userId;
        },
        getUserGid: function() {
            if(!window.localStorage.userGid){
                window.localStorage.setItem("userGid","not-exist-userGid");
            }
            return window.localStorage.getItem("userGid") || window.localStorage.userGid;
        }
    }
})();
