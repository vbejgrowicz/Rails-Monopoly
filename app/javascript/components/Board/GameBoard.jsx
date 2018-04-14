import React from 'react';

class GameBoard extends React.Component {
  render() {
    return (
      <div className="board">
        <div className="row top">
          <div className="corner">Free Parking</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="corner">Go to Jail</div>
        </div>
        <div className="row left">
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
        </div>
        <div className="row middle" />
        <div className="row right">
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
        </div>
        <div className="row bottom">
          <div className="corner">Jail</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="corner">Go</div>
        </div>
      </div>
    );
  }
}

export default GameBoard;
