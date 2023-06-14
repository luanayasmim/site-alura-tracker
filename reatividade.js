const projeto = {
    id: 1,
    descricao: 'AluraTracker 3'
}
const proxy = new Proxy(projeto, {
    get(objetoOriginal, chave, receptor) {
        console.log(`Chave do projeto: ${chave}`);
        return Reflect.get(objetoOriginal, chave, receptor);
    },
    set(objetoOriginal, chave, valor) {
        console.log(`A chave: ${chave} foi alterada para: ${valor}`);
        objetoOriginal[chave] = valor;
    }
})
proxy.descricao = 'Reatividade';
console.log(proxy.descricao);