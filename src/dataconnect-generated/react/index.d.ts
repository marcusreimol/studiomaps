import { CreateHabitData, GetMyHabitsData, UpdateHabitData, UpdateHabitVariables, DeleteHabitData, DeleteHabitVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateHabit(options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, void>): UseDataConnectMutationResult<CreateHabitData, undefined>;
export function useCreateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<CreateHabitData, FirebaseError, void>): UseDataConnectMutationResult<CreateHabitData, undefined>;

export function useGetMyHabits(options?: useDataConnectQueryOptions<GetMyHabitsData>): UseDataConnectQueryResult<GetMyHabitsData, undefined>;
export function useGetMyHabits(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyHabitsData>): UseDataConnectQueryResult<GetMyHabitsData, undefined>;

export function useUpdateHabit(options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;
export function useUpdateHabit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateHabitData, FirebaseError, UpdateHabitVariables>): UseDataConnectMutationResult<UpdateHabitData, UpdateHabitVariables>;

export function useDeleteHabit(options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;
export function useDeleteHabit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteHabitData, FirebaseError, DeleteHabitVariables>): UseDataConnectMutationResult<DeleteHabitData, DeleteHabitVariables>;
