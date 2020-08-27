/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-27 13:19:51
 */
var JsParse = /** @class */ (function () {
    function JsParse() {
        this.keyWords = new Map();
        this.symbolWords = new Map();
        this.index = 0;
        this.code = '';
        this.initKeyWords();
        this.initSymbol();
    }
    JsParse.prototype.parseJsCode = function (code) {
        this.code = code.trim();
        while (1) {
            var ch = this.getLetter();
            console.log('token: ', ch);
            // this.isKeyWords(ch);
        }
    };
    JsParse.prototype.seek = function (len) {
        this.index += len;
    };
    JsParse.prototype.getLetter = function () {
        var pos = this.index;
        var token = '';
        var keywordStart = false;
        var i = pos;
        for (; i < this.code.length; i += 1) {
            var ch = this.code[i];
            var nextI = (i + 1) < this.code.length ? (i + 1) : this.code.length - 1;
            var next = this.code[nextI];
            console.log(' i:', i, " ch:", ch);
            // 查找符号
            if (this.symbolWords.get(ch)) {
                token = ch;
                break;
            }
            // 查找关键字
            if (ch !== ' ' && !keywordStart) {
                keywordStart = true;
            }
            else if ((ch === ' ' || this.symbolWords.get(next)) && keywordStart) {
                if (this.symbolWords.get(next))
                    token += ch;
                keywordStart = false;
                break;
            }
            if (keywordStart) {
                token += ch;
            }
        }
        this.index = i + 1;
        return token;
    };
    JsParse.prototype.getOneChar = function () {
        return this.code[this.index];
    };
    JsParse.prototype.isKeyWords = function (ch) {
        var pos = this.index;
    };
    JsParse.prototype.isVar = function () {
    };
    JsParse.prototype.isSym = function () {
    };
    JsParse.prototype.isStr = function () {
    };
    JsParse.prototype.isAttr = function () {
    };
    JsParse.prototype.initKeyWords = function () {
        this.keyWords.set('const', 'const');
        this.keyWords.set('let', 'let');
        this.keyWords.set('function', 'function');
        this.keyWords.set('break', 'break');
        this.keyWords.set('while', 'while');
        this.keyWords.set('var', 'var');
        this.keyWords.set('this', 'this');
    };
    JsParse.prototype.initSymbol = function () {
        this.symbolWords.set('"', '"');
        this.symbolWords.set("'", "'");
        this.symbolWords.set('=', '=');
        this.symbolWords.set(';', ';');
        this.symbolWords.set(':', ':');
        this.symbolWords.set('>', '>');
        this.symbolWords.set('{', '}');
        this.symbolWords.set('(', ')');
    };
    return JsParse;
}());
// test
var jp = new JsParse();
jp.parseJsCode('const x = "123"');
