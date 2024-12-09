let  token = null;
const loginPage = document.querySelector(".login");
const submitLogin = document.querySelector(".submitLogin");
const chat = document.querySelector(".chat");
const messagesDiv = document.querySelector(".messages");
let premierMessage ={
    author : 'Felix',
    content : 'Hello World!'
}
let deuxiemeMessage ={
    author : 'Felix',
    content : 'Hello World!'
}

let messagesArray=[premierMessage, deuxiemeMessage];


async function login(username, password) {
    let params ={
        method:"POST",
        headers:{
            "Content-type":"application/json",


        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }
    return await fetch('https://felix.esdlyon.dev/login', params)
        .then(response => response.json())
        .then(data =>{
               return data.token
            }
        )
}



function displayLoginForm(){
    loginPage.style.display = "block";

    submitLogin.addEventListener('click', async(e) => {
        e.preventDefault()
        let username = document.querySelector(".username")
        let password = document.querySelector(".password")
    token = await login(username.value, password.value);

        console.log(token);
        if(token){
            loginPage.style.display = "none";
            displayChat()
        }
    })

}

async function poseUneQuestionaIa(prompt){
    let parameters ={
        method:"POST",
        headers:{
            'Content-type':"application/json",
            'Authorization':"Bearer " + token,
        },
        body: JSON.stringify({
            prompt: prompt,
        } )
    }
    return await fetch('https://felix.esdlyon.dev/ollama', parameters)
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            return data.message
        })

}

function displayChat(){
    chat.style.display = "block";
    const prompt = document.querySelector(".prompt");
    const chatSubmit = document.querySelector(".chatSubmit");
    const messagesDiv = document.querySelector(".messages");
    chatSubmit.addEventListener("click", ()=>{
        console.log(messagesDiv)
addMessageToArray({
    author : "User",
    content:prompt.value
})


        });

        displayMessages()
    poseUneQuestionaIa(prompt.value).then((data) =>{
        console.log(data);
    })
}
function displayMessages (){
    messagesArray.forEach(message => {
        let paragraph = document.createElement("p");
        paragraph.classList.add("bulle");
        paragraph.textContent = message.content;

        messagesDiv.appendChild(paragraph);
    })
}
function addMessageToArray(message){
    messagesArray.push(message)
    console.log(messagesArray)
}
displayLoginForm();