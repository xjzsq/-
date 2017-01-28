
//=============================================================================
// Window_wheel.js
//=============================================================================
/*:
 * @plugindesc 添加通过  鼠标滚轮或触摸移动  改变数字的方法
 * @author wangwang
 *
 * @param NumberInput_z
 * @desc 数字输入窗口,默认1个数字所需的移动距离
 * @default 50
 *
 * @param Options_z
 * @desc 选项窗口,默认1次操作所需的移动距离
 * @default 50
 *
 * @param ShopNumber_z
 * @desc 商店窗口默认1个数字所需的移动距离
 * @default 50
 *
 * @help
 * 商店数字 ,数字输入 ,选项窗口
 *
 */




(function() {

var Window_wheel_ShopNumber_z = parseInt(PluginManager.parameters("Window_wheel")["ShopNumber_z"], 10); 
var Window_wheel_Options_z = parseInt(PluginManager.parameters("Window_wheel")["Options_z"], 10); 
var Window_wheel_NumberInput_z= parseInt(PluginManager.parameters("Window_wheel")["NumberInput_z"], 10); 




//滚轮相关
//商店
Window_ShopNumber.prototype.scrollUp = function() {
    this.changeNumber(1);
};

Window_ShopNumber.prototype.scrollDown = function() {
    this.changeNumber(-1);
};

//数字输入
Window_NumberInput.prototype.scrollUp = function() {
    this.changeDigit(true);
};
Window_NumberInput.prototype.scrollDown = function() {
    this.changeDigit(false);
};


//滚轮
Window_Options.prototype.scrollUp = function() {
	var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value += this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, true);
    }
};

Window_Options.prototype.scrollDown = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);
    if (this.isVolumeSymbol(symbol)) {
        value -= this.volumeOffset();
        value = value.clamp(0, 100);
        this.changeValue(symbol, value);
    } else {
        this.changeValue(symbol, false);
    }
};




//触摸相关

//商店
Window_ShopNumber.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
            this.Touchmovest()
        } else if (TouchInput.isTriggered() ){
	            this.Touchmovest()
        } else if (TouchInput.isPressed() && TouchInput.isMoved()){
                this.Touchmove()
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};



Window_ShopNumber.prototype.Touchmovest = function() {
	this._touch_x = TouchInput.x  
    this._touch_y = TouchInput.y
    this._touch_z = 0
}


Window_ShopNumber.prototype.Touchmove = function () {
    var x = TouchInput.x 
        x = x - this._touch_x  
    var y = TouchInput.y 
        y = this._touch_y - y

    this._touch_z = this._touch_z || 0

    
    var z = Math.floor((x+y)/ Window_wheel_ShopNumber_z) 
    if (!isNaN(z)){
	    if (this._touch_z !== z){
			this.changeNumber(z-this._touch_z)
			this._touch_z = z 
	    }
	}
}


//选项
Window_Options.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isTriggered()&& !this.isTouchedInsideFrame()  ){
	            this.Touchmovest()
        } else if (TouchInput.isPressed()&& !this.isTouchedInsideFrame() && TouchInput.isMoved()){
                this.Touchmove()
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};




Window_Options.prototype.Touchmovest = function() {
	this._touch_x = TouchInput.x  
    this._touch_y = TouchInput.y
    this._touch_z = 0
}


Window_Options.prototype.Touchmove = function () {
	
    var x = TouchInput.x 
        x = x - this._touch_x  
        
    var y = TouchInput.y 
        y = this._touch_y - y

    this._touch_z = this._touch_z || 0
    
    var z = Math.floor((x+y)/ Window_wheel_Options_z)
    if (!isNaN(z)){
	    if (this._touch_z !== z){
	        if (this._touch_z < z){
		        for (var i = this._touch_z ;i<z ;i++){
	 				this.scrollUp()
		        }
		        this._touch_z = z
	        }else if(this._touch_z > z){
		        for (var i = this._touch_z ;i>z ;i--){
	 				this.scrollDown()
		        }
		        this._touch_z = z
	        }  
	    }
    }
}


//数字输入
Window_NumberInput.prototype.processTouch = function() {
    if (this.isOpenAndActive()) {
        if (TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
            this._touching = true;
            this.onTouch(true);
        } else if (TouchInput.isTriggered()&& !this.isTouchedInsideFrame() ){
	            this.Touchmovest()
        } else if (TouchInput.isPressed()&& !this.isTouchedInsideFrame() && TouchInput.isMoved()){
                this.Touchmove()
        } else if (TouchInput.isCancelled()) {
            if (this.isCancelEnabled()) {
                this.processCancel();
            }
        }
        if (this._touching) {
            if (TouchInput.isPressed()) {
                this.onTouch(false);
            } else {
                this._touching = false;
            }
        }
    } else {
        this._touching = false;
    }
};




Window_NumberInput.prototype.Touchmovest = function() {
	this._touch_x = TouchInput.x  
    this._touch_y = TouchInput.y
    this._touch_z = 0
}


Window_NumberInput.prototype.Touchmove = function () {
    var x = TouchInput.x 
        x = x - this._touch_x  
        
    var y = TouchInput.y 
        y = this._touch_y - y

    this._touch_z = this._touch_z || 0
    var z = Math.floor((x+y)/ Window_wheel_NumberInput_z )
    if (!isNaN(z)){
	    if (this._touch_z !== z){
	        if (this._touch_z < z){
		        for (var i = this._touch_z ;i<z ;i++){
	 				this.changeDigit(true)
		        }
		        this._touch_z = z
	        }else if(this._touch_z > z){
		        for (var i = this._touch_z ;i>z ;i--){
	 				this.changeDigit(false)
		        }
		        this._touch_z = z
	        }  
	    }
    }
}
































})();
