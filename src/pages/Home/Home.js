import React, { Component } from 'react';

import Swiper from '../../3libs/swiper2/ExpandSlide.js'
import '../../3libs/swiper2/idangerous.swiper.css'
import './home.scss';

class HomeSwiper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: [
                'http://192.168.5.102/sysware/download/?ID=20180712161642000380b196e3f1623c49da9f53',
                'http://192.168.5.102/sysware/download/?ID=201807121640060006073dffb7b8657a4015a946',
                'http://192.168.5.102/sysware/download/?ID=201807121636490006597072e72a6f4244a7a52a'
            ]
        }
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.mySwiper = new Swiper('.swiper-container', {
            autoplay : 5,
            nextBtn : $('.swiper-container .btn-next'),
            prevBtn : $('.swiper-container .btn-prev'),
        })
    }
    componentWillUnmount() {
        this.mySwiper.destroy()
    }
    render() {
        return (
            <div className="swiper-outer">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            this.state.slides.map((slide,index) =>{
                                return <div key={index} className="swiper-slide"> <img src={slide} /> </div>
                            })
                        }
                    </div>
                    <a className="btn-prev"></a>
                    <a className="btn-next"></a>
                </div>
                <div className="pagination"></div>
            </div>
        )
    }
}

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    _handleClick() {
        this.setState({
            count: ++this.state.count
        });
    }

    render() {
        return (
            <div>
                <HomeSwiper />
            </div>
        )
    }
}