import { Button, Paper } from '@mui/material';
import { css } from '@emotion/css';

import PokemonModal from './PokemonAddModal'
import PokemonDetails from './PokemonDetail'
import { useTournamentContextValue } from "../TournamentContext";

export default function Pokemon() {
  const { state, actions } = useTournamentContextValue()

  return (
    <Paper sx={{ padding: '15px' }}>
      <PokemonModal open={state?.openPokemonModal!} onClose={() => actions?.setOpenPokemonModal(false)} />
      <div className={css`
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        `}>
        <div className={css`
          font-size: 24px;
          margin-top: auto;
          margin-bottom: auto;
          `}>
          Pokemon Details
        </div>
        <Button
          variant="contained"
          disabled={(state?.selectedTrainer?.pokemon && state?.selectedTrainer?.pokemon?.length >= 6 ? true : false) || state?.isBattling ? true : false}
          onClick={() => actions?.setOpenPokemonModal(true)}
          sx={{
            backgroundColor: '#345FFF',
            textTransform: 'none'
          }}>
          Register Pokemon
        </Button>
      </div>
      <PokemonDetails selectedTrainer={state?.selectedTrainer} />
    </Paper>
  )
}