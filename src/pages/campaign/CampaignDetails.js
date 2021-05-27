import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../../aws-exports";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { DataStore } from "@aws-amplify/datastore";
import { useFormik } from "formik";
import { Link, useParams } from "react-router-dom";
import logo from "../../logo.svg";
import { Client } from "../../models";
import {
  HomeIcon,
  MenuAlt1Icon,
  BriefcaseIcon,
  ChartBarIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon, SelectorIcon } from "@heroicons/react/solid";
import { Campaign } from "../../models";
import CampaignDetailsMain from "./CampaignDetailsMain";

Amplify.configure(awsconfig);

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: false },
  { name: "Clients", href: "/clients", icon: BriefcaseIcon, current: false },
  { name: "Campaigns", href: "/campaigns", icon: ChartBarIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Campaigns() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { id } = useParams();

  async function asyncSubmit() {
    await DataStore.save(new Campaign(formik.values));
  }

  const formik = useFormik({
    initialValues: {
      booking_reference: "",
      campaign_name: "",
      contact_person: "",
      booking_type: "",
      campaign_type: "",
      revenue_type: "",
      start_date: "1970-01-01Z",
      end_date: "1970-01-01Z",
      unit_rate: null,
      goal: null,
      budget: null,
      addon_commision_type: "",
      addon_commision_value: null,
      bo_file_path: "",
      instructions: "",
      delivery_comments: "",
      date_created: "1970-01-01T12:30:23.999Z",
      date_modified: "1970-01-01T12:30:23.999Z",
      status: "",
      impressions: null,
      clicks: null,
      ctr: null,
      visits: null,
      views: null,
      completed_views: null,
      conversions: null,
      viewability: null,
      media_cost: null,
      clientID: null,
    },
    onSubmit: (values) => {
      asyncSubmit();
      console.log(values);
    },
  });

  // console.log(formik.values);

  const [clients, setClients] = useState([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Client);
      setClients(models);
    };

    func();
  }, []);

  console.log(formik.values);

  const [campaign, setCampaign] = useState([]);

  useEffect(() => {
    const func = async () => {
      const models = await DataStore.query(Campaign, id);
      setCampaign(models);
    };

    func();
  }, []);

  return (
    <>
      {campaign && (
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
                                  Edit Campaign
                                </Dialog.Title>
                                <p className="text-sm text-gray-500">
                                  Get started by filling in the information
                                  below to to edit {campaign.campaign_name}
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
                            {/* Campaign Name */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Campaign Name
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="campaign_name"
                                  id="campaign_name"
                                  onChange={formik.handleChange}
                                  value={campaign.campaign_name}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* Booking Reference */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Booking Reference
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="booking_reference"
                                  id="booking_reference"
                                  onChange={formik.handleChange}
                                  value={campaign.booking_reference}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* Contact Person */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Contact Person
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="contact_person"
                                  id="contact_person"
                                  onChange={formik.handleChange}
                                  value={campaign.contact_person}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* booking_type */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Booking Type
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <select
                                  id="booking_type"
                                  name="booking_type"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="BO"
                                  onChange={formik.handleChange}
                                >
                                  <option>BO</option>
                                  <option>PMP</option>
                                </select>
                              </div>
                            </div>

                            {/* campaign_type */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Campaign Type
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <select
                                  id="campaign_type"
                                  name="campaign_type"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="Video"
                                  onChange={formik.handleChange}
                                >
                                  <option>Video</option>
                                  <option>Display</option>
                                  <option>Native</option>
                                  <option>Search</option>
                                  <option>Social</option>
                                  <option>High Impact</option>
                                  <option>Rich Media</option>
                                  <option>Pop</option>
                                  <option>Push</option>
                                </select>
                              </div>
                            </div>

                            {/* revenue_type */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Revenue Type
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <select
                                  id="revenue_type"
                                  name="revenue_type"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="BO"
                                  onChange={formik.handleChange}
                                >
                                  <option>CPM</option>
                                  <option>CPC</option>
                                  <option>CPCV</option>
                                  <option>CPView</option>
                                  <option>CPVisit</option>
                                  <option>CPL</option>
                                  <option>CPA</option>
                                  <option>CPI</option>
                                  <option>CPS</option>
                                </select>
                              </div>
                            </div>

                            {/* start_date */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  start_date
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="start_date"
                                  id="start_date"
                                  onChange={formik.handleChange}
                                  value={campaign.start_date}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* end_date */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  end_date
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="end_date"
                                  id="end_date"
                                  onChange={formik.handleChange}
                                  value={campaign.end_date}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* unit_rate */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Unit Rate
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="unit_rate"
                                  id="unit_rate"
                                  onChange={formik.handleChange}
                                  value={campaign.unit_rate}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* Goal */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Goal
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="goal"
                                  id="goal"
                                  onChange={formik.handleChange}
                                  value={campaign.goal}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* budget */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Budget
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="budget"
                                  id="budget"
                                  onChange={formik.handleChange}
                                  value={campaign.budget}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* addon_commision_type */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Addon Commision Type
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <select
                                  id="addon_commision_type"
                                  name="addon_commision_type"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="Revenue"
                                  onChange={formik.handleChange}
                                >
                                  <option>Revenue</option>
                                  <option>Cost</option>
                                </select>
                              </div>
                            </div>

                            {/* addon_commision_value */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Addon Commision Value
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="addon_commision_value"
                                  id="addon_commision_value"
                                  onChange={formik.handleChange}
                                  value={campaign.addon_commision_value}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* bo_file_path */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  bo_file_path
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="bo_file_path"
                                  id="bo_file_path"
                                  onChange={formik.handleChange}
                                  value={campaign.bo_file_path}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* instructions */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  instructions
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="instructions"
                                  id="instructions"
                                  onChange={formik.handleChange}
                                  value={campaign.instructions}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* delivery_comments */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  delivery_comments
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="delivery_comments"
                                  id="delivery_comments"
                                  onChange={formik.handleChange}
                                  value={campaign.delivery_comments}
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
                                  value={campaign.date_created}
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
                                  value={campaign.date_modified}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* status */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  status
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="text"
                                  name="status"
                                  id="status"
                                  onChange={formik.handleChange}
                                  value={campaign.status}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* impressions */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  impressions
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="impressions"
                                  id="impressions"
                                  onChange={formik.handleChange}
                                  value={campaign.impressions}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* clicks */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  clicks
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="clicks"
                                  id="clicks"
                                  onChange={formik.handleChange}
                                  value={campaign.clicks}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* ctr */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  ctr
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="ctr"
                                  id="ctr"
                                  onChange={formik.handleChange}
                                  value={campaign.ctr}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* visits */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  visits
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="visits"
                                  id="visits"
                                  onChange={formik.handleChange}
                                  value={campaign.visits}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* views */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  views
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="views"
                                  id="views"
                                  onChange={formik.handleChange}
                                  value={campaign.views}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* completed_views */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  completed_views
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="completed_views"
                                  id="completed_views"
                                  onChange={formik.handleChange}
                                  value={campaign.completed_views}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* conversions */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  conversions
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="conversions"
                                  id="conversions"
                                  onChange={formik.handleChange}
                                  value={campaign.conversions}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* viewability */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  viewability
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="viewability"
                                  id="viewability"
                                  onChange={formik.handleChange}
                                  value={campaign.viewability}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* media_cost */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  media_cost
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <input
                                  type="number"
                                  name="media_cost"
                                  id="media_cost"
                                  onChange={formik.handleChange}
                                  value={campaign.media_cost}
                                  className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                                />
                              </div>
                            </div>

                            {/* clientID */}
                            <div className="space-y-1 px-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                              <div>
                                <label
                                  htmlFor="project_name"
                                  className="block text-sm font-medium text-gray-900 sm:mt-px sm:pt-2"
                                >
                                  Client ID
                                </label>
                              </div>
                              <div className="sm:col-span-2">
                                <select
                                  id="clientID"
                                  name="clientID"
                                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  defaultValue="Revenue"
                                  onChange={formik.handleChange}
                                >
                                  {/* {clients.map((client) => (
                                    <option value={client.id}>
                                      {client.name}
                                    </option>
                                  ))} */}
                                  <option>a</option>
                                  <option>b</option>
                                </select>
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
            </div>
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              {/* Page title & actions */}
              <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
                    Campaign Details
                  </h1>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:order-1 sm:ml-3"
                  >
                    Edit Campaign
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      DataStore.delete(
                        await DataStore.query(Campaign, campaign.id)
                      );
                    }}
                    className="order-0 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:order-1 sm:ml-3"
                  >
                    Delete
                  </button>
                </div>
                <div className="mt-4 flex sm:mt-0 sm:ml-4"></div>
              </div>
              <CampaignDetailsMain />
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default withAuthenticator(Campaigns);
