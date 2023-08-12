import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getAllPokemon } from '../../services/api';
import { shuffleArray, concatArray } from './helper'

export interface IPokemon {
  id: number,
  pokedexId: number,
  customName: string,
  name: string,
  type: {
    slot: number,
    type: {
      name: string,
      url: string
    }
  }[],
  pokemonSprite: string,
  stats: {
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }[],
}

export interface ITrainer {
  id: number;
  name: string;
  rank: string;
  pokemon: IPokemon[] | undefined;
  winner?: boolean;
}

interface IContext {
  actions?: {
    addTrainer: (values: any) => void;
    addPokemon: (value: any) => void;
    updatePokemon: (value: any) => void;
    deletePokemon: () => void;
    beginBattle: () => void;
    setOpenModal: (value: boolean) => void;
    setSearch: (value: string) => void;
    setOpenPokemonModal: (value: boolean) => void;
    setOpenUpdatePokemonModal: (value: boolean) => void;
    setSelectedTrainer: (value: ITrainer) => void;
    setSelectedPokemon: (value: IPokemon) => void;
    setShuffledTrainer: (value: ITrainer[][]) => void;
    setIsBattling: (value: boolean) => void;
  },
  state?: {
    allPokemon: string[] | undefined;
    dataList?: ITrainer[];
    openModal: boolean;
    search?: string;
    openPokemonModal: boolean;
    openUpdatePokemonModal: boolean;
    selectedTrainer: ITrainer | undefined;
    selectedPokemon: IPokemon | undefined;
    shuffledTrainer: ITrainer[][] | undefined;
    isBattling: boolean;
  }
}

export const Context = createContext<IContext>({});

interface TournamentContextProps {
  children: React.ReactNode;
}

const pokemonSample = [
  {
    "id": 1691820419155,
    "pokedexId": 6,
    "customName": "Dragon",
    "name": "charizard",
    "type": [
      {
        "slot": 1,
        "type": {
          "name": "fire",
          "url": "https://pokeapi.co/api/v2/type/10/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "flying",
          "url": "https://pokeapi.co/api/v2/type/3/"
        }
      }
    ],
    "pokemonSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    "stats": [
      {
        "base_stat": 78,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 84,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 78,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 109,
        "effort": 3,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 85,
        "effort": 0,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 100,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ]
  },
  {
    "id": 1691820508813,
    "pokedexId": 9,
    "customName": "Blaster",
    "name": "blastoise",
    "type": [
      {
        "slot": 1,
        "type": {
          "name": "water",
          "url": "https://pokeapi.co/api/v2/type/11/"
        }
      }
    ],
    "pokemonSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    "stats": [
      {
        "base_stat": 79,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 83,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 100,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 85,
        "effort": 0,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 105,
        "effort": 3,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 78,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ]
  },
  {
    "id": 1691820516712,
    "pokedexId": 3,
    "customName": "Plant Monster",
    "name": "venusaur",
    "type": [
      {
        "slot": 1,
        "type": {
          "name": "grass",
          "url": "https://pokeapi.co/api/v2/type/12/"
        }
      },
      {
        "slot": 2,
        "type": {
          "name": "poison",
          "url": "https://pokeapi.co/api/v2/type/4/"
        }
      }
    ],
    "pokemonSprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    "stats": [
      {
        "base_stat": 80,
        "effort": 0,
        "stat": {
          "name": "hp",
          "url": "https://pokeapi.co/api/v2/stat/1/"
        }
      },
      {
        "base_stat": 82,
        "effort": 0,
        "stat": {
          "name": "attack",
          "url": "https://pokeapi.co/api/v2/stat/2/"
        }
      },
      {
        "base_stat": 83,
        "effort": 0,
        "stat": {
          "name": "defense",
          "url": "https://pokeapi.co/api/v2/stat/3/"
        }
      },
      {
        "base_stat": 100,
        "effort": 2,
        "stat": {
          "name": "special-attack",
          "url": "https://pokeapi.co/api/v2/stat/4/"
        }
      },
      {
        "base_stat": 100,
        "effort": 1,
        "stat": {
          "name": "special-defense",
          "url": "https://pokeapi.co/api/v2/stat/5/"
        }
      },
      {
        "base_stat": 80,
        "effort": 0,
        "stat": {
          "name": "speed",
          "url": "https://pokeapi.co/api/v2/stat/6/"
        }
      }
    ]
  }
]

