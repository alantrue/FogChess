
var Drag = false;
var Turn = "a";
var A, Q;
var C, X1, Y1, Mdx, Mdy;
var Fa, Fb;

function init()
{
    A = new Array(9); //宣告棋種屬性分布的陣列
    Q = new Array(9); //宣告棋子ID分布的陣列
    Fa = new Array(9);
    Fb = new Array(9);

    for (var i = 0; i < 9; ++i)
    {
        A[i] = new Array(10); //宣告棋種次級陣列
        Q[i] = new Array(10); //宣告ID次級陣列
        Fa[i] = new Array(10);
        Fb[i] = new Array(10);
        for (var j = 0; j < 10; ++j)
        {
            A[i][j] = 0; //棋種代碼預設值
            Q[i][j] = ""; //ID預設值→空字串
            Fa[i][j] = new Array;
            Fb[i][j] = new Array;
        }
    }

    initChess("a4", 4, 1, 0, 9);//俥
    initChess("a5", 5, 2, 1, 9);//傌
    initChess("a3", 3, 3, 2, 9);//相
    initChess("a2", 2, 4, 3, 9);//仕
    initChess("a1", 1, 5, 4, 9);//帥
    initChess("a22", 2, 6, 5, 9);//仕
    initChess("a33", 3, 7, 6, 9);//相
    initChess("a55", 5, 8, 7, 9);//傌
    initChess("a44", 4, 9, 8, 9);//俥
    initChess("a6", 6, 10, 1, 7);//炮
    initChess("a66", 6, 11, 7, 7);//炮
    initChess("a71", 7, 12, 0, 6);//兵
    initChess("a72", 7, 13, 2, 6);//兵
    initChess("a73", 7, 14, 4, 6);//兵
    initChess("a74", 7, 15, 6, 6);//兵
    initChess("a75", 7, 16, 8, 6);//兵

    initChess("b4", -4, 1, 8, 0);//車
    initChess("b5", -5, 2, 7, 0);//馬
    initChess("b3", -3, 3, 6, 0);//象
    initChess("b2", -2, 4, 5, 0);//士
    initChess("b1", -1, 5, 4, 0);//將
    initChess("b22", -2, 6, 3, 0);//士
    initChess("b33", -3, 7, 2, 0);//象
    initChess("b55", -5, 8, 1, 0);//馬
    initChess("b44", -4, 9, 0, 0);//車
    initChess("b6", -6, 10, 7, 2);//包
    initChess("b66", -6, 11, 1, 2);//包
    initChess("b71", -7, 12, 8, 3);//卒
    initChess("b72", -7, 13, 6, 3);//卒
    initChess("b73", -7, 14, 4, 3);//卒
    initChess("b74", -7, 15, 2, 3);//卒
    initChess("b75", -7, 16, 0, 3);//卒

    initMirrorChess("a4x", 0, 9);//?
    initMirrorChess("a5x", 1, 9);//傌
    initMirrorChess("a3x", 2, 9);//相
    initMirrorChess("a2x", 3, 9);//仕
    initMirrorChess("a1x", 4, 9);//帥
    initMirrorChess("a22x", 5, 9);//仕
    initMirrorChess("a33x", 6, 9);//相
    initMirrorChess("a55x", 7, 9);//傌
    initMirrorChess("a44x", 8, 9);//?
    initMirrorChess("a6x", 1, 7);//炮
    initMirrorChess("a66x", 7, 7);//炮
    initMirrorChess("a71x", 0, 6);//兵
    initMirrorChess("a72x", 2, 6);//兵
    initMirrorChess("a73x", 4, 6);//兵
    initMirrorChess("a74x", 6, 6);//兵
    initMirrorChess("a75x", 8, 6);//兵

    initMirrorChess("b4x", 8, 0);//車
    initMirrorChess("b5x", 7, 0);//馬
    initMirrorChess("b3x", 6, 0);//象
    initMirrorChess("b2x", 5, 0);//士
    initMirrorChess("b1x", 4, 0);//將
    initMirrorChess("b22x", 3, 0);//士
    initMirrorChess("b33x", 2, 0);//象
    initMirrorChess("b55x", 1, 0);//馬
    initMirrorChess("b44x", 0, 0);//車
    initMirrorChess("b6x", 7, 2);//包
    initMirrorChess("b66x", 1, 2);//包
    initMirrorChess("b71x", 8, 3);//卒
    initMirrorChess("b72x", 6, 3);//卒
    initMirrorChess("b73x", 4, 3);//卒
    initMirrorChess("b74x", 2, 3);//卒
    initMirrorChess("b75x", 0, 3);//卒

    initFogA();
    initFogB();
    //refreshFogA();
    //refreshFogB();
}

