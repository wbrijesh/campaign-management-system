import React, { useState, useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Campaign } from "../../models";

// export default function Campain_client() {
//   const { id } = useParams();
//   const [campaign, setCampaign] = useState([]);
//   const [client, setClient] = useState([]);

//   useEffect(() => {
//     const func = async () => {
//       const models = await DataStore.query(Campaign, id);
//       setCampaign(models);
//     };

//     func();
//   }, []);

//   async function getClient(id) {
//     const models1 = await DataStore.query(Client, campaign.clientID);
//     setClient(models1);
//   }

//   getClient(campaign.clientID);

//   console.log(client);

//   return <p>{client.name}</p>;
// }

export default function Campaign_client(props) {
  const id = props.valueFromParent;
  const [ncampaign, setnCampaign] = useState([]);

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Campaign, id);
      setnCampaign(models);
    };
    func();
  }, [id]);

  console.log("ncampaign", ncampaign);

  //   async function getClient(id) {
  //     const models1 = await DataStore.query(Client, campaign.clientID);
  //     setClient(models1);
  //   }

  //   getClient(campaign.clientID);

  //   console.log(client);
  return <> id: {id}</>;
}
