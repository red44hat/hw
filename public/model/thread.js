export class Thread {
    constructor(data) {
        this.uid  = data.uid
        this.email = data.email
        this.title = data.title
        this.timeStamp = data.timeStamp
        this.content = data.content
        this.keyWordsArray = data.keyWordsArray
    }


    serialize(){
        return {
            uid: this.uid,
            email: this.email,
            title: this.title,
            timeStamp: this.timeStamp,
            content: this.content,
            keyWordsArray: this.keyWordsArray

        }
    }
}