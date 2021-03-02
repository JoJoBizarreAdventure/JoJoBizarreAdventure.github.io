function onClickAddMovie() {
    let Title = document.querySelector('form input[id="title"]').value;
    let Date = document.querySelector('form input[id="date"]').value;
    let Time = document.querySelector('form input[id="time"]').value;
    let Duration = document.querySelector('form input[id="duration"]').value;
    let MovieHall = document.querySelector('form input[id="movieHall"]').value;
    let Price = document.querySelector('form input[id="price"]').value;
    let Type = document.querySelector('form input[name="type"]:checked').value;
    if (validateInput(Date,Time,Duration, MovieHall, Price, Title, Type)) {
        addRow(Title,Date,Time ,Duration, MovieHall, Price, Type);
    }
}

function addRow(Title,Date,Time, Duration, MovieHall, Price, Type) {
    let bodyObj = document.getElementById("tbody");
    if (!bodyObj) {
        alert("Body of Table not Exist!");
        return;
    }
    let rowCount = bodyObj.rows.length;
    let cellCount = bodyObj.rows[0].cells.length;
    bodyObj.style.display = ""; // display the tbody
    let newRow = bodyObj.insertRow(rowCount++);
    newRow.insertCell(0).innerHTML = Title;
    newRow.insertCell(1).innerHTML = Date;
    newRow.insertCell(2).innerHTML = Time;
    newRow.insertCell(3).innerHTML = Duration;
    newRow.insertCell(4).innerHTML = MovieHall;
    newRow.insertCell(5).innerHTML = parseFloat(Price).toFixed(1);
    newRow.insertCell(6).innerHTML = Type;
    newRow.insertCell(7).innerHTML = bodyObj.rows[0].cells[cellCount -
    1].innerHTML; // copy the "delete" button
    for (let i = 0; i < 8; i++) {
        newRow.cells[i].setAttribute("class", "text-secondary text-center font-weight-bold")
    }
    bodyObj.rows[0].style.display = "none"; // hide first row
}

function validateInput(date,time,duration, movieHall, price, title, type) {
    let durationRegex = new RegExp(/^(300|[1-2][0-9]{2}|[3-9][0-9])$/);
    let movieHallRegex = new RegExp(/^[1-7]$/);
    let priceRegex = new RegExp(/^[0-9]+(\.[0-9]*)?$/);
    let dateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}$/);
    let timeRegex = new RegExp(/^\d{2}:\d{2}$/)
    if(title.length===0){
        alert("Empty title.");
        return false;
    }
    if(!dateRegex.test(date)){
        alert("Invalid Date Input.");
        return false;
    }
    const now = new Date();
    now.setDate(now.getDate()+1);
    const input_date = new Date(date);
    if(input_date<now){
        alert("Date too soon.");
        return false;
    }
    if(!timeRegex.test(time)){
        alert("Invalid Start Time.");
        return false;
    }
    if (!durationRegex.test(duration)) {
        alert("Invalid Duration.");
        return false;
    }
    if (!movieHallRegex.test(movieHall)){
        alert("Invalid Movie Hall.");
        return false;
    }
    if (!priceRegex.test(price)) {
        alert("Invalid Price.");
        return false;
    }
    let bodyObj = document.getElementById("tbody");
    if (!bodyObj) {
        alert("Body of Table not Exist!");
        return false;
    }
    let rowCount = bodyObj.rows.length;
    for (let i = 0; i < rowCount; i++) {
        if (bodyObj.rows[i].cells[0].innerHTML === title
            && bodyObj.rows[i].cells[4].innerHTML === movieHall) {
            if (bodyObj.rows[i].cells[6].innerHTML !== type) {
                alert("Same movie in same movie hall but different type.")
                return false;
            }
        }
    }
    return true;
}

function removeRow(input_obj) {
    if (!input_obj) return;
    let parentTD = input_obj.parentNode;
    let parentTR = parentTD.parentNode;
    let parentTBODY = parentTR.parentNode;
    parentTBODY.removeChild(parentTR);
}

function setMinDate() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const year = now.getFullYear();
    const month = now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1);
    const date = now.getDate() < 10 ? "0" + now.getDate() : now.getDate();
    document.getElementById("date").setAttribute("min", year + "-" + month + "-" + date);
}

function setTimeAvailable() {
    document.getElementById("time").removeAttribute("readonly");
}

function resetState(){
    document.querySelector('form input[id="title"]').value = "";
    document.querySelector('form input[id="date"]').value = "";
    document.querySelector('form input[id="time"]').value = "";
    document.querySelector('form input[id="duration"]').value = "";
    document.querySelector('form input[id="movieHall"]').value = "";
    document.querySelector('form input[id="price"]').value = "";
}