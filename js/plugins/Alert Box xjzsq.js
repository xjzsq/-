// 显示制作者等信息的插件

Scene_Title.prototype.start = function () {
    Scene_Base.prototype.start.call(this);
    SceneManager.clearStack();
    this.centerSprite(this._backSprite1);
    this.centerSprite(this._backSprite2);
    this.playTitleMusic();
    this.startFadeIn(this.fadeSpeed(), false);
    alert("版本：V0.13\n制作者：xjzsq\n");
    alert("操作：全面支持鼠标操作：左键确定；右键返回/菜单\n             按键：Z/Enter/空格键：确定；X/Esc键：返回/菜单");
};
