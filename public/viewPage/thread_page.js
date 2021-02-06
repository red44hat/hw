import * as Auth from '../controller/auth.js'
import * as Element from './element.js'
import * as FirebaseController from '../controller/firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from './util.js'
import { Message } from '../model/message.js'


export function addThreadViewEvents(){
    const viewForms =document.getElementsByClassName('thread-view-form')
    for (let n=0; n<viewForms.length;n++){
        viewForms[n].addEventListener('submit', e =>{
            e.preventDefault()
            const threadId = e.target.threadId.value
            thread_page(threadId)
        })
    }
}

export async function thread_page(threadId){
    if (!Auth.currentUser){
        Element.mainContent.innerHTML= '<h1>Protected Page</h1>'
        return
    }


// get thread from firestore by threadid
// get all reply messages to this thread from firestore
//display this thread
//display all reply message
// a form to add a new reply
let thread;

try {
  thread = await FirebaseController.getOneThread(threadId);
} catch (e) {
  if (Constant.DEV) console.log(e);
  Util.popupInfo("Error", JSON.stringify(e));
  return;
}

let html = `
	<h4 class "bg-primary text-white">${thread.title}</h4>
	<div>${thread.email} (At ${new Date(thread.timestamp).toString()})</div>
	<div class ="bg-secondary text-white">${thread.content}</div>
`;

html += '<div id ="message-reply-body">'

//display all reply messages
html += '</div>'

//add new reply
html += `
<div>
    <textarea id="textarea-add-new-message" placeholder="Reply to this message"></textarea>
    <br>
    <button id="button-add-new-message" class="btn btn-outline-info">Post message</button>
</div>
`

    Element.mainContent.innerHTML = html

    document.getElementById('button-add-new-message').addEventListener('click', async () =>{
        const content = document.getElementById('textarea-add-new-message').value
        const uid = Auth.currentUser.uid
        const email = Auth.currentUser.email
        const timestamp = Date.now()
        const m = new Message({
            uid, email, timestamp, content, threadId
        })

        try {
            const docId = await FirebaseController.addMessage(m)
            m.docId = docId
        }catch (e){
            if (Constant.DEV) console(e)
            Util.popupInfo('Error',JSON.stringify(e))
        }
    })
}