# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetMyHabits*](#getmyhabits)
- [**Mutations**](#mutations)
  - [*CreateHabit*](#createhabit)
  - [*UpdateHabit*](#updatehabit)
  - [*DeleteHabit*](#deletehabit)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyHabits
You can execute the `GetMyHabits` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getMyHabits(): QueryPromise<GetMyHabitsData, undefined>;

interface GetMyHabitsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyHabitsData, undefined>;
}
export const getMyHabitsRef: GetMyHabitsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getMyHabits(dc: DataConnect): QueryPromise<GetMyHabitsData, undefined>;

interface GetMyHabitsRef {
  ...
  (dc: DataConnect): QueryRef<GetMyHabitsData, undefined>;
}
export const getMyHabitsRef: GetMyHabitsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyHabitsRef:
```typescript
const name = getMyHabitsRef.operationName;
console.log(name);
```

### Variables
The `GetMyHabits` query has no variables.
### Return Type
Recall that executing the `GetMyHabits` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyHabitsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetMyHabits`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyHabits } from '@dataconnect/generated';


// Call the `getMyHabits()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyHabits();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyHabits(dataConnect);

console.log(data.habits);

// Or, you can use the `Promise` API.
getMyHabits().then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

### Using `GetMyHabits`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyHabitsRef } from '@dataconnect/generated';


// Call the `getMyHabitsRef()` function to get a reference to the query.
const ref = getMyHabitsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyHabitsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.habits);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.habits);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateHabit
You can execute the `CreateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createHabit(): MutationPromise<CreateHabitData, undefined>;

interface CreateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateHabitData, undefined>;
}
export const createHabitRef: CreateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createHabit(dc: DataConnect): MutationPromise<CreateHabitData, undefined>;

interface CreateHabitRef {
  ...
  (dc: DataConnect): MutationRef<CreateHabitData, undefined>;
}
export const createHabitRef: CreateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createHabitRef:
```typescript
const name = createHabitRef.operationName;
console.log(name);
```

### Variables
The `CreateHabit` mutation has no variables.
### Return Type
Recall that executing the `CreateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateHabitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateHabitData {
  habit_insert: Habit_Key;
}
```
### Using `CreateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createHabit } from '@dataconnect/generated';


// Call the `createHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createHabit();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createHabit(dataConnect);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
createHabit().then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

### Using `CreateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createHabitRef } from '@dataconnect/generated';


// Call the `createHabitRef()` function to get a reference to the mutation.
const ref = createHabitRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createHabitRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_insert);
});
```

## UpdateHabit
You can execute the `UpdateHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateHabit(vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateHabit(dc: DataConnect, vars: UpdateHabitVariables): MutationPromise<UpdateHabitData, UpdateHabitVariables>;

interface UpdateHabitRef {
  ...
  (dc: DataConnect, vars: UpdateHabitVariables): MutationRef<UpdateHabitData, UpdateHabitVariables>;
}
export const updateHabitRef: UpdateHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateHabitRef:
```typescript
const name = updateHabitRef.operationName;
console.log(name);
```

### Variables
The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateHabitVariables {
  id: UUIDString;
  name?: string | null;
  description?: string | null;
}
```
### Return Type
Recall that executing the `UpdateHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateHabitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateHabitData {
  habit_update?: Habit_Key | null;
}
```
### Using `UpdateHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateHabit, UpdateHabitVariables } from '@dataconnect/generated';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateHabit(updateHabitVars);
// Variables can be defined inline as well.
const { data } = await updateHabit({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateHabit(dataConnect, updateHabitVars);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
updateHabit(updateHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

### Using `UpdateHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateHabitRef, UpdateHabitVariables } from '@dataconnect/generated';

// The `UpdateHabit` mutation requires an argument of type `UpdateHabitVariables`:
const updateHabitVars: UpdateHabitVariables = {
  id: ..., 
  name: ..., // optional
  description: ..., // optional
};

// Call the `updateHabitRef()` function to get a reference to the mutation.
const ref = updateHabitRef(updateHabitVars);
// Variables can be defined inline as well.
const ref = updateHabitRef({ id: ..., name: ..., description: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateHabitRef(dataConnect, updateHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_update);
});
```

## DeleteHabit
You can execute the `DeleteHabit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteHabit(vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

interface DeleteHabitRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
}
export const deleteHabitRef: DeleteHabitRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteHabit(dc: DataConnect, vars: DeleteHabitVariables): MutationPromise<DeleteHabitData, DeleteHabitVariables>;

interface DeleteHabitRef {
  ...
  (dc: DataConnect, vars: DeleteHabitVariables): MutationRef<DeleteHabitData, DeleteHabitVariables>;
}
export const deleteHabitRef: DeleteHabitRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteHabitRef:
```typescript
const name = deleteHabitRef.operationName;
console.log(name);
```

### Variables
The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteHabitVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteHabit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteHabitData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteHabitData {
  habit_delete?: Habit_Key | null;
}
```
### Using `DeleteHabit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteHabit, DeleteHabitVariables } from '@dataconnect/generated';

// The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`:
const deleteHabitVars: DeleteHabitVariables = {
  id: ..., 
};

// Call the `deleteHabit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteHabit(deleteHabitVars);
// Variables can be defined inline as well.
const { data } = await deleteHabit({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteHabit(dataConnect, deleteHabitVars);

console.log(data.habit_delete);

// Or, you can use the `Promise` API.
deleteHabit(deleteHabitVars).then((response) => {
  const data = response.data;
  console.log(data.habit_delete);
});
```

### Using `DeleteHabit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteHabitRef, DeleteHabitVariables } from '@dataconnect/generated';

// The `DeleteHabit` mutation requires an argument of type `DeleteHabitVariables`:
const deleteHabitVars: DeleteHabitVariables = {
  id: ..., 
};

// Call the `deleteHabitRef()` function to get a reference to the mutation.
const ref = deleteHabitRef(deleteHabitVars);
// Variables can be defined inline as well.
const ref = deleteHabitRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteHabitRef(dataConnect, deleteHabitVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.habit_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.habit_delete);
});
```

