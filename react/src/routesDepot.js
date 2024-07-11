import DashboardRes from "views/DashboardRes.js";
import Client from "components/client.js";
import DepotResp from "views/DepotResp.js";
import ListeInventaire from "views/ListeInventaire.js";

const dashboardRoutesDepot = [
  {
    path: "/dashboardRes",
    name: "Tableau de bord",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardRes,
    layout: "/ResponsableDep",
  },
 
    {
     
      path: "/depots",
      name: "Dépots",
      icon: "nc-icon nc-chart-pie-35",
      component:  DepotResp,
      layout: "/ResponsableDep",
     
    },
    
  
 
];

export default dashboardRoutesDepot;
