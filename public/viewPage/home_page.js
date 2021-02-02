import * as Element from '../viewPage/element.js'
import * as Routes from '../controller/routes.js'
import * as Auth from '../controller/auth.js'
import * as Constant from '../model/constant.js'
import { Thread } from '../model/thread.js'
import * as FirebaseController from '../controller/firebase_controller.js'


export function addEventListeners(){
    Element.menuHome.addEventListener('click', () =>{
        history.pushState(null,null, Routes.routePath.HOME)
        home_page()
    })

    Element.formCreateThread.addEventListener('submit', async e =>{
        e.preventDefault()
        const uid = Auth.currentUser.uid
        const email = Auth.currentUser.email
        const timeStamp = Date.now()
        const title = Element.formCreateThread.title.value
        const content = Element.formCreateThread.content.value
        const keywords = Element.formCreateThread.keywords.value
        const keyWordsArray = keywords.toLowerCase().match(/\S+/g)
        const thread = new Thread(
            {uid,email,title,keyWordsArray,content,timeStamp}
        )
        try{
            const docID = await FirebaseController.addThread(thread)
            thread.docID = docID
        }catch(e){
            console.log(e)

        }
    })
}

export async function home_page() {
    if(!Auth.currentUser){
        Element.mainContent.innerHTML = '<h1>Protected Page<h1>'
        return
    }

    let threadList
    try {
	    threadList = await FirebaseController.getThreadlist()
        } catch(e) {
	    console.log(e)
    }

    let html = `
        <button class="btn btn-outline-danger" data-toggle="modal" data-target="#${Constant.iDmodalCreateNewThread}">+ New Thread</button>
    `

    html += `
    <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">Action</th>
        <th scope="col">Title</th>
        <th scope="col">Keywords</th>
        <th scope="col">Posted By</th>
        <th scope="col>Content</th>
        <th scope="col>Posted At</th>
      </tr>
    </thead>
    <tbody>
    `

    threadList.forEach(thread => {
        html += buildThreadView(thread)
    })
    
    

    html += `
        </tbody></table>
    `

    Element.mainContent.innerHTML = html
}

function buildThreadView(thread){
    return `
        <tr>
            <td>View</td>
            <td>${thread.title}</td>
            <td>${thread.keywordsArray.join(' ')}</td>
            <td>${thread.email}</td>
            <td>${thread.content}</td>
            <td>${new Date(thread.timestamp).toString()}</td>
        </tr>
    `
}

  