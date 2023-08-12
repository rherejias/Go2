import { Routes, Route } from 'react-router-dom'
import { ToastContainer, } from 'react-toastify';
import TrainList from './TrainerList';
import TrainerDetails from './TrainerDetails';
import TournamentContext from "./TournamentContext";
import '../../index.css';
import Error from '../../Error';

export default function Tournament() {
  return (
    <div>
      <ToastContainer />
      <TournamentContext>
        <Routes>
          <Route path="/" element={<TrainList />} />
          <Route path="/details/:id" element={<TrainerDetails />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </TournamentContext>
    </div>
  )
}