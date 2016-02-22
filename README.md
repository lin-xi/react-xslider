React-xslider
====

    >slider是一个轮播组件，实现了swiper的主要功能，自动播放，无限循环，以及swiper不具备的懒加载模式。
	
## 特性
	* 体积小，没压缩的源代码才13kb
	* 功能丰富，麻雀虽小，脏腑俱全
	* 懒加载，提高移动端页面性能的利器
	* 自定义样式，简单实用
	
--------
	
##依赖
    <label>react</label>
    
--------
	
##安装：
    >npm install react-xslider --save
    
--------

##所有配置项 props

    auto: bool,  是否自动播放
    speed: number, 自动播放时间间隔
    loop: bool, 是否无限循环
    lasy: bool, 是否懒加载
    paginationHide: bool, 是否隐藏分页器
	
--------

###[最基本demo1](http://lin-xi.github.io/react-xslider)
    
###[最基本demo2 auto自动播放](http://lin-xi.github.io/react-xslider)

###[最基本demo3 loop无限循环](http://lin-xi.github.io/react-xslider)

###[最基本demo4 lasy懒加载模式](http://lin-xi.github.io/react-xslider)

	
	懒加载模式，适用于items很多, 或者图片懒加载的情景</h2>
    dom中永远都只动态加载3个slider-item，不会因为items很多导致性能问题<br>
    可以用于页面之间的切换
	
###[最基本demo5 paginationHide不显示分页器](http://lin-xi.github.io/react-xslider)


###[自定义分页器样式](http://lin-xi.github.io/react-xslider)

    ```
		.slider-pagination {
			position: absolute;
			bottom: 5px;
			right: 20px;

			span{
				display: inline-block;
				width: 10px;
				height: 10px;
				border-radius: 100%;
				background-color: #ccc;
				margin-right: 5px;
			}
			span.active{
				background-color: #ff2d4b;
			}
		}
    ```
