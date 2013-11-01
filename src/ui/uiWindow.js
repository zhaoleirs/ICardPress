var WINDOW_STATE_NOTTOUCH = -1;
var WINDOW_STATE_NORMAL = 0;
var WINDOW_STATE_CLOSE = 1;
var WINDOW_STATE_DRAG = 2;
var WINDOW_STATE_CLICK = 3;
var UIWindow = cc.Sprite.extend({
	onClick : null,
	_state : 0,
	_component : null,
	_brush_close : null,
	_lastMovePoint : null,
	_dragable : false,
	ctor : function(x, y, width, height) {
		this._super();
		this.init();
		this.setPosition(cc.p(x,y));
		var component = new UIComponent();
		component.setBounds(width, height);
		this.addChild(component._target, 1);
		this._component = component;
		
		
	},
	add : function(child) {
		child.setParent(this);
		this.addChild(child, 2);
	},
	onEnter : function() {
		this._super();
		cc.registerTargetedDelegate(0, true, this);

		this._component.init("window",false);

		var brush_close = cc.Sprite.create("ui/window_close.png");
		brush_close.retain();
		this._brush_close = brush_close;

		this.scheduleUpdate();
		this.updateUI();

	},
	onExit : function() {
		this._super();
		cc.unregisterTouchDelegate(this);
		this._component.release();
		this._brush_close.release();

	},
	onTouchBegan : function(touch, event) {
		cc.log("state:" + this._state);
		if (this._state != WINDOW_STATE_NORMAL)
			return false;
		if ((this._state = this.containsTouchLocation(touch)) == WINDOW_STATE_NOTTOUCH) {
			this._state = WINDOW_STATE_NORMAL;
			return false;
		}
		return true;
	},
	containsTouchLocation : function(touch) {
		var touchPoint = touch.getLocation();
		var point = this.getParent().convertToWorldSpace(this.getPosition());
		var rect = cc.rect(point.x-this._component.width/2,point.y-this._component.height/2,this._component.width,this._component.height);
		
		var close_width = this._brush_close.getContentSize().width;
		var close_height = this._brush_close.getContentSize().height;
		var closeRect = cc.rect(rect.x + rect.width - close_width, rect.y + rect.height - close_height, close_width, close_height);
		if (cc.rectContainsPoint(rect, touchPoint)) {
			if (cc.rectContainsPoint(closeRect, touchPoint)) {

				return WINDOW_STATE_CLOSE;
			} else if (touchPoint.y >= closeRect.y) {
				this._lastMovePoint = touchPoint;
				return WINDOW_STATE_DRAG;
			} else if (this.onClick != null) {
				return WINDOW_STATE_CLICK;
			}
		}
		return WINDOW_STATE_NOTTOUCH;
	},
	onTouchMoved : function(touch, event) {
		if (this._dragable) {
			var touchPoint = touch.getLocation();
			//touchPoint = cc.Director.getInstance().convertToGL( touchPoint );
			if (this._state == WINDOW_STATE_DRAG) {
				var addX = touchPoint.x - this._lastMovePoint.x;
				var addY = touchPoint.y - this._lastMovePoint.y;
				this.setPositionX(this.getPositionX() + addX);
				this.setPositionY(this.getPositionY() + addY);
				this._lastMovePoint = touchPoint;
			}
		}
	},
	onTouchEnded : function(touch, event) {
		var touchPoint = touch.getLocation();
		var close_width = this._brush_close.getContentSize().width;
		var close_height = this._brush_close.getContentSize().height;
		var point = this.getParent().convertToWorldSpace(this.getPosition());
		var rect = cc.rect(point.x-this._component.width/2,point.y-this._component.height/2,this._component.width,this._component.height);
		
		var closeRect = cc.rect(rect.x + rect.width - close_width, rect.y + rect.height - close_height, close_width, close_height);
		
		if (cc.rectContainsPoint(rect, touchPoint)) {
			if (this._state == WINDOW_STATE_CLOSE && cc.rectContainsPoint(closeRect, touchPoint)) {

				this._parent.removeChild(this, true);
			} else if (this._state == WINDOW_STATE_CLICK && this.onClick != null) {
				this.onClick();
			}
		}
		this._state = WINDOW_STATE_NORMAL;
	},
	addActionListener : function(event) {
		this.onClick = event;
	},
	setDragable : function(dragable) {
		this._dragable = dragable;
	},
	updateUI : function() {
		this._component.updateUI(0.196, 0.188, 0.18,1);
		if (this._component._target != null) {
			this._component._target.begin();
			//draw close
			var close_width = this._brush_close.getContentSize().width;
			var close_height = this._brush_close.getContentSize().height;
			this._brush_close.setPosition(this._component.width - close_width / 2, this._component.height - close_height / 2);
			this._brush_close.visit();

			this._component._target.end();

		}
	}
});
