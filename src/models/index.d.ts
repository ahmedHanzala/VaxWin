import { ModelInit, MutableModel } from "@aws-amplify/datastore";

type VaccineMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChildMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BlogMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VaccineChildMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Vaccine {
  readonly id: string;
  readonly name?: string | null;
  readonly timing?: string | null;
  readonly childID: string;
  readonly ChildrenVaccinated?: (VaccineChild | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Vaccine, VaccineMetaData>);
  static copyOf(source: Vaccine, mutator: (draft: MutableModel<Vaccine, VaccineMetaData>) => MutableModel<Vaccine, VaccineMetaData> | void): Vaccine;
}

export declare class Child {
  readonly id: string;
  readonly name: string;
  readonly DOB: string;
  readonly location?: string | null;
  readonly parent: string;
  readonly VaccinesTaken?: (Vaccine | null)[] | null;
  readonly vaccines?: (VaccineChild | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Child, ChildMetaData>);
  static copyOf(source: Child, mutator: (draft: MutableModel<Child, ChildMetaData>) => MutableModel<Child, ChildMetaData> | void): Child;
}

export declare class User {
  readonly id: string;
  readonly username: string;
  readonly email: string;
  readonly name: string;
  readonly phone_number: string;
  readonly children?: (Child | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class Blog {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Blog, BlogMetaData>);
  static copyOf(source: Blog, mutator: (draft: MutableModel<Blog, BlogMetaData>) => MutableModel<Blog, BlogMetaData> | void): Blog;
}

export declare class VaccineChild {
  readonly id: string;
  readonly vaccine: Vaccine;
  readonly child: Child;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<VaccineChild, VaccineChildMetaData>);
  static copyOf(source: VaccineChild, mutator: (draft: MutableModel<VaccineChild, VaccineChildMetaData>) => MutableModel<VaccineChild, VaccineChildMetaData> | void): VaccineChild;
}