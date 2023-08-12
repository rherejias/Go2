import { useEffect } from 'react';
import { Button, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { toast } from 'react-toastify';
import { css } from '@emotion/css'
import Modal from '../../../components/Modal';
import { useForm } from 'react-hook-form';
import { useTournamentContextValue } from '../TournamentContext';

interface ItextFields {
  name: string;
  label: string;
  type: string;
}

export default function TrainerModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  const { actions } = useTournamentContextValue();

  const textFields: ItextFields[] = [
    { name: 'name', label: 'Name', type: 'text' }
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      values.id = Date.now();
      values.pokemon = [];
      await actions?.addTrainer(values);
      onClose();
    } catch (error) {
      toast.error('Error ocured while adding Trainer.')
    }
  }

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal open={open} title='Create new Trainer' onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {textFields.map(({ name, label, type }) =>
          <div key={name} className={css`
            margin: 15px 0;
          `}>
            <TextField
              type={type}
              error={
                !!errors?.[name]
              }
              {...register(name, { required: true })}
              fullWidth
              label={label}
            />
          </div>
        )}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Rank</InputLabel>
          <Select
            {...register('rank', { required: true })}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Rank"
          >
            <MenuItem value={'E'}>E Rank</MenuItem>
            <MenuItem value={'D'}>D Rank</MenuItem>
            <MenuItem value={'C'}>C Rank</MenuItem>
            <MenuItem value={'B'}>B Rank</MenuItem>
            <MenuItem value={'A'}>A Rank</MenuItem>
            <MenuItem value={'S'}>S Rank</MenuItem>
          </Select>
        </FormControl>

        <div className={css`
          display: flex;
          justify-content: space-between;
          margin-top: 105px
        `}>
          <Button
            sx={{
              textTransform: 'none'
            }}
            variant="contained"
            type='submit'>
            Create Trainer
          </Button>
        </div>
      </form>
    </Modal>
  )
}
