import JsParse from "../core-parse/js-parser";
import { VNode, CodeType, CssNode, CssStyleType } from "../../base-type";
// import CssClass from './css-class.json';
// const CssClass = require('./css-class.json');
const CssClass = {
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
class CssStyle {
  private jp: JsParse = new JsParse();
  private cssClassList: Array<CssNode> = [];
  constructor() {
    this.initCssClass();
  }

  public mapCssToToken(code: string) {
    const tokenList: Array<VNode> = this.jp.parseJsCode(code);
    for (let i = 0; i < tokenList.length; i += 1) {
      const vn:VNode = tokenList[i];
      const cssNode: CssNode = {
        vn,
        cssClass: CssStyleType.Default,
      };
      if (vn.CodeType === CodeType.KeyWords) {
        cssNode.cssClass = CssStyleType.KeyWords;
      } else if (vn.CodeType === CodeType.Variable) {
        cssNode.cssClass = CssStyleType.Variable;
      } else if (vn.CodeType === CodeType.Symbol) {
        cssNode.cssClass = CssStyleType.SymbolS;
      } else if (vn.CodeType === CodeType.Str) {
        cssNode.cssClass = CssStyleType.Str;
      } else if (vn.CodeType === CodeType.Attribute) {
        cssNode.cssClass = CssStyleType.Attribute;
      } else if (vn.CodeType === CodeType.Other) {
        cssNode.cssClass = CssStyleType.Other;
      } else {
        console.warn(' code type is not define:', vn.CodeType);
      }
      this.cssClassList.push(cssNode);
    }
    // 完成css class和token映射
    console.log(' CssStyle mapCssToToken res list:', JSON.stringify
    (this.cssClassList));
    return tokenList;
  }

  private initCssClass() {
    console.log("start");
    const obj = CssClass;
    let cssCode = '';
    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      let cssClass = `.${key} {`;
      Object.keys(value).forEach((key) => {
        const v = value[key];
        cssClass += `${key}:${v};`;
      });
      cssClass += '}';
      cssCode += cssClass;
    });
    this.loadClassCode(cssCode);
  }

  private loadClassCode (cssCode: string) {
    const style = document.createElement('style');
    const head = document.getElementsByName('head')[0];
    style.type = 'text/css';
    style.appendChild(document.createTextNode(cssCode));
    head.appendChild(style);
  }
}

export default CssStyle;

const ct = new CssStyle();
// ct.mapCssToToken(`const compressing = require('compressing');

// const TAG = 'ProcessTask';`);
