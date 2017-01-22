(function(){
    $FW.Store = {
        get: function(store){
            if(store.userToken){
                store.userToken = 'not-exist-token';
            }
            if(store.userId){
                store.userId = 'not-exist-userId';
            }
            if(store.userGid){
                store.userGid = 'not-exist-userGid';
            }
            return {
                userToken:window.localStorage.getItem(store.userToken) || store.userToken,
                userId:window.localStorage.getItem(store.userId) || store.userId,
                userGid:window.localStorage.getItem(store.userGid) || store.userGid
            }
        }
    }
})();
