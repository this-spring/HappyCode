"use strict";
exports.__esModule = true;
var base_type_1 = require("../../base-type");
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-28 23:37:09
 */
var JsParse = /** @class */ (function () {
    function JsParse() {
        this.keyWords = new Map();
        this.symbolWords = new Map();
        this.otherWords = new Map();
        this.tokenList = [];
        this.lastCodeType = base_type_1.CodeType.Default;
        this.index = 0;
        this.code = '';
        this.initKeyWords();
        this.initSymbol();
        this.initOther();
    }
    JsParse.prototype.parseJsCode = function (code) {
        this.code = code.trim();
        while (1) {
            var token = this.getLetter();
            var vn = {
                CodeType: base_type_1.CodeType.Attribute,
                Token: token
            };
            if (this.isKeyWords(token)) {
                vn.CodeType = base_type_1.CodeType.KeyWords;
            }
            else if (this.isVar(token)) {
                vn.CodeType = base_type_1.CodeType.Variable;
            }
            else if (this.isSym(token)) {
                vn.CodeType = base_type_1.CodeType.Symbol;
            }
            else if (this.isStr(token)) {
                vn.CodeType = base_type_1.CodeType.Str;
            }
            else if (this.isAttr(token)) {
                vn.CodeType = base_type_1.CodeType.Attribute;
            }
            else if (this.isOther(token)) {
                vn.CodeType = base_type_1.CodeType.Other;
            }
            else {
                console.error(' CodeType is not defined token:', token);
            }
            console.log(' token: ', token, ' index: ', this.index, ' code.length:', this.code.length);
            this.tokenList.push(vn);
            if (this.index >= this.code.length) {
                console.log(' tokenList:', JSON.stringify(this.tokenList));
                break;
            }
            ;
        }
    };
    JsParse.prototype.seek = function (len) {
        this.index += len;
    };
    JsParse.prototype.getLetter = function (pre) {
        var pos = this.index;
        var token = '';
        var keywordStart = false;
        var i = pos;
        for (; i < this.code.length; i += 1) {
            var ch = this.code[i];
            var nextI = (i + 1) < this.code.length ? (i + 1) : this.code.length - 1;
            var next = this.code[nextI];
            console.log(' i:', i, " ch:", ch);
            // 换行
            if (this.otherWords.get(ch)) {
                token = ch;
                break;
            }
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
        if (!pre)
            this.index = i + 1;
        return token;
    };
    JsParse.prototype.getOneChar = function () {
        return this.code[this.index];
    };
    JsParse.prototype.isKeyWords = function (ch) {
        var keyFlag = !!(this.keyWords.get(ch)) && (this.lastCodeType !== base_type_1.CodeType.KeyWords);
        return keyFlag;
    };
    JsParse.prototype.isVar = function (ch) {
        var varFlag = false;
        if (this.tokenList.length > 0) {
            var lastToken = this.tokenList[this.tokenList.length - 1];
            if (lastToken.CodeType === base_type_1.CodeType.KeyWords) {
                varFlag = true;
            }
        }
        return varFlag;
    };
    JsParse.prototype.isSym = function (token) {
        var symFlag = !!this.symbolWords.get(token);
        return symFlag;
    };
    JsParse.prototype.isStr = function (token) {
        var strFlag = false;
        if (this.tokenList.length > 0) {
            var lastToken = this.tokenList[this.tokenList.length - 1];
            if ((lastToken.Token === this.symbolWords.get('"')) || (lastToken.Token === this.symbolWords.get("'"))) {
                strFlag = true;
            }
        }
        return strFlag;
    };
    JsParse.prototype.isAttr = function (token) {
        var attrFlag = false;
        if (this.tokenList.length > 0) {
            var lastToken = this.tokenList[this.tokenList.length - 1];
            var nextToken = this.getLetter(true);
            console.log(' last:', lastToken, ' next:', nextToken);
            if (lastToken.Token === this.symbolWords.get('{') && nextToken === this.symbolWords.get(':')) {
                attrFlag = true;
            }
        }
        return attrFlag;
    };
    JsParse.prototype.isOther = function (token) {
        var otherFlag = false;
        if (this.otherWords.get(token)) {
            otherFlag = true;
        }
        return otherFlag;
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
        this.symbolWords.set('(', '(');
        this.symbolWords.set(')', ')');
    };
    JsParse.prototype.initOther = function () {
        this.otherWords.set('\n', '\n');
    };
    return JsParse;
}());
// test
var jp = new JsParse();
// jp.parseJsCode(`const compressing = require('compressing');const res = {name: 'xxa'}`);
jp.parseJsCode("const compressing = require('compressing');\n\nconst TAG = 'ProcessTask';");
