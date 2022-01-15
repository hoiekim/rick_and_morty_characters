import React from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider, setLogger } from "react-query";
import { CharactersData } from ".";
import { CharacterData } from "./components/ItemDetail";

jest.mock("../../lib/graphql", () => {
  const data: { characters: CharactersData; character: CharacterData } = {
    characters: {
      info: { pages: 100 },
      results: [
        {
          id: "1",
          name: "Testing Rick",
          status: "Alive",
          species: "Human",
        },
        {
          id: "2",
          name: "Testing Morty",
          status: "Alive",
          species: "Human",
        },
      ],
    },
    character: {
      id: "1",
      name: "Testing Detail Rick",
      status: "Alive",
      species: "Human",
      type: "Not my type",
      gender: "Male",
      image: "",
      location: null,
    },
  };
  return { rickAndMorty: () => Promise.resolve(data) };
});

import Main from ".";

setLogger({
  log: console.log,
  warn: console.warn,
  error: () => {},
});

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

const MockApp = ({ children }: any) => (
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </BrowserRouter>
);

test("renders title and list", () => {
  window.history.pushState({}, "Test page", "/1");
  const { container } = render(
    <MockApp>
      <Main />
    </MockApp>
  );
  const title = screen.getByText(/Rick and Morty Characters/i);
  const list = container.querySelector(".list");
  expect(title).toBeInTheDocument();
  expect(list).toBeInTheDocument();
});

test("page navigation buttons should send users to next/previous page", async () => {
  window.history.pushState({}, "Test page", "/1");
  const { container } = render(
    <MockApp>
      <Main />
    </MockApp>
  );
  await waitFor(() => screen.getByText(/Testing Rick/i));
  const leftArrow = container.querySelector(".title---arrow.left");
  const rightArrow = container.querySelector(".title---arrow.right");
  expect(leftArrow).toHaveAttribute("href", "/100");
  expect(rightArrow).toHaveAttribute("href", "/2");
});

test("opens detail screen when users click an item card", async () => {
  window.history.pushState({}, "Test page", "/1");
  render(
    <MockApp>
      <Main />
    </MockApp>
  );
  const item = await waitFor(() => screen.getByText(/Testing Morty/i));
  expect(item.parentElement).toHaveAttribute("href", "/1?id=2");
});

test("renders detail screen when item id is given", async () => {
  window.history.pushState({}, "Test page", "/1?id=1");
  render(
    <MockApp>
      <Main />
    </MockApp>
  );
  const item = await waitFor(() => screen.getByText(/Testing Detail Rick/i));
  expect(item).toBeInTheDocument();
});

test("closes detail screen when users click it", async () => {
  window.history.pushState({}, "Test page", "/1?id=1");
  const { container } = render(
    <MockApp>
      <Main />
    </MockApp>
  );
  const item = container.querySelector(".item_detail");
  expect(item).toBeInTheDocument();
  userEvent.click(item || new Element());
  expect(item).not.toBeInTheDocument();
});
