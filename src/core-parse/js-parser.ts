import { VNode, CodeType } from "../../base-type";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-28 23:14:36
 */
class JsParse {
  private keyWords: Map<string, string> = new Map();
  private symbolWords: Map<string, string> = new Map();
  private tokenList: Array<VNode> = [];
  private lastCodeType: CodeType = CodeType.Default;
  private index: number = 0;
  private code: string = '';
  constructor() {
    this.initKeyWords();
    this.initSymbol();
  }



  public parseJsCode(code: string) {
    this.code = code.trim();
    while(1) {
      const token = this.getLetter();
      const vn: VNode = {
        CodeType: CodeType.Attribute,
        Token: token,
      };
      if (this.isKeyWords(token)) {
        vn.CodeType = CodeType.KeyWords;
      } else if (this.isVar(token)) {
        vn.CodeType = CodeType.Variable;
      } else if (this.isSym(token)) {
        vn.CodeType = CodeType.Symbol;
      } else if (this.isStr(token)) {
        vn.CodeType = CodeType.Str;
      } else if (this.isAttr(token)) {
        vn.CodeType = CodeType.Attribute;
      } else {
        console.error(' CodeType is not defined token:', token);
      }
      console.log(' token: ', token, ' index: ', this.index, ' code.length:', this.code.length);
      this.tokenList.push(vn);
      if (this.index >= this.code.length) {
        console.log(' tokenList:', JSON.stringify(this.tokenList));
        break;
      };
    }
  }

  private seek(len: number) {
    this.index += len;
  }

  private getLetter(pre?: boolean): string {
    const pos = this.index;
    let token = '';
    let keywordStart = false;
    let i = pos;
    for (;i < this.code.length; i += 1) {
      const ch = this.code[i];
      const nextI = (i + 1) < this.code.length ? (i + 1) : this.code.length - 1;
      const next = this.code[nextI];
      console.log(' i:', i, " ch:", ch);
      // 查找符号
      if (this.symbolWords.get(ch)) {
        token = ch;
        break;
      }
      // 查找关键字
      if (ch !== ' ' && !keywordStart) {
        keywordStart = true;
      } else if ((ch === ' ' || this.symbolWords.get(next)) && keywordStart) {
        if (this.symbolWords.get(next)) token += ch;
        keywordStart = false;
        break;
      }
      if (keywordStart) {
        token += ch;
      }
    }
    if (!pre) this.index = i + 1;
    return token;
  }

  private getOneChar() {
    return this.code[this.index];
  }

  private isKeyWords(ch: string): boolean {
    const keyFlag = !!(this.keyWords.get(ch)) && (this.lastCodeType !== CodeType.KeyWords);
    return keyFlag;
  }

  private isVar(ch: string): boolean {
    let varFlag = false;
    if (this.tokenList.length > 0) {
      const lastToken = this.tokenList[this.tokenList.length - 1];
      if (lastToken.CodeType === CodeType.KeyWords) {
        varFlag = true;
      }
    }
    return varFlag;
  }

  private isSym(token: string): boolean {
    const symFlag = !!this.symbolWords.get(token);
    return symFlag;
  }

  private isStr(token: string): boolean {
    let strFlag = false;
    if (this.tokenList.length > 0) {
      const lastToken = this.tokenList[this.tokenList.length - 1];
      if ((lastToken.Token === this.symbolWords.get('"')) || (lastToken.Token === this.symbolWords.get("'"))) {
        strFlag = true;
      }
    }
    return strFlag;
  }

  private isAttr(token: string): boolean {
    let attrFlag = false;
    if (this.tokenList.length > 0) {
      const lastToken = this.tokenList[this.tokenList.length - 1];
      const nextToken = this.getLetter(true);
      console.log(' last:', lastToken, ' next:', nextToken);
      if (lastToken.Token === this.symbolWords.get('{') && nextToken === this.symbolWords.get(':')) {
        attrFlag = true;
      }
    }
    return attrFlag;
  }

  private initKeyWords() {
    this.keyWords.set('const', 'const');
    this.keyWords.set('let', 'let');
    this.keyWords.set('function', 'function');
    this.keyWords.set('break', 'break');
    this.keyWords.set('while', 'while');
    this.keyWords.set('var', 'var');
    this.keyWords.set('this', 'this'); 
  }

  private initSymbol() {
    this.symbolWords.set('"', '"');
    this.symbolWords.set("'", "'");
    this.symbolWords.set('=', '=');
    this.symbolWords.set(';', ';');
    this.symbolWords.set(':', ':');
    this.symbolWords.set('>', '>');
    this.symbolWords.set('{', '}');
    this.symbolWords.set('(', '(');
    this.symbolWords.set(')', ')');
  }
}

// test
const jp = new JsParse();
jp.parseJsCode(`const compressing = require('compressing');const res = {name: 'xxa'}`);
