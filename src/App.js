import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import logo from "./logo.svg";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import ClientsMain from "./pages/client/ClientsMain";
import Homepage from "./pages/home/Homepage";
import Clients from "./pages/client/Clients";
import ClientDetails from "./pages/client/ClientDetails";
import Campaigns from "./pages/campaign/Campaigns";
import CampaignDetails from "./pages/campaign/CampaignDetails";

Amplify.configure(awsconfig);

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "My tasks", href: "#", icon: ViewListIcon, current: false },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];

const teams = [
  { name: "Engineering", href: "#", bgColorClass: "bg-indigo-500" },
  { name: "Human Resources", href: "#", bgColorClass: "bg-green-500" },
  { name: "Customer Success", href: "#", bgColorClass: "bg-yellow-500" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  //   const [user, setUser] = useState(null);
  //   useEffect(() => {
  //     checkUser();
  //   }, []);
  //   async function checkUser() {
  //     const user = await Auth.currentAuthenticatedUser();
  //     setUser(user);
  //   }

  const [user, setUser] = useState(null);
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setUser(user);
      })
      .catch(() => setUser(null));
  }, []);

  console.log(user);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/clients">
          <Clients />
        </Route>
        <Route path="/clients/:id">
          <ClientDetails />
        </Route>
        <Route exact path="/campaigns">
          <Campaigns />
        </Route>
        <Route exact path="/campaigns/:id">
          <CampaignDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
