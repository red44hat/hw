export async function signIn(email,pasword){
   await firebase.auth().signInWithEmailAndPassword(email,pasword)
}

export async function signOut(){
    await firebase.auth().signOut()
}