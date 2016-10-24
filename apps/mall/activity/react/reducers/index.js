((global) => {

    let banner = (state = null, action) => {
        switch (action.type) {
            case 'INIT_BANNER':
                return {
                    image: action.image,
                    desc: action.desc,
                    show: action.show
                };
            case 'TOGGLE_BANNER':
                return Object.assign({}, state, {
                    show: !state.show
                });
            default:
                return state;
        }
    };

    let product = (state = {page: 1, products: []}, action) => {
        switch (action.type) {
            case 'ADD_PRODUCTS':
                return Object.assign({}, state, {
                    page: action.page,
                    total_page: action.total_page,
                    products: [...state.products, ...action.products]
                });
            default:
                return state;
        }
    };

    global.reducer = Redux.combineReducers({
        banner,
        product
    })

})(window);
