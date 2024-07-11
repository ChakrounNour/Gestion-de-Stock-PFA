import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import Sidebar from "components/Sidebar/Sidebar";

import routes from "routes1.js";


function Responsable1() {
  const [color, setColor] = React.useState("black");
  const location = useLocation();
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/responsable") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  React.useEffect(() => {
  
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
  }, [location]);
  return (
    <>
      <div className="wrapper">
        <Sidebar color={color}  routes={routes} />
        <div className="main-panel" >
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Responsable1;
