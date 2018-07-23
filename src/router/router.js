import React from 'react'
import { Router, Route, hashHistory,IndexRedirect } from 'react-router'
import App from '../App'
import * as Index from '../pages/index'
import navkeep from '../pages/navkeep'


function onEntry(e,replace,back){               //拦截
    // console.log(e)
    if(e.location.pathname.indexOf('system')===-1){
        back()
    }else{
        replace({ pathname: '/login' })
        setTimeout(()=>{
            back()                              //跳转  否则 阻塞
        },2000)
    }
}


export default () => (                          //路由
    <Router history={hashHistory}>
        <Route path="/" component={App} onEnter={onEntry}>
            <IndexRedirect to="home"/>
            <Route path="/home" component={Index.home} />
            <Route path="/a" component={navkeep.a} />
            <Route path="/b" component={navkeep.b} />
            <Route path="/c" component={navkeep.c} />
        </Route>
        <Route path="/login" component={Index.login} />
        <Route path="*" component={Index.errors} />
    </Router>
)
