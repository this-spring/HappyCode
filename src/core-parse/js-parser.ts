import { VNode, CodeType } from "../../base-type";

/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 02:24:34
 */
class JsParse {
  private keyWords: Map<string, string> = new Map();
  private symbolWords: Map<string, string> = new Map();
  private otherWords: Map<string, string> = new Map();
  private tokenList: Array<VNode> = [];
  private lastCodeType: CodeType = CodeType.Default;
  private index: number = 0;
  private code: string = '';
  constructor() {
    this.initKeyWords();
    this.initSymbol();
    this.initOther();
  }



  public parseJsCode(code: string) {
    this.code = code.trim();
    this.tokenList = [];
    while(1) {
      const token = this.getLetter();
      const vn: VNode = {
        CodeType: CodeType.Attribute,
        Token: token,
      };
      if (this.isSpace(token)) {
        vn.CodeType = CodeType.Space;
      } else if (this.isOther(token)) {
        vn.CodeType = CodeType.Other;
      }  else if(this.isKeyWords(token)) {
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
    return this.tokenList;
  }

  private seek(len: number) {
    this.index += len;
  }

  private getLetter(pre?: boolean): string {
    const pos = this.index;
    let token = '';
    let keywordStart = false;
    let spaceStart = false;
    let i = pos;
    for (;i < this.code.length; i += 1) {
      const ch = this.code[i];
      const nextI = (i + 1) < this.code.length ? (i + 1) : this.code.length - 1;
      const next = this.code[nextI];
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
      } else if ((next === ' ' || this.symbolWords.get(next)) && keywordStart) {
        token += ch;
        keywordStart = false;
        break;
      }
      if (keywordStart) {
        token += ch;
      }
    }
    if (!pre) this.index = i + 1;
    console.log(' letter token:', token);
    return token;
  }

  private isKeyWords(ch: string): boolean {
    const keyFlag = !!(this.keyWords.get(ch)) && (this.lastCodeType !== CodeType.KeyWords);
    return keyFlag;
  }

  private isVar(ch: string): boolean {
    console.log(' isVar');
    let varFlag = false;
    if (this.tokenList.length > 0) {
      // const lastToken = this.tokenList[this.tokenList.length - 1];
      const lastToken = this.findLastNotSpaceToken();
      if (lastToken.CodeType === CodeType.KeyWords) {
        varFlag = true;
      }
    }
    return varFlag;
  }

  private isSym(token: string): boolean {
    console.log(' isSym');
    const symFlag = !!this.symbolWords.get(token);
    return symFlag;
  }

  private isStr(token: string): boolean {
    console.log(' isStr');
    let strFlag = false;
    if (this.tokenList.length > 0) {
      // const lastToken = this.tokenList[this.tokenList.length - 1];
      const lastToken = this.findLastNotSpaceToken();
      if ((lastToken.Token === this.symbolWords.get('"')) || (lastToken.Token === this.symbolWords.get("'"))) {
        strFlag = true;
      }
    }
    return strFlag;
  }

  private isAttr(token: string): boolean {
    console.log(' isAttr');
    let attrFlag = false;
    if (this.tokenList.length > 0) {
      // const lastToken = this.tokenList[this.tokenList.length - 1];
      const lastToken = this.findLastNotSpaceToken();
      let nextToken: string;
      while(1) {
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
  }

  private isOther(token: string): boolean {
    console.log(' isOther');
    let otherFlag = false;
    if (this.otherWords.get(token)) {
      otherFlag = true;
    }
    return otherFlag;
  }

  private isSpace(token: string): boolean {
    console.log(' isSpace');
    let spaceFlag = true;
    for (let i = 0; i < token.length; i += 1) {
      if (token[i] != ' ') {
        spaceFlag = false;
        break;
      }
    }
    return spaceFlag;
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

  private initOther() {
    this.otherWords.set('\n', '\n');
  }

  private findLastNotSpaceToken() {
    let lastToken: VNode = {
      CodeType: CodeType.Default,
      Token: '',
    };
    for (let i = this.tokenList.length - 1; i >= 0; i -= 1) {
      const token = this.tokenList[i];
      if (token.CodeType !== CodeType.Space) {
        lastToken = token;
        break;
      }
    }
    return lastToken;
  }
}

export default JsParse;

// test
const jp = new JsParse();
// jp.parseJsCode(`const compressing = require('compressing');const res = {name: 'xxa'}`);
jp.parseJsCode(`const compressing = require('compressing');

const TAG = 'ProcessTask';

const CmdType = {
  CompressZip: 'CompressZip',
  UnZip: 'UnZip',
};
const obj = {
    x: 'x',
    co: function x() {
      
    }
};
let arr = [];
console.log(arr);
console.log(obj);

process.on('message', (res) => {})`);
