var Drag = false;
var Turn = "a";
var BoardInfo;
var C, X1, Y1, Mdx, Mdy;
var FogAlpha = 1;
var Free = true;

function Chess(id, k, d, dd, board)
{
    this.id = id;
    this.k = k;
    this.d = d;
    this.dd = dd;
    this.x = 0;
    this.y = 0;
    this.board = board;
}
Chess.prototype.faction = function()
{
    return this.id.substr(0, 1);
}
Chess.prototype.setPos = function(x, y)
{
    this.x = x;
    this.y = y;

    if (this.faction() == "b")
    {
        x = 8 - x;
        y = 9 - y;
    }

    this.d.style.posLeft = g2p(x);
    this.d.style.posTop = g2p(y);

    this.dd.style.posLeft = g2p(8 - x);
    this.dd.style.posTop = g2p(9 - y);
}
Chess.prototype.visible = function(v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
    this.dd.style.visibility = (v ? "visible" : "hidden");
}
Chess.prototype.update = function(board)
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var f = (this.faction() == "a" ? board[i][j].fogA : board[i][j].fogB);

            if ((this.x == i && this.y == j))
            {
                f.visible(false);
            }
            else if (canVisible(this, i, j))
            {
                f.visible(false);
            }
        }
    }

    if (canAttackPalace(this))
    {
        var f = (this.faction() == "a" ? board[this.x][this.y].fogB : board[this.x][this.y].fogA);
        f.visible(false);
    }

    if (canAttackKing(this))
    {
        var t = (this.faction() == "a" ? board[this.x][this.y].tipB : board[this.x][this.y].tipA);
        t.visible(true);
    }
}

function Fog(d)
{
    this.d = d;
}
Fog.prototype.visible = function (v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
}

function Tip(d)
{
    this.d = d;
}

Tip.prototype.visible = function (v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
}

function Slot(x, y)
{
    this.x = x;
    this.y = y;
    this.chess = null;
    this.fogA = null;
    this.fogB = null;
    this.tipA = null;
    this.tipB = null;
};

function init()
{
    BoardInfo = new Array(9);

    for (var i = 0; i < 9; ++i)
    {
        BoardInfo[i] = new Array(10);

        for (var j = 0; j < 10; ++j)
        {
            BoardInfo[i][j] = new Slot(i, j);
        }
    }

    initBoard();
    initFogAndTip();

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

    updateBoard();
}

function initBoard()
{
    var board = document.createElement("div");
    board.id = "board";
    board.style.position = "absolute";
    board.style.zIndex = 0;
    board.style.width = "642px";
    board.style.height = "704px";
    board.style.backgroundImage = "url(images/Z.png)";
    board.style.backgroundRepeat = "no-repeat";
    board.style.left = 0 + "px";
    board.style.top = 0 + "px";
    board.onmouseover = mout;

    var mirrorBoard = document.createElement("div");
    mirrorBoard.id = "mirrorBoard";
    mirrorBoard.style.position = "absolute";
    mirrorBoard.style.zIndex = 0;
    mirrorBoard.style.width = "642px";
    mirrorBoard.style.height = "704px";
    mirrorBoard.style.backgroundImage = "url(images/Z.png)";
    mirrorBoard.style.backgroundRepeat = "no-repeat";
    mirrorBoard.style.left = 730 + "px";
    mirrorBoard.style.top = 0 + "px";
    mirrorBoard.onmouseover = mout;

    document.body.appendChild(board);
    document.body.appendChild(mirrorBoard);
}

function initChess(id, k, x, y)
{
    var d = createElement(id, x, y, 1, id.substr(0, 2) + ".png");
    d.onmousedown = md;
    d.onmousemove = mv;

    var dd = createElement(id + "x", x, y, 1, id.substr(0, 2) + ".png");

    if (id.substr(0, 1) == "a")
    {
        var board = document.getElementById("board");
        board.appendChild(d);

        var mirrorBoard = document.getElementById("mirrorBoard");
        mirrorBoard.appendChild(dd);
    }
    else
    {
        var board = document.getElementById("board");
        board.appendChild(dd);

        var mirrorBoard = document.getElementById("mirrorBoard");
        mirrorBoard.appendChild(d);
    }

    var c = new Chess(id, k, d, dd);

    chessIn(c, x, y);
}

function chessIn(c, x, y)
{
    BoardInfo[x][y].chess = c;

    c.setPos(x, y);
    c.visible(true);
}

function chessOut(x, y)
{
    var c = BoardInfo[x][y].chess;
    c.visible(false);

    BoardInfo[x][y].chess = null;

    //將帥被吃了
    if (c.id.substr(1, 1) == "1")
    {
        reset();
    }//重玩囉
}

