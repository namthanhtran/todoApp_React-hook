import axiosClient from "./axiosClient";

const todoApi = {
  getAll(params){
    const url = '/work';
    return axiosClient.get(url, {params}) // {params: params}
  },
  get(id){
    const url = `/work/${id}`;
    return axiosClient.get(url);
  },
  add(data){
    const url = '/work';
    return axiosClient.post(url, data);
  },
  update(data){
    const url = `/work/${data.id}`;
    return axiosClient.post(url, data);
  },
  remove(id){
    const url = `/work/${id}`;
    return axiosClient.delete(url);
  }
}