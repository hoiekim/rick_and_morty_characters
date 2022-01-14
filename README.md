# View Demo

[Click Here!](https://clover.hoie.kim)

# Architecture

This app is a single server that feeds one html page with javascript modules built by React. See below for architectural information inside of the React app.

## React Components Composition

Following is a simplified tree that shows how `App` consists of smaller components.

> - `App`
>   - `Main`
>     - `ItemCard`
>     - `ItemDetail`
>   - Other route 1 (when extended)
>   - Other route 2 (when extended)
>   - ...

`App` only defines wrapper components like `BrowserRouter`, `ErrorBoundary`, etc. for child components. This way, child components can utilize common features that should be shared across routes.

Pages(such as `Main`) are divided into smaller components considering easier state handling and readibility.

## File Structure

File structure generally follows components architecture. See below example:

```
src
|-lib
|-pages
| |-common
| |-Main
| |-...
```

Each routing component(a.k.a. "page") is saved in `src/pages` as a directory for example, `src/pages/Main` for `"/"` route. Each of those page directories should have `index.tsx` that exports default component and `components` folder that has children components in that page. Components that are shared by more than a page are saved in `src/pages/common` directory and other pieces of code that are not React components are saved in `lib` directory.

This system has advantage that components architecture is easy to understand and expand. One downside is that when the project gets complicated, it's hard to check existence of duplicated or similar components across pages.

# Handling Errors

In case external api response returns in an unexpected way, I'm using `useQuery` hook's error handling features. `useQuery` returns an object that has properties called `status`, `isError` and `isSuccess`. These properties' values can be used to determine if fetching data was successful. For example, [this code](/src/pages/Main/index.tsx#L47) and [this code](/src/pages/Main/components/ItemDetail.tsx#L52)

Another way of handling errors is using `ErrorBoundary` component. This component catches errors that are thrown in its children components so that we can decide to render an error page or not. Refer [this file](/src/pages/common/ErrorBoundary.tsx) and [this code](/src/App.tsx#L14-L19).

# Testing

Refer [this file](/src/App.test.tsx) for full testing code.

To run test, execute following command in your terminal:

```
npm run test
```

# 3rd Party Libraries

## [React Query](https://react-query.tanstack.com/overview)

React Query provides useful React hook called `useQuery`. What it does is techincally same as fetching data from an url and setting the response to a state variable. However, React Query has several extra features that can take a long time setting up by yourself. The followings are some examples of the benefits:

- Caches the response data with custom "query keys".
- Returns useful properties like `status` along with fetched data.
- Lots of useful configurations for example: `refetchOnReconnect`, `refetchOnWindowFocus`, etc.

This project is currently taking advantage of caching feature of React Query and error handling, but other features have lots of potential to be useful for extension of the project in the future.

## [React Router](https://github.com/remix-run/react-router)

React Router is useful for client-side routing. This app allows the user's browser to determine what to render according to the url instead of requesting data to the server. This method gives benefits such as:

- No networking load / latency when redirecting.
- HTML elements are not unmounted in every redirection, which results in fast rendering.

If I was to avoid using routing at all, I could use React's plain state variables instead of url parameters to determine query variables. But having those variables shown in url is useful because:

- Users can bookmark pages with parameters.
- Easy to monitor user activity for marketing purpose.

# "To Do"s

The following is what I would do differently / what I would do next if I had more time.

## CSS scripting

Currently all css script is written in one file, `src/App.css`(except some global styles). This is okay since there is not a lot of demands for complicated styling for now. But if we are planning to develop this app to be so, there should be consideration to make sure the styling scripts don't get overwhelming 😨

Personally I prefer using [Styled Components](https://styled-components.com/docs) which is a 3rd party library. This library works well with a solid design system that has well defined components. Or we can keep current way while separating files by appropriate size and using [Sass](https://sass-lang.com/documentation) for easier coding & readibility.

## Improving UX / UI

- Rendering spinner / skeleton / etc. when loading.
- Displaying appropriate messages when error.
