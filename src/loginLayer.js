var LoginLayer = cc.Layer.extend({
    isMouseDown:false,
    window:null,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();

		
        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.Director.getInstance().getWinSize();
        
		var _bgLayer=cc.Sprite.create("bg.png");
		_bgLayer.setPosition(cc.p(size.width/2,size.height/2));
		this.addChild(_bgLayer);
		
    	this.window=new UIWindow((size.width)/2,(size.height)/2,400,200);
    	this.window.setDragable(false);
		this.window.addActionListener(function(){
			cc.log(1111);
		});
		_bgLayer.addChild(this.window);
		var loginBtn=new UIButton(280,40,100,48);
		loginBtn.setText("登陆");
		this.window.add(loginBtn);
		loginBtn.addActionListener(function(){
			alert(1);
		});
		var regBtn=new UIButton(120,40,100,48);
		regBtn.setText("注册");
		this.window.add(regBtn);
		regBtn.addActionListener(function(){
			alert(2);
		});
    }
});