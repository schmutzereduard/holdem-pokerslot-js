import { HANDS, MULTIPLIER } from "./constants.js";

const paytable = () => {

    const paytableContainer = document.getElementById("paytable-container");

    const heading = document.createElement("h2");
    heading.textContent = "Pay table";
    paytableContainer.appendChild(heading);

    const table = document.createElement("table");
    paytableContainer.appendChild(table);

    const headers = document.createElement("tr");
    table.appendChild(headers);

    const hand = document.createElement("th");
    hand.textContent = "Hand";
    headers.appendChild(hand);

    const pay = document.createElement("th");
    pay.textContent = "Pay";
    headers.appendChild(pay);

    HANDS.forEach((hand) => {

        const row = document.createElement("tr");
        table.appendChild(row);

        const handData = document.createElement("td");
        handData.textContent = hand.name;
        row.appendChild(handData);

        const handPay = document.createElement("td");
        handPay.textContent = hand.value * MULTIPLIER + "$";
        row.appendChild(handPay);
    });
}

export default paytable;