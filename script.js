import { TreeView } from "./src/tree.class.js"


document.addEventListener("DOMContentLoaded", function (event) {
  new TreeView({
    url: "https://vgparts.ge/api/product/manufacturer/27",
    responseModel: {
      labelKey: 'name',
      rootKey: 'result',
      childrenKey: 'children'
    },
    elementId: "treeview",
  });
});


