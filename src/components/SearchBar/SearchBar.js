import React, { Component } from 'react';
// import {HashRouter as Router} from 'react-router-dom';
const PropTypes = require('prop-types');
import { connect } from 'react-redux';
import { conditionsChange, search } from 'actions/searchBar';
import qs from 'qs';
import './searchbar.scss'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleChange(e) {
        this.props.conditionsChange({
            keywords:e.target.value
        })
    }
    handleSearch() {
        // this.props.search();
        let path = `/search?conditions=${qs.stringify(this.props.conditions)}`
        this.context.router.history.push(path)
    }
    handleKeyDown(e) {
        if (e.keyCode == 13) {
            this.handleSearch()
        }
    }
    handleRootCate(type,e){
        let selectedTypes = this.props.conditions.searchTypes.split(',');
        if(this.searchTypeSelected(type)){
            selectedTypes = selectedTypes.filter(item =>item!=type)
        }else{
            selectedTypes.push(type)
        }
        this.props.conditionsChange({
            searchTypes:selectedTypes.join(',')
        })
    }
    searchTypeSelected(type){
        if(this.props.conditions.searchTypes.indexOf(type)>-1){
            return true;
        }
        return false;
    }
    handleExpand(e){
        e.preventDefault();
        e.stopPropagation();
    }
    render() {
        return (
            <div className="search-wrapper">
                <div className="search-inputs">
                    <span>主题</span>
                    <input type="text" name="keywords" id="keyword" value={this.props.conditions.keywords} placeholder="主题" onKeyDown={this.handleKeyDown.bind(this)} onChange={this.handleChange.bind(this)} />
                    <a href="javascript:;" className="btn-search" onClick={this.handleSearch.bind(this)}></a>
                    <a href="javascript:;">高级搜索</a>
                </div>
                <div className="search-types">
                    <ul className="root-cates">
                        <li className={this.searchTypeSelected("center")?"active":""} onClick={this.handleRootCate.bind(this,"center")}><span>知识中心</span><i></i><a href="javascript:;" onClick={this.handleExpand.bind(this)}></a></li>
                        <li className={this.searchTypeSelected("mdm")?"active":""} onClick={this.handleRootCate.bind(this,"mdm")}><span>MDM库</span><i></i><a href="javascript:;" onClick={this.handleExpand.bind(this)}></a></li>
                        <li className={this.searchTypeSelected("wiki")?"active":""} onClick={this.handleRootCate.bind(this,"wiki")}><span>知识百科</span><i></i><a href="javascript:;" onClick={this.handleExpand.bind(this)}></a></li>
                    </ul>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        resSearch: state.searchBar.resSearch,
        conditions: state.searchBar.conditions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        conditionsChange: (conditions) => {
            dispatch(conditionsChange(conditions))
        },
        search() {
            dispatch(search())
        }
    }
};

SearchBar.contextTypes = {
    router: PropTypes.object
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);