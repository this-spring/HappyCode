"use strict";
exports.__esModule = true;
var base_type_1 = require("../../base-type");
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 02:24:34
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
        this.tokenList = [];
        while (1) {
            var token = this.getLetter();
            var vn = {
                CodeType: base_type_1.CodeType.Attribute,
                Token: token
            };
            if (this.isSpace(token)) {
                vn.CodeType = base_type_1.CodeType.Space;
            }
            else if (this.isOther(token)) {
                vn.CodeType = base_type_1.CodeType.Other;
            }
            else if (this.isKeyWords(token)) {
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
        return this.tokenList;
    };
    JsParse.prototype.seek = function (len) {
        this.index += len;
    };
    JsParse.prototype.getLetter = function (pre) {
        var pos = this.index;
        var token = '';
        var keywordStart = false;
        var spaceStart = false;
        var i = pos;
        for (; i < this.code.length; i += 1) {
            var ch = this.code[i];
            var nextI = (i + 1) < this.code.length ? (i + 1) : this.code.length - 1;
            var next = this.code[nextI];
            console.log(' i:', i, " ch:", ch);
            // // 空格
            if (ch === ' ') {
                spaceStart = true;
                token += ' ';
            }
            if (next !== ' ' && spaceStart) {
                spaceStart = false;
                break;
            }
            // 换行
            if (this.otherWords.get(ch)) {
                token = ch;
                break;
            }
            // 查找一个字符串
            if (this.symbolWords.get(ch)) {
                token = ch;
                break;
            }
            // 查找关键字
            if (ch !== ' ' && !keywordStart) {
                keywordStart = true;
                // 情况： const a = '123'; a空格或者123'
            }
            else if ((next === ' ' || this.symbolWords.get(next)) && keywordStart) {
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
        console.log(' letter token:', token);
        return token;
    };
    JsParse.prototype.isKeyWords = function (ch) {
        var keyFlag = !!(this.keyWords.get(ch)) && (this.lastCodeType !== base_type_1.CodeType.KeyWords);
        return keyFlag;
    };
    JsParse.prototype.isVar = function (ch) {
        console.log(' isVar');
        var varFlag = false;
        if (this.tokenList.length > 0) {
            // const lastToken = this.tokenList[this.tokenList.length - 1];
            var lastToken = this.findLastNotSpaceToken();
            if (lastToken.CodeType === base_type_1.CodeType.KeyWords) {
                varFlag = true;
            }
        }
        return varFlag;
    };
    JsParse.prototype.isSym = function (token) {
        console.log(' isSym');
        var symFlag = !!this.symbolWords.get(token);
        return symFlag;
    };
    JsParse.prototype.isStr = function (token) {
        console.log(' isStr');
        var strFlag = false;
        if (this.tokenList.length > 0) {
            // const lastToken = this.tokenList[this.tokenList.length - 1];
            var lastToken = this.findLastNotSpaceToken();
            if ((lastToken.Token === this.symbolWords.get('"')) || (lastToken.Token === this.symbolWords.get("'"))) {
                strFlag = true;
            }
        }
        return strFlag;
    };
    JsParse.prototype.isAttr = function (token) {
        console.log(' isAttr');
        var attrFlag = false;
        if (this.tokenList.length > 0) {
            // const lastToken = this.tokenList[this.tokenList.length - 1];
            var lastToken = this.findLastNotSpaceToken();
            var nextToken = void 0;
            while (1) {
                nextToken = this.getLetter(true);
                if (nextToken.indexOf(' ') < 0) {
                    break;
                }
            }
            console.log(' last:', lastToken, ' next:', nextToken);
            if (lastToken.Token === this.symbolWords.get('{') && nextToken === this.symbolWords.get(':')) {
                attrFlag = true;
            }
        }
        return attrFlag;
    };
    JsParse.prototype.isOther = function (token) {
        console.log(' isOther');
        var otherFlag = false;
        if (this.otherWords.get(token)) {
            otherFlag = true;
        }
        return otherFlag;
    };
    JsParse.prototype.isSpace = function (token) {
        console.log(' isSpace');
        var spaceFlag = true;
        for (var i = 0; i < token.length; i += 1) {
            if (token[i] != ' ') {
                spaceFlag = false;
                break;
            }
        }
        return spaceFlag;
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
    JsParse.prototype.findLastNotSpaceToken = function () {
        var lastToken = {
            CodeType: base_type_1.CodeType.Default,
            Token: ''
        };
        for (var i = this.tokenList.length - 1; i >= 0; i -= 1) {
            var token = this.tokenList[i];
            if (token.CodeType !== base_type_1.CodeType.Space) {
                lastToken = token;
                break;
            }
        }
        return lastToken;
    };
    return JsParse;
}());
exports["default"] = JsParse;
// test
var jp = new JsParse();
// jp.parseJsCode(`const compressing = require('compressing');const res = {name: 'xxa'}`);
jp.parseJsCode("const compressing = require('compressing');\n\nconst TAG = 'ProcessTask';\n\nconst CmdType = {\n  CompressZip: 'CompressZip',\n  UnZip: 'UnZip',\n};\nconst obj = {\n    x: 'x',\n    co: function x() {\n      \n    }\n};\nlet arr = [];\nconsole.log(arr);\nconsole.log(obj);\n\nprocess.on('message', (res) => {})");
