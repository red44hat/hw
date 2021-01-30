import * as Home  from '../viewPage/home_page.js'
import * as About from '../viewPage/about_page.js'

export const routePath = {
    HOME: '/',
    ABOUT: '/about',
    }

export const routes = [
    {path: routePath.HOME, page:Home.home_page},
    {path: routePath.ABOUT, page:About.about_page}
    
]

export function routing(pathname,href){
    const route= routes.find(r => r.path == pathname)
    if (route) route.page()
    else routes[0].page()
    }