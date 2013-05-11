var mdx, mdy;
var drag = false;
var A, Q, T = true, w;
var x1, y1, x2, y2, C, D;

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
	
	initChess("a4", 4, 0, 9);//俥
	initChess("a5", 5, 1, 9);//傌
	initChess("a3", 3, 2, 9);//相
	initChess("a2", 2, 3, 9);//仕
	initChess("a1", 1, 4, 9);//帥
	initChess("a22", 2, 5, 9);//仕
	initChess("a33", 3, 6, 9);//相
	initChess("a55", 5, 7, 9);//傌
	initChess("a44", 4, 8, 9);//俥
	initChess("a6", 6, 1, 7);//炮
	initChess("a66", 6, 7, 7);//炮
	initChess("a71", 7, 0, 6);//兵
	initChess("a72", 7, 2, 6);//兵
	initChess("a73", 7, 4, 6);//兵
	initChess("a74", 7, 6, 6);//兵
	initChess("a75", 7, 8, 6);//兵
	
	initChess("b4", -4, 0, 9);//車
	initChess("b5", -5, 1, 9);//馬
	initChess("b3", -3, 2, 9);//象
	initChess("b2", -2, 3, 9);//士
	initChess("b1", -1, 4, 9);//將
	initChess("b22", -2, 5, 9);//士
	initChess("b33", -3, 6, 9);//象
	initChess("b55", -5, 7, 9);//馬
	initChess("b44", -4, 8, 9);//車
	initChess("b6", -6, 1, 7);//包
	initChess("b66", -6, 7, 7);//包
	initChess("b71", -7, 0, 6);//卒
	initChess("b72", -7, 2, 6);//卒
	initChess("b73", -7, 4, 6);//卒
	initChess("b74", -7, 6, 6);//卒
	initChess("b75", -7, 8, 6);//卒
	
	initXXXChess("a4x", 8, 0);//俥
	initXXXChess("a5x", 7, 0);//傌
	initXXXChess("a3x", 6, 0);//相
	initXXXChess("a2x", 5, 0);//仕
	initXXXChess("a1x", 4, 0);//帥
	initXXXChess("a22x", 3, 0);//仕
	initXXXChess("a33x", 2, 0);//相
	initXXXChess("a55x", 1, 0);//傌
	initXXXChess("a44x", 0, 0);//俥
	initXXXChess("a6x", 7, 2);//炮
	initXXXChess("a66x", 1, 2);//炮
	initXXXChess("a71x", 8, 3);//兵
	initXXXChess("a72x", 6, 3);//兵
	initXXXChess("a73x", 4, 3);//兵
	initXXXChess("a74x", 2, 3);//兵
	initXXXChess("a75x", 0, 3);//兵
	
	initXXXChess("b4x", 8, 0);//車
	initXXXChess("b5x", 7, 0);//馬
	initXXXChess("b3x", 6, 0);//象
	initXXXChess("b2x", 5, 0);//士
	initXXXChess("b1x", 4, 0);//將
	initXXXChess("b22x", 3, 0);//士
	initXXXChess("b33x", 2, 0);//象
	initXXXChess("b55x", 1, 0);//馬
	initXXXChess("b44x", 0, 0);//車
	initXXXChess("b6x", 7, 2);//包
	initXXXChess("b66x", 1, 2);//包
	initXXXChess("b71x", 8, 3);//卒
	initXXXChess("b72x", 6, 3);//卒
	initXXXChess("b73x", 4, 3);//卒
	initXXXChess("b74x", 2, 3);//卒
	initXXXChess("b75x", 0, 3);//卒
	
	//initFog();
}

function initChess(id, k, x, y) {	
	
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
	
	if ((id.substr(0, 1) == "a" && id.substr(-1, 1) != "x") ||
		(id.substr(0, 1) == "b" && id.substr(-1, 1) == "x")) {
		A[x][y] = k;
		Q[x][y] = id;
		document.body.appendChild(newDiv);
	}
	else {
		A[8-x][9-y] = k;
		Q[8-x][9-y] = id;
		var bg0 = document.getElementById("BG0");
		bg0.appendChild(newDiv);
	}
}

