var rowID = 1;
function getValueFromInput(className){
  return document.getElementsByClassName(className)[0].value;
}

function fnTask() {
    var task = getValueFromInput("taskText");
    var priority = getValueFromInput("priority");
    var deadline = getValueFromInput("deadline");
    //we are grabbing the values in each of the inputs we typed in 
    // we want to know how many rows are already there
    displayTask(task, priority, deadline, true);
    saveData(task, priority, deadline);
}    

function displayTask(taskValue, priorityValue, deadlineValue, shouldAlert) {
  var tableBody = document.getElementsByTagName("tbody")[0];
  // var remove = "<button class='delete'>Delete</button>";
  // Creating button and adding properties we want --> text, onclick
  var removeButton = document.createElement("button");
  removeButton.innerHTML="Delete";
  var currentRowID = rowID;
  removeButton.onclick= function() {
    console.log('On click will remove', currentRowID);
    removeSelectedRow(currentRowID);
  }
  if (shouldAlert) {
    alert("Task added : " + taskValue);
  }

  var newRow = tableBody.insertRow(-1);
  console.log('Assigning', rowID);
  newRow.setAttribute("id", rowID);
  var cellOne = newRow.insertCell(0);
  var cellTwo = newRow.insertCell(1);
  var cellThree = newRow.insertCell(2);
  var cellFour = newRow.insertCell(3);

  cellOne.innerHTML = taskValue;
  cellTwo.innerHTML = priorityValue;
  cellThree.innerHTML = deadlineValue;
  // cellFour.innerHTML = remove;
  cellFour.appendChild(removeButton);
  rowID += 1; 
  console.log('Incremented', rowID);
}

    //we are now going to save the values of task, priority, and deadline (data) to local storage
function getDataArray () {
  if (localStorage.getItem('data')) {
    return JSON.parse(localStorage.getItem('data'));
  } else {
    return [];
  }
}  

function saveData(taskValue, priorityValue, deadlineValue) {
  var toDoData = getDataArray();
  var dataStructure = {task: taskValue, priority: priorityValue, deadline: deadlineValue};
  toDoData.push(dataStructure);
  localStorage.setItem('data', JSON.stringify(toDoData) );  
}
  
function initialize(){ 
  var toDoData = getDataArray();
  if (toDoData.length > 0) {
    for (var i=0; i<toDoData.length; i++){
      var rowData = toDoData[i];
      var rowTask = rowData.task;
      var rowPriority = rowData.priority;
      var rowDeadline = rowData.deadline;
      displayTask(rowTask, rowPriority, rowDeadline);   
    }
  }
}

function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementsByTagName('table')[0];
    switching = true;
    // Set the sorting direction to ascending:
    dir = 'asc';
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName('td')[n];
        y = rows[i + 1].getElementsByTagName('td')[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
          
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  function removeSelectedRow(id){
    console.log('Removing', id);
    var removeRow = document.getElementById(id);
    removeRow.remove();
    localStorage.removeItem('data');
    // We are now going to find the values of all three rows and create new array from it
    var tableBody = document.getElementsByTagName("tbody")[0];
    var foundRows = tableBody.getElementsByTagName("tr");
    for (var i=0; i<foundRows.length; i++){
      var tableRow = foundRows[i];
      var tableData = tableRow.getElementsByTagName("td");

      var rowTask = tableData[0];
      var rowPriority = tableData[1];
      var rowDeadline = tableData[2];
      saveData(rowTask, rowPriority, rowDeadline);
    }
  }

  initialize();