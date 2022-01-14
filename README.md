# View Demo

[Click Here!](https://clover.hoie.kim)

# Architecture

Following is a simplified tree that shows how `App` consists of smaller components.

- `App`
  - `AppBody`
    - `ItemCard`
    - `ItemDetail`
  - Other route 1 (when extended)
  - Other route 2 (when extended)
  - ...

`App` only defines wrapper components like `BrowserRouter`, `ErrorBoundary`, etc. for child components. This way, child components like `AppBody` and its siblings can utilize common features that should be shared across routes.

`AppBody` is divided into smaller components considering easier state handling and readibility.

# Handling Errors

In case external api response returns in an unexpected way, I'm using `useQuery` hook's error handling features. `useQuery` returns an object that has properties called `status`, `isError` and `isSuccess`. These properties' values can be used to determine if fetching data was successful. For example, [this code](/src/components/AppBody.tsx#L47-L49) and [this code](/src/components/ItemDetail.tsx#L52)

Another way of handling error is using `ErrorBoundary` component. This component catches error that is thrown in its children components so that we can decide to render error page or not. Refer [this file](/src/components/ErrorBoundary.tsx) and [this code](/src/App.tsx#L14-L19).

# Testing

Refer [this file](/src/App.test.tsx) for full testing code.

To run test, execute following command in your terminal:

```
npm run test
```

# 3rd Party Libraries

## [React Query](https://react-query.tanstack.com/overview)

React Query provides useful React hook called `useQuery`. What it does is techincally same as fetching data from an url and setting the response to a state variable. However, React Query has several extra features that can take a long time setting up by yourself. Followings are some examples of the benefits:

- It caches the response data with custom "query keys".
- Returns useful properties like `status` along with fetched data.
- Lots of useful configuration for example: `refetchOnReconnect`, `refetchOnWindowFocus`, etc.

This project is currently taking advantage of caching feature of React Query, but other features has lots of potentials to be useful for extension of the project in the future.

## [React Router](https://github.com/remix-run/react-router)

React Router is useful for client-side routing. This app allows user's browser to determine what to render according to the url instead of requesting data to the server. This method gives benefit such as:

- There is no networking load / latency when redirecting.
- HTML elements are not unmounted in every redirection, which results in fast rendering.

If I was avoiding to use routing at all, I could use React's plain state variables instead of url parameters to determine query variables. But having those variables shown in url is useful because:

- Users can save url to relocate the page they were viewing previously.
- Easy to monitor user activity for marketing purpose.

# "To Do"s

Followings are what I would do differently / what I would do next if I had more time.

## CSS scripting

Currently all css script is written in one file, `src/App.css`(except some global styles). This is okay since there is not a lot of demands for complicated styling for now. But if we are planning to develop this app to be so, there should be a consideration to make sure the styling scripts don't get overwhelming 😨

Personally I prefer using [Styled Components](https://styled-components.com/docs) which is a 3rd party library. This library is great for solid design system that has well defined components. Or we can keep current style while separating files by appropriate size and using [Sass](https://sass-lang.com/documentation) for easier coding & readibility.

## Improving UX / UI

- Rendering spinner / skeleton / etc. when loading.
- Displaying appropriate messages when error.
