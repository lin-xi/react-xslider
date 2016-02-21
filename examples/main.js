var Slider = require('../src/XSlider');

var React = require('react');
var ReactDom = require('react-dom');
var injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

var Demo1 = React.createClass({
    render: function(){
        return (
        	<Slider>
				<div className="slider-item">1</div>
				<div className="slider-item">2</div>
				<div className="slider-item">3</div>
			</Slider>
		);
    }
});

var Demo2 = React.createClass({
    render: function(){
    	return (
	        <Slider auto={true} speed={2000}>
				<div className="slider-item">1</div>
				<div className="slider-item">2</div>
				<div className="slider-item">3</div>
				<div className="slider-item">4</div>
				<div className="slider-item">5</div>
				<div className="slider-item">6</div>
				<div className="slider-item">7</div>
				<div className="slider-item">8</div>
			</Slider>
		);
    }
});

var Demo3 = React.createClass({
    render: function(){
    	return (
	        <Slider loop={true} auto={true}>
				<div className="slider-item">1</div>
				<div className="slider-item">2</div>
				<div className="slider-item">3</div>
				<div className="slider-item">4</div>
				<div className="slider-item">5</div>
				<div className="slider-item">6</div>
				<div className="slider-item">7</div>
				<div className="slider-item">8</div>
			</Slider>
		);
    }
});

var Demo4 = React.createClass({
    render: function(){
    	var bannerData = [
			{
				image: 'https://img13.360buyimg.com/da/jfs/t1927/64/1413648216/158937/2fff826c/56555cd9N70ac7a6b.jpg',
				link: 'http://www.jd.com',
			},
			{
				image: 'https://img14.360buyimg.com/da/jfs/t2059/33/1470019226/108175/508876b2/56b084beNad0b6b70.jpg',
				link: 'http://www.jd.com',
			},
			{
				image: 'https://img10.360buyimg.com/da/jfs/t2062/221/1510838633/89510/4998fe7e/56c44183Nb48aa9f9.jpg',
				link: 'http://www.jd.com',
			},
			{
				image: 'https://img12.360buyimg.com/da/jfs/t2521/136/1413367734/118788/7645be30/56c68b57N143a2e6c.jpg',
				link: 'http://www.jd.com',
			},
			{
				image: 'https://img10.360buyimg.com/da/jfs/t2389/198/1486907439/98881/79c0317d/56c42b59Ndc3ff695.jpg',
				link: 'http://www.jd.com',
			}
		];
        return (
        	<Slider lasy={true} loop={true}>
        		{
        			bannerData.map(function(item, i){
        				return (
        					<div className="slider-item">
        						<a href={item.link}><img src={item.image}/></a>
        					</div>
        				);
        			})
        		}
        	</Slider>
        );
    }
});

var Demo5 = React.createClass({
    render: function(){
        return (
        	<Slider paginationHide={true}>
				<div className="slider-item">1</div>
				<div className="slider-item">2</div>
				<div className="slider-item">3</div>
			</Slider>
		);
    }
});

ReactDom.render(<Demo1/>, document.querySelector('#demo1'));
ReactDom.render(<Demo2/>, document.querySelector('#demo2'));
ReactDom.render(<Demo3/>, document.querySelector('#demo3'));
ReactDom.render(<Demo4/>, document.querySelector('#demo4'));
ReactDom.render(<Demo5/>, document.querySelector('#demo5'));


