import { css } from "@emotion/css";
import React from "react";

export default function Tag({ children, value }: { children?: React.ReactNode, value: string }) {
  let color = '#929DA3'
  switch (value) {
    case 'fighting':
      color = '#CE416B';
      break;
    case 'flying':
      color = '#8FA9DE';
      break;
    case 'poison':
      color = '#AA6BC8';
      break;
    case 'ground':
      color = '#D97846';
      break;
    case 'rock':
      color = '#C5B78C';
      break;
    case 'bug':
      color = '#91C12F';
      break;
    case 'ghost':
      color = '#5369AD';
      break;
    case 'steel':
      color = '#5A8EA2';
      break;
    case 'fire':
      color = '#FF9D55';
      break;
    case 'water':
      color = '#5090D6';
      break;
    case 'grass':
      color = '#64BC5A';
      break;
    case 'electric':
      color = '#F4D23C';
      break;
    case 'psychic':
      color = '#FA7279';
      break;
    case 'ice':
      color = '#73CEC0';
      break;
    case 'dragon':
      color = '#0B6DC3';
      break;
    case 'dark':
      color = '#5A5465';
      break;
    case 'fairy':
      color = '#EC90E6';
      break;
    default:
      color = '#929DA3';
      break;
  }

  return (
    <div className={css`
      background-color: ${color};
      padding: 3px;
      margin-right: 5px;
      border-radius: 5px;
      text-transform: capitalize;
    `}>
      {value}
    </div>
  );
}
