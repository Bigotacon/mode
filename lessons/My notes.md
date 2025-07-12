// Copyright 2025 Josh
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

# Lesson 8 Caching with dynamic IO & Suspense

Data access layers lets us put an async infront of a react componnent. This is where it is different
This function keeps rendering while thing changee. We can create regular function. Our html wont return until the function is returned.

So in the example we get issues while awaiting on issues. We get issues and its a regular function.

When we are working with a aysnc function we got to use cache. The server recognizes that we are using async and forces us to make a choice. We need to make it dyanmic or tell us where to use it.
C:\Users\Josh\Developer\next.js-fundamentals\next.config.ts this is the configuration file. There is a featur
It seems next.config is wher you make configuration files.

Caching in nextjs 13. Use cache is us saying we want the page to be cached. If you want the page to be dynamic then you got to wrap the page in suspesnse. React suspense is lets you steam a component after it does its workload. It lets us load the dynamic pages and then for the static stuff it loets us load if first.

If we fetch data, search params, cookies, anything like this is telling next js it is a dynamic page. Do you want to cache parts of this. By default put everything in suspense. Without this flag it is complicated

## Suspense in Navigation

We can make different parts static and dyanmic to the the component level. We can make it so only a certain part like the user email is dyanmic. Push dowwn the dynamic part as low far down as you can. We want to have just a server component put as far down as possible

We can suspend a component in the html. We can also make a file called loading. Loading is the cleanest way

# Lesson 9: Creating Issues with Server Actions

If we want to do crud actions like create issue then we need to make a server acietons.

On issues new page when you click create new issue then

On the case of a new issue. We only want user that is logged in then only then can that user can submit the issue.

We are still using an issue form to create an issue. We will later look at use transtiton to cre3ate a form.

You only suspend something that is doing a call to get data

Step by step on creating an issue

1. First we create an issue
2. We get the current user
3. Validate the user with zod
4. Insert the record into the database

From the mew user page

1. We suspend the page because it is getting the current user. Later we will streamline this
2. We need to wait until we get the current user. It waits unitl it gets its child .
3. Dont show the issue form until we get chirldrenm
4. Form is a client side component. that usesAction hook and calls the server action we created.
5. The server action that we created is create an issue

Teacher has a server action, a form with a form action, suspend data that needs stuff. This is half of the form stuff. Still no api route.

## Data Loading QA

If you don't have a deractive on top it is asusmed you are a server component unless you have "use client" in the parent then its assumed they are client.

Pages by default are server component. If I am using a component that is using hooks. Somewhhere in this chain I am using an error component. It is good to be a client or not.

If we are in a page we should put if it is client or not.

Loading has nothing to do with cachie. Adding suspense only will show the loading once then it will cache the data.

# Editinng Issues with Server Actions

We can edit without using Action state and hooks.

Our objective is we got to fill out the edit issue function. Delete form is prtty simple as well.

When we go to edit and deltet using the param ui.

Partial updates let us udate the data partial. We can add some business logic that if the fields are not being updated then they should be the values that they were before

Return type. Is a Promise<ActionResponse>. We can return whatever we want. The teacher coreated a class that he wanted called action response, It was success, message, errors, and error

The route handler you have to default export a component for a page. Everything else we can export what we want

When asked can we return 403 to the teacher:
/_This is a server action. The user will be clicking a form. What would you send back on the api required. Would you
send back a 403 reqest. In the deleteIssue function it doesn't know if it is going to be in a form action. It is on a server and it
Doesn't know where it going to be used. You get access to the payloads but not the requests.
_/

## Nect segment for10 Editing and deleteing issues

We are now on the issues page we get the issue and we hook everything up. There is no suspensension
const { id } = await params

This is the page that we will be adding

C:\Users\Josh\Developer\next.js-fundamentals\app\issues\[id]\page.tsx

#10 Delete isseu buito
They stared somthing for async transactions use transaction hook and you are done.

This delete issue button is a server action so it lets us delete.

If you see a hook then are in a client . You don't have to use transitions to call deleteIssue. If you don't want the request interfering with whats is happening in the page.

Its like
`useEffect(()) and do the thing?`
`

# Caching and Momorizing Data.

We have to decarre how we ant to cache the page

## Caching

Next Js lets use `"use cache"` so that we dont have to requery the data. It will resuolt in fadter loading time. However, their is an issue if we create a request that we wont see it.

```ts
const getIssues = async () => {
  'use cache'
  cacheTag('issues')
}
```

To fix this we will need to invalidate the request

```ts
import { revalidateTage } from 'next/cache'
//after issue database insert
revalidate('issues')
```

You can put use cache in a function. You put `use cache` in a data fetching function.  
Cache you want to get to the most direct function that is getting data.

You cam use unstable cache life to control how long you want how long you want the cache to be cached for

Can you create dyanic tags.

Cache only gets invalidated when we crate an issue

# Memorizing

If you have a computation that you run many times it should be momized. Memozing is a form of caching that speed things up. We may have a waterfall effect.

What if we have multiple get current user. Should we access get current user three times. Memoizing should not happen across users. You dont want users to see each others data. It only happens for one request.

When in developer mode all of our stuff runs twice. The goal is that we will only see it once. The reason it loads twice is because we dont want code to call a transsiton that calls a component.

# API Routes

We made a full crud application without using api routes. There is some use cases for api routes. NextJs makes api routes super easy. It is made for it to be a serverless environment. It now follows the web standards for followiing edge standards.

It is very simple and it follows the spec out there.

API Routees that work in here will also work in the route. So we can make the code and then have it called on the server and in the code

Build a function that is in app>actions>issues and then in the server action. It is code that is on the server and run the request.

# Creating API Routes

There is no offical wait to make an open api. Next swagger-doc and swagger-ui doc. https://www.npmjs.com/package/next-swagger-doc
