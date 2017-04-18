(function(scope, undefined){

  var FXH = {
    Post: function(url, params, slience){
      var USER = $FW.Store.getUserDict();
      var common_params = {
            sourceType: SOURCE_TYPE,
            userGid: USER.gid,
            userId: USER.id,
            token: USER.token,
            uid: USER.uid
      }
      var merged_params = Object.assign({}, params, common_params)
      return $FW.Post(url, merged_params, 'mini', slience)
  }

  };

  scope.$FXH = FXH;

})(window, undefined)
