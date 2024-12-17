const possibleWins = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];
var playedNumbers = {
	play1: [],
	play2: [],
	turn1: true
};
var isPlaying=false;
var playValueArray=[];
togglePlayer = () => {
	if (playedNumbers.turn1) {
		playedNumbers.turn1 = false;
	} else {
		playedNumbers.turn1 = true;
	}
};
player1 = (val) => {
	let playArray = playedNumbers.play1;
	if (playArray.length < 2) {
		playArray.push(val);

		console.log(playArray);
	} else if ((playArray.length == 2 || playArray.length > 2)) {
		playArray.push(val);
		var isWinning1 = checkWinner(playArray);
		if (isWinning1) {
			isPlaying=false;
			return declareWinner(1);
		}
	}
	togglePlayer();
};
player2 = (val) => {
	let playArray = playedNumbers.play2;
	if (playArray.length < 2) {
		playArray.push(val);
	} else if ((playArray.length == 2 || playArray.length > 2)) {
		playArray.push(val);
		var isWinning2 = checkWinner(playArray);
		if (isWinning2) {
			isPlaying=false;
			return declareWinner(2);
		}
	}
	
	togglePlayer();
	
};
function checkWinner(val) {
	var values = [];
	for (i = 0; i < possibleWins.length; i++) {
		for (u = 0; u < val.length; u++) {
			values[u] = possibleWins[i].includes(val[u]);
		}
		arrayOftruths = values.filter(function (el) {
			return el === true;
		});
		if (arrayOftruths.length === 3) {
			return true;
		} else {
			
		}
	}
}
function declareWinner(val){
	document.querySelector('.winner').innerText=`GAMEOVER!! \n Player ${val} has won.`;
	
	
}
resetAll = (boxes) => {
	playedNumbers.play1=[];
	playedNumbers.play2=[];
	playedNumbers.turn1=true;
	playValueArray=[];
	document.querySelector('.winner').innerText='';
	boxes.forEach(box=>{
	box.style="background:radial-gradient(rgb(221, 216, 216), rgb(124, 116, 116))";
	})
	// return;
	
}
getNumbers = (e)=>{
		if(isPlaying){
			var eventTarget = e.srcElement;
		console.log(eventTarget);
			let getPlayerValue=parseInt(eventTarget.getAttribute("value"));
			let check= playValueArray.includes(getPlayerValue);
			if(check=== false){
				if(playedNumbers.turn1== true){
					eventTarget.style="background: url('images/X.png')no-repeat top center /cover;";
					player1(getPlayerValue);
				}else if (playedNumbers.turn1== false){
					eventTarget.style="background:url('images/O.png')no-repeat top center /cover;";
					player2(getPlayerValue);
				}
				playValueArray.push(getPlayerValue);
			}else if(check === true){
				alert('That box has been taken. Please take another empty box');
			}
		}
}
gameInit = () => {
	isPlaying=true;
	const boxes=document.querySelectorAll('.game');
	resetAll(boxes);
	console.log(boxes);
	document.querySelector('.winner').innerText='Game has started';
	boxes.forEach(box => {
		box.addEventListener('click',getNumbers);
	});
	
};
document.querySelector(".start").addEventListener("click", gameInit);