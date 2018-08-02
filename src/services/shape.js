import axios from 'axios';

export function createShapes(docID, shapes) {
  return axios.post(`/api/docs/${docID}/shapes`, shapes);
}

export function getShapes(docID) {
  return axios.get(`/api/docs/${docID}/shapes`);
}
