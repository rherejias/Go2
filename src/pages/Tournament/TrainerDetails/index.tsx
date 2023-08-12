import { useNavigate } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Page from '../../../components/Page';
import TrainerInfo from './TrainerInfo';
import PokemonDetails from '../Pokemon';
import { Button } from '@mui/material';

export default function TrainerDetails() {
  const navigate = useNavigate();

  return (
    <Page>
      <Button
        sx={{
          textTransform: 'none'
        }}
        variant="text"
        onClick={() => navigate('/')}>
        <ArrowBackIcon fontSize='small' sx={{ paddingRight: 1 }} /> Back
      </Button>
      <TrainerInfo />
      <PokemonDetails />
    </Page>
  )
}