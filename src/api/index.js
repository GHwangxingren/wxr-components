import request from "@/utils/fetch";

/*
 *  示例
 * */
export function example(params) {
  return request({
    url: `admin/group/example`,
    method: "GET",
    params
  });
}
export function upload(data, onProgress, uid) {
  let url = "/api/hotel-end/backend-data-pro/media/upload-file";
  return request({
    url,
    method: "POST",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    },
    onUploadProgress(event) {
      onProgress(event, uid);
    }
  });
}
