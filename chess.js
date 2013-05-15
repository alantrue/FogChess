var Drag = false;
var Turn = "a";
var A, Q;
var C, X1, Y1, Mdx, Mdy;
var Fa, Fb;     //迷霧可視
var FFa, FFb;   //攻擊可視
var FogAlpha = 1;
var Free = false;

function init()
{
    A = new Array(9); //宣告棋種屬性分布的陣列
    Q = new Array(9); //宣告棋子ID分布的陣列
    Fa = new Array(9);
    FFa = new Array(9);
    Fb = new Array(9);
    FFb = new Array(9);

    for (var i = 0; i < 9; ++i)
    {
        A[i] = new Array(10); //宣告棋種次級陣列
        Q[i] = new Array(10); //宣告ID次級陣列
        Fa[i] = new Array(10);
        FFa[i] = new Array(10);
        Fb[i] = new Array(10);
        FFb[i] = new Array(10);
        for (var j = 0; j < 10; ++j)
        {
            A[i][j] = 0; //棋種代碼預設值
            Q[i][j] = ""; //ID預設值→空字串
            Fa[i][j] = new Array;
            FFa[i][j] = new Array;
            Fb[i][j] = new Array;
            FFb[i][j] = new Array;

        }
    }

    initBoard();
    initMirrorBoard();
    initFogA();
    initFogB();

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

    initChess("b1", -1, 4, 0);//將
    initChess("b4", -4, 8, 0);//車
    initChess("b5", -5, 7, 0);//馬
    initChess("b3", -3, 6, 0);//象
    initChess("b2", -2, 5, 0);//士
    initChess("b1", -1, 4, 0);//將
    initChess("b22", -2, 3, 0);//士
    initChess("b33", -3, 2, 0);//象
    initChess("b55", -5, 1, 0);//馬
    initChess("b44", -4, 0, 0);//車
    initChess("b6", -6, 7, 2);//包
    initChess("b66", -6, 1, 2);//包
    initChess("b71", -7, 8, 3);//卒
    initChess("b72", -7, 6, 3);//卒
    initChess("b73", -7, 4, 3);//卒
    initChess("b74", -7, 2, 3);//卒
    initChess("b75", -7, 0, 3);//卒

    refreshFog();
}

function initBoard()
{
    var newDiv = document.createElement("div");

    newDiv.id = "board";
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 0;
    newDiv.style.width = "642px";
    newDiv.style.height = "704px";
    newDiv.style.backgroundImage = "url(images/Z.png)";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.left = 0 + "px";
    newDiv.style.top = 0 + "px";
    newDiv.onmouseover = mout;

    document.body.appendChild(newDiv);
}

function initMirrorBoard()
{
    var newDiv = document.createElement("div");

    newDiv.id = "mirrorBoard";
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 0;
    newDiv.style.width = "642px";
    newDiv.style.height = "704px";
    newDiv.style.backgroundImage = "url(images/Z.png)";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.left = 730 + "px";
    newDiv.style.top = 0 + "px";
    newDiv.onmouseover = mout;

    document.body.appendChild(newDiv);
}

function initChess(id, k, x, y)
{
    var newDiv = document.createElement("div");
    newDiv.id = id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 1;
    newDiv.style.width = "60px";
    newDiv.style.height = "60px";
    newDiv.style.backgroundImage = "url(images/" + id.substr(0, 2) + ".png)";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.onmousedown = md;
    newDiv.onmousemove = mv;

    if (id.substr(0, 1) == "a")
    {
        newDiv.style.left = 34 + x * 64 + "px";
        newDiv.style.top = 34 + y * 64 + "px";

        var board = document.getElementById("board");
        board.appendChild(newDiv);
    }
    else
    {
        newDiv.style.left = 34 + (8 - x) * 64 + "px";
        newDiv.style.top = 34 + (9 - y) * 64 + "px";

        var board = document.getElementById("mirrorBoard");
        board.appendChild(newDiv);
    }

    chessIn(newDiv, k, x, y);

    var newDivMirror = document.createElement("div");

    newDivMirror.id = id + "x";
    newDivMirror.style.position = "absolute";
    newDivMirror.style.zIndex = 1;
    newDivMirror.style.width = "60px";
    newDivMirror.style.height = "60px";
    newDivMirror.style.backgroundImage = "url(images/" + id.substr(0, 2) + ".png)";
    newDivMirror.style.backgroundRepeat = "no-repeat";

    if (id.substr(0, 1) == "a")
    {
        newDivMirror.style.left = 34 + (8 - x) * 64 + "px";
        newDivMirror.style.top = 34 + (9 - y) * 64 + "px";

        var board = document.getElementById("mirrorBoard");
        board.appendChild(newDivMirror);
    }
    else
    {
        newDivMirror.style.left = 34 + x * 64 + "px";
        newDivMirror.style.top = 34 + y * 64 + "px";

        var board = document.getElementById("board");
        board.appendChild(newDivMirror);
    }

}

