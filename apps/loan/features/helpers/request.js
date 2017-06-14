import { Request } from 'fw-javascripts'

const WrapRequest = options => {
    return Request(Object.assign({}, {}, options))
}

export default WrapRequest