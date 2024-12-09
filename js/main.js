let  token = null;

let params ={
    method:"POST",
    headers:{
        'content-type':"application/json",
        "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
        username: 'pierre',
        password: 'XqSn5rM35sQT',
    })
}



fetch('https://felix.esdlyon.dev/login', params)
    .then(response => response.json())
    .then(data =>{
        console.log(data.token)
        token = data.token
    }


)