function initXXXChess(id, x, y) {	
	
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
	
	if ((id.substr(0, 1) == "a" && id.substr(-1, 1) != "x") ||
		(id.substr(0, 1) == "b" && id.substr(-1, 1) == "x")) {
		document.body.appendChild(newDiv);
	}
	else {
		var bg0 = document.getElementById("BG0");
		bg0.appendChild(newDiv);
	}
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

function md(event) {
	C = event.srcElement ? event.srcElement : event.target; //取得觸發事件的物件(棋子)
	D = document.getElementById(C.id + "x");
	w = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字
	//未輪到正確下棋方時跳出副程式
	if ((w == "a" && T == false) || (w == "b" && T == true)) return;
	drag = true; //進入拖曳狀態
	mdx = event.offsetX; //取得拖曳起點X
	mdy = event.offsetY; //取得拖曳起點Y
	C.style.zIndex = 2; //提升拖曳中棋子的層次
	C.style.cursor = "pointer"; //改變游標為手指按棋的圖示
	x1 = p2g(C.style.posLeft); //換算網頁像素點座標為棋盤座標X
	y1 = p2g(C.style.posTop); //換算網頁像素點座標為棋盤座標Y
}

function mv(event) {
	if (drag) {//如果是拖曳狀態
		C.style.posLeft += event.offsetX - mdx; //X方向移動
		C.style.posTop += event.offsetY - mdy; //Y方向移動
	}
}

function mup() {
	if (drag) {//如果是拖曳狀態
		drag = false; //結束拖曳狀態
		C.style.cursor = "default"; //恢復正常游標
		C.style.zIndex = 1; //恢復正常層次
		chess(C); //檢視下棋動作合法性
	}
}

function mout() {//滑鼠離開棋子時
	if (drag) {
		C.style.posLeft = g2p(x1);
		C.style.posTop = g2p(y1);
		C.style.cursor = "default";
		C.style.zIndex = 1;
		drag = false;
	}
}

function chess(C) {//下棋合法性檢查
	var x = C.style.posLeft + 30; //棋子中心座標X
	var y = C.style.posTop + 30; //棋子中心座標Y
	C.style.posLeft = Math.round(x / 64) * 64 - 30; //移動至棋格水平位置
	C.style.posTop = Math.round(y / 64) * 64 - 30; //移動至棋格垂直位置
	x2 = p2g(C.style.posLeft); //取得棋子移至的棋格座標X
	y2 = p2g(C.style.posTop); //取得棋子移至的棋格座標Y
	
	if (w == "b") {
		x1 = 8 - x1;
		y1 = 9 - y1;
		x2 = 8 - x2;
		y2 = 9 - y2;
	}
	
	if (outside() || occupy()) {//超出棋盤或有我方棋子
		if (w == "b") {
			x1 = 8 - x1;
			y1 = 9 - y1;
		}
		C.style.posLeft = g2p(x1); //跳回原處x1
		C.style.posTop = g2p(y1); //跳回原處y1
		return;
	}
	
	var k = A[x1][y1];
	var legal = false;
	switch (k) {
		case 1: //帥
			legal = onestep() && inpalace();
			break;
		case -1: //將
			legal = onestep() && inpalace();
			break;
		case 2: //仕
			legal = dgn(1) && inpalace();
			break;
		case -2: //士
			legal = dgn(1) && inpalace();
			break;
		case 3: //相
			legal = dgn(2) && (y2 >= 5) && freeElephant();
			break;
		case -3: //象
			legal = dgn(2) && (y2 <= 4) && freeElephant();
			break;
		case 4: //俥
			legal = straight() && between() == 0;
			break;
		case -4: //車
			legal = straight() && between() == 0;
			break;
		case 5: //傌
			legal = horsestep() && freeHorse();
			break;
		case -5: //馬
			legal = horsestep() && freeHorse();
			break;
		case 6: //炮
			legal = straight() && cannonStep();
			break;
		case -6: //包
			legal = straight() && cannonStep();
			break;
		case 7: //兵
			legal = onestep() && soldier(1);
			break;
		case -7: //卒
			legal = onestep() && soldier(-1);
			break;
	}
	
	if (legal) { //如果合法
		if (A[x2][y2] != 0) { //目的地有對方棋子→吃棋
			var K = document.getElementById(Q[x2][y2]);
			K.style.visibility = "hidden"; //隱藏對方被吃的棋子
			var KK = document.getElementById(Q[x2][y2] + "x");
			KK.style.visibility = "hidden";//隱藏對方被吃的棋子
			var qq = K.id.substr(1, 1);//將帥被吃了
			if (qq == "1") reset();//重玩囉
		}
		
		A[x2][y2] = A[x1][y1]; //更新棋種陣列資訊
		Q[x2][y2] = Q[x1][y1]; //更新物件名稱資訊
		A[x1][y1] = 0; //清除原位置資訊
		Q[x1][y1] = ""; //清除原位置資訊
		
		if (w == "b") {
			x2 = 8 - x2;
			y2 = 9 - y2;
		}
		
		D.style.posLeft = g2p(8 - x2);//對手棋盤棋子移動X
		D.style.posTop = g2p(9 - y2);//對手棋盤棋子移動Y
		
		if (w == "a") { //紅方完成下棋
			T = false; //換黑棋下
			//msg.innerHTML = "輪到黑棋下→"; //顯示輪替訊息
			//BG.style.borderColor = "white";//邊框變化
			//BG0.style.borderColor = "red";//邊框變化
		}
		
		if (w == "b") { //黑方完成下棋
			T = true; //換紅棋下
			//msg.innerHTML = "←輪到紅棋下";  //顯示輪替訊息
			//BG0.style.borderColor = "white";//邊框變化
			//BG.style.borderColor = "red";//邊框變化
		}		
	} 
	else { //如果不合法
		if (w == "b") {
			x1 = 8 - x1;
			y1 = 9 - y1;
		}
		C.style.posLeft = g2p(x1); //跳回原位x1
		C.style.posTop = g2p(y1); //跳回原位y1
	}
	C = null; //清除選定棋子物件
}

function p2g(p) { return Math.round((p - 34) / 64); }//棋格到像素座標

function g2p(g) { return Math.round((g * 64 + 34)); }//像素到棋格座標

function outside() {//超出棋盤
	if (x2 > 8 || x2 < 0 || y2 > 9 || y2 < 0) return true;
	return false;
}

function occupy() {//棋格有我方棋子
	if (A[x1][y1] * A[x2][y2] > 0) return true;
	return false;
}

function onestep() {//移動一格
	if (Math.abs(x1 - x2) + Math.abs(y1 - y2) == 1) return true;
	return false;
}
function inpalace() {//將帥士仕是否在宮中
	if (x2 > 5 || x2 < 3) return false;
	if (w == "a" && y2 < 7) return false;
	if (w == "b" && y2 > 2) return false;
	return true;
}

function dgn(s) {//斜走s格
	if (Math.abs(x1 - x2) == s && Math.abs(y1 - y2) == s) return true;
	return false;
}
function freeElephant() {//卡象腳
	var xx = Math.round((x1 + x2) / 2);
	var yy = Math.round((y1 + y2) / 2);
	if (A[xx][yy] == 0) return true;
	return false;
}

function straight() {//直行
	if (x1 == x2 || y1 == y2) return true;
	return false;
}

function between() {//起終點間有幾個棋子
	var n = 0;
	if (x1 > x2) {
		for (var i = x2 + 1; i < x1; i++) { if (A[i][y1] != 0) n += 1; }
	}
	if (x2 > x1) {
		for (var i = x1 + 1; i < x2; i++) { if (A[i][y1] != 0) n += 1; }
	}
	if (y1 > y2) {
		for (var j = y2 + 1; j < y1; j++) { if (A[x1][j] != 0) n += 1; }
	}
	if (y2 > y1) {
		for (var j = y1 + 1; j < y2; j++) { if (A[x1][j] != 0) n += 1; }
	}
	return n;
}

function horsestep() {//馬走日字的規則
	var c1 = Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 2;
	var c2 = Math.abs(x1 - x2) == 2 && Math.abs(y1 - y2) == 1;
	if (c1 || c2) return true;
	return false;
}

function freeHorse() {//拐馬腳的規則
	if (x1 - x2 == 2 && A[x1 - 1][y1] != 0) return false;
	if (x2 - x1 == 2 && A[x1 + 1][y1] != 0) return false;
	if (y1 - y2 == 2 && A[x1][y1 - 1] != 0) return false;
	if (y2 - y1 == 2 && A[x1][y1 + 1] != 0) return false;
	return true;
}

function cannonStep() {//炮與包的規則
	var btw = between();
	if (btw == 0 && A[x2][y2] == 0) return true;
	if (btw == 1 && A[x1][y1] * A[x2][y2] < 0) return true;
	return false;
}

function soldier(k) {//兵卒的規則
	if (k > 0) {
		if (y2 - y1 > 0) return false;
		if (y1 > 4 && y2 == y1) return false;
		return true;
	} 
	else {
		if (y1 - y2 > 0) return false;
		if (y1 < 5 && y2 == y1) return false;
		return true;
	}
}
