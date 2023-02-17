function sortSizeList() {
    return [
        { size: 10 },
        { size: 15 },
        { size: 20 },
        { size: 30 },
        { size: 40 },
        { size: 50 },
        { size: 60 },
        { size: 6 },
        { size: 7 },
        { size: 6 },
        { size: 9 },
        { size: 15 },
    ]
}


let serviceTableLayout = {}
function determinePossibleLocations( size ) {
    switch (true) {
        case ( size <= 4 ):
            break;
        case ( size <= 6 ):
            break;
        case ( size <= 8 ):
            return { 
                kroom: [
                    { tables: [40], expenses: [] }, 
                    { tables: [39], expenses: [] },
                    { tables: [33], expenses: [{table: 31, size: 2}, {table: 32, size: 0}] },
                    { tables: [34], expenses: [{table: 35, size: 0}, {table: 36, size: 3}] },
                ], 
                longpine: [
                    { tables: [3], expenses: [{table: 4, size: 0}, {table: 5, size: 2}] },
                    { tables: [21], expenses: [{table: 17, size: 4}, {table: 25, size: 0}, {table: 23, size: 0}] },
                    { tables: [22], expenses: [{table: 16, size: 2}, {table: 24, size: 0}, {table: 23, size: 0}] },
                    { tables: [17], expenses: [{table: 21, size: 6}, {table: 25, size: 0}] },
                    { tables: [16], expenses: [{table: 22, size: 6}, {table: 24, size: 0}] },
                    { tables: [12], expenses: [{table: 11, size: 0}] },
                    { tables: [13], expenses: [{table: 10, size: 0}, {table: 24, size: 0}] },
                ] 
            }
        case ( size <= 10 ):
            return { 
                kroom: [
                    { tables: [40], expenses: [] }, 
                    { tables: [39], expenses: [] },
                    { tables: [33], expenses: [{table: 31, size: 2}, {table: 32, size: 0}] },
                    { tables: [34], expenses: [{table: 35, size: 0}, {table: 36, size: 3}] },
                ], 
                longpine: [
                    { tables: [3], expenses: [{table: 4, size: 0}, {table: 5, size: 2}] },
                    { tables: [21], expenses: [{table: 17, size: 4}, {table: 25, size: 0}, {table: 23, size: 0}] },
                    { tables: [22], expenses: [{table: 16, size: 2}, {table: 24, size: 0}, {table: 23, size: 0}] },
                    { tables: [17], expenses: [{table: 21, size: 6}, {table: 25, size: 0}] },
                    { tables: [16], expenses: [{table: 22, size: 6}, {table: 24, size: 0}] },
                    { tables: [12], expenses: [{table: 11, size: 0}] },
                    { tables: [13], expenses: [{table: 10, size: 0}, {table: 24, size: 0}] },
                ] 
            }
        case ( size <= 12 ):
            return { 
                kroom: [
                    { tables: [40], expenses: [{table: 34, size: 6}] }, 
                    { tables: [39], expenses: [] },
                    { tables: [33], expenses: [{table: 31, size: 0}, {table: 32, size: 0}] },
                    { tables: [34], expenses: [{table: 35, size: 0}, {table: 36, size: 0}] },
                ], 
                longpine: [
                    // DOUBLE CHECK TABLE 5!!!
                    { tables: [3], expenses: [{table: 4, size: 0}, {table: 5, size: 2}] },
                    { tables: [21], expenses: [{table: 17, size: 2}, {table: 25, size: 0}, {table: 23, size: 0}] },
                    { tables: [22], expenses: [{table: 16, size: 2}, {table: 24, size: 0}, {table: 23, size: 0}] },

                    // DOUBLE CHECK THESE TWO TABLES!!
                    { tables: [17], expenses: [{table: 21, size: 6}, {table: 25, size: 0}] },
                    { tables: [16], expenses: [{table: 22, size: 6}, {table: 24, size: 0}] },
                ] 
            }
        case ( size <= 16 ):
            return { 
                kroom: [
                    { tables: [40], expenses: [{table: 34, size: 6}, {table: 38, size: 0}] }, 
                    { tables: [39], expenses: [{table: 37, size: 0}] },
                ], 
                longpine: [
                    { tables: [3], expenses: [{table: 4, size: 0}, {table: 5, size: 0}] },
                    { tables: [21], expenses: [{table: 17, size: 0}, {table: 25, size: 0}, {table: 23, size: 0}] },
                    { tables: [22], expenses: [{table: 16, size: 0}, {table: 24, size: 0}, {table: 23, size: 0}] },
                    { tables: [12, 13], expenses: [{table: 10, size: 0}, {table: 11, size: 0}] },
                ] 
            }
        case ( size <= 20 ): 
            return {
                kroom: [
                    // CHECK TABLE 40!!!
                    { tables: [40, 39], expenses: [] }, 
                ], 
                longpine: [
                    { tables: [21, 22], expenses: [{table: 17, size: 6}, {table: 16, size: 6}, {table: 25, size: 0}, {table: 24, size: 0}, {table: 23, size: 0}] },
                    { tables: [12, 13], expenses: [{table: 7, size: 0}, {table: 10, size: 0}, {table: 16, size: 4}, {table: 17, size: 4}, {table: 24, size: 2}, {table: 25, size: 2}] },
                ] 
            }
        case ( size <= 24 ): 
            return {
                kroom: [
                    { tables: [40, 39], expenses: [{table: 37, size: 2}, {table: 38, size: 2}] }, 
                ], 
                longpine: [
                    { tables: [21, 22], expenses: [{table: 17, size: 2}, {table: 16, size: 2}, {table: 25, size: 0}, {table: 24, size: 0}, {table: 23, size: 0}] },
                ] 
            }
        case ( size <= 32 ): 
            return {
                kroom: [
                    { tables: [41, 42], expenses: [{table: 39, size: 0}, {table: 40, size: 0}, {table: 37, size: 0}, {table: 38, size: 0}] }, 
                    { tables: [40, 39], expenses: [{table: 37, size: 0}, {table: 38, size: 0}, {table: 34, size: 0}, {table: 35, size: 0}] }, 
                ], 
                longpine: [
                    { tables: [21, 22], expenses: [{table: 17, size: 0}, {table: 16, size: 0}, {table: 25, size: 0}, {table: 24, size: 0}, {table: 23, size: 0}] },
                ] 
            }
        case ( size <= 48 ): 
            return {
                kroom: [
                    { tables: [40, 41, 42], expenses: [{table: 39, size: 0}, {table: 37, size: 0}, {table: 38, size: 0}, {table: 35, size: 0}, {table: 36, size: 0}, {table: 34, size: 0}] }, 
                ], 
                longpine: []     
            }

        case ( size <= 60 ): 
            return {
                kroom: [
                    { tables: [39, 40, 41, 42], expenses: [{table: 37, size: 0}, {table: 38, size: 0}, {table: 35, size: 0}, {table: 36, size: 0}, {table: 34, size: 0}, {table: 33, size: 0}, {table: 32, size: 0}, {table: 31, size: 0}] }, 
                ], 
                longpine: []     
            }
    }
}