function chessMove(c, x, y)
{
    BoardInfo[x][y].chess = c;
    BoardInfo[c.x][c.y].chess = null;

    c.setPos(x, y);
}

function initFogAndTip()
{
    var board = document.getElementById("board");
    var mirrorBoard = document.getElementById("mirrorBoard");

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var fogA = createElement("fa" + i + j, i, j, 2, "fog.png");
            fogA.onmousemove = mv;
            board.appendChild(fogA);
            BoardInfo[i][j].fogA = new Fog(fogA);

            var tipA = createElement("ta" + i + j, i, j, 1, "tip.png");
            tipA.onmousemove = mv;
            board.appendChild(tipA);
            BoardInfo[i][j].tipA = new Tip(tipA);

            var fogB = createElement("fb" + i + j, i, j, 2, "fog.png");
            fogB.onmousemove = mv;
            mirrorBoard.appendChild(fogB);
            BoardInfo[i][j].fogB = new Fog(fogB);

            var tipB = createElement("tb" + i + j, i, j, 1, "tip.png");
            tipB.onmousemove = mv;
            mirrorBoard.appendChild(tipB);
            BoardInfo[i][j].tipB = new Tip(tipB);
        }
    }
}

function createElement(id, x, y, z, file)
{
    var newDiv = document.createElement("div");

    newDiv.id =id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = z;
    newDiv.style.width = "64px";
    newDiv.style.height = "64px";
    newDiv.style.backgroundImage = "url(images/" + file + ")";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.opacity = FogAlpha;
    newDiv.style.visibility = "hidden";

    if (id.substr(1, 1) == "a")
    {
        newDiv.style.left = 34 + x * 64 + "px";
        newDiv.style.top = 34 + y * 64 + "px";
    }
    else
    {
        newDiv.style.left = 34 + (8 - x) * 64 + "px";
        newDiv.style.top = 34 + (9 - y) * 64 + "px";
    }

    return newDiv;
}

function updateBoard()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            BoardInfo[i][j].fogA.visible(true);
            BoardInfo[i][j].fogB.visible(true);
            BoardInfo[i][j].tipA.visible(false);
            BoardInfo[i][j].tipB.visible(false);
        }
    }

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var c = BoardInfo[i][j].chess;

            if (c)
            {
                c.update(BoardInfo);
            }
        }
    }
}

function md(event)
{
    C = event.srcElement; //取得觸發事件的物件(棋子)
    var f = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字

    //未輪到正確下棋方時跳出副程式
    if (f != Turn && !Free)
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
            var posX = Math.round((C.style.posLeft + 30) / 64) * 64 - 30;
            var posY = Math.round((C.style.posTop + 30) / 64) * 64 - 30;

            var x2 = p2g(posX); //取得棋子移至的棋格座標X
            var y2 = p2g(posY); //取得棋子移至的棋格座標Y

            C.style.posLeft = g2p(X1); //跳回原處x1
            C.style.posTop = g2p(Y1); //跳回原處y1

            var f = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字

            if (f == "b")
            {
                X1 = 8 - X1;
                Y1 = 9 - Y1;
                x2 = 8 - x2;
                y2 = 9 - y2;
            }

            C = null; //清除選定棋子物件

            var c = BoardInfo[X1][Y1].chess;
            move(c, x2, y2); //檢視下棋動作合法性
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
function move(c, x, y)
{
    if (!canMove(c, x, y))
    {
        return;
    }

    //目的地有對方棋子→吃棋
    if (BoardInfo[x][y].chess)
    {
        chessOut(x, y);
    }

    chessMove(c, x, y);

    //紅方完成下棋
    if (c.faction() == "a")
    {
        Turn = "b"; //換黑棋下
    }

    //黑方完成下棋
    if (c.faction() == "b")
    {
        Turn = "a"; //換紅棋下
    }

    updateBoard();
}

function canAttackKing(c)
{
    var id = ((c.faction() == "a") ? "b1" : "a1");

    var result = findChessPos(id);
    if (result[0])
    {
        return canAttack(c, result[1], result[2]);
    }

    return false;
}

function canAttackPalace(c)
{
    var posStart, posEnd;

    if (c.faction() == "a")
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
            if (canAttack(c, i, j))
            {
                return true;
            }
        }
    }

    return false;
}

//宮在攻擊範圍內
function canAttack(c, x, y)
{
    switch (c.k)
    {
    case 1: //帥
    case -1: //將
        return straight(c.x, c.y, x, y) && (between(c.x, c.y, x, y) == 0);

    case 6: //炮
    case -6: //包
        return straight(c.x, c.y, x, y) && (between(c.x, c.y, x, y) == 1);
    }

    return canMove(c, x, y);
}

