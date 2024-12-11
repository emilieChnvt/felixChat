let  token = null;
const loginPage = document.querySelector(".login");
const submitLogin = document.querySelector(".submitLogin");
const chat = document.querySelector(".chat");
const messagesDiv = document.querySelector(".messages");
const plusBtn = document.querySelector(".plusBtn");
const hideDiv = document.querySelector(".hideDiv");

let premierMessage ={
    author : 'Felix',
    content : 'Hello World!'
}
let deuxiemeMessage ={
    author : 'Felix',
    content : ' World!'
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
    loginPage.style.display = "flex";

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

    displayMessages()
    handlePrompt()

}

function handlePrompt(){
    const prompt = document.querySelector(".prompt");
    const chatSubmit = document.querySelector(".chatSubmit");
    chatSubmit.addEventListener("click", ()=> {
        console.log(messagesDiv)
        addMessageToArray({
            author: "User",
            content: prompt.value
        })
        displayMessages();
        showTypingPhrase()
        poseUneQuestionaIa(prompt.value).then((data) =>{
            console.log(data)
            addMessageToArray({
                author: "Felix",
                content: data
            });
            displayChat()
        })
    })
    }
function displayMessages (){
    messagesDiv.innerHTML = '';
    messagesArray.forEach(message => {
        const divForEachMessage = document.createElement("div");
        const paragraph = document.createElement("p");
        paragraph.classList.add("bulle");
        paragraph.textContent = message.content;
        const nameMessage = document.createElement("p");
        const imageProfil = document.createElement("img");
        imageProfil.classList.add("imageProfil");


        if(message.author === "Felix"){
            console.log(message.author)
            paragraph.classList.add("felix");
            nameMessage.style.textAlign = "left";
            imageProfil.src = 'images/jeanpaul_fondvertbasePNG.png'

        }else{
            paragraph.classList.add("user");
            nameMessage.style.textAlign = "right";
            imageProfil.style.textAlign = "right";
            imageProfil.src = 'images/_une_mannequin_dfile_dans_une_robe_conue_en_myclium_luminescent_scintillant_doucement_dans_une_lumi_4m80s2r4ik6drw2z7csp_2.png'


        }
        nameMessage.textContent = message.author ;

        nameMessage.prepend(imageProfil);// pour placer l'image à gauche du texte
        divForEachMessage.appendChild(nameMessage);
        divForEachMessage.appendChild(paragraph);

        messagesDiv.appendChild(divForEachMessage);
    })
}
function addMessageToArray(message){
    messagesArray.push(message)
    console.log(messagesArray)
}
displayLoginForm();

function showTypingPhrase(){
    const indicatorPhrase = document.createElement("p");
    indicatorPhrase.innerText = "Félix est en train d'écrire...";
    messagesDiv.appendChild(indicatorPhrase);
}