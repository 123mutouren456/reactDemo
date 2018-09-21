import React, { Component } from 'react';
import { connect } from 'react-redux';
import {conditionsChange,search} from 'actions/searchBar';
import qs from 'qs';
import './search.scss'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount(){
        var data = this.props.location;
        let querys = qs.parse(data.search.substr(1));
        this.props.conditionsChange(querys);
        this.props.search();
    }
    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        let resSearch = this.props.resSearch;
        return (
            <div>
                <div className="main-content">
                    <div className="left-cont">
                        <div className="search-list">
                            <div className="sl-hd" id="sort">
                                <a href="javascript:;" data-sort="" className="cur icon-down">相关性排序</a>
                                <a href="javascript:;" data-sort="putIntoDate_dt">时间排序</a>
                                <a href="javascript:;" data-sort="readTimes">阅读次数</a>
                                <a href="javascript:;" data-sort="scoreNumber">评分次数</a>
                                {resSearch.facet&&resSearch.facet.length ?
                                    <div className="res-groups" id="res-groups">
                                        {
                                            resSearch.facet.map((facet, index) => {
                                                return (<span key={`facet_${index}`}>{`${facet.keywords_facet}（${facet.keywords_facet_count}）`}</span>)
                                            })
                                        }
                                    </div> : null
                                }
                                <div className="res-summary">搜索到约
                                    <span node-id="total">{resSearch.totalNum}</span> 个结果，用时
                                    <span node-id="time">{resSearch.searchTime}</span> 秒</div>
                            </div>
                            <div className="sl-bd">
                                <ul id="articles">
                                    {
                                        resSearch.items?resSearch.items.map((article, index) => {
                                            return (<li key={`arcicle_${index}`}>
                                                <h3>
                                                    <a href="#" dangerouslySetInnerHTML={{__html:article.title}}></a>
                                                    <span className="tp-info">【{article.type}】</span>
                                                </h3>
                                                <dl className="clearfix">
                                                    <dd>
                                                        <div className="tags">
                                                            <a href="">发动机</a>
                                                            <a href="">设计方案</a>
                                                            <a href="">四缸</a>
                                                        </div>
                                                        <div className="msgs" dangerouslySetInnerHTML={{__html:article.summary}}></div>
                                                        <div className="infos">
                                                            <span>浏览：{article.readTimes}</span>
                                                            <span>{article.author}</span>
                                                            <span>{article.updateTime}</span>
                                                        </div>
                                                    </dd>
                                                </dl>
                                            </li>)
                                        }):null
                                    }
                                </ul>
                            </div>
                        </div>
                        <div className="pagecont">
                            <ul id='pageLimit'></ul>
                        </div>
                    </div>
                    <div className="side-cont">
                        <div className="card relation-map">
                            <h3>语义关系图查找
                                <a href="javascript:;">详情>></a>
                            </h3>
                            <div className="noresult">
                                <h5>抱歉！</h5>
                                <p>尚未找到与搜索词相关的语义关系图，
                                    <br />您可以换个搜索词试试，
                                    <br />或者丰富相关词的语义词库...</p>
                            </div>
                            <form name="relatedWordForm" method="get" id="relatedWordForm" target="_blank" action="${keProductUrl}/ke/searcher/gotoMyKnowledgeSearchMain.KEmesh">
                                <input type="hidden" name="searchword" id="_searchword" value="" />
                                <input type="hidden" name="selectMenuId" id="selectMenuId" value="1-2" />
                            </form>
                            <div className="search-link" id="relationPictureDiv">
                                <input id="animate" checked="true" type="hidden" />
                                <div id="relationPicture"></div>
                            </div>
                        </div>
                        <div className="card">
                            <h3>相关搜索</h3>
                            <ul id="related">
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                                <li>
                                    <a href="#">发动机管理系统</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        resSearch: state.searchBar.resSearch
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        conditionsChange: (conditions) => {
            dispatch(conditionsChange(conditions))
        },
        search(){
            dispatch(search())
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);