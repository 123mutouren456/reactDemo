import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getHeaderNav } from "actions/navigator";
import SearchBar from '../SearchBar/SearchBar';
import './header.scss'

class KnowledgeNav extends Component {
    render() {
        let children = this.props.navdata.children;
        return (
            <div className="subnav kesource">
                <div className="info fl">
                    <img src={require("../../static/imgs/u893.png")} alt="" />
                    <h4>{this.props.navdata.name}</h4>
                    <p>管理和展示企业的核心知识资源。可按类别查阅各资源库的基础信息、数据条目和详情。</p>
                </div>
                <div className="list fl">
                    {
                        children.map((cate,idx) =>{
                            return (<dl key={`c${idx}`}>
                                <dt><a href="javascript:;">{cate.name}</a></dt>
                                {
                                    cate.children.map((c_cate,index) =>{
                                        return (<dd key={`ccate${index}`}><a href="/sysware/ke/portal/model.html" target="_blank" mid="6-2-1-1" className="">{c_cate.name}</a></dd>)
                                    })
                                }
                            </dl>)
                        })
                    }
                </div>
            </div>
        )
    }
}

class Header extends Component {
    componentWillMount() {
        this.props.getHeaderNav()
    }
    render() {
        let navlist = this.props.navigator.navlist || [];
        const listItems = navlist.map((nav, i) =>
            <li key={i}>
                <Link to="/">{nav.name}</Link>
                {nav.children.length ? (nav.name !== "知识资源库" ? <ul className="subnav">
                    {
                        nav.children.map((c, i) => {
                            return (<li key={i}><Link to="/">{c.name}</Link></li>)
                        }) 
                    }
                </ul>: <KnowledgeNav navdata={nav} />) : null}
            </li>
        );
        return (
            <div className="headerbg">
                <div className="header">
                    <div className="topbar clearfix">
                        <div className="toplogo fl"><image src={require("../../static/imgs/logo.png")}></image>
                        </div>
                        <ul className="navbar-content fl">
                            {listItems}
                        </ul>
                        <div className="usernav fr">
                            <a href="javascript:;">黄雪妮</a>
                            <a href="javascript:;" className="inform">
                                <span>消息</span>
                                <i>6</i>
                            </a>
                            <a href="javascript:;" id="logoutBtn">退出</a>
                        </div>
                    </div>
                    <SearchBar />
                    {/* <ul>
                        <li><Link to="/">首页</Link></li>
                        <li><Link to="/page1">Page1</Link></li>
                        <li><Link to="/counter">Counter</Link></li>
                        <li><Link to="/userinfo">UserInfo</Link></li>
                    </ul> */}
                </div>
            </div>
        )
    }
}

export default connect((state) => ({ navigator: state.navigator }), { getHeaderNav })(Header);