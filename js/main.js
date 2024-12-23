
let  token = null;
const loginPage = document.querySelector(".login");
const allConv = document.querySelector(".allConv");
const submitLogin = document.querySelector(".submitLogin");
const chat = document.querySelector(".chat");
const conversation = document.querySelector(".conversation");
const messagesDiv = document.querySelector(".messages");
const loading = document.querySelector(".loading");
let premierMessage ={
    author : 'Felix',
    content : "Hello ! je m'appelle Félix, que puis-je faire pour vous?"
}


let messagesArray=[premierMessage];

conversation.addEventListener('click', ()=>{
    displayChat();
    allConv.style.display = "none";
})
function saveMessages(){
    localStorage.setItem("messages", JSON.stringify(messagesArray)); //stocke tous les messages
}
function loadMessages(){
    const storedMessages = localStorage.getItem("messages"); //récupères les messages
    if(storedMessages){
        messagesArray=JSON.parse(storedMessages);

    }
}

function addEmoji(message){

    const smileyToEmoji = {
        ":-)": "😊",
        ":)": "😊",
        ":-D": "😄",
        ":D": "😄",
        ":-(": "☹️",
        ":(": "☹️",
        ";-)": "😉",
        ";)": "😉"
    };

// Expression régulière pour détecter les smileys textuels
    const smileyRegex = /(:-\)|:\)|:-D|:D|:-\(|:\(|;-\)|;\))/g;

// Fonction de remplacement
    message.content = message.content.replace(smileyRegex, match => smileyToEmoji[match]);

    console.log(message.content);


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
            allConv.style.display = "flex";
        }
    })

}
function displayChat(){
    chat.style.display = "flex";

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

        prompt.value = ""; // vider input


        poseUneQuestionaIa(prompt.value).then((data) =>{
            console.log(data)
            const felixMessage ={
                author: "Felix",
                content: data
            };
            addMessageToArray(felixMessage)
            displayMessages();
        })
    })
    }
function displayMessages (){
    messagesDiv.innerHTML = '';
    messagesArray.forEach(message => {
        const messageElement = createMessageElement(message);
        messagesDiv.appendChild(messageElement);

        //réactons émojis
        if(message.author === "Felix") {
            const emojiDiv = createReactionButtons(message);
            messagesDiv.appendChild(emojiDiv);
        }
    })
}
function createAuthorElement(message){
    const nameMessage = document.createElement("p");
    const imageProfil = document.createElement("img");
    imageProfil.classList.add("imageProfil");


    if(message.author === "Felix"){
        nameMessage.style.textAlign = "left";
        imageProfil.src = 'images/jeanpaul_fondvertbasePNG.png'

    }else{

        nameMessage.style.textAlign = "right";
        imageProfil.style.textAlign = "right";
        imageProfil.src = 'images/myImage.png'

    }
    nameMessage.textContent = message.author ;
    nameMessage.prepend(imageProfil);
    return nameMessage;
}
function createMessageElement(message){
    const divForEachMessage = document.createElement("div");
    const paragraph = document.createElement("p");

    paragraph.classList.add("bulle");
    paragraph.textContent = message.content;

    const nameMessage = createAuthorElement(message);
    paragraph.classList.add(message.author === "Felix" ? "felix" : "user");

    const trashMessage = deleteElement(divForEachMessage, message)

    divForEachMessage.appendChild(nameMessage);
    divForEachMessage.appendChild(paragraph);
    divForEachMessage.appendChild(trashMessage);

    return divForEachMessage;


}
function deleteElement(divForEachMessage, message){
    const trash = document.createElement("p");
    trash.innerHTML = '🗑️'
    trash.style.cursor = "pointer";

    if(message.author !== "Felix"){
        trash.style.textAlign = "right";
    }

    trash.addEventListener("click", ()=>{
        const index = messagesArray.indexOf(message);
        if(index !== -1){
            messagesArray.splice(index, 1);
        }
        divForEachMessage.remove();
        saveMessages()
        displayMessages();
    })

    return trash;
}
function createReactionElement(reaction){
    const reactionSpan = document.createElement("span");
    reactionSpan.classList.add("reaction");
    reactionSpan.textContent = reaction;

    reactionSpan.addEventListener("click", () => {reactionSpan.remove()})
    return reactionSpan;

}
function createReactionButtons(message){
    const emojiDiv = document.createElement("div");
    emojiDiv.classList.add("reactions");

    if(message.reactions && message.reactions.length > 0 ){
        message.reactions.forEach(reaction => {
            const reactionSpan = createReactionElement(reaction);
            emojiDiv.appendChild(reactionSpan);
        })
    }
    const pouce = createEmojiButton("👍", message)
    const heart = createEmojiButton("❤", message)

    emojiDiv.appendChild(heart);
    emojiDiv.appendChild(pouce);

    return emojiDiv;
}
function createEmojiButton(emoji, message){
    const span = document.createElement("span");
    span.textContent = emoji;
    span.classList.add("emoji");
    span.addEventListener("click", ()=>{addReaction(message, emoji)})
    return span;
}
function addReaction(message, reaction){
    if(!message.reactions){
        message.reactions = [];
    }
    message.reactions=[reaction];
    displayMessages();
}
function addMessageToArray(message){
    addEmoji(message);
    messagesArray.push(message);
    saveMessages()
    console.log(messagesArray)
}


function showTypingPhrase(){

    loading.classList.add("loading");
    loading.style.display = "flex";

    const dots=document.querySelectorAll(".dot");
    dots.forEach((dot)=>{
        dot.classList.add("dot");
    })
}
function hideLoading(){
    loading.style.display = "none";
}
loadMessages();
displayLoginForm();


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
    showTypingPhrase()
    return await fetch('https://felix.esdlyon.dev/ollama', parameters)

        .then(response => response.json())
        .then(data =>{
            hideLoading()
            console.log(data)
            return data.message
        })

}