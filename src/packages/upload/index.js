import upload from "./src/upload.vue";

upload.install = Vue => {
  Vue.component(upload.name, upload);
};
export default upload;
