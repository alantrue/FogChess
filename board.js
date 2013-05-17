function Board()
{
    this.slots = new Array(9);

    for (var i = 0; i < 9; ++i)
    {
        this.slots[i] = new Array(10);

        for (var j = 0; j < 10; ++j)
        {
            this.slots[i][j] = new Slot(i, j);
        }
    }
}

Board.prototype.chessIn = function(c, x, y)
{
    this.slots[x][y].chess = c;

    c.position(x, y);
    c.visible(true);
};

Board.prototype.chessOut = function(x, y)
{
    var c = this.slots[x][y].chess;
    c.visible(false);

    this.slots[x][y].chess = null;

    //將帥被吃了
    if (c.id.substr(1, 1) == "1")
    {
        reset();
    }//重玩囉
};

Board.prototype.chessMove = function(c, x, y)
{
    this.slots[x][y].chess = c;
    this.slots[c.x][c.y].chess = null;

    c.position(x, y);
};

Board.prototype.chessPos = function(id)
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var c = this.slots[i][j].chess;
            if (c && c.id == id)
            {
                return [true, i, j];
            }
        }
    }

    return [false];
};

//下棋合法性檢查
Board.prototype.move = function(x1, y1, x2, y2)
{
    var c = this.slots[x1][y1].chess;
    if (c == null)
    {
        return false;
    }

    if (!c.canMove(x2, y2))
    {
        return false;
    }

    //目的地有對方棋子→吃棋
    if (this.slots[x2][y2].chess)
    {
        this.chessOut(x2, y2);
    }

    this.chessMove(c, x2, y2);

    return true;
};

Board.prototype.resetFogAndTip = function()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            this.slots[i][j].fogA.visible(true);
            this.slots[i][j].fogB.visible(true);
            this.slots[i][j].tipA.visible(false);
            this.slots[i][j].tipB.visible(false);
        }
    }
};

Board.prototype.update = function()
{
    this.resetFogAndTip();

    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var c = this.slots[i][j].chess;

            if (c)
            {
                c.update();
            }
        }
    }
};

function Slot(x, y)
{
    this.x = x;
    this.y = y;
    this.chess = null;
    this.fogA = null;
    this.fogB = null;
    this.tipA = null;
    this.tipB = null;
}

function Fog(d)
{
    this.d = d;
}

Fog.prototype.visible = function (v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
};

function Tip(d)
{
    this.d = d;
}

Tip.prototype.visible = function (v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
};
