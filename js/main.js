let  token = null;
const loginPage = document.querySelector(".login");


async function login(username, password) {
    let params ={
        method:"POST",
        headers:{
            "Content-type":"application/json",


        },
        body: JSON.stringify({
            username: 'pierre',
            password: 'XqSn5rM35sQT',
        })
    }
    return await fetch('https://felix.esdlyon.dev/login', params)
        .then(response => response.json())
        .then(data =>{
               return data.token
            }
        )
}



async function displayLoginForm(){
    loginPage.style.display = "block";

    let username = document.querySelector(".username")
    let password = document.querySelector(".password")
    token = await login(username, password);
    if(token){
        loginPage.style.display = "none";
        poseUneQuestionaIa()
    }

}
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
            return data.message
        })
}

if(!token){
    displayLoginForm()
}else{
    poseUneQuestionaIa()
}
