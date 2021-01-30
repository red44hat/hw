import * as Auth from './/controller/auth.js'
import * as Home from './viewPage/home_page.js'
import * as About from './viewPage/about_page.js'
import * as Routes from './/controller/routes.js'


Auth.addEventListener()
Home.addEventListeners()
About.addEventListeners()

window.onload = () => {
    const pathname = window.location.pathname
    const href = window.location.href
    
    
    Routes.routing(pathname,href)
}
