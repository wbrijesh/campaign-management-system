import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { DataStore } from "@aws-amplify/datastore";
import { Client } from "../../models";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import logo from "../../logo.svg";
import {
  ClockIcon,
  HomeIcon,
  MenuAlt1Icon,
  ViewListIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SelectorIcon, PaperClipIcon } from "@heroicons/react/solid";

const plans = [{ name: "Agency" }, { name: "Brand" }];
const kickbacks = [{ name: "Revenue" }, { name: "Cost" }];

Amplify.configure(awsconfig);

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: ViewListIcon, current: true },
  { name: "Recent", href: "#", icon: ClockIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ClientDetails() {
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

  // console.log(user);

  const { id } = useParams();

  const [client, setClient] = useState(null);
  useEffect(() => {
    const models = DataStore.query(Client, id)
      .then((models) => {
        setClient(models);
      })
      .catch(() => setClient(null));
  }, []);

  async function asyncSubmit() {
    await DataStore.save(new Client(formik.values));
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      client_type: "",
      country: "",
      address: "",
      website: "",
      non_person_email: "",
      billing_contact_name: "",
      billing_contact_email: "",
      tax_id: "",
      main_contact_name: "",
      main_contact_email: "",
      main_contact_phone: "",
      skype_or_gmeet: "",
      sales_manager_email: "",
      account_manager: "",
      kickback_type: "",
      kickback_value: null,
      billing_entity: "",
      date_created: "1970-01-01T12:30:23.999Z",
      date_modified: "1970-01-01T12:30:23.999Z",
      Campaigns: [],
    },
    onSubmit: (values) => {
      asyncSubmit();
      console.log(values);
    },
  });

  // console.log(formik.values);

  console.log(client);

  const [open, setOpen] = useState(false);

  return (
    <>
      {
        (user,
        client && (
          <div className="h-screen flex overflow-hidden bg-white">
            <Transition.Root show={open} as={Fragment}>
              <Dialog
                as="div"
                static
                className="fixed inset-0 overflow-hidden"
                open={open}
                onClose={setOpen}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Dialog.Overlay className="absolute inset-0" />

                  <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <div className="w-screen max-w-2xl">
                        <form
                          onSubmit={formik.handleSubmit}
                          className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll"
                        >
                          <div className="flex-1">
                            {/* Header */}
                            <div className="px-4 py-6 bg-gray-100 sm:px-6">
                              <div className="flex items-start justify-between space-x-3">
                                <div className="space-y-1">
                                  <Dialog.Title className="text-lg font-medium text-gray-900">
                                    Edit Client
                                  </Dialog.Title>
                                  <p className="text-sm text-gray-500">
                                    Get started by filling in the information
                                    below to to edit {client.name}.
                                  </p>
                                </div>
                                <div className="h-7 flex items-center">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    onClick={() => setOpen(false)}
                                  >
                                    <span className="sr-only">Close panel</span>
                                    <XIcon
                                      className="h-6 w-6"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </div>
                            </div>

                            {/* Divider container */}
                            <div className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                              {/* Project name */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Project name
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    onChange={formik.handleChange}
                                    value={client.name}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* client_type */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Kickback Type
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="radio"
                                    name="client_type"
                                    value="agency"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                  />
                                  Agency
                                  <br />
                                  <div className="mt-2"></div>
                                  <input
                                    type="radio"
                                    name="client_type"
                                    value="brand"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                  />
                                  Brand
                                </div>
                              </div>

                              {/* Country */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Country
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="country"
                                    id="country"
                                    onChange={formik.handleChange}
                                    value={client.country}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* Address */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Address
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    onChange={formik.handleChange}
                                    value={client.address}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* Website */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Website
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="url"
                                    name="website"
                                    id="website"
                                    onChange={formik.handleChange}
                                    value={client.website}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* non_person_email */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    non_person_email
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="non_person_email"
                                    id="non_person_email"
                                    onChange={formik.handleChange}
                                    value={client.non_person_email}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* billing_contact_name */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    billing_contact_name
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="billing_contact_name"
                                    id="billing_contact_name"
                                    onChange={formik.handleChange}
                                    value={client.billing_contact_name}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* billing_contact_email */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    billing_contact_email
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="billing_contact_email"
                                    id="billing_contact_email"
                                    onChange={formik.handleChange}
                                    value={client.billing_contact_email}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* tax_id */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    tax_id
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="tax_id"
                                    id="tax_id"
                                    onChange={formik.handleChange}
                                    value={client.tax_id}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* main_contact_name */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    main_contact_name
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="main_contact_name"
                                    id="main_contact_name"
                                    onChange={formik.handleChange}
                                    value={client.main_contact_name}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* main_contact_email */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    main_contact_email
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="main_contact_email"
                                    id="main_contact_email"
                                    onChange={formik.handleChange}
                                    value={client.main_contact_email}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* main_contact_phone */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    main_contact_phone
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="main_contact_phone"
                                    id="main_contact_phone"
                                    onChange={formik.handleChange}
                                    value={client.main_contact_phone}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* skype_or_gmeet */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    skype_or_gmeet
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="skype_or_gmeet"
                                    id="skype_or_gmeet"
                                    onChange={formik.handleChange}
                                    value={client.skype_or_gmeet}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* sales_manager_email */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    sales_manager_email
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="sales_manager_email"
                                    id="sales_manager_email"
                                    onChange={formik.handleChange}
                                    value={client.sales_manager_email}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* account_manager */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    account_manager
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="account_manager"
                                    id="account_manager"
                                    onChange={formik.handleChange}
                                    value={client.account_manager}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* kickback_type */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    Kickback Type
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="radio"
                                    name="kickback_type"
                                    value="Cost"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                  />
                                  Cost
                                  <br />
                                  <div className="mt-2"></div>
                                  <input
                                    type="radio"
                                    name="kickback_type"
                                    value="Revenue"
                                    onChange={formik.handleChange}
                                    className="mr-2"
                                  />
                                  Revenue
                                </div>
                              </div>

                              {/* kickback_value */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    kickback_value
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="number"
                                    name="kickback_value"
                                    id="kickback_value"
                                    onChange={formik.handleChange}
                                    value={client.kickback_value}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* billing_entity */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    billing_entity
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="billing_entity"
                                    id="billing_entity"
                                    onChange={formik.handleChange}
                                    value={client.billing_entity}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* date_created */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    date_created
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="date_created"
                                    id="date_created"
                                    onChange={formik.handleChange}
                                    value={client.date_created}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* date_modified */}
                              <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                                <div>
                                  <label
                                    htmlFor="project_name"
                                    className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                  >
                                    date_modified
                                  </label>
                                </div>
                                <div className="sm:col-span-2">
                                  <input
                                    type="text"
                                    name="date_modified"
                                    id="date_modified"
                                    onChange={formik.handleChange}
                                    value={client.date_modified}
                                    className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                  />
                                </div>
                              </div>

                              {/* end */}
                            </div>
                          </div>

                          {/* Action buttons */}
                          <div className="flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6">
                            <div className="space-x-3 flex justify-end">
                              <button
                                type="button"
                                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={() => setOpen(false)}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Create
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
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
                              <SelectorIcon
                                className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                            </span>
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="z-10 mx-3 origin-top absolute right-0 left-0 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                          >
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    View profile
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Notifications
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Get desktop app
                                  </a>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Support
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Logout
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
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
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-200 focus:outline-none"
                            >
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      View profile
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Settings
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Notifications
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Get desktop app
                                    </a>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Support
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <a
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "block px-4 py-2 text-sm"
                                      )}
                                    >
                                      Logout
                                    </a>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
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
                      Client Details
                    </h1>
                  </div>
                  <div className="mt-4 flex sm:mt-0 sm:ml-4">
                    <button
                      type="button"
                      onClick={() => setOpen(!open)}
                      className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3"
                    >
                      Edit Client
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        DataStore.delete(
                          await DataStore.query(Client, client.id)
                        );
                      }}
                      className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1 sm:ml-3"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {/* <p>{JSON.stringify(client)}</p> */}
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {client.name}
                    </h3>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.name}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Client Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.client_type}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Country
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.country}
                        </dd>
                      </div>
                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.address}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Website
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.website}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Non Person Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.non_person_email}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Billing Contact Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.billing_contact_name}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Billing Contact Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.billing_contact_email}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Tax ID
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.tax_id}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Main Contact Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.main_contact_name}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Main Contact Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.main_contact_email}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Main Contact Phone
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.main_contact_phone}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Skype or Gmeet
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.skype_or_gmeet}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Sales Manager Email
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.sales_manager_email}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Account Manager
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.account_manager}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Kickback Type
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.kickback_type}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Kickback Value
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.kickback_value}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Billing Entity
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.billing_entity}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Date Created
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.date_created}
                        </dd>
                      </div>

                      <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Date Modified
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {client.date_modified}
                        </dd>
                      </div>

                      {/* end */}
                    </dl>
                  </div>
                </div>
              </main>
            </div>
          </div>
        ))
      }
    </>
  );
}

export default ClientDetails;
