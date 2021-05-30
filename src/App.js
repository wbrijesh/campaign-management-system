import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Amplify, { Auth } from "aws-amplify";
import awsconfig from "./aws-exports";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import Homepage from "./pages/home/Homepage";
import Clients from "./pages/client/Clients";
import ClientDetails from "./pages/client/ClientDetails";
import Campaigns from "./pages/campaign/Campaigns";
import CampaignDetails from "./pages/campaign/CampaignDetails";
import Campain_client from "./pages/campaign/campain_client";

Amplify.configure(awsconfig);

function App() {
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
        <Route path="/campaign-client/:id">
          <Campain_client valueFromParent="9a923da8-5550-43ef-bbc0-3b7bbfa17db3" />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App);
