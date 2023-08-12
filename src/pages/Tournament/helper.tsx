import { ITrainer } from "./TournamentContext";

export const shuffleArray = (array: ITrainer[]) => {

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }



  for (let index = 0; index < array.length; index = index + 2) {
    array[index].winner = Math.floor(Math.random() * 100) % 2 === 1;
    if (array[index].winner) {
      array[index + 1].winner = false;
    } else {
      array[index + 1].winner = true;
    }
  }
  return array;
};

export const concatArray = (selectedTrainer: ITrainer, dataList: ITrainer[]) => {
  var updatedTrainer = [selectedTrainer]
  var concatArr = dataList.concat(updatedTrainer)
  var updatedList = concatArr.filter((item, pos) => concatArr.indexOf(item) === pos)

  return updatedList
}