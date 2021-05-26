import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Campaign {
  readonly id: string;
  readonly booking_reference?: string;
  readonly campaign_name?: string;
  readonly contact_person?: string;
  readonly booking_type?: string;
  readonly campaign_type?: string;
  readonly revenue_type?: string;
  readonly start_date?: string;
  readonly end_date?: string;
  readonly unit_rate?: number;
  readonly goal?: number;
  readonly budget?: number;
  readonly addon_commision_type?: string;
  readonly addon_commision_value?: number;
  readonly bo_file_path?: string;
  readonly instructions?: string;
  readonly delivery_comments?: string;
  readonly date_created?: string;
  readonly date_modified?: string;
  readonly status?: string;
  readonly impressions?: number;
  readonly clicks?: number;
  readonly ctr?: number;
  readonly visits?: number;
  readonly views?: number;
  readonly completed_views?: number;
  readonly conversions?: number;
  readonly viewability?: number;
  readonly media_cost?: number;
  readonly clientID?: string;
  constructor(init: ModelInit<Campaign>);
  static copyOf(source: Campaign, mutator: (draft: MutableModel<Campaign>) => MutableModel<Campaign> | void): Campaign;
}

export declare class Client {
  readonly id: string;
  readonly name?: string;
  readonly client_type?: string;
  readonly country?: string;
  readonly address?: string;
  readonly website?: string;
  readonly non_person_email?: string;
  readonly billing_contact_name?: string;
  readonly billing_contact_email?: string;
  readonly tax_id?: string;
  readonly main_contact_name?: string;
  readonly main_contact_email?: string;
  readonly main_contact_phone?: string;
  readonly skype_or_gmeet?: string;
  readonly sales_manager_email?: string;
  readonly account_manager?: string;
  readonly kickback_type?: string;
  readonly kickback_value?: number;
  readonly billing_entity?: string;
  readonly date_created?: string;
  readonly date_modified?: string;
  readonly Campaigns?: (Campaign | null)[];
  constructor(init: ModelInit<Client>);
  static copyOf(source: Client, mutator: (draft: MutableModel<Client>) => MutableModel<Client> | void): Client;
}