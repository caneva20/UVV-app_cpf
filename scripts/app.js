const output = document.getElementById("output");

let input = document.getElementById("cpfInput");

function message(msg, clazz) {
    output.innerHTML = msg;
    output.removeAttribute("class");
    output.setAttribute("class", `w3-panel ${clazz}`);
}

function check() {
    let cpf = input.value.replace(/\D*/g, "");

    let valid = isValid(cpf);

    message(`CPF ${valid ? "" : "IN"}VÁLIDO`, `w3-${valid ? "green" : "red"}`);
}

function generate() {
    let cpf = [];

    for (let i = 0; i < 9; i++) {
        cpf.push(Math.round(Math.random() * 9));
    }

    cpf.push(computeDigit(10, cpf));
    cpf.push(computeDigit(11, cpf));

    let value = StringMask.apply(cpf.join(""), "000.000.000-00");

    input.value = value;

    message(`CPF gerado: ${value}`, "w3-yellow")
}

function isValid(cpf) {
    let digit1 = computeFirst(cpf);
    let digit2 = computeSecond(cpf);

    return digit1 == cpf[9] && digit2 == cpf[10];
}

function computeFirst(cpf) {
    return computeDigit(10, cpf);
}

function computeSecond(cpf) {
    return computeDigit(11, cpf);
}

function computeDigit(from, cpf) {
    let sum = 0;

    for (let i = from; i >= 2; i--) {
        let index = from - i;

        sum += Number(cpf[index]) * i;
    }

    let rest = sum % 11;

    if (rest < 2) {
        return 0;
    }

    return 11 - rest;
}