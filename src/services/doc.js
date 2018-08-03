import axios from 'axios';

export function createDoc(doc) {
  return axios.post('/api/docs', doc);
}

export function deleteDoc(docID) {
  return axios.delete(`/api/docs/${docID}`);
}

export function getDocs() {
  return axios.get('/api/docs');
}
