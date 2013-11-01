var UIButton = cc.Sprite.extend({
	onClick : null,
	_component : null,
	_label : null,
	parent:null,
	ctor : function(x, y, width, height) {
		this._super();
		this.init();
		var component = new UIComponent();
		this.setPosition(cc.p(x,y));
		component.setBounds(width, height);
		this.addChild(component._target, 1);
		this._component = component;
	},
	add : function(child) {
		child._component.__parent = this;
		child._component.computeAbsolutePosition();
		this.addChild(child, 2);
	},
	setParent:function(parent){
		this.parent=parent;
		this.setPosition(cc.pAdd(this.getPosition(),cc.p(-parent._component.width/2,-parent._component.height/2)));
	},
	onEnter : function() {
		cc.registerTargetedDelegate(0, true, this);

		this._component.init("button", true);

		this.scheduleUpdate();
		this.updateUI();

		this._super();
	},
	setText : function(text) {
		this._label = cc.LabelTTF.create(text, "Arial", 20);
		this._label.setColor(cc.c3(255, 255, 255));
		this._label.setPosition(cc.p(0,0));
		this.addChild(this._label, 10);
	},
	onExit : function() {
		cc.unregisterTouchDelegate(this);
		this._component.release();
		this._super();
	},
	onTouchBegan : function(touch, event) {
		var point = this.getParent().convertToWorldSpace(this.getPosition());
		var touchPoint = touch.getLocation();
		var rect = cc.rect(point.x-this._component.width/2,point.y-this._component.height/2,this._component.width,this._component.height);
		if (cc.rectContainsPoint(rect, touchPoint)) {
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

	addActionListener : function(event) {
		this.onClick = event;
	},
	updateUI : function() {
		this._component.updateUI(0.196, 0.188, 0.18, 0);
	}
});