function chessIn(c, k, x, y)
{
    updateChessVisible(x, y, false);
    A[x][y] = k;
    Q[x][y] = c.id;
    openChessVisible(c, x, y);
    updateChessVisible(x, y, true);
}

function chessOut(c, k, x, y)
{
    updateChessVisible(x, y, false);
    closeChessVisible(c, x, y);
    A[x][y] = 0;
    Q[x][y] = "";
    updateChessVisible(x, y, true);
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
            newDiv.style.zIndex = 2;
            newDiv.style.width = "64px";
            newDiv.style.height = "64px";
            newDiv.style.backgroundImage = "url(images/fog.png)";
            newDiv.style.backgroundRepeat = "no-repeat";
            newDiv.style.opacity = FogAlpha;
            newDiv.style.visibility = "hidden";
            newDiv.onmousemove = mv;

            newDiv.style.left = 34 + i * 64 + "px";
            newDiv.style.top = 34 + j * 64 + "px";

            var board = document.getElementById("board");
            board.appendChild(newDiv);
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
            newDiv.style.zIndex = 2;
            newDiv.style.width = "64px";
            newDiv.style.height = "64px";
            newDiv.style.backgroundImage = "url(images/fog.png)";
            newDiv.style.backgroundRepeat = "no-repeat";
            newDiv.style.opacity = FogAlpha;
            newDiv.style.visibility = "hidden";
            newDiv.onmousemove = mv;

            newDiv.style.left = 34 + (8 - i) * 64 + "px";
            newDiv.style.top = 34 + (9 - j) * 64 + "px";

            var board = document.getElementById("mirrorBoard");
            board.appendChild(newDiv);
        }
    }
}

function refreshFog()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if (Fa[i][j].length > 0 || FFa[i][j].length > 0)
            {
                hideFog("a", i, j);
            }
            else
            {
                showFog("a", i, j);
            }
        }
    }

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if (Fb[i][j].length > 0 || FFb[i][j].length > 0)
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

function openChessVisible(c, x, y)
{
    var f = (c.id.substr(0, 1) == "a" ? Fa : Fb);
    var ff = (c.id.substr(0, 1) == "a" ? FFb : FFa);

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if ((x == i && y == j))
            {
                addVisible(f[i][j], c.id);
            }
            else if (canVisible(c, x, y, i, j))
            {
                addVisible(f[i][j], c.id);
            }
        }
    }

    if (canAttackPalace(c, x, y))
    {
        addVisible(ff[x][y], c.id);
    }
}

function closeChessVisible(c, x, y)
{
    var f = (c.id.substr(0, 1) == "a" ? Fa : Fb);
    var ff = (c.id.substr(0, 1) == "a" ? FFb : FFa);

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            if ((x == i && y == j) ||
                canVisible(c, x, y, i, j))
            {
                removeVisible(f[i][j], c.id);
            }
        }
    }

    if (canAttackPalace(c, x, y))
    {
        removeVisible(ff[x][y], c.id);
    }
}

function updateChessVisible(x, y, open)
{
    //x, y為中心, X象+馬, 直橫車炮
    refreshHorseVisible(x, y, open);
    refreshElephantVisible(x, y, open);
    refreshCannonAndCarVisible(x, y, open);
    refreshKingVisible(open);
}

