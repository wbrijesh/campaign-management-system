import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Link } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import logo from "../../logo.svg";
import {
  HomeIcon,
  MenuAlt1Icon,
  BriefcaseIcon,
  ChartBarIcon,
  XIcon,
} from "@heroicons/react/outline";

Amplify.configure(awsconfig);

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  { name: "Campaigns", href: "/campaigns", icon: ChartBarIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Homepage() {
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
    <>
      {user && (
        <div className="h-screen flex overflow-hidden bg-white">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed inset-0 flex z-40 lg:hidden"
              open={sidebarOpen}
              onClose={setSidebarOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 flex items-center px-4">
                    <img className="h-8 w-auto" src={logo} alt="Workflow" />
                  </div>
                  <div className="mt-5 flex-1 h-0 overflow-y-auto">
                    <nav className="px-2">
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
                              "group flex items-center px-2 py-2 text-base leading-5 font-medium rounded-md"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-gray-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-3 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:flex lg:flex-shrink-0">
            <div className="flex flex-col w-64 border-r border-gray-200 pt-5 pb-4 bg-gray-100">
              <div className="flex items-center flex-shrink-0 px-6">
                <img className="h-8 w-auto" src={logo} alt="Workflow" />
              </div>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="h-0 flex-1 flex flex-col overflow-y-auto">
                {/* User account dropdown */}
                <Menu
                  as="div"
                  className="px-3 mt-6 relative inline-block text-left"
                >
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="group w-full bg-gray-100 rounded-md px-3.5 py-2 text-sm text-left font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-purple-500">
                          <span className="flex w-full justify-between items-center">
                            <span className="flex min-w-0 items-center justify-between space-x-3">
                              <img
                                className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"
                                src={user.attributes.picture}
                                alt=""
                              />
                              <span className="flex-1 flex flex-col min-w-0">
                                <span className="text-gray-900 text-sm font-medium truncate">
                                  {user.attributes.name}
                                </span>
                                <span className="text-gray-500 text-sm truncate">
                                  {user.attributes.preferred_username}
                                  <b className="font-normal text-gray-400">
                                    {" ("}
                                    {
                                      user.signInUserSession.idToken.payload[
                                        "cognito:groups"
                                      ][0]
                                    }
                                    {")"}
                                  </b>
                                </span>
                              </span>
                            </span>
                          </span>
                        </Menu.Button>
                      </div>
                    </>
                  )}
                </Menu>
                {/* Navigation */}
                <nav className="px-3 mt-6">
                  <div className="space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200 text-gray-900"
                            : "text-gray-700 hover:text-gray-900 hover:bg-gray-50",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? "text-gray-500"
                              : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 flex-shrink-0 h-6 w-6"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>
          {/* Main column */}
          <div className="flex flex-col w-0 flex-1 overflow-hidden">
            {/* Search header */}
            <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:hidden">
              <button
                className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="flex-1 flex justify-between px-4 sm:px-6 lg:px-8">
                <div className="flex items-center">
                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.attributes.picture}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
            </div>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              {/* Page title & actions */}
              <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    Home
                  </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                  <div className="order-1 ml-3 p-0 inline-flex items-center border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-0 sm:ml-0">
                    <AmplifySignOut />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuthenticator(Homepage);
