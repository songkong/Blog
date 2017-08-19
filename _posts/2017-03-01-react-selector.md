---
layout: post
title:  "React + Redux 实战：Selector App"
date:   2017-03-01 18:00:30 +0800
categories: [Tech]
excerpt: Selector 能够帮你化解生活中的选择困难问题，比如`吃什么`，`去哪玩`。
tags:
  - CN
  - front-end
  - React
  - Redux
---

开发中使用到的技术：React + Redux + Gulp + Browserify。利用`Browserify`，可以将`JSX`转化为`JS`代码，同时允许使用`require`实现项目的模块化。`Gulp`完成代码的打包。`Browserify`和`Gulp`的相关代码在`gulpFile.js`中，比较简单，不在此赘述。

![selector_first](http://oty92p38d.bkt.clouddn.com/react-selector/selector_first.jpg)

项目中，需要实现四个组件：CanvasComponent、InputComponent、ListComponent 和 MenuComponent。

![selector_second](http://oty92p38d.bkt.clouddn.com/react-selector/selector_second.jpg)

# Redux

---

## Action/type.js

在`Redux`中，`type`告诉`reducer`这是何种`action`。

{% highlight javascript %}
const actionType = {
    INSERT_ITEM: 'INSERT_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    DISPLAY_MENU: 'DISPLAY_MENU',
    TOGGLE_BTN: 'TOGGLE_BTN'
};

module.exports = actionType;
{% endhighlight %}

## Action/action.js

根据上面的`type`，列出相应的`action creator`。

{% highlight javascript %}
var type = require('./type');

var action = {
    insertItem: function (value) {
        return {
            type: type.INSERT_ITEM,
            value
        }
    },
    deleteItem: function (id) {
        return {
            type: type.DELETE_ITEM,
            id
        }
    },
	// 菜单的展示与隐藏
    displayMenu: function () {
        return {
            type: type.DISPLAY_MENU
        }
    },
	// 转换按钮的状态
    toggleBtn: function () {
        return {
            type: type.TOGGLE_BTN
        }
    }
} ;

module.exports = action;
{% endhighlight %}

## Reducer/data.js

存储默认的数据，格式为：

{% highlight javascript %}
var menuList = [
    {
        'value': '螺狮粉',
        'id': 1
    },
	...
];
module.exports = menuList;
{% endhighlight %}

## Reducer/reducer.js

首先判断`localStorage`中是否存在数据，若不存在，用`data.js`中的数据初始化，若存在，读取`localStorage`中的数据。

{% highlight javascript %}
var menuList = require('./data.js');
var type = require('../Action/type.js');

// localStorage
var local = {
    // load data.js
    initLocal: function (data) {
        var self =  this;
        self.set('nextId', data.length + 1);
        data.forEach(function (item) {
            self.set(item.id, item.value);
        });
    },
    isEmpty: function () {
        return !localStorage.length;
    },
    set: function (key, value) {
        localStorage.setItem(key, value);
    },
    get: function (key) {
        return localStorage.getItem(key);
    },
    remove: function (key) {
        localStorage.removeItem(key);
    },
    // Copy the data to menuList
    clone: function () {
        var copy = [];
        var keySet = [];
        for (var i = localStorage.length-1; i >= 0; i--) {
            var key = localStorage.key(i);
            if (key != 'nextId') {
                keySet.push(key);
            }
        }
        // Reverse order to make the inserted item at the top of the list
        keySet.sort(function (pre, next) {
            return -(pre - next);
        });
        for (var j = 0; j < keySet.length; j++) {
            copy.push({
                id: keySet[j],
                value: this.get(keySet[j])
            });
        }
        return copy;
    }
};

/* state = {
        beginSelect: false,
        isMenuShowed: false,
        isEmptyTextShowed: false,
        menuList: [{id: '123', 'value': 'abc'}]
   }
*/
function updateState(beginSelect, isMenuShowed, isEmptyTextShowed) {
    if (local.isEmpty()){
        local.initLocal(menuList);
    }
    return {
        beginSelect: beginSelect,
        isMenuShowed: isMenuShowed,
        isEmptyTextShowed: isEmptyTextShowed,
        menuList: local.clone()
    };
}
{% endhighlight %}

根据`action`的`type`做相应的处理。

{% highlight javascript %}
function reducer(state, action) {
    if (typeof state === 'undefined') {
        return updateState(false, false, false);
    }
    switch(action.type){
        case type.TOGGLE_BTN:
            if (!state.isMenuShowed) {
                if (state.menuList.length) {
                    return updateState(!state.beginSelect, state.isMenuShowed, false);
                } else {
                    return updateState(state.beginSelect, state.isMenuShowed, true);
                }
            }
            break;
        case type.DISPLAY_MENU:
            if (!state.beginSelect){
                return updateState(state.beginSelect, !state.isMenuShowed, state.isEmptyTextShowed);
            }
            break;
        case type.DELETE_ITEM:
            local.remove(action.id);
            return updateState(state.beginSelect, state.isMenuShowed, state.isEmptyTextShowed);
        case type.INSERT_ITEM:
            local.set(local.get('nextId'), action.value);
            local.set('nextId', parseInt(local.get('nextId')) + 1);
            return updateState(state.beginSelect, state.isMenuShowed, false);
    }
    return state;
}
module.exports = reducer;
{% endhighlight %}

# React

---

## canvas.js

`canvas.js`渲染主界面，包含人的眼睛、嘴、显示框和按钮。该组件需要外部传入三个`props`: btnText = {start: "xxx", stop: "xx"}, initText = "xxxx", blankText = "xxxx"。分别表示按钮的文本、显示框初始文本和菜单无数据时的显示框的文本。

{% highlight javascript %}
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var CanvasComponent = React.createClass({
    eyes: {
        leftEye: {
            x: 125,
            y: 350,
            radius: 40
        },
        rightEye: {
            x: 265,
            y: 350,
            radius: 40
        }
    },
    timer: null,
    componentDidMount: function () {
        this.initCanvas({count: 0, text: this.props.initText, smile: false});
    },
    componentDidUpdate: function () {
        var self = this;
        var menuLength = self.props.menuList.length;
        if (self.props.beginSelect) {
            var count = 0;
            self.timer = setInterval(function () {
                self.initCanvas({count: count++, text: self.props.menuList[Math.floor(Math.random() * menuLength)].value, smile: false});
            },100);
        } else if(self.props.isEmptyTextShowed) {
            self.initCanvas({count: 0, text: self.props.emptyText, smile: false});
        } else if(self.timer){
            clearInterval(self.timer);
            self.timer = null;
            self.initCanvas({count: 5, text: self.props.menuList[Math.floor(Math.random() * menuLength)].value, smile: true});
        } else {
            self.initCanvas({count: 0, text: self.props.initText, smile: false});
        }
    },
    drawEyes: function (option) {
        var ctx =  option.ctx;
        var params = this.eyes[option.direction];
        var deg = 2 * Math.PI / 360 * option.deg;
        var x_offset = 21 * Math.cos(deg);
        var y_offset = 21 * Math.sin(deg);
        ctx.lineWidth=5;
        ctx.strokeStyle="#fff";
        ctx.beginPath();
        ctx.arc(params.x, params.y, params.radius, 0, Math.PI * 2, true);
        ctx.stroke();
        ctx.closePath();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(params.x  + x_offset, params.y  + y_offset, params.radius / 4, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.closePath();
    },
    drawMouse: function (option) {
        var ctx = option.ctx;
        ctx.fillStyle="#fff";
        ctx.beginPath();
        if (option.smile) {
            ctx.arc(195, 420, 40, 0, Math.PI, false);
        } else {
            ctx.arc(195, 440, 10, 0, Math.PI * 2, true);
        }
        ctx.fill();
        ctx.closePath();
    },
    drawBox: function (option) {
        var ctx = option.ctx;
        var text = option.text;
        ctx.strokeStyle="#fff";
        ctx.moveTo(264, 275);
        ctx.lineTo(250, 240);
        ctx.moveTo(263, 275);
        ctx.lineTo(285, 240);
        ctx.lineTo(325, 240);
        ctx.arcTo(345, 240, 345, 220, 20);
        ctx.arcTo(345, 60, 325, 60, 20);
        ctx.arcTo(55, 60, 55, 80, 20);
        ctx.arcTo(55, 240, 75, 240, 20);
        ctx.lineTo(252,240);
        ctx.stroke();
        ctx.fillStyle = '#fff';
        ctx.font = "32pt Calibri";
        ctx.textAlign = 'center';
        ctx.fillText(text,200,165,240);
    },
    initCanvas: function (option) {
        var deg = option.count* 36 + 90;
        var ctx = this.refs.canvas.getContext('2d');
        ctx.fillStyle = '#82ebc6';
        ctx.fillRect(0,0,400,500);
        this.drawEyes({ctx: ctx, direction: 'leftEye', deg: deg});
        this.drawEyes({ctx: ctx, direction: 'rightEye', deg: deg});
        this.drawMouse({ctx: ctx, smile: option.smile});
        this.drawBox({ctx: ctx, text: option.text});
    },
    render: function () {
        var currentText = this.props.beginSelect? this.props.btnText.stop: this.props.btnText.start;
        return (
            <div className="canvas-wrapper">
                <canvas ref="canvas" width={400} height={500} />
                <div className="btn-wrapper">
                    <div onClick={this.props.clickHandler} className="btn-primary">{currentText}</div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state)  {
    return {
        beginSelect: state.beginSelect,
        isEmptyTextShowed: state.isEmptyTextShowed,
        menuList: state.menuList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickHandler: function() {
            dispatch(action.toggleBtn());
        }
    };
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(CanvasComponent);
{% endhighlight %}

其中`mapStateToProps`将`state`映射为组件的`props`，`mapDispatchToProps`实现`action`的分发。

## list.js

`list.js`展现菜单中的一条数据，同时可实现该数据的删除。该组件需要外部传入的`props`为：listText = "xxx"。

{% highlight javascript %}
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var ListComponent = React.createClass({
    render: function () {
        return (
            <li className="menu-item">{this.props.listText}<span className="btn-delete" onClick={this.props.deleteHandler}><i className="icon-trash icon-large"></i></span></li>
        );
    }
});


function mapDispatchToProps(dispatch, ownProps) {
    return {
        deleteHandler: function() {
            dispatch(action.deleteItem(ownProps.id));
        }
    };
}

module.exports = connect(
    null,
    mapDispatchToProps
)(ListComponent);
{% endhighlight %}

## input.js

`input.js`实现了为菜单列表添加数据的功能。

{% highlight javascript %}
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');

var inputValue = '';
var InputComponent = React.createClass({
    handleChange: function (e) {
        inputValue = e.target.value;
    },
    render: function () {
        return (
            <div className="input-wrapper">
                <input type="text" name="input-add" className="menu-input" onChange={this.handleChange}/>
                <button className="btn-add" onClick={this.props.addHandler}>Add</button>
            </div>
        );
    }
});

function mapDispatchToProps(dispatch) {
    return {
        addHandler: function() {
            dispatch(action.insertItem(inputValue));
        }
    };
}
module.exports = connect(
    null,
    mapDispatchToProps
)(InputComponent);
{% endhighlight %}

## menu.js

`menu.js`调用`input.js`和`list.js`，为用户展示备选数据，同时包含一个点击按钮，实现菜单的展示与隐藏。

{% highlight javascript %}
var React = require('react');
var ReactRedux = require('react-redux');
var connect = ReactRedux.connect;
var action = require('../Action/action.js');
var ListComponent = require('./list');
var InputComponent = require('./input');
var MenuComponent = React.createClass({
    render: function () {
        var menuDisplay = this.props.isMenuShowed? 'block': 'none';
        var icon = this.props.isMenuShowed? 'icon-arrow-right': 'icon-arrow-left';
        return (
            <div className="menu-wrapper">
                <div className="btn-menu" onClick={this.props.clickHandler}><i className={icon}></i></div>
                <div className="menu-body" style={/{display: menuDisplay}/}>
                    <InputComponent/>
                    <ul className="menu-detail">
                        {
                            this.props.menuList.map(function(item, index){
                                return <ListComponent listText ={item.value} key ={index} id = {item.id}/>;
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state)  {
    return {
        isMenuShowed: state.isMenuShowed,
        menuList: state.menuList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        clickHandler: function() {
            dispatch(action.displayMenu());
        }
    };
}

module.exports = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuComponent);
{% endhighlight %}

## main.js

`main.js`实现最终的展示。

{% highlight javascript %}
var React = require('react');
var ReactDOM = require('react-dom');
var Redux = require('redux');
var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;
var createStore = Redux.createStore;
var reducer = require('./Reducer/reducer.js');


// Store
var store = createStore(reducer);

var MenuComponent = require('./Component/menu.js');
var CanvasComponent = require('./Component/canvas.js');

ReactDOM.render(
    <Provider store={store}>
        <div>
            <MenuComponent />
            <CanvasComponent className = 'canvas-wrapper' btnText = {/{start: 'Start', stop: 'Stop'}/} initText = '吃什么?' emptyText = "菜单空空如也"/>
        </div>
    </Provider>
    , document.getElementById('main-wrapper'));
{% endhighlight %}

为了让所有组件都能获取到`store`，根组件必须包裹在`Provider`中，并将`store`作为参数传给`Provider`。

# 其它

---

项目中所用的`CSS`和`HTML`在此就不贴出来了，值得一提的是，为了能够在 PC 端和移动端都有良好的展示效果，`HTML`中设置`initial-scale`为 0.8（根据canvas大小和不同机型的分辨率所计算得到）。

[完整代码](https://github.com/songkong/Selector)

[项目展示](http://selector.kongsong.me)