import { Http } from "./http.class.js";

export class TreeView extends Http {
  #options;
  #data;
  constructor(options) {
    super(options);
    this.#options = options;
    this.loadData().then((res) => {
      const html = this.generateTreeView(res);
      document.getElementById(this.#options.elementId).innerHTML = html;
    });
  }

  async loadData(pUrl = null) {
    const self = this;
    let vUrl = pUrl;
    if (pUrl === null) {
      if (this.#options.url == null) {
        return "Please Write the information";
      }
      vUrl = this.#options.url;
    }
    return new Promise((resolve, reject) => {
      self.request({
        url: vUrl,
        method: "GET",
      }).then((res) => {
        if(this.#options.responseModel.rootKey){
          self.#data = res[this.#options.responseModel.rootKey];
          resolve(res[this.#options.responseModel.rootKey]);
        }else{
          self.#data = res;
          resolve(res);
        }
        
      })
      .catch((err) => {
        reject(err);
      }); 
    });
  }

  generateTreeView(pData = null) {
    let vHTML = "<ul>";
    let vData = pData;
    for (const item of vData) {
      vHTML += `<li reference="${item.id}">${item[this.#options.responseModel.labelKey]}</li>`;
      if (item[this.#options.responseModel.childrenKey]?.length > 0) {
        vHTML += this.generateTreeView(item[this.#options.responseModel.childrenKey]);
      }
    }
    vHTML += "</ul>";
    return vHTML;
  }
}
