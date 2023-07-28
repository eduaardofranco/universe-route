export class Router {
    routes = {}

    add(routeName, page) {
        this.routes[routeName] = page
    }
    route(event) {
        event = event || window.event
        event.preventDefault()
    
        const html = document.querySelector("html")
        html.className = ""
        html.classList.add(event.target.dataset.id)
        const elements = document.querySelectorAll("nav a")
        elements.forEach(element => {
            element.classList.remove('active')
        });
        event.target.classList.add("active")
    
        window.history.pushState({}, "", event.target.href)
    
        this.handle()
    }
    handle() {
        const { pathname } = window.location
        
        const route = this.routes[pathname] || this.routes[404]
    
        fetch(route)
        .then(data => data.text())
        .then(html => {
            
            document.getElementById("app").innerHTML = html
        })
    
    }
}
