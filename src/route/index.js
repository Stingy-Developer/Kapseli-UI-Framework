const { routeConfig } = require("./config");

class Route {
  constructor(config, self) {
    this.klass = self !== undefined ? self : {};
    this.event = self !== undefined ? self.Event : {};
    this.config = config || {};
    this.routeConfig = config ? { ...routeConfig, ...config } : routeConfig;
  }
  addRoute(route, view) {
    this.routeConfig.routes[route] = view;
  }
  __open(route) {
    if (this.hasRoute(route)) {
      this.routeConfig.routes[route].render();
      history.pushState(null, this.routeConfig.routes[route].title, `${route}`);
    }
  }
  hasRoute(route) {
    return route in this.routeConfig ? true : false;
  }
  prev() {
    history.back();
    this.event.run("route:prev", location.pathname);
  }
  next() {
    history.forward();
    this.event.run("route:next", location.pathname);
  }
  getAll() {
    this.routeConfig.routes;
  }
  listen() {
    this.event.on("route:open", function (route) {
      if (this.hasRoute(route)) {
        this.__open(route);
      } else {
        window.stop();
        alert("This route is not found!");
      }
    });
  }

  open() {
    // render
  }
}

export { Route };