function initChess(id, k, v, x, y)
{
    A[x][y] = k;
    Q[x][y] = id;

    var newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.nodeValue = v;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 1;
    newDiv.style.width = "60px";
    newDiv.style.height = "60px";
    newDiv.style.backgroundImage = "url(images/" + id.substr(0, 2) + ".png)";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.onmousedown = md;
    newDiv.onmousemove = mv;
    newDiv.onmouseup = mup;

    if ((id.substr(0, 1) == "a" && id.substr(-1, 1) != "x") ||
        (id.substr(0, 1) == "b" && id.substr(-1, 1) == "x"))
    {
        newDiv.style.left = 34 + x * 64 + "px";
        newDiv.style.top = 34 + y * 64 + "px";

        document.body.appendChild(newDiv);
    }
    else
    {
        newDiv.style.left = 34 + (8 - x) * 64 + "px";
        newDiv.style.top = 34 + (9 - y) * 64 + "px";

        var bg0 = document.getElementById("BG0");
        bg0.appendChild(newDiv);
    }
}

function initMirrorChess(id, x, y)
{
    var newDiv = document.createElement("div");

    newDiv.id = id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 1;
    newDiv.style.width = "60px";
    newDiv.style.height = "60px";
    newDiv.style.backgroundImage = "url(images/" + id.substr(0, 2) + ".png)";
    newDiv.style.backgroundRepeat = "no-repeat";

    if ((id.substr(0, 1) == "a" && id.substr(-1, 1) != "x") ||
        (id.substr(0, 1) == "b" && id.substr(-1, 1) == "x"))
    {
        newDiv.style.left = 34 + x * 64 + "px";
        newDiv.style.top = 34 + y * 64 + "px";

        document.body.appendChild(newDiv);
    }
    else
    {
        newDiv.style.left = 34 + (8 - x) * 64 + "px";
        newDiv.style.top = 34 + (9 - y) * 64 + "px";

        var bg0 = document.getElementById("BG0");
        bg0.appendChild(newDiv);
    }
}

function initFogA()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var newDiv = document.createElement("div");

            newDiv.id = "fa" + i.toString() + j.toString();
            newDiv.style.position = "absolute";
            newDiv.style.zIndex = 1;
            newDiv.style.width = "64px";
            newDiv.style.height = "64px";
            newDiv.style.backgroundImage = "url(images/fog.png)";
            newDiv.style.backgroundRepeat = "no-repeat";
            newDiv.style.opacity = ".50";
            newDiv.style.visibility = "hidden";
            newDiv.onmousemove = mv;

            newDiv.style.left = 34 + i * 64 + "px";
            newDiv.style.top = 34 + j * 64 + "px";
            document.body.appendChild(newDiv);
        }
    }
}

function initFogB()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var newDiv = document.createElement("div");

            newDiv.id = "fb" + i.toString() + j.toString();
            newDiv.style.position = "absolute";
            newDiv.style.zIndex = 1;
            newDiv.style.width = "64px";
            newDiv.style.height = "64px";
            newDiv.style.backgroundImage = "url(images/fog.png)";
            newDiv.style.backgroundRepeat = "no-repeat";
            newDiv.style.opacity = ".50";
            newDiv.style.visibility = "hidden";
            newDiv.onmousemove = mv;

            newDiv.style.left = 34 + (8 - i) * 64 + "px";
            newDiv.style.top = 34 + (9 - j) * 64 + "px";

            var bg0 = document.getElementById("BG0");
            bg0.appendChild(newDiv);
        }
    }
}

