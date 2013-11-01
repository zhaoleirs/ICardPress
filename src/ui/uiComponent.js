var UIComponent = cc.Class.extend({
	_target : null,
	_brush_t : null,
	_brush_l : null,
	_brush_r : null,
	_brush_b : null,
	_brush_tl : null,
	_brush_tr : null,
	_brush_bl : null,
	_brush_br : null,
	_brush_bg : null,
	width : 0,
	height : 0,
	init : function(name, hasBg) {
		var brush_t = cc.Sprite.create("ui/" + name + "_t.png");
		brush_t.retain();
		this._brush_t = brush_t;

		var brush_l = cc.Sprite.create("ui/" + name + "_l.png");
		brush_l.retain();
		this._brush_l = brush_l;

		var brush_r = cc.Sprite.create("ui/" + name + "_r.png");
		brush_r.retain();
		this._brush_r = brush_r;

		var brush_b = cc.Sprite.create("ui/" + name + "_b.png");
		brush_b.retain();
		this._brush_b = brush_b;

		var brush_tl = cc.Sprite.create("ui/" + name + "_tl.png");
		brush_tl.retain();
		this._brush_tl = brush_tl;

		var brush_tr = cc.Sprite.create("ui/" + name + "_tr.png");
		brush_tr.retain();
		this._brush_tr = brush_tr;

		var brush_bl = cc.Sprite.create("ui/" + name + "_bl.png");
		brush_bl.retain();
		this._brush_bl = brush_bl;

		var brush_br = cc.Sprite.create("ui/" + name + "_br.png");
		brush_br.retain();
		this._brush_br = brush_br;
		if (hasBg) {
			var brush_bg = cc.Sprite.create("ui/" + name + "_bg.png");
			brush_bg.retain();
			this._brush_bg = brush_bg;
		}

	},
	setBounds : function(width, height) {
		this.width = width;
		this.height = height;
		if (this._target == null) {
			// create a render texture
			var target = cc.RenderTexture.create(width, height);
			this._target = target;
		}

	},
	updateUI : function(r, g, b, a) {
		if (this._target != null) {
			if (a != 0) {
				this._target.beginWithClear(r, g, b, a, 0, 0);
			} else {
				this._target.begin();
			}

			//draw top left
			var tl_width = this._brush_tl.getContentSize().width;
			var tl_height = this._brush_tl.getContentSize().height;
			this._brush_tl.setPosition(tl_width / 2, this.height - tl_height / 2);
			this._brush_tl.visit();

			//draw top right
			var tr_width = this._brush_tr.getContentSize().width;
			var tr_height = this._brush_tr.getContentSize().height;
			this._brush_tr.setPosition(this.width- tr_width / 2, this.height - tr_height / 2);
			this._brush_tr.visit();
			//draw top

			var t_width = this._brush_t.getContentSize().width;
			var t_height = this._brush_t.getContentSize().height;
			for (var i = tl_width; i < this.width- tr_width; i += t_width) {
				this._brush_t.setPosition(i + t_width / 2, this.height - t_height / 2);
				this._brush_t.visit();
			}

			//draw bottom left
			var bl_width = this._brush_bl.getContentSize().width;
			var bl_height = this._brush_bl.getContentSize().height;
			this._brush_bl.setPosition(bl_width / 2, bl_height / 2);
			this._brush_bl.visit();

			//draw bottom right
			var br_width = this._brush_br.getContentSize().width;
			var br_height = this._brush_br.getContentSize().height;
			this._brush_br.setPosition(this.width- tr_width / 2, br_height / 2);
			this._brush_br.visit();
			//draw bottom
			var b_width = this._brush_b.getContentSize().width;
			var b_height = this._brush_b.getContentSize().height;
			for (var i = bl_width; i < this.width- br_width; i += b_width) {
				this._brush_b.setPosition(i + t_width / 2, b_height / 2);
				this._brush_b.visit();
			}

			//draw left
			var l_width = this._brush_l.getContentSize().width;
			var l_height = this._brush_l.getContentSize().height;
			for (var i = tl_height; i < this.height - bl_height; i += l_height) {
				this._brush_l.setPosition(l_width / 2, this.height - (i + l_height / 2));
				this._brush_l.visit();
			}

			//draw right
			var r_width = this._brush_r.getContentSize().width;
			var r_height = this._brush_r.getContentSize().height;
			for (var i = tr_height; i < this.height - br_height; i += r_height) {
				this._brush_r.setPosition(this.width- r_width / 2, this.height - (i + r_height / 2));
				this._brush_r.visit();
			}
			//draw bg
			if (this._brush_bg != null) {
				var bg_width = this._brush_bg.getContentSize().width;
				var bg_height = this._brush_bg.getContentSize().height;
				for (var i = l_width; i < this.width- r_width; i += bg_width) {
					this._brush_bg.setPosition(i + bg_width / 2, (this.height ) / 2);
					this._brush_bg.visit();
				}
			}

			//draw close
			this._target.end();

		}
	},
	release : function() {
		this._brush_t.release();
		this._brush_l.release();
		this._brush_r.release();
		this._brush_b.release();
		this._brush_tl.release();
		this._brush_tr.release();
		this._brush_bl.release();
		this._brush_br.release();
		if (this._brush_bg != null) {
			this._brush_bg.release();
		}
	}
});
