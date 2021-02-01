import * as Constant from '../model/constant.js'
import { Thread } from '../model/thread.js'

export async function signIn(email,pasword){
   await firebase.auth().signInWithEmailAndPassword(email,pasword)
}

export async function signOut(){
    await firebase.auth().signOut()
}

export async function addThread(thread){
    const ref = await firebase.firestore()
    .collection(Constant.collectionName.THREADS)
    .add(thread.serialize())

    return ref.id //unique id auto gen by firebase
}

export async function getThreadlist() {
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