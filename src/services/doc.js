import axios from 'axios';

export function createDoc(doc) {
  return axios.post('/api/docs', doc);
}

export function updateDoc(doc) {
  return axios.put(`/api/docs/${doc.id}`, doc);
}

export function deleteDoc(docID) {
  return axios.delete(`/api/docs/${docID}`);
}

export function uploadDocThumbnail(docID, files) {
  const formData = new FormData();
  files.forEach(f => formData.append(f.name, f));
  return axios.post(`/api/docs/${docID}/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function getDoc(docID) {
  return axios.get(`/api/docs/${docID}`)
}

export function getDocs() {
  return axios.get('/api/docs');
}

export function trackDoc(docID) {
  return axios.post(`/api/docs/${docID}/tracking`);
}

export function untrackDoc(docID) {
  return axios.delete(`/api/docs/${docID}/tracking`);
}
