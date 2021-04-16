  
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const { start } = require("node:repl");

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
    } else {
        updateEmployeeRole()
    }

    

})
}
// view all function
function viewAll(){
    let query ="SELECT (*) FROM employee"
    connection.query(query, function(err,res){
        if (err) throw err;
        console.table(res);
        startMenu();
    })
}
    
//  view all by department function
function viewAllDepartment(){
    let query="SELECT (*) FROM department";
    connection.query(query,function(err,res){
        if (err) throw err;
        console.table(res);
        startMenu();
    })
}
// view all by role 
function viewAllRole
