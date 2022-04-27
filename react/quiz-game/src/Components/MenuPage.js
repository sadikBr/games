import React from 'react';
import { Categories, Difficulties } from '../Config';

function MenuPage(props) {
  return (
    <div className='menu-page'>
      <h1 className='title'>
        Welcome To this quiz game, Choose your settings and start the game.
      </h1>
      <div className='settings'>
        <h1>
          Number Of Questions:
          <input
            onChange={(event) => props.handleChange(event.target)}
            value={props.nbrOfQuestions}
            name='nbrOfQuestions'
            type='number'
            max='50'
          />
        </h1>
        <h1>
          Select Category:
          <select
            onChange={(event) => props.handleChange(event.target)}
            value={props.category}
            name='categories'
          >
            {Categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </h1>
        <h1>
          Select Difficulty:
          <select
            onChange={(event) => props.handleChange(event.target)}
            value={props.difficulty}
            name='difficulties'
          >
            {Difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </h1>
      </div>
      <button
        onClick={() => props.fetchDataAndStart(props.url)}
        className='start-game'
      >
        Start Game{' '}
      </button>
      <span
        className='loading'
        style={{ display: props.loading ? 'inline' : 'none' }}
      >
        Loading ...
      </span>
    </div>
  );
}

export default MenuPage;
