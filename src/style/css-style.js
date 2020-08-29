"use strict";
exports.__esModule = true;
var js_parser_1 = require("../core-parse/js-parser");
var base_type_1 = require("../../base-type");
// import CssClass from './css-class.json';
// const CssClass = require('./css-class.json');
var CssClass = {
    "KeyWords": {
        "color": "#3B8CC2"
    },
    "Variable": {
        "color": "#46C3FF"
    },
    "SymbolS": {
        "color": "#CFCFCF"
    },
    "Str": {
        "color": "#D88E73"
    },
    "Attribute": {
        "color": "#9DDBEF"
    }
};
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-29 14:03:12
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-29 14:52:29
*/
var CssStyle = /** @class */ (function () {
    function CssStyle() {
        this.jp = new js_parser_1["default"]();
        this.cssClassList = [];
        this.initCssClass();
    }
    CssStyle.prototype.mapCssToToken = function (code) {
        var tokenList = this.jp.parseJsCode(code);
        for (var i = 0; i < tokenList.length; i += 1) {
            var vn = tokenList[i];
            var cssNode = {
                vn: vn,
                cssClass: base_type_1.CssStyleType.Default
            };
            if (vn.CodeType === base_type_1.CodeType.KeyWords) {
                cssNode.cssClass = base_type_1.CssStyleType.KeyWords;
            }
            else if (vn.CodeType === base_type_1.CodeType.Variable) {
                cssNode.cssClass = base_type_1.CssStyleType.Variable;
            }
            else if (vn.CodeType === base_type_1.CodeType.Symbol) {
                cssNode.cssClass = base_type_1.CssStyleType.SymbolS;
            }
            else if (vn.CodeType === base_type_1.CodeType.Str) {
                cssNode.cssClass = base_type_1.CssStyleType.Str;
            }
            else if (vn.CodeType === base_type_1.CodeType.Attribute) {
                cssNode.cssClass = base_type_1.CssStyleType.Attribute;
            }
            else if (vn.CodeType === base_type_1.CodeType.Other) {
                cssNode.cssClass = base_type_1.CssStyleType.Other;
            }
            else {
                console.warn(' code type is not define:', vn.CodeType);
            }
            this.cssClassList.push(cssNode);
        }
        // 完成css class和token映射
        console.log(' CssStyle mapCssToToken res list:', JSON.stringify(this.cssClassList));
        return tokenList;
    };
    CssStyle.prototype.initCssClass = function () {
        console.log("start");
        var obj = CssClass;
        var cssCode = '';
        Object.keys(obj).forEach(function (key) {
            var value = obj[key];
            var cssClass = "." + key + " {";
            Object.keys(value).forEach(function (key) {
                var v = value[key];
                cssClass += key + ":" + v + ";";
            });
            cssClass += '}';
            cssCode += cssClass;
        });
        console.log(JSON.stringify(cssCode));
    };
    CssStyle.prototype.lassClassCode = function (cssCode) {
        var style = document.createElement('style');
        var head = document.getElementsByName('head')[0];
        style.type = 'text/css';
        style.appendChild(document.createTextNode(cssCode));
        head.appendChild(style);
    };
    return CssStyle;
}());
exports["default"] = CssStyle;
var ct = new CssStyle();
// ct.mapCssToToken(`const compressing = require('compressing');
// const TAG = 'ProcessTask';`);
