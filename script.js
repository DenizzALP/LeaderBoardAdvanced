const nameInput = document.getElementById('name-input')
const lastNameInput = document.getElementById('last-name-input')
const countryInput = document.getElementById('Country-input')
const playerScoreInput = document.getElementById('player-score-input')
const addBtn = document.getElementById('add-btn')

const attentionContainer = document.querySelector('.attention-container')

const outputContainer = document.querySelector('.output-container')

let players = []

addBtn.addEventListener('click', () =>{
    console.log(nameInput.value,lastNameInput.value,countryInput.value,playerScoreInput.value)

    if(nameInput.value ==='' || lastNameInput.value ==='' || countryInput.value ===''|| playerScoreInput.value ==='' ){
        attentionContainer.style.display = 'block'
    }else{
        attentionContainer.style.display = 'none'
        setTimeout(() => {
            nameInput.value = ""
            lastNameInput.value = ""
            countryInput.value = ""
            playerScoreInput.value = ""
        }, 10);

        const name = nameInput.value.trim().toUpperCase()
        const lastName = lastNameInput.value.trim().toUpperCase()
        const country = countryInput.value.trim().toUpperCase()
        const playerScore = parseInt(playerScoreInput.value)
        
        players.push({name, lastName, country, playerScore})

        // players.sort((a,b) => b.playerScore - a.playerScore)
        sort()

        console.log(players)

        updateLeaderboard(); 

    }
})

function updateLeaderboard() {
    outputContainer.innerHTML = "" 

    players.forEach((player, index) =>{
        const outputRow = document.createElement ("div")
        outputRow.className = 'output-row'

            const outputRowNameDateContainer = document.createElement ('div')
            outputRowNameDateContainer.classList = 'output-row-name-date-container'

                const outputRowNameContainer = document.createElement ('div')
                outputRowNameContainer.classList = 'output-row-name-container'
                const outputRowDateContainer = document.createElement ('div')
                outputRowDateContainer.classList = 'output-row-date-container'
            
            const outputRowOthersContainer = document.createElement ('div')
            outputRowOthersContainer.classList = 'output-row-others-container'   
            
                const outputRowOthersCountryContainer = document.createElement ('div')
                outputRowOthersCountryContainer.classList = 'output-row-others-country-container'
                const outputRowOthersGradeContainer = document.createElement ('div')
                outputRowOthersGradeContainer.classList = 'output-row-others-grade-container'
                const outputRowOthersButtonsContainer = document.createElement ('div')
                outputRowOthersButtonsContainer.classList = 'output-row-others-buttons-container'

                    const deleteBtn = document.createElement('button');
                    deleteBtn.id = 'delete-btn';
                    deleteBtn.innerHTML = '<i class="fa fa-trash-o"></i>';

                    const plus5Btn = document.createElement('button');
                    plus5Btn.id = 'plus-5-btn';
                    plus5Btn.textContent = '+5';

                    const minus5Btn = document.createElement('button');
                    minus5Btn.id = 'minus-5-btn';
                    minus5Btn.textContent = '-5';
    
        outputContainer.appendChild(outputRow)
        outputRow.appendChild(outputRowNameDateContainer)
        outputRowNameDateContainer.appendChild(outputRowNameContainer)
        outputRowNameDateContainer.appendChild(outputRowDateContainer)
        outputRow.appendChild(outputRowOthersContainer)
        outputRowOthersContainer.appendChild(outputRowOthersCountryContainer)
        outputRowOthersContainer.appendChild(outputRowOthersGradeContainer)
        outputRowOthersContainer.appendChild(outputRowOthersButtonsContainer)
        outputRowOthersButtonsContainer.appendChild(deleteBtn)
        outputRowOthersButtonsContainer.appendChild(plus5Btn)
        outputRowOthersButtonsContainer.appendChild(minus5Btn)

        deleteBtn.addEventListener('click', () => deletePlayer(index))
        plus5Btn.addEventListener('click', () => increaseScore(index, 5))
        minus5Btn.addEventListener('click', () => decreaseScore(index, 5));

        let fullName = players[index].name + " " +players[index].lastName
        console.log(fullName)
        outputRowNameContainer.innerHTML = `<p>${fullName}</p>`
        
        outputRowDateContainer.innerHTML = `<p>${formatDate()}</p>`

        outputRowOthersCountryContainer.innerHTML = `<p>${players[index].country}</p>`
        outputRowOthersGradeContainer.innerHTML = `<p>${players[index].playerScore}</p>`
    })




}

function deletePlayer(index) {
    players.splice(index, 1); 
    updateLeaderboard(); 
}
function increaseScore(index, amount) {
    players[index].playerScore += amount; 
    sort()
    updateLeaderboard(); 
}

function decreaseScore(index, amount) {
    players[index].playerScore -= amount; 
    sort()
    updateLeaderboard(); 
}
function formatDate() {
    const now = new Date(); 
    const options = { 
        year: 'numeric',
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true 
    };
    
    return now.toLocaleString('en-US', options); 
}
function sort (){
    players.sort((a,b) => b.playerScore - a.playerScore)
}