function Chess(id, k, hp, atk, d, dd, board)
{
    this.id = id;
    this.k = k;
    this.hp = hp;
    this.atk = atk;
    this.d = d;
    this.dd = dd;
    this.x = 0;
    this.y = 0;
    this.board = board;
}

Chess.prototype.attack = function(c)
{
    if (c.hp > this.atk)
    {
        c.hp -= this.atk;
    }
    else
    {
        c.hp = 0;
    }
};

Chess.prototype.isDie = function()
{
    return this.hp == 0;
};

Chess.prototype.faction = function()
{
    return this.id.substr(0, 1);
};

Chess.prototype.position = function(x, y)
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
};

Chess.prototype.visible = function(v)
{
    this.d.style.visibility = (v ? "visible" : "hidden");
    this.dd.style.visibility = (v ? "visible" : "hidden");
};

Chess.prototype.update = function()
{
    for (var i = 0; i < 9; ++i)
    {
        for (var j = 0; j < 10; ++j)
        {
            var f = (this.faction() == "a" ? this.board.slots[i][j].fogA : this.board.slots[i][j].fogB);

            if ((this.x == i && this.y == j))
            {
                f.visible(false);
            }
            else if (this.canVisible(i, j))
            {
                f.visible(false);
            }
        }
    }

    if (this.canAttackPalace())
    {
        var f = (this.faction() == "a" ? this.board.slots[this.x][this.y].fogB : this.board.slots[this.x][this.y].fogA);
        f.visible(false);
    }

    if (this.canAttackKing())
    {
        var t = (this.faction() == "a" ? this.board.slots[this.x][this.y].tipB : this.board.slots[this.x][this.y].tipA);
        t.visible(true);
    }
};

Chess.prototype.canAttackKing = function()
{
    var kingId = ((this.faction() == "a") ? "b1" : "a1");

    var result = this.board.chessPos(kingId);
    if (result[0])
    {
        return this.canAttack(result[1], result[2]);
    }

    return false;
};

Chess.prototype.canAttackPalace = function()
{
    var posStart, posEnd;

    if (this.faction() == "a")
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
            if (this.canAttack(i, j))
            {
                return true;
            }
        }
    }

    return false;
};

//宮在攻擊範圍內
Chess.prototype.canAttack = function(x, y)
{
    switch (this.k)
    {
    case 1: //帥
    case -1: //將
        return this.straight(x, y) && (this.between(x, y) == 0);

    case 6: //炮
    case -6: //包
        return this.straight(x, y) && (this.between(x, y) == 1);
    }

    return this.canMove(x, y);
};

Chess.prototype.canVisible = function(x, y)
{
    var legal = false;
    switch (this.k)
    {
    case 1: //帥
    case -1: //將
        legal = this.straight(x, y);
        break;

    case 2: //仕
    case -2: //士
        legal = this.dgn(1, x, y) || this.step(1, x, y);
        break;

    case 3: //相
    case -3: //象
        legal = this.dgn(1, x, y) || this.dgn(2, x, y) || this.step(1, x, y) || this.step(2, x, y);
        break;

    case 5: //傌
    case -5: //馬
        legal = (this.horsestep(x, y) && this.freeHorse(x, y)) || this.step(1, x, y) || (this.step(2, x, y) && this.between(x, y) == 0);
        break;

    case 6: //炮
    case -6: //包
        legal = (this.straight(x, y) && this.between(x, y) < 2);
        break;

    case 7: //兵
    case -7: //卒
        legal = this.step(1, x, y) || this.dgn(1, x, y);
        break;
    }

    return legal || this.canMove(x, y);
};

Chess.prototype.canMove = function(x, y)
{
    //超出棋盤或有我方棋子
    if (outside(x, y) || this.occupy(x, y))
    {
        return false;
    }

    var legal = false;
    switch (this.k)
    {
    case 1: //帥
    case -1: //將
        legal = this.step(1, x, y) && this.inpalace(x, y);
        break;

    case 2: //仕
    case -2: //士
        legal = this.dgn(1, x, y) && this.inpalace(x, y);
        break;

    case 3: //相
        legal = this.dgn(2, x, y) && (y >= 5) && this.freeElephant(x, y);
        break;

    case -3: //象
        legal = this.dgn(2, x, y) && (y <= 4) && this.freeElephant(x, y);
        break;

    case 4: //俥
    case -4: //車
        legal = this.straight(x, y) && this.between(x, y) == 0;
        break;

    case 5: //傌
    case -5: //馬
        legal = this.horsestep(x, y) && this.freeHorse(x, y);
        break;

    case 6: //炮
    case -6: //包
        legal = this.straight(x, y) && this.cannonStep(x, y);
        break;

    case 7: //兵
        legal = this.step(1, x, y) && this.soldier(y);
        break;

    case -7: //卒
        legal = this.step(1, x, y) && this.soldier(y);
        break;
    }

    return legal;
};

