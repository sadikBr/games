import React, { Component } from "react";
import Card from "./Card";
import Score from "./Score";

class GameBoard extends Component {
  constructor() {
    super();

    this.state = {
      cards: this.generateCards(),
      score: 0,
      currentPair: [],
      matchedCardsIndices: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.currentPairInterpretation = this.currentPairInterpretation.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  resetGame() {
    this.setState({
      cards: this.generateCards(),
      score: 0,
      currentPair: [],
      matchedCardsIndices: [],
    });
  }

  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  generateCards() {
    let result = [];
    let cards = [
      "🦄",
      "😘",
      "💖",
      "💋",
      "✨",
      "🤷‍♀️",
      "🐦",
      "🐠",
      "🐝",
      "🎃",
      "⚽",
      "🍟",
      "🍺",
      "🍑",
      "🍁",
      "🚀",
      "🌹",
      "🐱‍👤",
    ];
    while (cards.length !== 0) {
      let index = Math.floor(Math.random() * cards.length);
      let card = this.shuffle(cards)[index];
      result.push(card, card);
      cards.splice(index, 1);
    }
    return this.shuffle(result);
  }

  getCardFeedback(index) {
    let indexMatched = this.state.matchedCardsIndices.includes(index);

    if (this.state.currentPair.length < 2) {
      return indexMatched || index === this.state.currentPair[0]
        ? "visible"
        : "hidden";
    }

    if (this.state.currentPair.includes(index)) {
      return indexMatched ? "matched" : "mismatched";
    }

    return indexMatched ? "visible" : "hidden";
  }

  currentPairInterpretation(index) {
    if (this.state.currentPair[0] === index) return;
    const newPair = [this.state.currentPair[0], index];
    const newScore = this.state.score + 1;
    const matched =
      this.state.cards[newPair[0]] === this.state.cards[newPair[1]];
    this.setState({ currentPair: newPair });

    if (matched) {
      this.setState((prevState) => {
        return {
          matchedCardsIndices: [...prevState.matchedCardsIndices, ...newPair],
          score: newScore,
        };
      });
    }
    setTimeout(() => this.setState({ currentPair: [] }), 750);
  }

  handleClick(index) {
    if (this.state.currentPair.length === 2) {
      return;
    }

    if (this.state.currentPair.length === 0) {
      return this.setState({ currentPair: [index] });
    }

    this.currentPairInterpretation(index);
  }

  render() {
    return (
      <div className="main">
        <Score score={this.state.score} />
        <div className="game-board">
          {this.state.cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              etat={this.getCardFeedback(index)}
              onClick={this.handleClick}
            />
          ))}
        </div>
        <button
          style={{
            display:
              this.state.cards.length === this.state.score * 2
                ? "block"
                : "none",
          }}
          className="reset"
          onClick={this.resetGame}
        >
          Resset Game
        </button>
      </div>
    );
  }
}

export default GameBoard;
