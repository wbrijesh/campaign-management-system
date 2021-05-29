import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";
import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../../models";
import { Link } from "react-router-dom";

async function getClients() {
  const models = await DataStore.query(Client);
}

getClients();

const projects = [
  {
    id: 1,
    title: "Client A",
    initials: "CA",
    team: "Engineering",
    subtitle: "test.com",
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  {
    id: 2,
    title: "Client B",
    initials: "CB",
    team: "Engineering",
    subtitle: "demo.com",
    lastUpdated: "March 17, 2020",
    pinned: true,
    bgColorClass: "bg-pink-600",
  },
  // More projects...
];
const pinnedProjects = projects.filter((project) => project.pinned);

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ClientsMain() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Client);
      setClients(models);
    };

    func();
  }, []);

  return (
    <>
      <div className="px-4 mt-6 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 xl:grid-cols-4 mt-3">
          {clients.map((client) => (
            <Link to={`/clients/${client.id}`}>
              <li
                key={client.id}
                className="relative col-span-1 flex shadow-sm rounded-md"
              >
                <div
                  className={classNames(
                    "bg-pink-600",
                    "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
                  )}
                >
                  {client.name
                    .match(/\b(\w)/g)
                    .join("")
                    .toUpperCase()}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
                  <div className="flex-1 px-4 py-2 text-sm truncate">
                    <p className="text-gray-900 font-medium hover:text-gray-600">
                      {client.name}
                    </p>
                    <p className="text-gray-500">{client.website}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
}
