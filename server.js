  
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { exit } = require("node:process");


//connection properties

const connectionProperties = {
    host: 'localhost',
    port: 3306,
    user: "root",
    password: "Rw.241590",
    database: "company_db"
}

//create connection 

const connection = mysql.createConnection(connectionProperties);

function startMenu(){
    inquirer
    .prompt([
        {
        name: "startSelect",
        type:"list",
        message: "What would you like to do?",
        choices: [
            "View All Employees", 
            "View ALl Employees by Department",
            "View All Employees by Role",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "Update Employee Manager",
            "Exit"
        ]
        }
    ])
    .then((choice)=>{
        if (choice.startSelect === "View All Employees"){
        viewAll();
    }  else if(choice.startSelect ==="View ALl Employees by Department"){
    viewAllDepartment();
    } else if(choice.startSelect ==="View All Employees by Role"){
        viewAllRole();
    } else if(choice.startSelect ==="Add Employee"){
        addEmployee();
    }else if (choice.startSelect ==="Add Role"){
        addRole();
    }
    else if (choice.startSelect ==="Add Department"){
        addDepartment();
    } else if(choice.startSelect==="Update Employee Role"){
        updateEmployeeRole()
    } else if (choice.startSelect==="Update Employee Manager"){
        updateEmployeeManager()
    }else {
        exit()
    }

    

})
}
// view all function
function viewAll(){
    let query ="SELECT * FROM employee"
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        startMenu();
    })
}
    
//  view all by department function
function viewAllDepartment(){
    let query="SELECT * FROM department";
    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
        startMenu();
    })
}
// view all by role 
function viewAllRole(){
    let query="SELECT * FROM role";
    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
        startMenu();
    })
}

//add employee
function addEmployee(){
    inquirer
    .prompt([
        { 
            type: "input",
            message: "Please enter your employee's first name",
            name:"addFirstName"
        },
        { 
            type: "input",
            message: "Please enter your employees last name",
            name:"addLastName"
        },
        { 
            type: "input",
            message: "Please enter your employees last name",
            name:"addLastName"
        },
        { 
            type: "input",
            message: "Please enter their role ID",
            name:"addRoleId"
        },
        { 
            type: "input",
            message: "Please enter their manager's ID",
            name:"addManagerId"
        }
    ])
    .then((data)=>{
        connection.query(`INSERT INTO employee (first_name, last_name,role_id, manager_id) VALUES (${data.addFirstName},${data.addLastName},${data.addRoleId},${data.addManagerId})`,
 function(res,err){
            if (err) throw err;
            console.table(res)
            startMenu();
        });
    });
}

//add role 
function addRole(){
    inquirer
    .prompt([
        { 
            type: "input",
            message: "Please enter the role title",
            name:"addRoleTitle"
        },
        { 
            type: "input",
            message: "Please enter role salary",
            name:"addRoleSalary"
        },
        { 
            type: "input",
            message: "Please enter department ID",
            name:"addRoleDepId"
        },
    ])
    .then((data)=>{
        connection.query(`INSERT INTO role (title,salary,department_id) VALUES (${data.addRoleTitle},${data.addRoleSalary},${data.addRoleDepId})`,
function(res,err){
            if(err) throw err;
            console.table(res)
            startMenu()
        })
    })
}

//add department
function addDepartment(){
    inquirer
    .prompt([
        { 
            type: "input",
            message: "Please enter the department name",
            name:"addDepName"
        },

    ])
    .then((data)=>{
        connection.query(`INSERT INTO department (name) VALUES ("${data.addDepName}")`, function(res,err){
            //if(err) throw err;
            console.table(res)
            startMenu()
        })
    })
}

// update employee role 
function updateEmployeeRole(){

    inquirer
    .prompt([
        { 
            type: "input",
            message: "Please enter the id of the employee you would like to change",
            name:"updateEmployeeSelect", 

        },
        {
        type:"input",
        message:"What is their new role id?",
        name: "updateEmployeeRole", 
        }
    ])
    .then((data)=>{
  
        connection.query( `UPDATE employee SET role_id=${data.updateEmployeeRole} WHERE id=${data.updateEmployeeSelect}`,(err,res)=>{
            if (err) throw err;
            console.table(res);
            startMenu()
        })
    }
    )
}
function updateEmployeeManager(){

    inquirer
    .prompt([
        { 
            type: "input",
            message: "Please enter the id of the employee you would like to change",
            name:"updateEmployee", 

        },
        {
        type:"input",
        message:"What is their new role id?",
        name: "updateEmployeeManager", 
        }
    ])
    .then((data)=>{
  
        connection.query( `UPDATE employee SET manager_id=${data.updateEmployeeManager} WHERE id=${data.updateEmployee}`,(err,res)=>{
            if (err) throw err;
            console.table(res);
            startMenu()
        })
    }
    )
}

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
  
    startMenu();
  });
  function exit(){
      connection.end(
          process.exit()
      )
  }