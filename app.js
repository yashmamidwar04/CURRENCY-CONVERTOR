const BASE_URL = "https://api.exchangerate-api.com/v4/latest/";

const dropdowns = document.querySelectorAll(".dropdown select");

// Define updateFlag BEFORE it's used in the event listener
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

for (let select of dropdowns) {
    for (let currCode in countryList) {   // added `let` to avoid implicit global
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }

        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.getElementById("amount").value;


    if (amount === "" || isNaN(amount) || amount <= 0) {
        amount = 1;
        document.getElementById("amount").value = 1;
    }

    const fromCurrency = document.querySelector('[name="from"]').value;
    const toCurrency   = document.querySelector('[name="to"]').value;

    try {
        const response = await fetch(`${BASE_URL}${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const convertedAmount = (amount * rate).toFixed(2);


        document.querySelector(".msg").textContent =
            `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
        document.querySelector(".msg").textContent =
            "Something went wrong. Please try again.";
    }
});