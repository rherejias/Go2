import { useEffect } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';

import { toast } from 'react-toastify';
import { css } from '@emotion/css'
import Modal from '../../../components/Modal';
import { useForm } from 'react-hook-form';
import { useTournamentContextValue } from '../TournamentContext';
import { getPokemon } from '../../../services/api'

export default function PokemonAddModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, actions } = useTournamentContextValue()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      const resp: any = await getPokemon((values.originalName).toLowerCase());
      if (resp) {
        const pokemonData = {
          id: Date.now(),
          pokedexId: resp['id'],
          customName: values.customName,
          name: resp['name'],
          type: resp['types'],
          pokemonSprite: resp['sprites']['front_default'],
          stats: resp['stats'],
        }
        await actions?.addPokemon(pokemonData)
      }
      onClose();
    } catch (error) {
      toast.error(`Pokemon ${values.originalName} doesn't exist in the pokedex.`)
    }
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal open={open} title='Register Pokemon' onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={css`
            margin: 15px 0;
          `}>
          <TextField
            type={'text'}
            error={
              !!errors?.['customName']
            }
            {...register('customName', { required: true })}
            fullWidth
            label={'Custon Name'}
          />
        </div>
        <Autocomplete
          options={state?.allPokemon || []}
          renderInput={(params) => <TextField {...params} label="Pokemon"  {...register('originalName', { required: true })} />}
        />
        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-top: 105px
        `}>
          <Button
            sx={{
              backgroundColor: '#345FFF',
              textTransform: 'none'
            }}
            disabled={state?.isBattling ? true : false}
            variant="contained"
            type='submit'>
            Register
          </Button>
        </div>
      </form>
    </Modal>
  )
}
