var BoardInfo;
var C, X1, Y1, Mdx, Mdy, Hp, Atk;
var Drag = false;
var Turn = "a";

var FogAlpha = 1;
var Free = false;

function init()
{
    BoardInfo = new Board();

    initBoard();
    initFogAndTip();

    initChess("a4", 4, 0, 9, 100, 50);//俥
    initChess("a5", 5, 1, 9, 100, 50);//傌
    initChess("a3", 3, 2, 9, 50, 200);//相
    initChess("a2", 2, 3, 9, 50, 200);//仕
    initChess("a1", 1, 4, 9, 50, 200);//帥
    initChess("a22", 2, 5, 9, 50, 200);//仕
    initChess("a33", 3, 6, 9, 50, 200);//相
    initChess("a55", 5, 7, 9, 100, 50);//傌
    initChess("a44", 4, 8, 9, 100, 50);//俥
    initChess("a6", 6, 1, 7, 100, 50);//炮
    initChess("a66", 6, 7, 7, 100, 50);//炮
    initChess("a71", 7, 0, 6, 200, 50);//兵
    initChess("a72", 7, 2, 6, 200, 50);//兵
    initChess("a73", 7, 4, 6, 200, 50);//兵
    initChess("a74", 7, 6, 6, 200, 50);//兵
    initChess("a75", 7, 8, 6, 200, 50);//兵

    initChess("b4", -4, 8, 0, 100, 50);//車
    initChess("b5", -5, 7, 0, 100, 50);//馬
    initChess("b3", -3, 6, 0, 50, 200);//象
    initChess("b2", -2, 5, 0, 50, 200);//士
    initChess("b1", -1, 4, 0, 50, 200);//將
    initChess("b22", -2, 3, 0, 50, 200);//士
    initChess("b33", -3, 2, 0, 50, 200);//象
    initChess("b55", -5, 1, 0, 100, 50);//馬
    initChess("b44", -4, 0, 0, 100, 50);//車
    initChess("b6", -6, 7, 2, 100, 50);//包
    initChess("b66", -6, 1, 2, 100, 50);//包
    initChess("b71", -7, 8, 3, 200, 50);//卒
    initChess("b72", -7, 6, 3, 200, 50);//卒
    initChess("b73", -7, 4, 3, 200, 50);//卒
    initChess("b74", -7, 2, 3, 200, 50);//卒
    initChess("b75", -7, 0, 3, 200, 50);//卒

    BoardInfo.update();
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
    board.onmouseover = mouseOut;

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
    mirrorBoard.onmouseover = mouseOut;

    document.body.appendChild(board);
    document.body.appendChild(mirrorBoard);
}

