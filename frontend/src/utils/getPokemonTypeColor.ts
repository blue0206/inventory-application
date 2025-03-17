import { PokeType, PokemonTypeEnum } from "shared";

type Colors = {
    bg: string;
    fg: string;
}
type TypeColorMap = Record<PokeType, Colors>;

const typeColorMap: TypeColorMap = {
    [PokemonTypeEnum.NORMAL]: {
        bg: "bg-neutral-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.FIRE]: {
        bg: "bg-orange-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.PSYCHIC]: {
        bg: "bg-pink-600",
        fg: "text-white"
    },
    [PokemonTypeEnum.ROCK]: {
        bg: "bg-stone-500",
        fg: "text-white"
    },
    [PokemonTypeEnum.WATER]: {
        bg: "bg-blue-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.ELECTRIC]: {
        bg: "bg-yellow-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.GRASS]: {
        bg: "bg-green-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.ICE]: {
        bg: "bg-cyan-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.FIGHTING]: {
        bg: "bg-red-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.POISON]: {
        bg: "bg-purple-400",
        fg: "text-white"
    },
    [PokemonTypeEnum.GROUND]: {
        bg: "bg-brown-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.FLYING]: {
        bg: "bg-sky-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.BUG]: {
        bg: "bg-lime-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.GHOST]: {
        bg: "bg-purple-800",
        fg: "text-white"
    },
    [PokemonTypeEnum.DRAGON]: {
        bg: "bg-sky-800",
        fg: "text-white"
    },
    [PokemonTypeEnum.DARK]: {
        bg: "bg-zinc-800",
        fg: "text-white"
    },
    [PokemonTypeEnum.STEEL]: {
        bg: "bg-gray-400",
        fg: "text-black"
    },
    [PokemonTypeEnum.FAIRY]: {
        bg: "bg-pink-400",
        fg: "text-white"
    },
} as const satisfies TypeColorMap;

function getTypeColor(type: PokeType): Colors {
    const color = typeColorMap[type];
    return color || {
        bg: "bg-primary",
        fg: "text-primary-foreground"
    };
}

export {
    getTypeColor
}