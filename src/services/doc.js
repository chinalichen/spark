import axios from 'axios';

export function createDoc(doc) {
  return axios.post('/api/docs', doc);
}
