import React,{ Component } from 'react';
import { Link } from 'react-router'
export default class app extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {/* <ul className={'nnnnn'}>
                    <li><Link to="/a" activeClassName="active">a</Link></li>
                    <li><Link to="/b" activeClassName="active">b</Link></li>
                    <li><Link to="/login" activeClassName="active">n</Link></li>
                </ul> */}
            </div>
        );
    }
}