const TournamentContext = ({ children }: TournamentContextProps) => {

  const [dataList, setDataList] = useState<ITrainer[]>([
    {
      id: 1691757464771,
      name: 'Sample Trainer',
      rank: 'S',
      pokemon: pokemonSample
    }]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openPokemonModal, setOpenPokemonModal] = useState<boolean>(false);
  const [openUpdatePokemonModal, setOpenUpdatePokemonModal] = useState<boolean>(false);

  const [allPokemon, setAllPokemon] = useState<string[]>();
  const [selectedTrainer, setSelectedTrainer] = useState<ITrainer>();
  const [selectedPokemon, setSelectedPokemon] = useState<IPokemon>();
  const [shuffledTrainer, setShuffledTrainer] = useState<ITrainer[][]>([]);

  const [isBattling, setIsBattling] = useState<boolean>(false);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchAllPokemon();
  }, [])

  useEffect(() => {
    if (!isBattling) {
      setShuffledTrainer([]);
    }
  }, [isBattling])

  const fetchAllPokemon = async () => {
    const resp: any = await getAllPokemon();
    setAllPokemon(resp['results'].map((data: { [x: string]: any; }) => data['name']))
  }

  const addTrainer = async (values: any) => {
    try {
      const sameName = dataList.some(trainer => (trainer.name).toLowerCase() === (values.name).toLowerCase())
      if (sameName) {
        toast.error('Trainer already exist.');
      } else {
        const list = dataList;
        list.push(values)
        setDataList(list);
        toast.success('Trainer successfully added.')
      }

    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  const addPokemon = async (values: any) => {
    try {
      if (dataList && selectedTrainer) {
        selectedTrainer.pokemon?.push(values);
        const updatedList = concatArray(selectedTrainer, dataList)
        setDataList(updatedList);
        toast.success('Pokemon successfully registered.')
      }
    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  const updatePokemon = async (values: any) => {
    try {
      if (dataList && selectedTrainer && selectedPokemon) {
        const updatedPokemon = selectedTrainer.pokemon?.map(pokemon => {
          if (pokemon.id === selectedPokemon.id) {
            pokemon.pokedexId = values.id;
            pokemon.customName = values.customName;
            pokemon.name = values.name;
            pokemon.type = values.type;
            pokemon.pokemonSprite = values.pokemonSprite;
            pokemon.stats = values.stats;
          }
          return pokemon;
        })
        selectedTrainer.pokemon = updatedPokemon;
        const updatedList = concatArray(selectedTrainer, dataList)
        setDataList(updatedList);
        toast.success('Pokemon successfully updated.')
      }
    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  const deletePokemon = async () => {
    try {
      if (dataList && selectedTrainer && selectedPokemon) {
        const updatedPokemon = selectedTrainer.pokemon?.filter(pokemon => pokemon.id !== selectedPokemon.id)
        selectedTrainer.pokemon = updatedPokemon;
        const updatedList = concatArray(selectedTrainer, dataList)
        setDataList(updatedList);
        toast.success('Pokemon successfully deleted.')
      }
    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  const beginBattle = async () => {
    try {
      setIsBattling(true);
      const shuffledTrainer = shuffleArray([...dataList])
      const size = 2;
      const resp = await shuffledTrainer.reduce(async (acc: any, curr, i) => {
        let arr = await acc;
        if (!(i % size)) {
          arr.push(shuffledTrainer.slice(i, i + size));
        }
        return arr;
      }, []);
      setShuffledTrainer(resp);
    } catch (error: any) {
      toast.error('An error has occured.');
    }
  }

  return (
    <Context.Provider value={{
      actions: {
        addTrainer,
        addPokemon,
        updatePokemon,
        deletePokemon,
        beginBattle,
        setOpenModal,
        setSearch,
        setOpenPokemonModal,
        setOpenUpdatePokemonModal,
        setSelectedTrainer,
        setSelectedPokemon,
        setShuffledTrainer,
        setIsBattling,
      },
      state: {
        allPokemon,
        dataList,
        openModal,
        search,
        openPokemonModal,
        openUpdatePokemonModal,
        selectedTrainer,
        selectedPokemon,
        shuffledTrainer,
        isBattling,
      }
    }}>
      {children}
    </Context.Provider>
  )
}


export const useTournamentContextValue = () => useContext(Context);
export default TournamentContext;
