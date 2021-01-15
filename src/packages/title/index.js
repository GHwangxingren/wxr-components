import title from "./src/title.vue";

title.install = Vue => {
  Vue.component(title.name, title);
};
export default title;