function refreshFogA()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            refreshFog(Fa, "a", i, j);
        }
    }

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if (Fa[i][j].length > 0)
            {
                hideFog("a", i, j);
            }
            else
            {
                showFog("a", i, j);
            }
        }
    }
}

function refreshFogB()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            refreshFog(Fb, "b", i, j);
        }
    }

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if (Fb[i][j].length > 0)
            {
                hideFog("b", i, j);
            }
            else
            {
                showFog("b", i, j);
            }
        }
    }
}

function refreshFog(f, w, x, y)
{
    var id = Q[x][y];

    if (id != "" &&
        id.substr(0, 1) == w)
    {
        var c = document.getElementById(id);
        if (c.nodeValue != "")
        {
            openFog(f[x][y], c.nodeValue);
        }
    }
}

function showFog(w, x, y)
{
    document.getElementById("f"+ w + x + y).style.visibility = "visible";
}

function hideFog(w, x, y)
{
    document.getElementById("f" + w + x + y).style.visibility = "hidden";
}

function openFog(f, v)
{
    if (!hasOpenFog(f, v))
    {
        f.push(v);
    }
}

function hasOpenFog(f, v)
{
    for (var i = 0; i < f.length; ++i)
    {
        if (f[i] == v)
        {
            return true;
        }
    }
    return false;
}

function inFog(w, x, y)
{
    return (document.getElementById("f" + w + x + y).style.visibility == "visible");
}

function md(event)
{
    C = event.srcElement; //取得觸發事件的物件(棋子)
    var w = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字

    //未輪到正確下棋方時跳出副程式
    if (w != Turn)
    {
        return;
    }

    Drag = true; //進入拖曳狀態
    Mdx = event.offsetX; //取得拖曳起點X
    Mdy = event.offsetY; //取得拖曳起點Y
    C.style.zIndex = 2; //提升拖曳中棋子的層次
    C.style.cursor = "pointer"; //改變游標為手指按棋的圖示
    X1 = p2g(C.style.posLeft); //換算網頁像素點座標為棋盤座標X
    Y1 = p2g(C.style.posTop); //換算網頁像素點座標為棋盤座標Y
}

function mv(event)
{
    //如果是拖曳狀態
    if (Drag)
    {
        C.style.posLeft += event.offsetX - Mdx; //X方向移動
        C.style.posTop += event.offsetY - Mdy; //Y方向移動
    }
}

function mup()
{
    //如果是拖曳狀態
    if (Drag)
    {
        Drag = false; //結束拖曳狀態
        C.style.cursor = "default"; //恢復正常游標
        C.style.zIndex = 1; //恢復正常層次
        chess(C); //檢視下棋動作合法性
    }
}

//滑鼠離開棋子時
function mout()
{
    if (Drag)
    {
        C.style.posLeft = g2p(X1);
        C.style.posTop = g2p(Y1);
        C.style.cursor = "default";
        C.style.zIndex = 1;
        Drag = false;
    }
}

