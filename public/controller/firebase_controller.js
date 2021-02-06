import * as Constant from '../model/constant.js'
import { Thread } from '../model/thread.js'

export async function signIn(email, password){
    await firebase.auth().signInWithEmailAndPassword(email, password)
}

export async function signOut(){
    await firebase.auth().signOut()
}

export async function addThread(thread){
    const ref = await firebase.firestore()
        .collection(Constant.collectionName.THREADS)
        .add(thread.serialize())
    return ref.id 
}

export async function getThreadlist(){
    let threadList = []
    const snapShot = await firebase.firestore()
        .collection(Constant.collectionName.THREADS)
        .orderBy('timestamp', 'desc')
        .get()
    snapShot.forEach(doc => {
        const t = new Thread(doc.data())
        t.docId = doc.id
        threadList.push(t)
    })
    return threadList
}

export async function getOneThread(threadId) {
  const ref = await firebase
    .firestore()
    .collection(Constant.collectionName.THREADS)
    .doc(threadId)
    .get();
  const t = new Thread(ref.data());
  t.docId = threadId;
  return t;
}

export async function addMessage(message) {
  const ref = await firebase
    .firestore()
    .collection(Constant.collectionName.MESSAGES)
    .add(message.serialize());
  return ref.id;
}



