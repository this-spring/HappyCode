/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-29 14:17:22
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-30 01:24:03
 */
import CssStyle from "../style/css-style";

class RenderDom {
  private cssStyle: CssStyle = new CssStyle();
  constructor() {

  }

  public render(code: string, ele: HTMLElement) {
    const tokens = this.cssStyle.mapCssToToken(code);
    const parent = this.createElement('div');
    for (let i = 0; i < tokens.length; i += 1) {
      const ele = this.createElement('span', tokens[i].vn.Token);
      this.renderClass(tokens[i].cssClass, ele);
      parent.appendChild(ele);
    }
    console.log(" tokens:", tokens);
    ele.appendChild(parent);
  }

  private createElement(tag: string, token?: string) {
    const ele = document.createElement(tag);
    token !== undefined ? ele.innerText = token : '';
    return ele;
  }

  private renderClass(className: string, ele: HTMLElement) {
    ele.classList.add(className);
  }
}

export default RenderDom;
