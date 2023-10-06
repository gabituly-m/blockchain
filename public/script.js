const betAmountInput = document.getElementById('betAmount');
const gestureButtons = document.querySelectorAll('.gesture');
const resultMessage = document.getElementById('resultMessage');

gestureButtons.forEach(button => {
    button.addEventListener('click', () => {
        const betAmount = parseInt(betAmountInput.value);
        if (isNaN(betAmount) || betAmount <= 0) {
            alert('Please enter a valid bet amount.');
        } /*else {
            const selectedGesture = button.textContent;
        }*/
    });
});

let account;
const historyList = document.getElementById('historyList');
const connectMetamask = async () => {
    if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({
            method: "eth_requestAccounts"
        });
        account = accounts[0];
        document.getElementById("accountArea").innerHTML = account;
    }
}

const connectContract = async () => {
    if (typeof window !== 'undefined') {
        const ABI = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "changeToPaper",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "changeToRock",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "changeToScissors",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "deposit",
                "outputs": [],
                "stateMutability": "payable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getAddress",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "",
                        "type": "address"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getBalance",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "getPlayersChoose",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "playersChoose",
                "outputs": [
                    {
                        "internalType": "string",
                        "name": "",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address payable",
                        "name": "_to",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256",
                        "name": "_amount",
                        "type": "uint256"
                    }
                ],
                "name": "withdraw",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            }
        ];
        const Address = "0xa3E23216d968162e555EF382896EABc0F2d8E21A";
        window.web3 = await new Web3(window.ethereum);
        window.contract = await new window.web3.eth.Contract(ABI, Address);
        document.getElementById("contractArea").innerHTML = "connected to smart contract";
    }
}

const readContract = async () => {
    const dataPlayersChoose = await window.contract.methods.getPlayersChoose().call();
    document.getElementById("dataArea").innerHTML = dataPlayersChoose;
}
const chooseRock = async() => {
    const amount = document.getElementById("betAmount").value * 1000000000000000000;
    const amountToTransfer = document.getElementById("betAmount").value;
    await window.contract.methods.deposit().send({from:account, value: amount})
    //await window.contract.methods.changeToRock().send({from:account});
    const gestures = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * gestures.length);
    if (gestures[randomIndex] == "Scissors") {
        alert("You won! Computer chose Scissors!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer * 2).send({from: account});
        addToHistory("Rock", amountToTransfer, "Won");
    }
    if (gestures[randomIndex] == "Paper") {
        alert("You lost! Computer chose Paper!");
        addToHistory("Rock", amountToTransfer, "Lost");
    }
    if (gestures[randomIndex] == "Rock") {
        alert("It's a tie! Computer also chose Rock!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer).send({from: account});
        addToHistory("Rock", amountToTransfer, "Tie");
    }
}

const choosePaper = async() => {
    const amount = document.getElementById("betAmount").value * 1000000000000000000;
    const amountToTransfer = document.getElementById("betAmount").value;
    await window.contract.methods.deposit().send({from:account, value: amount})
    //await window.contract.methods.changeToRock().send({from:account});
    const gestures = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * gestures.length);
    if (gestures[randomIndex] == "Rock") {
        alert("You won! Computer chose Rock!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer * 2).send({from: account});
        addToHistory("Paper", amountToTransfer, "Won");
    }
    if (gestures[randomIndex] == "Scissors") {
        alert("You lost! Computer chose Scissors!");
        addToHistory("Paper", amountToTransfer, "Lost");
    }
    if (gestures[randomIndex] == "Paper") {
        alert("It's a tie! Computer also chose Paper!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer).send({from: account});
        addToHistory("Paper", amountToTransfer, "Tie");
    }
}

const chooseScissors = async() => {
    const amount = document.getElementById("betAmount").value * 1000000000000000000;
    const amountToTransfer = document.getElementById("betAmount").value;
    await window.contract.methods.deposit().send({from:account, value: amount})
    //await window.contract.methods.changeToRock().send({from:account});
    const gestures = ['Rock', 'Paper', 'Scissors'];
    const randomIndex = Math.floor(Math.random() * gestures.length);
    if (gestures[randomIndex] == "Paper") {
        alert("You won! Computer chose Paper!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer * 2).send({from: Address});
        addToHistory("Scissors", amountToTransfer, "Won");
    }
    if (gestures[randomIndex] == "Rock") {
        alert("You lost! Computer chose Rock!");
        addToHistory("Scissors", amountToTransfer, "Lost");
    }
    if (gestures[randomIndex] == "Scissors") {
        alert("It's a tie! Computer also chose Scissors!");
        await window.contract.methods.withdraw("0x7493530BFBD74Fc081Cb0500747FcfFFa2f45302", amountToTransfer).send({from: account});
        addToHistory("Scissors", amountToTransfer, "Tie");
    }
}

const getContractAccount = async() => {
    const dataGetAddress = await window.contract.methods.getAddress().call();
    document.getElementById("contractAccount").innerHTML = dataGetAddress;
}

const getBalance = async() => {
    const dataGetBalance = await window.contract.methods.getBalance().call() / 1000000000000000000;
    document.getElementById("balanceArea").innerHTML = dataGetBalance + " ETH";
}

const depositContract = async() => {
    const amount = document.getElementById("depositInput").value * 1000000000000000000;
    await window.contract.methods.deposit().send({from: account, value: amount});
}

const withdraw = async() => {
    const address = document.getElementById("addressInput").value;
    const amount = document.getElementById("amountInput").value;
    await window.contract.methods.withdraw(address, amount).send({from: account});
}
function addToHistory(userGesture, amount, result) {
    const listItem = document.createElement("li");
    listItem.classList.add("history-item");
    const gameInfo = `You chose ${userGesture}, Bet: ${amount}, Result: ${result}`;
    listItem.textContent = gameInfo;
    historyList.appendChild(listItem);
}