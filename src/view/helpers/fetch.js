async function get(url,opts){
    let api = false;
    await fetch(url,{
        ...opts,
        method: "GET"
    })
    .then(data => data.json())
    .then(d => { api = d; })
    .catch(err => console.log(err));
    return api;
}

async function post(url,opts){
    let api = false;
    await fetch(url,{
        ...opts,
        method: "POST"
    })
    .then(data => data.json())
    .then(d => { api = d; })
    .catch(err => console.log(err));
    return api;
}

export { get,post }