//下棋合法性檢查
function chess(C)
{
    var posX = Math.round((C.style.posLeft + 30) / 64) * 64 - 30;
    var posY = Math.round((C.style.posTop + 30) / 64) * 64 - 30;

    var x2 = p2g(posX); //取得棋子移至的棋格座標X
    var y2 = p2g(posY); //取得棋子移至的棋格座標Y

    var w = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字

    if (w == "b")
    {
        X1 = 8 - X1;
        Y1 = 9 - Y1;
        x2 = 8 - x2;
        y2 = 9 - y2;
    }

    var k = A[X1][Y1];

    if (!canMove(C, X1, Y1, x2, y2))
    {
        if (w == "b")
        {
            X1 = 8 - X1;
            Y1 = 9 - Y1;
        }
        C.style.posLeft = g2p(X1); //跳回原處x1
        C.style.posTop = g2p(Y1); //跳回原處y1
        return;
    }

    //目的地有對方棋子→吃棋
    if (A[x2][y2] != 0)
    {
        var K = document.getElementById(Q[x2][y2]);
        K.style.visibility = "hidden"; //隱藏對方被吃的棋子
        var KK = document.getElementById(Q[x2][y2] + "x");
        KK.style.visibility = "hidden";//隱藏對方被吃的棋子

        var qq = K.id.substr(1, 1);//將帥被吃了
        if (qq == "1")
        {
            reset();
        }//重玩囉
    }

    A[x2][y2] = A[X1][Y1]; //更新棋種陣列資訊
    Q[x2][y2] = Q[X1][Y1]; //更新物件名稱資訊
    A[X1][Y1] = 0; //清除原位置資訊
    Q[X1][Y1] = ""; //清除原位置資訊

    if (w == "b")
    {
        x2 = 8 - x2;
        y2 = 9 - y2;
    }
    C.style.posLeft = g2p(x2);
    C.style.posTop = g2p(y2);

    var cc = document.getElementById(C.id + "x");
    cc.style.posLeft = g2p(8 - x2);//對手棋盤棋子移動X
    cc.style.posTop = g2p(9 - y2);//對手棋盤棋子移動Y

    //紅方完成下棋
    if (w == "a")
    {
        Turn = "b"; //換黑棋下
        //msg.innerHTML = "輪到黑棋下→"; //顯示輪替訊息
        //BG.style.borderColor = "white";//邊框變化
        //BG0.style.borderColor = "red";//邊框變化
    }

    //黑方完成下棋
    if (w == "b")
    {
        Turn = "a"; //換紅棋下
        //msg.innerHTML = "←輪到紅棋下";  //顯示輪替訊息
        //BG0.style.borderColor = "white";//邊框變化
        //BG.style.borderColor = "red";//邊框變化
    }

    C = null; //清除選定棋子物件
}

function canMove(c, x1, y1, x2, y2)
{
    var w = c.id.substr(0, 1);
    var k = A[x1][y1];

    //超出棋盤或有我方棋子
    if (outside(x2, y2) || occupy(k, x2, y2) || inFog(w, x2, y2))
    {
        return false;
    }

    var legal = false;
    switch (k)
    {
    case 1: //帥
        legal = onestep(x1, y1,x2, y2) && inpalace(w, x2, y2);
        break;
    case -1: //將
        legal = onestep(x1, y1,x2, y2) && inpalace(w, x2, y2);
        break;
    case 2: //仕
        legal = dgn(1, x1, y1,x2, y2) && inpalace(w, x2, y2);
        break;
    case -2: //士
        legal = dgn(1, x1, y1,x2, y2) && inpalace(w, x2, y2);
        break;
    case 3: //相
        legal = dgn(2, x1, y1,x2, y2) && (y2 >= 5) && freeElephant(x1, y1,x2, y2);
        break;
    case -3: //象
        legal = dgn(2, x1, y1,x2, y2) && (y2 <= 4) && freeElephant(x1, y1,x2, y2);
        break;
    case 4: //俥
        legal = straight(x1, y1,x2, y2) && between(x1, y1,x2, y2) == 0;
        break;
    case -4: //車
        legal = straight(x1, y1,x2, y2) && between(x1, y1,x2, y2) == 0;
        break;
    case 5: //傌
        legal = horsestep(x1, y1,x2, y2) && freeHorse(x1, y1,x2, y2);
        break;
    case -5: //馬
        legal = horsestep(x1, y1,x2, y2) && freeHorse(x1, y1,x2, y2);
        break;
    case 6: //炮
        legal = straight(x1, y1,x2, y2) && cannonStep(x1, y1,x2, y2);
        break;
    case -6: //包
        legal = straight(x1, y1,x2, y2) && cannonStep(x1, y1,x2, y2);
        break;
    case 7: //兵
        legal = onestep(x1, y1,x2, y2) && soldier(1, y1, y2);
        break;
    case -7: //卒
        legal = onestep(x1, y1,x2, y2) && soldier(-1, y1, y2);
        break;
    }

    return legal;
}

//棋格到像素座標
function p2g(p)
{
    return Math.round((p - 34) / 64);
}

//像素到棋格座標
function g2p(g)
{
    return Math.round((g * 64 + 34));
}

