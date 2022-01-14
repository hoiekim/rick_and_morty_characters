# Architecture

This app is made of a single server that feeds a web page built by React. For core data, it uses [external api](https://rickandmortyapi.com/documentation).

(To do)

# Handling Errors

(To do)

# Testing

(To do)

Run following command

```
npm run test
```

# 3rd Party Libraries

## [React Query](https://react-query.tanstack.com/overview)

React Query provides useful React hook called `useQuery`. What is does is techincally same as fetching data to an url and setting the response to a state variable. However, React Query has several extra features that can take a long time setting up by yourself. Followings are some examples of the benefits:

- It caches the response data with custom "query keys".
- It generates "refetch" function for you.
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

## CSS scripting

Currently all css script is written in one file, `src/App.css`(except some global styles). This is okay since there is not a lot of demands for complicated styling for now. But if we are planning to develop this app to be so, there should be a consideration to make sure the styling scripts don't get overwhelming 😨

Personally I prefer using [Styled Components](https://styled-components.com/docs) which is a 3rd party library. This library is great for solid design system that has well defined components. Or we can keep current style while separating files by appropriate size and using [Sass](https://sass-lang.com/documentation) for easier coding & readibility.

(To do)
