// routes/pokemon/$name.tsx
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const { name } = params;
  const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return json(await pokemon.json());
};

export default function PokemonDetail() {
  const pokemon = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <ul>
        <li>Height: {pokemon.height}</li>
        <li>Weight: {pokemon.weight}</li>
        <li>Base Experience: {pokemon.base_experience}</li>
      </ul>
      <Link to="../pokelist">
        <button>Back to List</button>
      </Link>
    </div>
  );
}
