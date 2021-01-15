import title from "./title";
import radioBox from "./radioBox";
import upload from "./upload";
import checkBox from "./checkBox";

const components = [title, radioBox, checkBox, upload];

const install = Vue => {
  components.forEach(component => Vue.component(component.name, component));
};

export default {
  install,
  ...components
};
