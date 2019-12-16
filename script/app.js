const coinlore = "https://api.coinlore.com/api/tickers/";
let c ,s, p,sup, parag_text;

function coinName(coin){
	parag_text = document.createTextNode(coin);
	return parag_text;
}

function codes(symbols){
	parag_text = document.createTextNode(symbols);
	return parag_text;	
}

function price_usd(prices){
	parag_text = document.createTextNode('\u0024 '+prices);
	return parag_text;
}
function totalSupply(supply){
	parag_text = document.createTextNode(supply);
	return parag_text;
}

function tRow(med, index ,cName, cCode, cPrice, cSupply) {
	let tBody =document.getElementById('coinTable').getElementsByTagName('tbody')[0];
	let row  = tBody.insertRow(0);
		let c_name = row.insertCell(0);
		c_name.className = "name";
		c_name.setAttribute("data-from", cName);
		c_name.appendChild(cName);

		let cde = row.insertCell(1);
		cde.className = "symb";
		cde.setAttribute("data-from", cCode);
		cde.appendChild(cCode);

		let prc = row.insertCell(2);
		prc.className = "prices";
		prc.setAttribute("data-from", cPrice);
		prc.appendChild(cPrice);

		let sup = row.insertCell(3);
		sup.className = "supply";
		sup.setAttribute("data-from", cSupply);
		sup.appendChild(cSupply);

	if(( index % 2) == 0) {
		c = document.querySelector('.name');
		c.classList.add("even");

		s = document.querySelector('.symb');
		s.classList.add("even");

		p = document.querySelector('.prices');
		p.classList.add("even");

		sup = document.querySelector('.supply');
		sup.classList.add("even");
	}
	else{
		c = document.querySelector('.name');
		c.classList.add("odd");

		s = document.querySelector('.symb');
		s.classList.add("odd");

		p = document.querySelector('.prices');
		p.classList.add("odd");

		sup = document.querySelector('.supply');
		sup.classList.add("odd");
	}
}


fetch(coinlore).then(resp => resp.json()).then((data) => {
	for(let i in data){
		let elements  = Object.values(data[i]);
		let names = elements.map(alls => alls.name);
		let symb = elements.map(alls => alls.symbol);
		let price = elements.map(alls => alls.price_usd);
		let supply = elements.map(alls => alls.tsupply);
		let j;
		let counter = 0;
		for(j = 9; counter <= j; j--){
			if(names[j] == undefined){
				names[j].pop();
			}
			else{	
					//Return the media screen size
					let media = window.matchMedia("(max-width:600px)");
				    tRow(media, j, coinName( names[j] ),
					codes(symb[j]),
					price_usd(price[j]),
					totalSupply( supply[j] + " "+ symb[j] ) );
				    previ = document.getElementById("prev");
					
					//When next clicked
					next = document.getElementById("next");
					next.onclick = function(e){
						let tBody =document.getElementById('coinTable').getElementsByTagName('tbody')[0];
					 	for(let i = tBody.rows.length - 1; i > -1; i--){
					 		 tBody.deleteRow(i); 
					 	}
					 	for(let a = 0; a <= 1; a++){
					 		counter = j;
					 		 j+=10;
					 		 previ.style.display="block";
					 		 if(j >= i){
					 		 	j = 0;
					 		 }
					 	}
					 	for(counter; counter < j; j--){
					 		tRow(media, j, coinName( names[j] ),
							codes(symb[j]),
							price_usd(price[j]),
							totalSupply( supply[j] + " "+ symb[j] ) );
					 	}
					}
					//When previous clicked
					prev.onclick = function(e){
						let tBody =document.getElementById('coinTable').getElementsByTagName('tbody')[0];
					 	for(let i = tBody.rows.length - 1; i > -1; i--){
					 		 tBody.deleteRow(i); 
					 	}
					 	for(let a =1 ; a >=1 ; a--){
					 		j = counter;
					 		counter -= 10;

					 		 if(j == 9){
					 		 	previ.style.display="none";
					 		 	counter = -1;
					 		 }
					 	}
					 	for(counter; counter < j; j--){
					 		tRow(media, j, coinName( names[j] ),
							codes(symb[j]),
							price_usd(price[j]),
							totalSupply( supply[j] + " "+ symb[j] ) );
					 	}
					}

			}
		}
	}
})

