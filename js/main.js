let  token = null;
const loginPage = document.querySelector(".login");

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
               return data.token


            }
        )
}
login().then((data) => {
    token = data
    console.log(token)
})
if(!token){
    displayLoginForm()
}else{
    poseUneQuestionaIa()
}

function displayLoginForm(){
    loginPage.style.display = "block";

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