function initChess(id, k, x, y, hp, atk)
{
    var d = createElement(id, x, y, 1, id.substr(0, 2) + ".png");
    d.onmousedown = mouseDown;
    d.onmousemove = mouseMove;
    var h = createHpText(id, x, y, hp);
    var a = createAtkText(id, x, y, atk);

    var dd = createElement(id + "x", x, y, 1, id.substr(0, 2) + ".png");
    var hh = createHpText(id + "x", x, y, hp);
    var aa = createAtkText(id + "x", x, y, atk);

    var board = document.getElementById("board");
    var mirrorBoard = document.getElementById("mirrorBoard");

    if (id.substr(0, 1) == "a")
    {
        board.appendChild(d);
        board.appendChild(h);
        board.appendChild(a);
        mirrorBoard.appendChild(dd);
        mirrorBoard.appendChild(hh);
        mirrorBoard.appendChild(aa);
    }
    else
    {
        board.appendChild(dd);
        board.appendChild(hh);
        board.appendChild(aa);
        mirrorBoard.appendChild(d);
        mirrorBoard.appendChild(h);
        mirrorBoard.appendChild(a);
    }

    var c = new Chess(id, k, hp, atk, d, dd, h, hh, a, aa, BoardInfo);
    BoardInfo.chessIn(c, x, y);
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
            fogA.onmousemove = mouseMove;

            board.appendChild(fogA);
            BoardInfo.slots[i][j].fogA = new Fog(fogA);

            var tipA = createElement("ta" + i + j, i, j, 1, "tip.png");
            tipA.onmousemove = mouseMove;

            board.appendChild(tipA);
            BoardInfo.slots[i][j].tipA = new Tip(tipA);

            var fogB = createElement("fb" + i + j, i, j, 2, "fog.png");
            fogB.onmousemove = mouseMove;

            mirrorBoard.appendChild(fogB);
            BoardInfo.slots[i][j].fogB = new Fog(fogB);

            var tipB = createElement("tb" + i + j, i, j, 1, "tip.png");
            tipB.onmousemove = mouseMove;

            mirrorBoard.appendChild(tipB);
            BoardInfo.slots[i][j].tipB = new Tip(tipB);
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

function createHpText(id, x, y, hp)
{
    var newDiv = document.createElement("div");
    newDiv.id = "h" + id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 2;
    newDiv.innerHTML = hp;

    return newDiv;
}

function createAtkText(id, x, y, atk)
{
    var newDiv = document.createElement("div");
    newDiv.id = "a" + id;
    newDiv.style.position = "absolute";
    newDiv.style.zIndex = 2;
    newDiv.innerHTML = atk;

    return newDiv;
}

function mouseDown(event)
{
    C = event.srcElement; //取得觸發事件的物件(棋子)
    var f = C.id.substr(0, 1); //取得代表黑或紅方的關鍵字

    Hp = document.getElementById("h" + C.id);
    Atk = document.getElementById("a" + C.id);


    //未輪到正確下棋方時跳出副程式
    if (f != Turn && !Free)
    {
        return;
    }

    if (!Drag)
    {
        startDrag(event.offsetX, event.offsetY);
        return;
    }

    //非按下左鍵
    if (event.which != 1)
    {
        endDrag();
        return;
    }

    var result = getPath();
    endDrag();

    if (f == "b")
    {
        result[0] = 8 - result[0];
        result[1] = 9 - result[1];
        result[2] = 8 - result[2];
        result[3] = 9 - result[3];
    }

    if (BoardInfo.move(result[0], result[1], result[2], result[3]))
    {
        BoardInfo.update();

        if (f == "a")
        {
            Turn = "b"; //換黑棋下
        }
        else
        {
            Turn = "a"; //換紅棋下
        }
    }
}

function getPath()
{
    var posX = Math.round((C.style.posLeft + 30) / 64) * 64 - 30;
    var posY = Math.round((C.style.posTop + 30) / 64) * 64 - 30;

    return [X1, Y1, p2g(posX), p2g(posY)];
}

function mouseMove(event)
{
    //如果是拖曳狀態
    if (Drag)
    {
        C.style.posLeft += event.offsetX - Mdx; //X方向移動
        C.style.posTop += event.offsetY - Mdy; //Y方向移動
        Hp.style.posLeft += event.offsetX - Mdx; //X方向移動
        Hp.style.posTop += event.offsetY - Mdy; //Y方向移動
        Atk.style.posLeft += event.offsetX - Mdx; //X方向移動
        Atk.style.posTop += event.offsetY - Mdy; //Y方向移動
    }
}

//滑鼠離開棋子時
function mouseOut()
{
    if (Drag)
    {
        endDrag();
    }
}

function startDrag(x, y)
{
    Drag = true;
    C.style.zIndex = 2; //提升拖曳中棋子的層次
    C.style.cursor = "pointer"; //改變游標為手指按棋的圖示

    Mdx = x; //取得拖曳起點X
    Mdy = y; //取得拖曳起點Y
    X1 = p2g(C.style.posLeft); //換算網頁像素點座標為棋盤座標X
    Y1 = p2g(C.style.posTop); //換算網頁像素點座標為棋盤座標Y
}

function endDrag()
{
    Drag = false;
    C.style.cursor = "default";
    C.style.zIndex = 1;
    C.style.posLeft = g2p(X1);
    C.style.posTop = g2p(Y1);
    Hp.style.posLeft = g2p(X1);
    Hp.style.posTop = g2p(Y1);
    Atk.style.posLeft = g2p(X1);
    Atk.style.posTop = g2p(Y1) + 34;
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
    return (x > 8 ||
            x < 0 ||
            y > 9 ||
            y < 0);
}

//重玩
function reset()
{
    window.location.reload();//重新整理網頁
}
