/*
 * @Author: xiuquanxu
 * @Company: kaochong
 * @Date: 2020-08-29 14:17:22
 * @LastEditors: xiuquanxu
 * @LastEditTime: 2020-08-29 15:05:11
 */
import CssStyle from "../style/css-style";

class RenderDom {
  private cssStyle: CssStyle = new CssStyle();
  constructor() {

  }

  render(code: string, ele: Element) {
    const tokens = this.cssStyle.mapCssToToken(code);
  }
}

export default RenderDom;
