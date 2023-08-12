import { useEffect, useState } from 'react';
import { Autocomplete, Button, TextField } from '@mui/material';

import { toast } from 'react-toastify';
import { css } from '@emotion/css'
import Modal from '../../../components/Modal';
import { useForm } from 'react-hook-form';
import { useTournamentContextValue } from '../TournamentContext';
import { getPokemon } from '../../../services/api'

export default function PokemonUpdateModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { state, actions } = useTournamentContextValue()
  const [value, setValue] = useState<string | null>('');
  const [inputValue, setInputValue] = useState('');

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
          id: resp['id'],
          customName: values.customName,
          name: resp['name'],
          type: resp['types'],
          pokemonSprite: resp['sprites']['front_default'],
          stats: resp['stats'],
        }
        await actions?.updatePokemon(pokemonData)
      }
      onClose();
    } catch (error) {
      toast.error(`Pokemon ${values.originalName} doesn't exist in the pokedex.`)
    }
  }

  const onDelete = async () => {
    await actions?.deletePokemon();
    onClose();
  }

  useEffect(() => {
    if (state?.selectedPokemon) {
      reset({
        customName: state?.selectedPokemon.customName,
        originalName: state?.selectedPokemon.name
      });
      setValue(state?.selectedPokemon.name);
      setInputValue(state?.selectedPokemon.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal open={open} title='Update Pokemon' onClose={onClose}>
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
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
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
              textTransform: 'none'
            }}
            disabled={state?.isBattling ? true : false}
            variant="contained"
            type='submit'>
            Update
          </Button>

          <Button
            className={css`
            &:hover {
              background-color: #ff9495 !important;
            }
            `}
            sx={{
              backgroundColor: '#FF4D4F',
              textTransform: 'none'
            }}
            disabled={state?.isBattling ? true : false}
            variant="contained"
            onClick={() => onDelete()}>
            Delete
          </Button>
        </div>
      </form>
    </Modal>
  )
}
