const history = () => {
    
    const historyContainer = document.getElementById("history-container");

    const header = document.createElement("h2");
    header.textContent = "History";
    historyContainer.appendChild(header);

    const list = document.createElement("ol");
    list.setAttribute("id", "history-list");
    historyContainer.appendChild(list);
}

export function addHistory(text) {

    const item = document.createElement("li");
    item.textContent = text;
    document.getElementById("history-list").appendChild(item);
}

export default history;