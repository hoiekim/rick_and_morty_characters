import { RICK_AND_MORTY_API_URL } from "./constants";

/**
 * Get Rick and Morty characters data using Rick and Morty API(Graphql)
 * @param query graphql query string
 * @returns data object as promise
 */
export const rickAndMorty = (query: string): Promise<any> => {
  return fetch(RICK_AND_MORTY_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((r) => r.json())
    .then((r) => r.data || null);
};
