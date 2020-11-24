import React from 'react';

//beginning of formatting
const styleSquare = {
	background: 'white',
	fontSize: '30px',
	height: '80px',
	width: '80px',
	cursor: 'pointer',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};
const styleContainer = {
	margin: 'auto',
	width: '250px',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
};
const styleBoard = {
	background: 'black',
	borderRadius: '10px',
	width: '260px',
	height: '260px',
	margin: '10px auto',
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-around',
};

const styleButton = {
	background: 'black',
	border: 'none',
	color: 'white',
	cursor: 'pointer',
	padding: '10px',
};
//done with formatting

//component square
//reactjs.org/docs/components-and-props.html
const Square = ({ value, click }) => (
    <div style={styleSquare} onClick={click}>
		    {/* onClick - everything when clicking  */}
		    <span>{value}</span>
		    {/* shows value */}
			{/*<div> is a block-level element and <span> is an inline element.</span>*/}		
	</div>
	
);
// conmponent TicTacToe
function TicTacToe() {
	//checks who wins
	const whoWon = (squares) => {
		const lines = [
			//combinations that win the game
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			// goes through all and
			//checks if there are only O or X
			const [a, b, c] = lines[i];
			if (squares[a] && // checks if not empty - is there O or X
				squares[a] === squares[b] &&
				squares[a] === squares[c]) {
				return squares[a]; //return winner sign
			}
		}
		if (moves === 9)
			return 'Tie'; //if nobody won- check if tie - uavgjort
		return null; // neither won nor tie
	};

	//using hooks- so I dont need to use classes
	//https://reactjs.org/docs/hooks-state.html
	// using hook useState, because its changes make components to upload again

	// state that keeps a table with starting values- nulls
	const [board, setBoard] = React.useState(Array(9).fill(null)); 

	// state that keeps info about next (X or O, value true-x, false-O)
	const [xNext, setXNext] = React.useState(true); 

	//counts how many movements in this game
	const [moves, setMoves] = React.useState(0); 

	//keeps info about winner
	const winner = whoWon(board); 

	//manages turns
	const handleTurn = (i) => {
		//i - index of the grid in the board
		const copy = [...board]; // copies board to variable copy
		if (winner || copy[i])
			return; // checks if this the winner and if copy[i] is not empty
			//if won - stop it - return
		copy[i] = xNext ? 'X' : 'O'; //next movement
		setBoard(copy); //initialisation of the board
		setMoves(moves + 1); // count + number of movements
		setXNext(!xNext); //changes from X to O or O to X 
	};

	return (
		<div>
			<div style={styleBoard}>
				
				{board.map((square, i) => (
					<Square
						key={i}
						value={square}
						click={() => handleTurn(i)} />
				))}
			</div>
			<div style={styleContainer}>

				<p>
					{winner
						? winner !== 'Tie'
							? 'Winner: ' + winner
							: winner
						: 'Next Player: ' + (xNext ? 'X' : 'O')}
						{/*if X won, so O next and vice versa>*/}
				</p>

				{winner && (
					<button
						style={styleButton}
						onClick={() => {
							setMoves(0);
							setBoard(Array(9).fill(null));
						} }>
												New Game
					</button>
				)}
			</div>
		</div>
	);
}

export default TicTacToe;
