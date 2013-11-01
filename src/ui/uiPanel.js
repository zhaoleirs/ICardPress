var UIPanel = cc.Sprite.extend({
	onClick : null,
	_component : null,
	ctor : function(x, y, width, height) {
		this._super();
		this.init();
		var component = new UIComponent();
		component._rect = cc.rect(x, y, width, height);
		component.setBounds(x, y, width, height);
		this.addChild(component._target, 1);
		this._component = component;
	},
	add : function(child) {
		child.setParent(this);
		this.addChild(child, 2);
	},
	setParent:function(parent){
		this.parent=parent;
		this.setPosition(cc.pAdd(this.getPosition(),cc.p(-parent._component.width/2,-parent._component.height/2)));
	},
	onEnter : function() {
		cc.registerTargetedDelegate(0, true, this);

		this._component.init("beibaokuan",false);

		this.scheduleUpdate();
		this.updateUI();

		this._super();
	},
	onExit : function() {
		cc.unregisterTouchDelegate(this);
		this._component.release();
		this._super();
	},
	onTouchBegan : function(touch, event) {
		var touchPoint = touch.getLocation();
		var rect = this._component.getAbsolutePosition();
		//cc.log("touch:" + rect.x+ "," + rect.y
		//	 + "," + rect.width + "," + rect.height + "," + ":" + touchPoint.x + "," + touchPoint.y);
		if (cc.rectContainsPoint(rect, touchPoint)) {
			cc.log(222);
			if (this.onClick != null)
				this.onClick();
			return true;
		}
		return false;
	},
	onTouchMoved : function(touch, event) {
	},
	onTouchEnded : function(touch, event) {
	},
	touchDelegateRetain : function() {
	},
	touchDelegateRelease : function() {
	},
	invalidate : function(parent) {
		this._component.__parent = parent;
		this._component.computeAbsolutePosition();
		this.setPosition(this._component._rect.x,this._component._rect.y);
	},

	addActionListener : function(event) {
		this.onClick = event;
	},
	updateUI : function() {
		this._component.updateUI(0.196, 0.188, 0.18, 1);
	}
});
