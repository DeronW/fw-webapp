import React, {Component} from 'react'
import PropTypes from 'prop-types'


let instances = [];
const register = (comp) => instances.push(comp);
const unregister = (comp) => instances.splice(instances[comp],1);
const historyPush = (path) => {
    history.pushState({},null,path);
    instances.forEach(instances => instances.forceUpdate())
}
const historyReplace = (path) => {
    history.replaceState({},null,path);
    instances.forEach(instances => instances.forceUpdate())
}
const matchPath = (pathname,options) => {
    const {exact = false, path} = options;
    if(!path){
        return {
            path:null,
            url:pathname,
            isExact:true
        }
    }
    const match = new RegExp(`^${path}`).exec(pathname);
    if(!match){
        return null
    }
    const url = match[0];
    const isExact = pathname === url;
    if(exact && !isExact){
        return null
    }
    return {
        path,url,isExact
    }
}

class Route extends Component{
    static propTypes = {
        path:PropTypes.string,
        exact:PropTypes.bool,

    }
}
