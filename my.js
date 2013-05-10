function init() {
	A = new Array(9); //宣告棋種屬性分布的陣列
	Q = new Array(9); //宣告棋子ID分布的陣列
	for (var i = 0; i < 9; i += 1) {
		A[i] = new Array(10); //宣告棋種次級陣列
		Q[i] = new Array(10); //宣告ID次級陣列
		for (var j = 0; j < 10; j += 1) {
			A[i][j] = 0; //棋種代碼預設值
			Q[i][j] = ""; //ID預設值→空字串
		}
	}
	initChess("b4 ", -4, 0, 0);//車
	initChess("b5 ", -5, 1, 0);//馬
	initChess("b3 ", -3, 2, 0);//象
	initChess("b2 ", -2, 3, 0);//士
	initChess("b1 ", -1, 4, 0);//將
	initChess("b22", -2, 5, 0);//士
	initChess("b33", -3, 6, 0);//象
	initChess("b55", -5, 7, 0);//馬
	initChess("b44", -4, 8, 0);//車
	initChess("b6 ", -6, 1, 2);//包
	initChess("b66", -6, 7, 2);//包
	initChess("b71", -7, 0, 3);//卒
	initChess("b72", -7, 2, 3);//卒
	initChess("b73", -7, 4, 3);//卒
	initChess("b74", -7, 6, 3);//卒
	initChess("b75", -7, 8, 3);//卒
	initChess("a4 ", 4, 0, 9);//俥
	initChess("a5 ", 5, 1, 9);//傌
	initChess("a3 ", 3, 2, 9);//相
	initChess("a2 ", 2, 3, 9);//仕
	initChess("a1 ", 1, 4, 9);//帥
	initChess("a22", 2, 5, 9);//仕
	initChess("a33", 3, 6, 9);//相
	initChess("a55", 5, 7, 9);//傌
	initChess("a44", 4, 8, 9);//俥
	initChess("a6 ", 6, 1, 7);//炮
	initChess("a66", 6, 7, 7);//炮
	initChess("a71", 7, 0, 6);//兵
	initChess("a72", 7, 2, 6);//兵
	initChess("a73", 7, 4, 6);//兵
	initChess("a74", 7, 6, 6);//兵
	initChess("a75", 7, 8, 6);//兵
	
	//initFog();
}

function initChess(id, k, x, y) {
	A[x][y] = k;
	Q[x][y] = id;
	
	var newDiv = document.createElement("div");
	
	newDiv.id = id;
	newDiv.style.position = "absolute";
	newDiv.style.zIndex = 1;
	newDiv.style.width = "60px";
	newDiv.style.height = "60px";
	newDiv.style.backgroundImage = "url(images/" + id.substr(0, 2) + ".png)"; 
	newDiv.style.backgroundRepeat = "no-repeat";
	newDiv.style.left = 34 + x *64 + "px";
	newDiv.style.top = 34 + y * 64 + "px";
	newDiv.onmousedown = md;
	newDiv.onmousemove = mv;
	newDiv.onmouseup = mup;
	
	document.body.appendChild(newDiv);
}

function initFog() {	
	for (var i = 0; i < 9; ++i) {
		for (var j = 0; j < 10; ++j) {			
			var newDiv = document.createElement("div");
			
			newDiv.id = "f" + i.toString() + j.toString();
			newDiv.style.position = "absolute";
			newDiv.style.zIndex = 3;
			newDiv.style.width = "64px";
			newDiv.style.height = "64px";
			newDiv.style.backgroundImage = "url(images/fog.png)"; 
			newDiv.style.backgroundRepeat = "no-repeat";
			newDiv.style.left = 34 + i *64 + "px";
			newDiv.style.top = 34 + j * 64 + "px";
			newDiv.style.opacity = ".50";
			newDiv.onmousedown = md;
			newDiv.onmousemove = mv;
			newDiv.onmouseup = mup;
			
			document.body.appendChild(newDiv);			
		}
	}
}