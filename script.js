//your JS code here. If required.
//your JS code here. If required.

let docbody = document.body;

docbody.style.backgroundColor = "pink";



let textmessage = document.getElementsByClassName("message")[0];

let gameboard = document.getElementsByClassName("board")[0];

let btn = document.getElementById("submit");



btn.addEventListener("click", function () {

	let player1 = document.getElementById("player-1").value;



	textmessage.innerHTML = `<h2>TIC TAC TOE</h2>

	                        <p>${player1}, you're up</p>`;



	// Clear previous cells if any

	gameboard.innerHTML = "";



	// Grid styles

	gameboard.style.display = "grid";

	gameboard.style.gridTemplateColumns = "repeat(3, 60px)";

	gameboard.style.gridTemplateRows = "repeat(3, 60px)";

	gameboard.style.gap = "5px";

	gameboard.style.justifyContent = "center";

	gameboard.style.margin = "auto";

	gameboard.style.marginTop = "20px";



	// Create 9 cells

	for (let i = 0; i < 9; i++) {

		let cell = document.createElement("div");

		cell.style.width = "60px";

		cell.style.height = "60px";

		cell.style.border = "2px solid black";

		cell.style.display = "flex";

		cell.style.alignItems = "center";

		cell.style.justifyContent = "center";

		cell.style.fontSize = "24px";

		cell.style.cursor = "pointer";

		gameboard.appendChild(cell);

	}

});

