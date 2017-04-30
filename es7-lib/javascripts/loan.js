import Request from './core/request'

class $LOAN {
    static Post(options) {
        return (new RequestFactory()).emit(options)
    }
}

export default $LOAN
