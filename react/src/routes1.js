import DashboardRes from "views/DashboardRes.js";
import Client from "components/client.js";
import MagasinResp from "views/MagasinResp.js";
import ListeInventaire from "views/ListeInventaire.js";

const dashboardRoutes = [
  {
    path: "/dashboardRes",
    name: "Tableau de bord",
    icon: "nc-icon nc-chart-pie-35",
    component: DashboardRes,
    layout: "/responsable",
  },
  {
    path: "/client",
    name: "Client",
    icon: "nc-icon nc-chart-pie-35",
    component: Client,
    layout: "/responsable",
  },
    {
     
      path: "/magasins",
      name: "Magasins",
      icon: "nc-icon nc-chart-pie-35",
      component: MagasinResp,
      layout: "/responsable",
     
    },
    
  {
    path: "/ListeInventaire",
    name: "État de stock",
    icon: "nc-icon nc-chart-pie-35",
    component: ListeInventaire,
    layout: "/responsable",
  },

 
];

export default dashboardRoutes;
