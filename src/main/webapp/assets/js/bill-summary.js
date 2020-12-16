let queryString = decodeURIComponent(window.location.search).substring(1);
let dict = {}, userName, firstName;
let promiseResponse = start();

$(document).ready(function (){
    $('#icon').click(function(){
        $('ul').toggleClass('show');
    });
});

async function start() {
    let queries = queryString.split('&');
    userName = queries[0].substring(9);
    firstName = queries[1].substring(5);

    for (let i = 2; i < queries.length; i++) {
        let key = queries[i].split('=')[0];
        dict[key] = queries[i].split('=')[1];
        console.log(key + ": " + dict[key] + '\n');
    }

    document.getElementById("welcomeMessage").innerHTML = "Welcome " + firstName + " To IIIT Bangalore";

    document.getElementById('heading').innerHTML = "Please find below your payment summary, please confirm";

    let tableBody = document.getElementById('show-bills-summary');
    tableBody.innerHTML = "";
    let sum = 0;
    for (let key in dict) {
        tableBody.innerHTML += '<tr>';
        let temp = "";
        temp += '<td>' + key + '</td>';
        temp += '<td>' + dict[key] + '</td>';
        tableBody.innerHTML += temp + '</tr>';
        sum += parseInt(dict[key]);
    }

    tableBody.innerHTML += '<tr>';
    let temp = "";
    temp += '<td><h2 class="total">' + "Total Amount" + '</h2></td>';
    temp += '<td><h2 class="total">' + sum + '</h2></td>';
    tableBody.innerHTML += temp + '</tr>';
}

async function payment() {
    console.log("Query String: " + queryString);

    let response = await fetch('api/bills/pay', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            queryString
        })
    });

    let result = await response;
    console.log(response)

    document.getElementById("heading").remove();
    document.getElementById("summaryTable").remove();
    document.getElementById("paymentButton").remove();



    document.getElementById("paymentDone").innerHTML = "Thanks for paying you bills please click on the below button to redirect to your Home page";
    let Homebutton = document.getElementById('payment');
    Homebutton.innerHTML = '<div id="homeButton">\n' +
        '        <button class="btn paymentButton" type="submit" onclick="goToHome()">Home</button>\n' +
        '    </div>';
}
function functionNotify()
{   let tableBody = document.getElementById('notification-drop');
    tableBody.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        tableBody.innerHTML += '<li><a>';
        let temp = "";
        temp += 'notification'+i;
        tableBody.innerHTML += temp + '</a></li>';
    }
}
async function goToHome() {
    let querystr = "userName=" + userName + "&name=" + firstName;
    window.location.href = "Bills.html?" + querystr;
}
async function gotoshowPayment()
{   let querystr = "userName=" + userName + "&name=" + firstName;
    window.location.href="BillPayment.html?"+querystr;
}