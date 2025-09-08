import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateHabitData {
  habit_insert: Habit_Key;
}

export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}

export interface DeleteHabitVariables {
  id: UUIDString;
}

export interface GetMyHabitsData {
  habits: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    frequency: string;
    targetValue?: number | null;
    unit?: string | null;
  } & Habit_Key)[];
}

export interface Habit_Key {
  id: UUIDString;
  __typename?: 'Habit_Key';
}

export interface LogEntry_Key {
  id: UUIDString;
  __typename?: 'LogEntry_Key';
}

export interface Reminder_Key {
  id: UUIDString;
  __typename?: 'Reminder_Key';
}

export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}

export interface UpdateHabitVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateHabitData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateHabitData, undefined>;
  operationName: string;
}
export const createHabitRef: CreateHabitRef;

export function createHabit(): MutationPromise<CreateHabitData, undefined>;
export function createHabit(dc: DataConnect): MutationPromise<CreateHabitData, undefined>;

interface GetMyHabitsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyHabitsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyHabitsData, undefined>;
  operationName: string;
}
export const getMyHabitsRef: GetMyHabitsRef;

export function getMyHabits(): QueryPromise<GetMyHabitsData, undefined>;
export function getMyHabits(dc: DataConnect): QueryPromise<GetMyHabitsData, undefined>;

interface UpdateHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
  operationName: string;
}
export const updateHabitRef: UpdateHabitRef;

export function updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;
export function updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface DeleteHabitRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
  operationName: string;
}
export const deleteHabitRef: DeleteHabitRef;

export function deleteHabit(vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;
export function deleteHabit(dc: DataConnect, vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