function determineTableLocation( size ) {
    switch (true) {
        case ( size < 4 ):
            break;
        case ( size < 6 ):
            break;
        case ( size < 8 ):
            break;
        case ( size < 14 ):
            // 39, 40, 21, 22,
            break;
    }
}


function generateTableLayout() {
    let list = sortSizeList()
    for (x in list) {
        const size = list[x].size

    }
}


let tableLayout = []
function determineTableLength( size ) {
    if (size <= 4) {
        return 1
    } else if (size > 16) {
        // inform user that size is simply too big
        return 0
    } else if (size == 15 || size == 16) {
        return 7
    } else {
        return Math.ceil(size / 2) - 1
    }
}
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function updateUI() {
    const layout = document.getElementById('layout');
    layout.innerHTML = ""
    for (x in tableLayout) {
        const data = tableLayout[x]
        const tableLength = determineTableLength( data.size || 3 )
        let newTable = document.createElement("div")
        newTable.style.width = (3) + "vw"
        newTable.style.height = (3 * tableLength) + "vw"
        newTable.style.backgroundColor = "white"
        newTable.style.display = "inline"
        newTable.style.position = "absolute"
        newTable.style.left = data.x || 0
        newTable.style.top = data.y || 0
        newTable.style.transform = "rotate(" + (data.rotation || 0) + "turn)"


        let tblID = document.createElement("p")
        tblID.innerHTML = x
        newTable.appendChild( tblID )
        newTable.draggable = "true"
        newTable.id = "table_id_" + x
        newTable.index_id = x

        newTable.onclick = function() {
            setActiveTableMovement( newTable.id, newTable.index_id )
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
circle.style.position = "absolute"
circle.style.transformOrigin = "center"
circle.style.transform = "rotate(" + 0 + "turn)"


let inputTableNumber = document.getElementById('tableNumberInput')
function setToolbarValues( tableNumberIn ) {
    let tableNumVal = tableNumberIn || ""
    inputTableNumber.value = tableNumVal
}

function setActiveTableMovement( tableElement, tblID ) {
    if (tableElement == activeButton) return
    activeButton = tableElement
    activeID = tblID
    let time = (new Date()).getTime()
    letTimePassed = time + 250
    let obj = document.getElementById(activeButton);
    obj.style.backgroundColor = "yellow"

    circle.style.width = obj.style.width
    circle.style.height = obj.style.height
    circle.style.display = "block"
    circle.style.transform = "rotate(" + obj.rotationRatio + "turn)"

    setToolbarValues( tblID )
}


function updateTableMovement( e ) {
    let obj = document.getElementById(activeButton);
    let data = tableLayout[activeID];
    const target = body;
    const rect = target.getBoundingClientRect();
    let size = obj.clientWidth / 2;
    let sizeY = obj.clientHeight / 2;
    const x = e.clientX - rect.left - size;
    const y = e.clientY - rect.top - sizeY;


    const x_percentage = clamp(x / target.clientWidth, 0, 1) * 100 + "%";
    const y_percentage = clamp(y / target.clientHeight, 0, 1) * 100 + "%";
    obj.style.rotate = obj.rotationRatio + "turn";

    data.x = x_percentage;
    data.y = y_percentage;


    obj.style.left = x_percentage;
    obj.style.top = y_percentage;

    activeButton = "";
    activeID = "";
    setToolbarValues( "" )

    circle.style.display = "none"
    obj.style.backgroundColor = "white"

}


function rotateTable() {
    let obj = document.getElementById(activeButton);
    let objRotationRatio = obj.rotationRatio || 0
    if (objRotationRatio + 0.125 > 0.875) {
        objRotationRatio = -0.125
    }
    obj.rotationRatio = (objRotationRatio + 0.125)
    circle.style.transform = "rotate(" + obj.rotationRatio + "turn)"

    tableLayout[obj.index_id].rotation = (objRotationRatio + 0.125)
}

function newTable() {
    activeButton = "";
    activeID = "";
    
    let newTable = {}
    newTable.x = 0
    newTable.y = 0
    tableLayout.push( newTable )
    updateUI()
}


document.addEventListener('mousemove', function(e) {
    if (activeButton == "") return
    let obj = document.getElementById(activeButton);
    let objRotationRatio = obj.rotationRatio || 0

    const rect = body.getBoundingClientRect();
    const w = circle.clientWidth/2
    const h = circle.clientHeight/2

    // when on its size (90o)
    // const x = clamp(e.clientX - rect.left - w, w*2, rect.right - rect.left - w*4);
    let xConst = 0
    if (objRotationRatio != 0 && objRotationRatio != 0.5) {
        xConst = 2
    }
    let yConst = 2
    let yConst2 = 0
    if (objRotationRatio == 0.25 || objRotationRatio == 0.75) {
        yConst = 1.33
        yConst2= -0.66
    }
    const x = clamp(e.clientX - rect.left - w, w * (0 + xConst), rect.right - rect.left - w*(2 + xConst));

    const y = clamp(e.clientY - rect.top - h, h*yConst2, rect.bottom - rect.top - h*yConst);
    circle.style.left = x;
    circle.style.top = y;
});

circle.onclick = function( e ) {
    if (activeButton == "" || letTimePassed > (new Date()).getTime()) return

    updateTableMovement(e)
}

circle.oncontextmenu = function( e ) {
    let obj = document.getElementById(activeButton);
    obj.style.backgroundColor = "white"
    circle.style.display = "none"
    activeButton = "";
    activeID = "";
    setToolbarValues( "" )

    return false;
}