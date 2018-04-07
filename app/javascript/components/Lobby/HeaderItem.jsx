import React from 'react';

class HeaderItem extends React.Component {
  render() {
    return (
      <div className="game-row header">
        <div className="game-item id">Game Id</div>
        <div className="game-item host">Host Id</div>
        <div className="game-item created">Created At</div>
        <div className="game-item players">Players Joined</div>
        <div className="game-item join">Join</div>
      </div>
    );
  }
}

export default HeaderItem;
