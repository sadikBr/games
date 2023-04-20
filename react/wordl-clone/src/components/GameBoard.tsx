import { BoardValue } from './Game';

interface GameBoardProps {
  gameBoard: (BoardValue | null)[][];
}

const GameBoard = ({ gameBoard }: GameBoardProps) => {
  return (
    <div className='board'>
      {gameBoard.map((row, i) => {
        return row.map((char, j) => {
          return (
            <div key={`${i}${j}`} className={`board-cell ${char?.state}`}>
              {char != null ? char.value : ''}
            </div>
          );
        });
      })}
    </div>
  );
};

export default GameBoard;
