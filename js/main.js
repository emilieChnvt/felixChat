let  token = null;

async function login() {
    let params ={
        method:"POST",
        headers:{
            "Content-type":"application/json",
            "Authorization": `Bearer ${token}`,

        },
        body: JSON.stringify({
            username: 'pierre',
            password: 'XqSn5rM35sQT',
        })

    }



    return await fetch('https://felix.esdlyon.dev/login', params)
        .then(response => response.json())
        .then(data =>{
                console.log(data.token)
                token = data.token
                poseUneQuestionaIa()
            }



        )
}
login()
if(!token){
    displayLoginForm()
}else{
    poseUneQuestionaIa()
}

function displayLoginForm(){}
async function poseUneQuestionaIa(){
    let parameters ={
        method:"POST",
        headers:{
            'Content-type':"application/json",
            'Authorization':"Bearer " + token,
        },
        body: JSON.stringify({
            prompt: "bonjour, je m'appelle Emilie",
        } )
    }
    return await fetch('https://felix.esdlyon.dev/ollama', parameters)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
        })
}