window.addEventListener('load', function() {
	var carrinho = [];
	
	new requisicao('GET', 'http://127.0.0.1:5000/items', null,
	    function() {
			if (HTTPRequest.readyState === HTTPRequest.DONE) {
				if (HTTPRequest.status === 200) {
					produtos = JSON.parse(HTTPRequest.responseText);
				}
			}
		}, false).sendReq();

	lista = document.querySelector('#productList');
	cElement = document.querySelector('tbody');

	for (p = 0; p < produtos.length; p++) {
		lItem = document.createElement('li');
		
		eSpan = document.createElement('span');
		eSpan.innerHTML = produtos[p].name;
		
		lItem.appendChild(eSpan);
		
		tNode = document.createTextNode(' R$ ');
		lItem.appendChild(tNode);
		
		vSpan = document.createElement('span');
		vSpan.innerHTML = produtos[p].price;
		
		lItem.appendChild(vSpan);
		
		eLink = document.createElement('a');
		eLink.setAttribute('id', produtos[p]._id);
		eLink.setAttribute('href', '#');
		eLink.innerHTML = ' Comprar ';
				
		eLink.addEventListener('click', function () {

			new requisicao('GET', 'http://127.0.0.1:5000/items/', this.getAttribute('id'), function() {
				if (HTTPRequest.readyState === HTTPRequest.DONE) {
					if (HTTPRequest.status === 200) {
						produto = JSON.parse(HTTPRequest.responseText);
					}
				}
			}, false).sendReq();
			
			linha = document.createElement('tr');
			c1 = document.createElement('td');
			c1.innerHTML = this.getAttribute('id');
			c2 = document.createElement('td');
			c2.innerHTML = produto.name;
			c3 = document.createElement('td');
			c3.innerHTML= produto.quantity;
			c4 = document.createElement('td');
			c4.innerHTML = "R$" + produto.price;
			c5 = document.createElement('td');
			c5.innerHTML = "R$" + parseFloat(produto.price) * parseInt(produto.quantity);
			
			linha.appendChild(c1);
			linha.appendChild(c2);
			linha.appendChild(c3);
			linha.appendChild(c4);
			linha.appendChild(c5);
			
			cElement.appendChild(linha);
			
			/*new requisicao('GET', 'http://127.0.0.1/jsav1/compra.php?id=1', null, function() {}, false).sendReq();
			
			new requisicao('GET', 'http://127.0.0.1/jsav1/consultaTotal.php', null, 
				function() {
					if (HTTPRequest.readyState === HTTPRequest.DONE) {
						if (HTTPRequest.status === 200) {
							total = HTTPRequest.responseText;
							document.querySelector('span.label').innerHTML = total;
						}
					}
				}, false).sendReq();*/
		});
		
		lItem.appendChild(eLink);
		
		lista.appendChild(lItem);
	}
});