//棋格有我方棋子
Chess.prototype.occupy = function(x, y)
{
    var c2 = this.board.slots[x][y].chess;
    return (c2 && this.k * c2.k > 0);
};

Chess.prototype.inpalace = function(x, y)
{
    if (x > 5 || x < 3)
    {
        return false;
    }
    if (this.faction() == "a" && y < 7)
    {
        return false;
    }
    if (this.faction() == "b" && y > 2)
    {
        return false;
    }
    return true;
};

//炮與包的規則
Chess.prototype.cannonStep = function(x, y)
{
    var c2 = this.board.slots[x][y].chess;

    var btw = this.between(x, y);
    if (btw == 0 && c2 == null)
    {
        return true;
    }
    if (btw == 1 && this.k * c2.k < 0)
    {
        return true;
    }
    return false;
};

//兵卒的規則
Chess.prototype.soldier = function(y)
{
    if (this.k > 0)
    {
        if (y - this.y > 0)
        {
            return false;
        }
        if (this.y > 4 && y == this.y)
        {
            return false;
        }
        return true;
    }
    else
    {
        if (this.y - y > 0)
        {
            return false;
        }
        if (this.y < 5 && y == this.y)
        {
            return false;
        }
        return true;
    }
};

//馬走日字的規則
Chess.prototype.horsestep = function(x, y)
{
    return ((Math.abs(this.x - x) == 1 && Math.abs(this.y - y) == 2) ||
            (Math.abs(this.x - x) == 2 && Math.abs(this.y - y) == 1));
};

Chess.prototype.freeHorse = function(x, y)
{
    if (this.x - x == 2 && this.board.slots[this.x - 1][this.y].chess)
    {
        return false;
    }
    if (x - this.x == 2 && this.board.slots[this.x + 1][this.y].chess)
    {
        return false;
    }
    if (this.y - y == 2 && this.board.slots[this.x][this.y - 1].chess)
    {
        return false;
    }
    if (y - this.y == 2 && this.board.slots[this.x][this.y + 1].chess)
    {
        return false;
    }
    return true;
};

//起終點間有幾個棋子
Chess.prototype.between = function(x, y)
{
    var n = 0;

    if (this.x > x)
    {
        for (var i = x + 1; i < this.x; i++)
        {
            if (this.board.slots[i][this.y].chess)
            {
                n += 1;
            }
        }
    }
    if (x > this.x)
    {
        for (var i = this.x + 1; i < x; i++)
        {
            if (this.board.slots[i][this.y].chess)
            {
                n += 1;
            }
        }
    }
    if (this.y > y)
    {
        for (var j = y + 1; j < this.y; j++)
        {
            if (this.board.slots[this.x][j].chess)
            {
                n += 1;
            }
        }
    }
    if (y > this.y)
    {
        for (var j = this.y + 1; j < y; j++)
        {
            if (this.board.slots[this.x][j].chess)
            {
                n += 1;
            }
        }
    }
    return n;
};

//直行
Chess.prototype.straight = function(x, y)
{
    return (this.x == x || this.y == y);
};

Chess.prototype.step = function(s, x, y)
{
    return ((this.x == x || this.y == y) &&
            (Math.abs(this.x - x) + Math.abs(this.y - y) == s));
};

//斜走s格
Chess.prototype.dgn = function(s, x, y)
{
    return (Math.abs(this.x - x) == s &&
            Math.abs(this.y - y) == s);
};

//卡象腳
Chess.prototype.freeElephant = function(x, y)
{
    var xx = Math.round((this.x + x) / 2);
    var yy = Math.round((this.y + y) / 2);

    return (this.board.slots[xx][yy].chess = null);
};