function canVisible(c, x, y)
{
    var legal = false;
    switch (c.k)
    {
    case 1: //帥
    case -1: //將
        legal = straight(c.x, c.y, x, y);
        break;

    case 2: //仕
    case -2: //士
        legal = dgn(1, c.x, c.y, x, y) || step(1, c.x, c.y, x, y);
        break;

    case 3: //相
    case -3: //象
        legal = dgn(1, c.x, c.y, x, y) ||dgn(2, c.x, c.y, x, y) || step(1, c.x, c.y, x, y) || step(2, c.x, c.y, x, y);
        break;

    case 5: //傌
    case -5: //馬
        legal = (horsestep(c.x, c.y, x, y) && freeHorse(c.x, c.y, x, y)) || step(1, c.x, c.y, x, y) || (step(2, c.x, c.y, x, y) && between(c.x, c.y, x, y) == 0);
        break;

    case 6: //炮
    case -6: //包
        legal = (straight(c.x, c.y, x, y) && between(c.x, c.y, x, y) < 2);
        break;

    case 7: //兵
    case -7: //卒
        legal = step(1, c.x, c.y, x, y) || dgn(1, c.x, c.y, x, y);
        break;
    }

    return legal || canMove(c, x, y);
}

function canMove(c, x, y)
{
    //超出棋盤或有我方棋子
    if (outside(x, y) || occupy(c, x, y))
    {
        return false;
    }

    var legal = false;
    switch (c.k)
    {
    case 1: //帥
    case -1: //將
        legal = step(1, c.x, c.y, x, y) && inpalace(c.faction(), x, y);
        break;

    case 2: //仕
    case -2: //士
        legal = dgn(1, c.x, c.y, x, y) && inpalace(c.faction(), x, y);
        break;

    case 3: //相
        legal = dgn(2, c.x, c.y, x, y) && (y >= 5) && freeElephant(c.x, c.y, x, y);
        break;

    case -3: //象
        legal = dgn(2, c.x, c.y, x, y) && (y <= 4) && freeElephant(c.x, c.y, x, y);
        break;

    case 4: //俥
    case -4: //車
        legal = straight(c.x, c.y, x, y) && between(c.x, c.y, x, y) == 0;
        break;

    case 5: //傌
    case -5: //馬
        legal = horsestep(c.x, c.y, x, y) && freeHorse(c.x, c.y, x, y);
        break;

    case 6: //炮
    case -6: //包
        legal = straight(c.x, c.y, x, y) && cannonStep(c, x, y);
        break;

    case 7: //兵
        legal = step(1, c.x, c.y, x, y) && soldier(1, c.y, y);
        break;

    case -7: //卒
        legal = step(1, c.x, c.y, x, y) && soldier(-1, c.y, y);
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
function occupy(c, x, y)
{
    var c2 = BoardInfo[x][y].chess;
    if (c2 &&
        c.k * c2.k > 0)
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

    var c = BoardInfo[xx][yy].chess;
    if (c)
    {
        return false;
    }

    return true;
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
            if (BoardInfo[i][y1].chess)
            {
                n += 1;
            }
        }
    }
    if (x2 > x1)
    {
        for (var i = x1 + 1; i < x2; i++)
        {
            if (BoardInfo[i][y1].chess)
            {
                n += 1;
            }
        }
    }
    if (y1 > y2)
    {
        for (var j = y2 + 1; j < y1; j++)
        {
            if (BoardInfo[x1][j].chess)
            {
                n += 1;
            }
        }
    }
    if (y2 > y1)
    {
        for (var j = y1 + 1; j < y2; j++)
        {
            if (BoardInfo[x1][j].chess)
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
    if (x1 - x2 == 2 && BoardInfo[x1 - 1][y1].chess)
    {
        return false;
    }
    if (x2 - x1 == 2 && BoardInfo[x1 + 1][y1].chess)
    {
        return false;
    }
    if (y1 - y2 == 2 && BoardInfo[x1][y1 - 1].chess)
    {
        return false;
    }
    if (y2 - y1 == 2 && BoardInfo[x1][y1 + 1].chess)
    {
        return false;
    }
    return true;
}

//炮與包的規則
function cannonStep(c, x, y)
{
    var c2 = BoardInfo[x][y].chess;

    var btw = between(c.x, c.y, x, y);
    if (btw == 0 && c2 == null)
    {
        return true;
    }
    if (btw == 1 && c.k * c2.k < 0)
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

function findChessPos(id)
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var c = BoardInfo[i][j].chess;
            if (c && c.id == id)
            {
                return [true, i, j];
            }
        }
    }

    return [false];
}

//重玩
function reset()
{
    window.location.reload();//重新整理網頁
}