function refreshHorseVisible(x, y, open)
{
    var horsePos =
    [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1]
    ];

    for (var i = 0; i < horsePos.length; ++i)
    {
        var pos = horsePos[i];
        var x = pos[0];
        var y = pos[1];
        if (x < 0 || x > 8 ||
            y < 0 || y > 9)
        {
            continue;
        }

        refreshChessVisible(5, x, y, open);
    }
}

function refreshElephantVisible(x, y, open)
{
    var elephantPos =
        [
            [x - 1, y - 1],
            [x - 1, y + 1],
            [x + 1, y - 1],
            [x + 1, y + 1]
        ];

    for (var i = 0; i < elephantPos.length; ++i)
    {
        var pos = elephantPos[i];
        var x = pos[0];
        var y = pos[1];
        if (x < 0 || x > 8 ||
            y < 0 || y > 9)
        {
            continue;
        }

        refreshChessVisible(3, x, y, open);
    }
}

function refreshCannonAndCarVisible(x, y, open)
{
    for (var i = 0; i < 9; ++i)
    {
        refreshChessVisible(4, i, y, open);
        refreshChessVisible(6, i, y, open);
    }

    for (var j = 0; j < 10; ++j)
    {
        refreshChessVisible(4, x, j, open);
        refreshChessVisible(6, x, j, open);
    }
}

function refreshKingVisible(open)
{
    var kingA = document.getElementById("a1");
    if (kingA)
    {
        var x = p2g(kingA.style.posLeft);
        var y = p2g(kingA.style.posTop);
        refreshChessVisible(1, x, y, open);
    }

    var kingB = document.getElementById("b1");
    if (kingB)
    {
        var x = p2g(kingB.style.posLeft);
        var y = p2g(kingB.style.posTop);
        refreshChessVisible(1, 8 - x, 9 - y, open);
    }
}

