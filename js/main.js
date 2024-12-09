let  token = null;




async function login(username, password) {
    console.log(username, password);
    let params ={
        method:"POST",
        headers:{
            'Content-type':"application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        } )
    }

    return await fetch('https://felix.esdlyon.dev/login', params)
        .then(response => response.json())
        .then(data =>{
                return data.token
            }

        )

}

function displayLoginPage() {

}

if(!token){
    displayLoginPage()
}else{
    displayLoginPage()
}
 async function displayChatInterface(){
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
            console.log(data);
            return data.message
        })

 }


 function displayLoginPage(){

 }