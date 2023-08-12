import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import { green, yellow, red } from '@mui/material/colors';
import { Paper, Tooltip } from '@mui/material';
import { css } from '@emotion/css';
import { useTournamentContextValue } from '../TournamentContext';
import React from 'react';

export default function TrainerFooter() {
  const { state, actions } = useTournamentContextValue();
  const { dataList, shuffledTrainer = [], isBattling } = state!;

  const ColorButton = styled(Button)<ButtonProps>(() => ({
    marginBottom: '15px',
    color: 'white',
    backgroundColor: isBattling ? red[500] : green[500],
    '&:hover': {
      backgroundColor: isBattling ? red[700] : green[700],
    },
  }));

  const handleOnClick = () => {
    if (isBattling) {
      actions?.setIsBattling(false);
    } else {
      actions?.beginBattle()
    }
  }

  const isBattleDisabled = () => {
    if (dataList) {
      if (dataList.length! % 2 !== 0) {
        return true;
      }

      if (dataList.length! < 8) {
        return true;
      }

      const some = dataList.some(trainer => {
        if (trainer.pokemon?.length! < 3) {
          return true;
        }

        return false
      });

      if (some) {
        return true;
      }
    }
    return false
  }
  const disabled = isBattleDisabled();
  return (
    <div className={css`
      padding: 15px 0;
      text-align: center;
    `}>
      <Tooltip title={disabled &&
        <React.Fragment>
          <p className={css`padding-left: 30px; font-size: 14px`}>Battle maybe disabled for these reasons:</p>
          <ol className={css`font-size: 14px`}>
            <li>Trainers must be more than or equal to 8.</li>
            <li>Each Trainer should have at least 3 pokemon registered to them.</li>
            <li>Pokemon tournament is a 1v1 battle, Trainer total must be divisible by 2.</li>
          </ol>
        </React.Fragment>}>
        <span>
          <ColorButton variant="contained" disabled={disabled} onClick={() => handleOnClick()}>{isBattling ? 'STOP BATTLE' : 'START BATTLE'}</ColorButton>
        </span>
      </Tooltip>
      <Paper className={css`
        padding: 15px;
      `}>
        <div className={css`
          font-size: 24px;
          margin-bottom: 15px;
          text-align: center;
          `}>
          Battle Info
        </div>
        {isBattling ? shuffledTrainer.map((trainerSet, index) => {
          return (
            <div key={index} className={css`
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                padding: 15px;
                border: 1px solid rgba(224, 224, 224, 1);
                border-radius: 5px;
                margin-bottom: 15px;
              `}>
              {trainerSet.map((trainer, index) => {
                return (
                  <React.Fragment key={trainer.id}>
                    <span>
                      {trainer.winner && <WorkspacePremiumIcon sx={{ color: yellow[700] }} className={css`vertical-align: -5px;`} />}
                      <span>{trainer.name}</span>
                    </span>
                    {index === 0 && <span className={css`flex: 1`}>VS</span>}
                  </React.Fragment>
                )
              })}
            </div>
          )
        }) :
          <div className={css`
          padding: 15px;
          text-align: center;
        `}>
            No current battle ongoing.
          </div>
        }
      </Paper>
    </div >
  )
}