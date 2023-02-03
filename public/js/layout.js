let tableLayout = []

function updateUI() {
    const layout = document.getElementById('layout');
    layout.innerHTML = ""
    for (x in tableLayout) {
        const data = tableLayout[x]
        let newTable = document.createElement("div")
        newTable.style.width = "3vw"
        newTable.style.height = "3vw"
        newTable.style.backgroundColor = "white"
        newTable.style.display = "inline"
        newTable.style.position = "absolute"
        newTable.style.left = data.x || 0
        newTable.style.top = data.y || 0


        newTable.draggable = "true"
        newTable.id = "table_id_" + x
        newTable.onclick = function() {
            setActiveTableMovement( newTable.id, x )
        }

        layout.appendChild(newTable)
    }
}


let activeButton = ""
let activeID = ""
let letTimePassed = 0
let body = document.getElementById('layout');
let circle = document.getElementById("follower");
circle.style.display = "none"

function setActiveTableMovement( tableElement, tblID ) {
    if (tableElement == activeButton) return
    activeButton = tableElement
    activeID = tblID
    let time = (new Date()).getTime()
    letTimePassed = time + 250
    circle.style.display = "block"
    let obj = document.getElementById(activeButton);
    obj.style.backgroundColor = "yellow"

}


function updateTableMovement( e ) {
    let obj = document.getElementById(activeButton);
    let data = tableLayout[activeID];
    const target = body;
    const rect = target.getBoundingClientRect();
    let size = obj.clientWidth / 2;
    const x = e.clientX - rect.left - size;
    const y = e.clientY - rect.top - size;


    const x_percentage = x / target.clientWidth * 100 + "%";
    const y_percentage = y / target.clientHeight * 100 + "%";
    data.x = x_percentage;
    data.y = y_percentage;


    obj.style.left = x_percentage;
    obj.style.top = y_percentage;

    activeButton = "";
    activeID = -1;
    circle.style.display = "none"
    obj.style.backgroundColor = "white"

}


function newTable() {
    let newTable = {}
    newTable.x = 0
    newTable.y = 0
    tableLayout.push( newTable )
    updateUI()
}



document.addEventListener('mousemove', function(e) {

    if (activeButton == "") return
    const rect = body.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    circle.style.left = x;
    circle.style.top = y;
});

circle.onclick = function( e ) {
    if (activeButton == "" || letTimePassed > (new Date()).getTime()) return

    updateTableMovement(e)
}