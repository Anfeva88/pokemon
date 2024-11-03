
import { json, Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page")) || 1;
  const offset = (page - 1) * 20; 

  const pokemonlist = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  return json({
    ...(await pokemonlist.json()),
    page,
  });
};

export default function PokeList() {
  const { results, page } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Pokémon List</h1>
      <ul>
        {results.map((pokemon: { name: string; url: string }) => (
          <li key={pokemon.url}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
      <div className="pagination">
        {page > 1 && (
          <Link to={`?page=${page - 1}`}>
            <button>Previous</button>
          </Link>
        )}
        <Link to={`?page=${page + 1}`}>
          <button>Next</button>
        </Link>
      </div>
    </div>
  );
}

