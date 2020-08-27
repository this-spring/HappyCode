
/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-23 14:29:45
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-27 13:21:52
 */
class JsParse {
  private keyWords: Map<string, string> = new Map();
  private symbolWords: Map<string, string> = new Map();
  private index: number = 0;
  private code: string = '';
  constructor() {
    this.initKeyWords();
    this.initSymbol();
  }



  public parseJsCode(code: string) {
    this.code = code.trim();
    while(1) {
      const ch = this.getLetter();
      console.log('token: ', ch);
      // this.isKeyWords(ch);
    }
  }

  private seek(len: number) {
    this.index += len;
  }

  private getLetter(): string {
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
    this.index = i + 1;
    return token;
  }

  private getOneChar() {
    return this.code[this.index];
  }

  private isKeyWords(ch: string) {
    const pos = this.index;
  }

  private isVar() {

  }

  private isSym() {

  }

  private isStr() {

  }

  private isAttr() {
    
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
    this.symbolWords.set('(', ')');
  }
}

// test
const jp = new JsParse();
jp.parseJsCode('const x = "123"; function name() {}');