//超出棋盤
function outside(x, y)
{
    if (x > 8 ||
        x < 0 ||
        y > 9 ||
        y < 0)
    {
        return true;
    }
    return false;
}

//棋格有我方棋子
function occupy(k, x, y)
{
    if (k * A[x][y] > 0)
    {
        return true;
    }
    return false;
}

//移動一格
function onestep(x1, y1, x2, y2)
{
    if (Math.abs(x1 - x2) + Math.abs(y1 - y2) == 1)
    {
        return true;
    }
    return false;
}

//將帥士仕是否在宮中
function inpalace(w, x, y)
{
    if (x > 5 || x < 3)
    {
        return false;
    }
    if (w == "a" && y < 7)
    {
        return false;
    }
    if (w == "b" && y > 2)
    {
        return false;
    }
    return true;
}

//斜走s格
function dgn(s, x1, y1, x2, y2)
{
    if (Math.abs(x1 - x2) == s && Math.abs(y1 - y2) == s)
    {
        return true;
    }
    return false;
}

//卡象腳
function freeElephant(x1, y1, x2, y2)
{
    var xx = Math.round((x1 + x2) / 2);
    var yy = Math.round((y1 + y2) / 2);
    if (A[xx][yy] == 0)
    {
        return true;
    }
    return false;
}

//直行
function straight(x1, y1, x2, y2)
{
    if (x1 == x2 || y1 == y2)
    {
        return true;
    }
    return false;
}

//起終點間有幾個棋子
function between(x1, y1, x2, y2)
{
    var n = 0;

    if (x1 > x2)
    {
        for (var i = x2 + 1; i < x1; i++)
        {
            if (A[i][y1] != 0)
            {
                n += 1;
            }
        }
    }
    if (x2 > x1)
    {
        for (var i = x1 + 1; i < x2; i++)
        {
            if (A[i][y1] != 0)
            {
                n += 1;
            }
        }
    }
    if (y1 > y2)
    {
        for (var j = y2 + 1; j < y1; j++)
        {
            if (A[x1][j] != 0)
            {
                n += 1;
            }
        }
    }
    if (y2 > y1)
    {
        for (var j = y1 + 1; j < y2; j++)
        {
            if (A[x1][j] != 0)
            {
                n += 1;
            }
        }
    }
    return n;
}

//馬走日字的規則
function horsestep(x1, y1, x2, y2)
{
    var c1 = Math.abs(x1 - x2) == 1 && Math.abs(y1 - y2) == 2;
    var c2 = Math.abs(x1 - x2) == 2 && Math.abs(y1 - y2) == 1;
    if (c1 || c2)
    {
        return true;
    }
    return false;
}

//拐馬腳的規則
function freeHorse(x1, y1, x2, y2)
{
    if (x1 - x2 == 2 && A[x1 - 1][y1] != 0)
    {
        return false;
    }
    if (x2 - x1 == 2 && A[x1 + 1][y1] != 0)
    {
        return false;
    }
    if (y1 - y2 == 2 && A[x1][y1 - 1] != 0)
    {
        return false;
    }
    if (y2 - y1 == 2 && A[x1][y1 + 1] != 0)
    {
        return false;
    }
    return true;
}

//炮與包的規則
function cannonStep(x1, y1, x2, y2)
{
    var btw = between(x1, y1,x2, y2);
    if (btw == 0 && A[x2][y2] == 0)
    {
        return true;
    }
    if (btw == 1 && A[x1][y1] * A[x2][y2] < 0)
    {
        return true;
    }
    return false;
}

//兵卒的規則
function soldier(k, y1, y2)
{
    if (k > 0)
    {
        if (y2 - y1 > 0)
        {
            return false;
        }
        if (y1 > 4 && y2 == y1)
        {
            return false;
        }
        return true;
    }
    else
    {
        if (y1 - y2 > 0)
        {
            return false;
        }
        if (y1 < 5 && y2 == y1)
        {
            return false;
        }
        return true;
    }
}

//重玩
function reset()
{
    window.location.reload();//重新整理網頁
}
