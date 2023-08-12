import { css } from '@emotion/css';
import PokemonUpdateModal from './PokemonUpdateModal';
import { ITrainer, useTournamentContextValue } from "../TournamentContext";
import Tag from '../../../components/Tag';

interface Props {
  selectedTrainer: ITrainer | undefined
}

export default function PokemonDetail(props: Props) {
  const { state, actions } = useTournamentContextValue();
  const { selectedTrainer } = props;

  return (
    <div className={css`
        max-height: 71vh;
        overflow: auto;
      `}>
      <PokemonUpdateModal open={state?.openUpdatePokemonModal!} onClose={() => actions?.setOpenUpdatePokemonModal(false)} />
      {selectedTrainer?.pokemon?.map(pokemon => {
        return (
          <div
            className={css`
              display: flex;
              border-bottom: 1px solid rgba(224, 224, 224, 1);
              cursor: pointer;
              &:hover {
                background-color: #f5f5f5;
              }
            `}
            onClick={() => {
              if (!state?.isBattling) {
                actions?.setOpenUpdatePokemonModal(true);
                actions?.setSelectedPokemon(pokemon);
              }
            }}
          >
            <div>
              <img src={pokemon.pokemonSprite} height={'auto'} width={150} alt='pokemon_sprite' />
            </div>
            <div className={css`
                flex: 1;
                margin: auto;
              `}>
              <table className={css`
                  text-align: left;
                  text-transform: capitalize;
                `}>
                <tbody>
                  <tr>
                    <th>No:</th>
                    <td>{pokemon.pokedexId}</td>
                  </tr>
                  <tr>
                    <th>Nickname:</th>
                    <td>{pokemon.customName}</td>
                  </tr>
                  <tr>
                    <th>Name:</th>
                    <td>{pokemon.name}</td>
                  </tr>
                  <tr>
                    <th>Type:</th>
                    <td className={css`
                        display: flex
                      `}>{pokemon.type.map(type => {
                      return <Tag value={type.type.name}>{type.type.name}</Tag>
                    })}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={css`
                flex: 1;
                margin: auto;
                `}>
              <table className={css`
                  text-align: left;
                  text-transform: capitalize;
                `}>
                <tbody>
                  {pokemon.stats.map(stats => {
                    return (
                      <tr>
                        <th>{stats.stat.name}:</th>
                        <td>{stats.base_stat}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )
      })}
    </div>
  )
}