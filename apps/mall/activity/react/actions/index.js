((global) => {

    global.initBanners = (data) => {
        return {
            type: 'INIT_BANNER',
            image: data.img,
            desc: data.desc,
            show: false
        }
    };

    global.toggleBanner = () => {
        return {
            type: 'TOGGLE_BANNER'
        }
    };

    global.addProducts = (data) => {
        return {
            type: 'ADD_PRODUCTS',
            page: data.page,
            total_page: data.pages,
            products: data.products
        }
    };

    global.fetchActivity = () => {
        return (dispatch) => {
            let bizNo = $FW.Format.urlQuery().bizNo;
            $FW.Ajax({
                url: `${API_PATH}/mall/api/index/v1/activity.json?bizNo=${bizNo}`,
                success: data => dispatch(initBanners(data))
            })
        }
    };

    global.fetchProducts = (page, done) => {
        return (dispatch) => {
            let bizNo = $FW.Format.urlQuery().bizNo;
            $FW.Ajax({
                url: `${API_PATH}mall/api/index/v1/search.json`,
                data: {
                    page: page,
                    actIds: bizNo,
                    searchSourceType: 5,
                    prefectureType: 5,
                    order: -1,
                },
                enable_loading: true
            }).then(data => {
                dispatch(addProducts(data));
                done && typeof (done) == 'function' && done();
            });
        }
    }

})(window);
