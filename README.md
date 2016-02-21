<style type="text/css">
	body{
		font-family: "Microsoft Yahei";
		font-size: 16px;
	}
	label{
		display: inline-block;
		padding: 5px 10px;
		background-color: #e5e5e5;
		border-radius: 4px;
		margin-right: 5px;
		margin-bottom: 5px;
	}
</style>
	
<h1>React-xslider</h1>
<hr>
    <p>
        <label>slider是一个轮播组件，实现了swiper的主要功能，自动播放，无限循环，以及swiper不具备的懒加载模式。</label>
    </p>
    <p>
        <b>优点：</b>
        <label>体积小，没压缩的源代码才13kb</label><br>
        <label>功能丰富，麻雀虽小，脏腑俱全</label><br>
        <label>懒加载，提高移动端页面性能的利器</label><br>
        <label>自定义样式，简单实用</label><br>
    </p>
	<p>
        <b>安装：</b>
        <label>npm install react-xslider --save</label>
    </p>
    <p>
        <b>依赖：</b>
        <label>react</label><label>react-tap-event-plugin</label>
    </p>
    <hr>
    <br>
    所有配置项 props <br><br>

    <label>auto:</label> bool,  是否自动播放<br>
    <label>speed:</label> number, 自动播放时间间隔<br>
    <label>loop:</label> bool, 是否无限循环<br>
    <label>lasy:</label> bool, 是否懒加载<br>
    <label>paginationHide:</label> bool, 是否隐藏分页器<br>
    <br>
    <hr>

    <h2>最基本</h2>
    <div id="demo1"></div>
    <br>

    <h2>自动播放</h2>
    <div id="demo2"></div>
    <br>

    <h2>loop无限循环</h2>
    <div id="demo3"></div>
    <br>

    <h2>懒加载模式，适用于items很多, 或者图片懒加载的情景</h2>
    dom中永远都只动态加载3个slider-item，不会因为items很多导致性能问题<br>
    可以用于页面之间的切换<br>
    <br>
    <div id="demo4"></div>

    <h2>不显示分页器</h2>
    <div id="demo5"></div>

    <h2>自定义分页器样式</h2>
    <div id="demo6">
        <textarea>
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
        </textarea>
    </div>
    
    <hr>
    <br>
    联系我<br><br>
    linxi@iwaimai.baidu.com<br>