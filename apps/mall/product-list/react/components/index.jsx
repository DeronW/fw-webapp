'use strict';
if($FW.Format.urlQuery().searchSourceTypeUrl==1){    	
	$FW.Ajax({
        url: `${API_PATH}/api/v1/user-state-convertible.json`,//登录状态
        success: (data) =>{	                   	
        } 
    });    			    	
};

