import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { css } from '@emotion/css'
import { Button, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import TrainerModal from "./TrainerModal";
import { useTournamentContextValue } from '../TournamentContext';

export default function TrainerFilterForm() {
  const { actions, state } = useTournamentContextValue();

  const {
    register,
    handleSubmit,
    watch
  } = useForm();

  const handleSearch = (values: any) => {
    actions?.setSearch(values?.search);
  }

  useEffect(() => {
    watch(() => handleSubmit(handleSearch)())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleSubmit, watch])

  return (
    <>
      <TrainerModal open={state?.openModal!} onClose={() => actions?.setOpenModal(false)} />
      <div className={css`
            display: flex;
            justify-content: space-between;
        `}>
        <form onSubmit={handleSubmit(handleSearch)} >
          <TextField
            {...register('search')}
            id="outlined-basic"
            placeholder='Search Trainers...'
            size="small"
            InputProps={{
              endAdornment: <SearchIcon style={{ color: '#e4e5e7' }} />
            }}
            sx={{
              backgroundColor: '#ffffff',
              border: '1px solid #e4e5e7',
              borderRadius: '5px',
            }}
          />
        </form>
        <Button
          variant="contained"
          disabled={state?.isBattling ? true : false}
          onClick={() => actions?.setOpenModal(true)}
          sx={{
            textTransform: 'none'
          }}>
          Create new Trainer
        </Button>
      </div>
    </>
  )
}