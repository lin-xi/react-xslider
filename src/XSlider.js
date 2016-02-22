require('./xslider.less');

define('XSlider', function(){

    return React.createClass({
        propTypes: {
            auto: React.PropTypes.bool,
            speed: React.PropTypes.number,
            loop: React.PropTypes.bool,
            lasy: React.PropTypes.bool,
            paginationHide: React.PropTypes.bool
        },
        getInitialState: function(){
            var me = this;
            if(!me.props.children){
                console.error('no slider items found');
                return;
            }
            return {
                renderData: [], 
                currentIndex: 0,
                w: 0,
                total: me.props.children.length || 1,
                startX: 0,
                curX: 0,
                canDrag: false,
                isBusy: false
            };
        },
        componentDidMount: function(){
            var me = this;
            var slide = me.refs.componentSlider;
            me.state.w = slide.offsetWidth;
            me.refs.sliderWraper.style.width = me.state.renderData.length * me.state.w + "px";
            
            if(me.props.lasy || me.props.loop){
                me.state.curX = -me.state.w;
                me.setTransition(me.refs.sliderWraper, me.state.curX, false);
                if(me.props.loop && !me.props.lasy){
                    me.state.currentIndex = 1;
                }
            }

            me.drawPagination();

            if(me.props.auto){
                me.auto();
            }
        },

        componentWillReceiveProps: function(nextProps){
            var children = nextProps.children;
            this.state.total = children.length;
        },

        auto: function(){
            var me = this;
            var time = me.props.speed || 3000;
            if(time < 300) time = 300;

            if(!me.hasNext()){
                if(!me.state.loop){
                    setTimeout(function(){
                        me.state.currentIndex = 0;
                        me.state.curX = 0;
                        me.draw(0, true);
                        me.auto();
                    }, time);
                }
            } else {
                if(me.state.timer){
                    clearTimeout(me.state.timer);
                }
                me.state.timer = setTimeout(function(){
                    me.next(function(){
                        me.auto();
                    });
                }, time);
            }
        },

        render: function(){
            var me = this;
            if(me.props.lasy){
                me.createLasyRenderData();
            } else {
                if(me.props.loop){
                    me.createLoopRenderData();
                } else {
                    if(me.state.total == 1){
                        me.state.renderData = [me.props.children];
                    } else {
                        me.state.renderData = me.props.children;
                    }
                }
            }

            if(me.state.renderData && me.state.renderData.length > 0){
                return (
                    <div className="component-slider" ref="componentSlider" onTouchStart={this.touchStart} onTouchMove={this.touchMove} onTouchEnd={this.touchEnd}>
                        <div className="slider-wraper" ref="sliderWraper">
                            {me.state.renderData}
                        </div>
                        <div className="slider-pagination" ref="sliderWPager">
                        </div>
                    </div>
                )
            } else {
                return <div></div>;
            }
        },

        createLoopRenderData: function(){
            var me = this;
            var cld = me.props.children;
            if(me.state.total > 1){
                me.state.renderData.length = 0;
                var left = me.state.total-1;
                var right = 0;
                cld.unshift(cld[left]);
                cld.push(cld[right+1]);
                me.state.renderData = cld;
            } else if(me.state.total == 1){
                me.state.renderData = [cld, cld, cld];
            }
        },

        createLasyRenderData: function(){
            var me = this;
            var cld = me.props.children;
            if(me.state.total){
                me.state.renderData.length = 0;
                var left, right;

                if(me.state.total == 1){
                    left = 0;
                    right = 0;
                } else if(me.state.total == 2){
                    if(me.state.currentIndex == 0){
                        left = 1;
                        right = 1;
                    } else if(me.state.currentIndex == 1){
                        left = 0;
                        right = 0;
                    }
                } else {
                    if(me.state.currentIndex == 0){
                        left = me.state.total - 1;
                        right = 1;
                    } else if(me.state.currentIndex == me.state.total - 1){
                        left = me.state.total - 2;
                        right = 0;
                    } else {
                        left = me.state.currentIndex - 1;
                        right = me.state.currentIndex + 1;
                    }
                }
                if(me.state.total > 1){
                    me.state.renderData = [cld[left], cld[me.state.currentIndex], cld[right]];
                } else {
                    me.state.renderData = [cld, cld, cld];
                }
            }
        },

        setTransition: function(dom, x, animate, func){
            var rn = (Math.random() * 1000000).toString(32) + '_' + Date.now().toString(32);
            window[rn] = function(){
                dom.removeEventListener('webkitTransitionEnd', window[rn], false);
                delete window[rn];
                func && func();
            };
            if(animate){
                dom.style.webkitTransition = 'all 0.3s linear';
            } else {
                dom.style.webkitTransition = 'all 0s linear';
            }
            dom.addEventListener('webkitTransitionEnd', window[rn], false);
            dom.style.webkitTransform = 'translate3d(' + x + 'px, 0, 0)';
        },

        touchStart: function(e){
            var me = this;
            if (me.state.isBusy) return;
            var tt = e.targetTouches[0];
            me.state.startX = tt.pageX;
            me.state.canDrag = true;
            if(me.state.timer){
                clearTimeout(me.state.timer);
            }
            e.preventDefault();
        },

        touchMove: function(e){
            var me = this;
            if (me.state.canDrag) {
                var tt = e.changedTouches[0];
                var dis = tt.pageX - me.state.startX;
                this.draw(dis);
            }
            e.preventDefault();
        },

        touchEnd:  function(e){
            var me = this;
            if (me.state.canDrag) {
                me.state.canDrag = false;
                var tt = e.changedTouches[0];
                var offX = tt.pageX - me.state.startX;

                if (Math.abs(offX) > me.state.w / 6) {
                    if (offX > 0) {
                        //swipe right
                        me.prev(function(){
                            if(me.props.auto){
                                me.auto();
                            }
                        });
                    } else {
                        //siwpe left
                        me.next(function(){
                            if(me.props.auto){
                                me.auto();
                            }
                        });
                    }
                } else {
                    me.draw(0, true);
                    if(me.props.auto){
                        me.auto();
                    }
                }
            }
        },

        prev: function(func){
            var me = this;
            if(me.hasPrev()){
                me.draw(me.state.w, true, function(){
                    me.subCurrentIndex();
                    if(me.props.lasy){
                        me.setState(me.state);
                    }
                    me.drawPagination();
                    func && func();
                });
            } else {
                me.draw(0, true);
            }
        },

        next: function(func){
            var me = this;
            if(me.hasNext()){
                me.draw(-me.state.w, true, function(){
                    me.addCurrentIndex();
                    if(me.props.lasy){
                        me.setState(me.state);
                    }
                    me.drawPagination();
                    func && func();
                });
            } else {
                me.draw(0, true);
            }
        },

        addCurrentIndex: function(){
            var me = this;
            if(me.props.lasy){
                if(me.state.currentIndex >= me.state.total-1){
                    me.state.currentIndex = 0;
                } else {
                    me.state.currentIndex += 1;
                }
                me.state.curX = -me.state.w;
                me.setTransition(me.refs.sliderWraper, me.state.curX, false);
                return;
            } 
            if(me.props.loop){
                if(me.state.currentIndex == me.state.renderData.length-2){
                    me.state.currentIndex = 1;
                    me.state.curX = -me.state.currentIndex * me.state.w;
                    me.setTransition(me.refs.sliderWraper, me.state.curX, false);
                } else {
                    me.state.currentIndex += 1;
                    me.state.curX -= me.state.w;
                }
                return;
            } 
            if(me.state.currentIndex < me.state.total-1){
                me.state.currentIndex += 1;
                me.state.curX -= me.state.w;
            }
        },

        subCurrentIndex: function(){
            var me = this;
            if(me.props.lasy){
                // me.state.curX += me.state.w;
                if(me.state.currentIndex == 0){
                    me.state.currentIndex = me.state.total-1;
                } else {
                    me.state.currentIndex -= 1;
                }
                me.state.currentIndex < 0 && (me.state.currentIndex = 0);
                me.state.curX = -me.state.w;
                me.setTransition(me.refs.sliderWraper, me.state.curX, false);
                return;
            }
            if(me.props.loop){
                if(me.state.currentIndex == 1){
                    me.state.currentIndex = me.state.renderData.length-2;
                    me.state.curX = -me.state.currentIndex * me.state.w;
                    me.setTransition(me.refs.sliderWraper, me.state.curX, false);
                } else {
                    me.state.currentIndex -= 1;
                    me.state.curX += me.state.w;
                }
                return;
            }
            if(me.state.currentIndex > 0){
                me.state.curX += me.state.w;
                me.state.currentIndex -= 1;
            }
        },

        hasNext: function(){
            if(!this.props.loop){
                if(this.state.currentIndex < this.state.total-1){
                    return true;
                }
            } else {
                return true;
            }
            return false;
        },

        hasPrev: function(){
            if(!this.props.loop){
                if(this.state.currentIndex > 0){
                    return true;
                }
            } else {
                return true;
            }
            return false;
        },

        draw: function(offset, animate, func){
            var me = this;

            var wrap = me.refs.sliderWraper;
            var items = wrap.querySelectorAll('.slider-item');
            items = Array.prototype.slice.call(items);

            me.state.isBusy = true;
            me.setTransition(wrap, me.state.curX + offset, animate, function(){
                me.state.isBusy = false;
                func && func();
            });
        },

        drawPagination: function(){
            var me = this;
            if(!me.props.paginationHide){
                var pager = this.refs.sliderWPager;
                var locators = [];
                for (var i = 0; i < me.state.total; i++) {
                    var span, idx;
                    if(me.props.lasy){
                        idx = i - 1;
                    } else {
                        idx = i;
                    }
                    if(me.state.currentIndex == idx){
                        span = '<span class="active"></span>';
                    } else {
                        span = '<span></span>';
                    }
                    locators.push(span);
                }
                pager.innerHTML = locators.join('');
            }
        }

    });
    
});