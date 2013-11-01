var ui_window = [//WINDOW ui
	"ui/window_b.png",
	"ui/window_bl.png",
	"ui/window_br.png",
	"ui/window_close.png",
	"ui/window_l.png",
	"ui/window_r.png",
	"ui/window_t.png",
	"ui/window_tl.png",
	"ui/window_tr.png"
];

var ui_beibaokuan = [//beibiaokuan ui
	"ui/beibaokuan_b.png",
	"ui/beibaokuan_bl.png",
	"ui/beibaokuan_br.png",
	"ui/beibaokuan_l.png",
	"ui/beibaokuan_r.png",
	"ui/beibaokuan_t.png",
	"ui/beibaokuan_tl.png",
	"ui/beibaokuan_tr.png"
];
var ui_button = [//button ui
	"ui/button_b.png",
	"ui/button_bl.png",
	"ui/button_br.png",
	"ui/button_l.png",
	"ui/button_r.png",
	"ui/button_t.png",
	"ui/button_tl.png",
	"ui/button_bg.png",
	"ui/button_tr.png"
];
var g_resources = [
	//image
	{src:"bg.png"}
	//plist

	//fnt

	//tmx

	//bgm

	//effect
];

var loadUIRes = (function () {
	//window
	for (var i = 0; i < ui_window.length; i++) {
		var srcObject = {
			src : ui_window[i]
		};
		g_resources.push(srcObject);
	}
	
	//beibaokuan
	for (var i = 0; i < ui_beibaokuan.length; i++) {
		var srcObject = {
			src : ui_beibaokuan[i]
		};
		g_resources.push(srcObject);
	}
	
	//button
	for (var i = 0; i < ui_button.length; i++) {
		var srcObject = {
			src : ui_button[i]
		};
		g_resources.push(srcObject);
	}
});

loadUIRes();