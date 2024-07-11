import Dashboard from "views/Dashboard.js";
import DepotStock from "views/depotStock.js";
import ListeInventaire from "views/ListeInventaire.js";
import Statistique from "views/statistique.js";


const dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Tableau de bord",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
  },

  {
    path: "/ListeInventaire",
    name: "Inventaire",
    icon: "nc-icon nc-chart-pie-35",
    component: ListeInventaire,
    layout: "/admin",
  },
  {
    path: "/DepotStock",
    name: "Dépôt de stock",
    icon: "nc-icon nc-chart-pie-35",
    component: DepotStock,
    layout: "/admin",
  },
  {
    path: "/Statistique",
    name: "Statistique",
    icon: "nc-icon nc-chart-pie-35",
    component: Statistique,
    layout: "/admin",
  },
 
];

export default dashboardRoutes;
