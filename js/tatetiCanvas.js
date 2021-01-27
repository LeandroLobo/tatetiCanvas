(function(){

let U = 1; // Para escalar todos los canvas si fuera necesario.
let turno = 0, game = 0, mode, mov, f1, f2, f3, c1, c2, c3, d1, d2;
let tablePosition = document.querySelectorAll('#table>canvas');
let selectMode = document.getElementById('mode');
let btnRestart = document.getElementById('restart');

function putToken(){
	if (this.className != 'X' && this.className != 'O' && this.className != 'empty9'){
		mov++;
		if(turno%2 == 1){
			/* Se quitan los listener para no seguir colocando tokens del mismo tipo antes que termine la funcion drawX */
			tablePosition.forEach(c=>{
				c.removeEventListener('click', putToken);
			});
			/* n guarda la posición del token para analisis de la IA */
			n = parseInt(this.className[5]) + 1;
			console.log(n);
			switch(n){
		        case 1: f1+=5; c1+=5; d1+=5; break
		        case 2: f1+=5; c2+=5; break
		        case 3: f1+=5; c3+=5; d2+=5; break
		        case 4: f2+=5; c1+=5; break
		        case 5: f2+=5; c2+=5; d1+=5; d2+=5; break
		        case 6: f2+=5; c3+=5; break
		        case 7: f3+=5; c1+=5; d2+=5; break
		        case 8: f3+=5; c2+=5; break
		        case 9: f3+=5; c3+=5; d1+=5; break
		        default: break
		    }
		    this.className = 'X';
			drawX(this);
		}else{
			/* Se quitan los listener para no seguir colocando tokens del mismo tipo antes que termine la funcion drawO */
			tablePosition.forEach(c=>{
				c.removeEventListener('click', putToken);
			});
			this.className = 'O';
			drawO(this);
		}
	}else{
		return;
	}
}

function drawX(canvas){
	let ctx = canvas.getContext('2d');
	if (canvas && ctx){
		let l = 0;
		let intervalo1 = setInterval(function(){
			ctx.lineWidth = 10*U;
			ctx.strokeStyle = 'lightyellow';
			ctx.beginPath();
			ctx.moveTo(20*U, 20*U);
			ctx.lineTo(20*U + l, 20*U + l);
			ctx.stroke();
			if(l > 60*U){
				clearInterval(intervalo1);
			}
			l += 2*U;
		}, 5);
		setTimeout(function(){
			l = 0;
			let intervalo2 = setInterval(function(){
				ctx.lineWidth = 10*U;
				ctx.strokeStyle = 'lightyellow';
				ctx.beginPath();
				ctx.moveTo(80*U, 20*U);
				ctx.lineTo(80*U - l, 20*U + l);
				ctx.stroke();
				if(l > 60*U){
					clearInterval(intervalo2);
					checkGame();
				}
				l += 2*U;
			}, 5);
		}, 220);
	}
}

function drawO(canvas){
	let ctx = canvas.getContext('2d');
	if (canvas && ctx){
		let r = 32*U;
		let a = 0;
		let intervalo = setInterval(function(){
			ctx.beginPath();
			ctx.lineWidth = 10*U;
			ctx.strokeStyle = 'indigo';
			ctx.arc(ctx.canvas.width/2, ctx.canvas.height/2, r, 0, a);
			ctx.stroke();
			if(a > 2*Math.PI){
				clearInterval(intervalo);
				checkGame();
			}
			a += 0.12;
		}, 10);
	}
}

function checkGame(){
	let canvas = document.getElementById('finalDraw');
	let ctx = canvas.getContext('2d');
	if (canvas && ctx){
		let l = 0;
		/* Se analizan las coinciencias en las 2 diagonales, las 3 filas y las 3 columnas del tablero */
		/* DIAGONAL 1 */
		if(tablePosition[0].className == tablePosition[4].className && tablePosition[4].className == tablePosition[8].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(5*U, 5*U);
				ctx.lineTo(5*U + l, 5*U + l);
				ctx.stroke();
				if(l >= 290*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* DIAGONAL 2 */
		if(tablePosition[2].className == tablePosition[4].className && tablePosition[4].className == tablePosition[6].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(295*U, 5*U);
				ctx.lineTo(295*U - l, 5*U + l);
				ctx.stroke();
				if(l >= 290*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* FILA 1 */
		if(tablePosition[0].className == tablePosition[1].className && tablePosition[1].className == tablePosition[2].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(0, 50*U);
				ctx.lineTo(l, 50*U);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* FILA 2 */
		if(tablePosition[3].className == tablePosition[4].className && tablePosition[4].className == tablePosition[5].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(0, ctx.canvas.height/2);
				ctx.lineTo(l, ctx.canvas.height/2);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* FILA 3 */
		if(tablePosition[6].className == tablePosition[7].className && tablePosition[7].className == tablePosition[8].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(0, 250*U);
				ctx.lineTo(l, 250*U);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* COLUMNA 1 */
		if(tablePosition[0].className == tablePosition[3].className && tablePosition[3].className == tablePosition[6].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(50*U, 0);
				ctx.lineTo(50*U, l);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* COLUMNA 2 */
		if(tablePosition[1].className == tablePosition[4].className && tablePosition[4].className == tablePosition[7].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(ctx.canvas.width/2, 0);
				ctx.lineTo(ctx.canvas.width/2, l);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
		/* COLUMNA 3 */
		if(tablePosition[2].className == tablePosition[5].className && tablePosition[5].className == tablePosition[8].className){
			canvas.style.display = 'block';
			let intervalo = setInterval(function(){
				ctx.lineWidth = 14*U;
				ctx.strokeStyle = 'firebrick';
				ctx.beginPath();
				ctx.moveTo(250*U, 0);
				ctx.lineTo(250*U, l);
				ctx.stroke();
				if(l >= 300*U){
					clearInterval(intervalo);
					winnerIs();
				}
				l += 10*U;
			}, 8); return;
		}
	}
	/* Si se jugaron 9 turnos, fin de partida con empate */
	if(mov == 9){
		document.getElementById('winner').innerHTML = '¡ Empate !';
		document.getElementById('info').innerHTML = 'Fin de partida';
		btnRestart.style.visibility = 'visible';
		return;
	}
	/* Analisis del turno */
	turno++;
	if(turno%2 == 1){
		document.getElementById('info').innerHTML = 'Turno de las X';
	}else{
		document.getElementById('info').innerHTML = 'Turno de las O';
		/* si está en modo vs IA, las O se deciden en la funcion playsIA de acuerdo a los valores de los flags*/
		if(mode == 0 || mode == 1){
			playsIA(IA());
			return;
		}
	}
	/* Se reestablecen los listener para seguir jugando */
	tablePosition.forEach(c=>{
		c.addEventListener('click', putToken);
	});
}

function initTable(){
	let finalDraw = document.getElementById('finalDraw');
	finalDraw.style.display = 'none';
	btnRestart.style.visibility = 'hidden';
	document.getElementById('winner').innerHTML = '';
	mode = document.formMode.mode.value;
	console.log(mode);
	mov = f1 = f2 = f3 = c1 = c2 = c3 = d1 = d2 = 0;
	game++;
	turno = game%2;
	if(turno%2 == 1){
		document.getElementById('info').innerHTML = 'Turno de las X';
	}else{
		document.getElementById('info').innerHTML = 'Turno de las O';
	}
	tablePosition.forEach((c,i)=>{
		c.addEventListener('click', putToken);
		c.className = 'empty'+ i;
		let context = c.getContext('2d');
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	});
	/* juega la IA automaticamente si es su turno */
	if((mode == 0 || mode == 1) && turno%2 == 0){
		playsIA(IA());
	}
}

function winnerIs(){
	/* Se determina el ganador según el turno del último token colocado */
	if(turno%2 == 1){
		winner = 'X';
	}else{
		winner = 'O';
	}
	document.getElementById('winner').innerHTML = '¡ Ganaron las '+ winner +' !';
	document.getElementById('info').innerHTML = 'Fin de partida';
	btnRestart.style.visibility = 'visible';
}

// Reglas de la IA

// mode = 0: normal
// mode = 1: imposible

// Modo defensa
// Primero que nada no perder, chequeando que no haya 2 X en la misma fila, columna o diagonal
// Si es el caso, completar la fila con una O
// Si el centro está libre, n=5; si no, alguna esquina
// Si tengo dos O, completar con la tercera
// Hay 4(*4 por la simetría) casos especiales que son para evitar que player1 tenga la posibilidad de formar la doble chance
// Esos casos se dan siempre en el movimiento 4

// Modo ataque
// primera jugada al centro, segunda en la esquina de una diagonal que no sea opuesta a una X(si player1 puso una esquina)
// Intentar completar, si hay bloqueo, poner otra esquina
// La regla de chequear que no me ganen sigue siendo primordial
function IA(){
	mov++;
    //////////// Liquidar /////////////
    if(f1==2){
        if(tablePosition[0].className != 'O'){return 1}
        if(tablePosition[1].className != 'O'){return 2}
        if(tablePosition[2].className != 'O'){return 3}
    }
    if(f2==2){
        if(tablePosition[3].className != 'O'){return 4}
        if(tablePosition[4].className != 'O'){return 5}
        if(tablePosition[5].className != 'O'){return 6}
    }
    if(f3==2){
        if(tablePosition[6].className != 'O'){return 7}
        if(tablePosition[7].className != 'O'){return 8}
        if(tablePosition[8].className != 'O'){return 9}
    }
    if(c1==2){
        if(tablePosition[0].className != 'O'){return 1}
        if(tablePosition[3].className != 'O'){return 4}
        if(tablePosition[6].className != 'O'){return 7}
    }
    if(c2==2){
        if(tablePosition[1].className != 'O'){return 2}
        if(tablePosition[4].className != 'O'){return 5}
        if(tablePosition[7].className != 'O'){return 8}
    }
    if(c3==2){
        if(tablePosition[2].className != 'O'){return 3}
        if(tablePosition[5].className != 'O'){return 6}
        if(tablePosition[8].className != 'O'){return 9}
    }
    if(d1==2){
        if(tablePosition[0].className != 'O'){return 1}
        if(tablePosition[4].className != 'O'){return 5}
        if(tablePosition[8].className != 'O'){return 9}
    }
    if(d2==2){
        if(tablePosition[2].className != 'O'){return 3}
        if(tablePosition[4].className != 'O'){return 5}
        if(tablePosition[6].className != 'O'){return 7}
    }
    //////////// Bloquear ////////////
    if(f1==10){
        if(tablePosition[0].className != 'X'){return 1}
        if(tablePosition[1].className != 'X'){return 2}
        if(tablePosition[2].className != 'X'){return 3}
    }
    if(f2==10){
        if(tablePosition[3].className != 'X'){return 4}
        if(tablePosition[4].className != 'X'){return 5}
        if(tablePosition[5].className != 'X'){return 6}
    }
    if(f3==10){
        if(tablePosition[6].className != 'X'){return 7}
        if(tablePosition[7].className != 'X'){return 8}
        if(tablePosition[8].className != 'X'){return 9}
    }
    if(c1==10){
        if(tablePosition[0].className != 'X'){return 1}
        if(tablePosition[3].className != 'X'){return 4}
        if(tablePosition[6].className != 'X'){return 7}
    }
    if(c2==10){
        if(tablePosition[1].className != 'X'){return 2}
        if(tablePosition[4].className != 'X'){return 5}
        if(tablePosition[7].className != 'X'){return 8}
    }
    if(c3==10){
        if(tablePosition[2].className != 'X'){return 3}
        if(tablePosition[5].className != 'X'){return 6}
        if(tablePosition[8].className != 'X'){return 9}
    }
    if(d1==10){
        if(tablePosition[0].className != 'X'){return 1}
        if(tablePosition[4].className != 'X'){return 5}
        if(tablePosition[8].className != 'X'){return 9}
    }
    if(d2==10){
        if(tablePosition[2].className != 'X'){return 3}
        if(tablePosition[4].className != 'X'){return 5}
        if(tablePosition[6].className != 'X'){return 7}
    }
    //////////// Casos especiales MODO IMPOSIBLE /////////////
    if(mov==4 && mode == 1){
        if(tablePosition[1].className == 'X' && tablePosition[3].className == 'X'){return 1}
        if(d1==11 && f2==1){return 4}
        if(d2==11 && f2==1){return 2}
        if(d1==6 && c2==6){return 7}
        if(d2==6 && c2==6){return 9}
        if(d2==6 && f2==6){return 9}
        if(f2==6 && c2==6){return 9}
    }
    /////////// Asegurando la partida; 5 prioridad, luego esquinas luego laterales /////////////
    if(tablePosition[4].className != 'X' && tablePosition[4].className != 'O'){return 5}
    else if(tablePosition[0].className != 'X' && tablePosition[0].className != 'O'){return 1}
    else if(tablePosition[2].className != 'X' && tablePosition[2].className != 'O'){return 3}
    else if(tablePosition[6].className != 'X' && tablePosition[6].className != 'O'){return 7}
    else if(tablePosition[8].className != 'X' && tablePosition[8].className != 'O'){return 9}
    else if(tablePosition[1].className != 'X' && tablePosition[1].className != 'O'){return 2}
    else if(tablePosition[3].className != 'X' && tablePosition[3].className != 'O'){return 4}
    else if(tablePosition[5].className != 'X' && tablePosition[5].className != 'O'){return 6}
    else if(tablePosition[7].className != 'X' && tablePosition[7].className != 'O'){return 8}
}

function playsIA(n){
	tablePosition[n-1].className = 'O';
    switch(n){
        case 1: f1+=1; c1+=1; d1+=1; break
        case 2: f1+=1; c2+=1; break
        case 3: f1+=1; c3+=1; d2+=1; break
        case 4: f2+=1; c1+=1; break
        case 5: f2+=1; c2+=1; d1+=1; d2+=1; break
        case 6: f2+=1; c3+=1; break
        case 7: f3+=1; c1+=1; d2+=1; break
        case 8: f3+=1; c2+=1; break
        case 9: f3+=1; c3+=1; d1+=1; break
        default: break
    }
    drawO(tablePosition[n-1]);
}

/* Inicializar funciones y agregar Listeners luego de la carga de window */
window.addEventListener('load', function(){
	selectMode.addEventListener('change', initTable);
	btnRestart.addEventListener('click', initTable);
	initTable();
});

}());