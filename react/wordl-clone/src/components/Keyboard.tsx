import { BoardValue } from './Game';

interface KeyboardProps {
  keyboardKeys: BoardValue[][];
  handleButtonPress: (key: string) => void;
}

const Keyboard = ({ handleButtonPress, keyboardKeys }: KeyboardProps) => {
  return (
    <div className='keyboard'>
      {keyboardKeys.map((row, i) => {
        return (
          <div key={i} className='keyboard-row'>
            {row.map((keyboard_key) => {
              return (
                <button
                  onClick={() => handleButtonPress(keyboard_key.value)}
                  className={`keyboard-btn ${keyboard_key.state}`}
                  key={keyboard_key.value}
                >
                  {keyboard_key.value}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
