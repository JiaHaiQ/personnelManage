/** 自动化工程 */
const files = require.context("@/views/", true, /\.js$/);
const components = [];
files.keys().map(key => {
  if(key.includes("./index/") || key.includes("./login/")) {
    return false;
  }
  const splitFilesName = key.split(".");
  const jionObj = {};
  // path
  const path = `/index${splitFilesName[1].toLowerCase()}`;
  // component
  const component = files(key).default;
  jionObj.path = path;
  jionObj.component = component;
  components.push(jionObj)
})
// console.log(components)

export default components;