function refreshChessVisible(q, x, y, open)
{
    var id = Q[x][y];

    if (id && id.substr(1, 1) == q)
    {
        var c = document.getElementById(id);

        if (open)
        {
            openChessVisible(c, x, y);
        }
        else
        {
            closeChessVisible(c, x, y);
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

function addVisible(f, id)
{
    if (!inVisible(f, id))
    {
        f.push(id);
    }
}

function removeVisible(f, id)
{
    for (var i = 0; i < f.length; ++i)
    {
        if (f[i] == id)
        {
            f.splice(i, 1);
        }
    }
}

function inVisible(f, id)
{
    for (var i = 0; i < f.length; ++i)
    {
        if (f[i] == id)
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
    if (w != Turn && !Free)
    {
        return;
    }

    if (Drag)
    {
        Drag = false;
        C.style.zIndex = 1; //恢復正常層次
        C.style.cursor = "default"; //恢復正常游標

        if (event.which == 1)
        {
            chess(C); //檢視下棋動作合法性
        }
        else
        {
            C.style.posLeft = g2p(X1);
            C.style.posTop = g2p(Y1);
            C.style.cursor = "default";
            C.style.zIndex = 1;
            Drag = false;
        }
    }
    else
    {
        Drag = true;
        C.style.zIndex = 2; //提升拖曳中棋子的層次
        C.style.cursor = "pointer"; //改變游標為手指按棋的圖示

        Mdx = event.offsetX; //取得拖曳起點X
        Mdy = event.offsetY; //取得拖曳起點Y
        X1 = p2g(C.style.posLeft); //換算網頁像素點座標為棋盤座標X
        Y1 = p2g(C.style.posTop); //換算網頁像素點座標為棋盤座標Y
    }
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

    if (!canMove(C, X1, Y1, x2, y2) || inFog(w, x2, y2))
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
        var d = document.getElementById(Q[x2][y2]);
        d.style.visibility = "hidden"; //隱藏對方被吃的棋子


        var dd = document.getElementById(Q[x2][y2] + "x");
        dd.style.visibility = "hidden";//隱藏對方被吃的棋子

        chessOut(d, A[x2][y2], x2, y2);

        //將帥被吃了
        if (d.id.substr(1, 1) == "1")
        {
            reset();
        }//重玩囉
    }

    var k = A[X1][Y1];

    chessOut(C, k, X1, Y1);
    chessIn(C, k, x2, y2);

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

    refreshFog();

    C = null; //清除選定棋子物件
}

function canAttackPalace(c, x, y)
{
    var posStart, posEnd;

    if (c.id.substr(0, 1) == "a")
    {
        posStart = [3, 0];
        posEnd = [6, 3];
    }
    else
    {
        posStart = [3, 7];
        posEnd = [6, 10];
    }

    for (var i = posStart[0]; i < posEnd[0]; ++i)
    {
        for (var j = posStart[1]; j < posEnd[1]; ++j)
        {
            if (canAttack(c, x, y, i, j))
            {
                return true;
            }
        }
    }

    return false;
}

//宮在攻擊範圍內
function canAttack(c, x1, y1, x2, y2)
{
    var k = A[x1][y1];

    switch (k)
    {
    case 1: //帥
    case -1: //將
        return straight(x1, y1, x2, y2) && (between(x1, y1, x2, y2) == 0);

    case 6: //炮
    case -6: //包
        return straight(x1, y1, x2, y2) && (between(x1, y1, x2, y2) == 1);
    }

    return canMove(c, x1, y1, x2, y2);
}

function canVisible(c, x1, y1, x2, y2)
{
    var k = A[x1][y1];

    var legal = false;
    switch (k)
    {
    case 1: //帥
    case -1: //將
        legal = straight(x1, y1, x2, y2);
        break;
    case 2: //仕
    case -2: //士
        legal = dgn(1, x1, y1, x2, y2) || step(1, x1, y1, x2, y2);
        break;
    case 3: //相
    case -3: //象
        legal = dgn(1, x1, y1, x2, y2) ||dgn(2, x1, y1, x2, y2) || step(1, x1, y1, x2, y2) || step(2, x1, y1, x2, y2);
        break;
    case 5: //傌
    case -5: //馬
        legal = (horsestep(x1, y1, x2, y2) && freeHorse(x1, y1, x2, y2)) || step(1, x1, y1, x2, y2) || (step(2, x1, y1, x2, y2) && between(x1, y1, x2, y2) == 0);
        break;
    case 6: //炮
    case -6: //包
        legal = (straight(x1, y1, x2, y2) && between(x1, y1, x2, y2) < 2);
        break;
    case 7: //兵
    case -7: //卒
        legal = step(1, x1, y1, x2, y2) || dgn(1, x1, y1, x2, y2);
        break;
    }

    return legal || canMove(c, x1, y1, x2, y2);
}

function canMove(c, x1, y1, x2, y2)
{
    var w = c.id.substr(0, 1);
    var k = A[x1][y1];

    //超出棋盤或有我方棋子
    if (outside(x2, y2) || occupy(k, x2, y2))
    {
        return false;
    }

    var legal = false;
    switch (k)
    {
    case 1: //帥
    case -1: //將
        legal = step(1, x1, y1, x2, y2) && inpalace(w, x2, y2);
        break;
    case 2: //仕
    case -2: //士
        legal = dgn(1, x1, y1, x2, y2) && inpalace(w, x2, y2);
        break;
    case 3: //相
        legal = dgn(2, x1, y1, x2, y2) && (y2 >= 5) && freeElephant(x1, y1, x2, y2);
        break;
    case -3: //象
        legal = dgn(2, x1, y1, x2, y2) && (y2 <= 4) && freeElephant(x1, y1, x2, y2);
        break;
    case 4: //俥
    case -4: //車
        legal = straight(x1, y1, x2, y2) && between(x1, y1, x2, y2) == 0;
        break;
    case 5: //傌
    case -5: //馬
        legal = horsestep(x1, y1, x2, y2) && freeHorse(x1, y1, x2, y2);
        break;
    case 6: //炮
    case -6: //包
        legal = straight(x1, y1, x2, y2) && cannonStep(x1, y1, x2, y2);
        break;
    case 7: //兵
        legal = step(1, x1, y1, x2, y2) && soldier(1, y1, y2);
        break;
    case -7: //卒
        legal = step(1, x1, y1, x2, y2) && soldier(-1, y1, y2);
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

function step(s, x1, y1, x2, y2)
{
    if ((x1 == x2 || y1 == y2) &&
        (Math.abs(x1 - x2) + Math.abs(y1 - y2) == s))
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
    var btw = between(x1, y1, x2, y2);
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
