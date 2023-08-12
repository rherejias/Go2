import { useTournamentContextValue } from "../TournamentContext";
import { Paper } from '@mui/material';
import { css } from '@emotion/css';

export default function TrainerInfo() {
  const { state } = useTournamentContextValue()

  return (
    <Paper sx={{ padding: '15px', marginBottom: '15px' }}>
      <div className={css`
        font-size: 24px;
        margin-bottom: 10px
      `}>Trainer Details</div>
      <table>
        <tbody>
          <tr className={css`
            text-align: left;
          `}>
            <th className={css`
            padding-bottom: 5px;
          `}>Trainer Name:</th>
            <td className={css`
            padding-bottom: 5px;
          `}>
              {state?.selectedTrainer?.name}
            </td>
          </tr>
          <tr className={css`
            text-align: left;
          `}>
            <th>Trainer Rank:</th>
            <td>
              {state?.selectedTrainer?.rank} Rank
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  )
}