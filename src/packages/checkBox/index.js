import checkBox from "./src/checkBox.vue";

checkBox.install = Vue => {
  Vue.component(checkBox.name, checkBox);
};
export default checkBox;
