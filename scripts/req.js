function requisicao(metodo, url, dados, callback, async) {
    this.metodo = metodo;
    this.url = url;
    this.dados = dados;
    this.callback = callback;
    this.async = async;
    this.sendReq = function() {
            
        HTTPRequest = new XMLHttpRequest();
        HTTPRequest.onreadystatechange = callback;

        if (dados != null) {
            url += dados;
        }

        HTTPRequest.open(metodo, url, async);
        
        if (metodo === 'POST'){
            HTTPRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            HTTPRequest.send(dados);
        } else {
            HTTPRequest.send(null);
        }
        
        if(HTTPRequest.readyState != HTTPRequest.DONE) {
            throw new Error('Ready state is not DONE: ' + HTTPRequest.readyState);
        }
        
        if(HTTPRequest.status != 200) {
            throw new Error('HTTP Status is not OK (200): ' + HTTPRequest.status);
        }
    };
};