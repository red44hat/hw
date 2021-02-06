import * as Element from '../viewPage/element.js'
import * as FirebaseController from  './firebase_controller.js'
import * as Constant from '../model/constant.js'
import * as Util from '../viewPage/util.js'
import * as Routes from '../controller/routes.js'

export let currentUser

export function addEventListeners(){
    Element.formSignin.addEventListener('submit', async e =>{
        e.preventDefault()
        const email = Element.formSignin.email.value;
        const password = Element.formSignin.password.value;

        try{
            await FirebaseController.signIn(email, password)
            //dismiss sign in modal
            $('#'+Constant.iDmodalSigninForm).modal('hide')
        } catch(e)
        {
            if(Constant.DEV) console.log(e)
            Util.popupInfo('Sign in Error', JSON.stringify(e), Constant.iDmodalSigninForm)
        }
    });

    Element.menuSignout.addEventListener('click', async () =>{
        try{
            await FirebaseController.signOut()
        }
        catch(e)
        {
          if(Constant.DEV)  console.log(e)
          Util.popupInfo('Sign out error', JSON.stringify(e))
        }
    })

    firebase.auth().onAuthStateChanged(user =>{
        if(user) {
            currentUser = user
            let elements = document.getElementsByClassName('modal-menus-pre-auth')
            for(let i = 0; i <elements.length; i++) elements[i].style.display = 'none'
            elements = document.getElementsByClassName('modal-menus-post-auth')
            for(let i = 0; i <elements.length; i++) elements[i].style.display = 'block'

            //routing for page reloading
            const pathname = window.location.pathname
            const href = window.location.href
            Routes.routing(pathname, href)
        }
        else{
            currentUser = null
            let elements = document.getElementsByClassName('modal-menus-pre-auth')
            for(let i = 0; i <elements.length; i++) elements[i].style.display = 'block'
            elements = document.getElementsByClassName('modal-menus-post-auth')
            for(let i = 0; i <elements.length; i++) elements[i].style.display = 'none'

            history.pushState(null, null, Routes.routePath.HOME)
            Element.mainContent.innerHTML = '<h1>Signed Out</h1>'
        }
    })
}