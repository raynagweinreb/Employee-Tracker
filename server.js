  
const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");



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
            "View ALl Departments",
            "View All Roles",
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
    }  else if(choice.startSelect ==="View ALl Departments"){
    viewAllDepartment();
    } else if(choice.startSelect ==="View All Roles"){
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

    connection.query("SELECT * FROM department",function(err,res){
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
        connection.query("INSERT INTO employee SET ?",
        {first_name: data.addFirstName,
        last_name: data.addLastName,
        role_id:data.addRoleId,
        manager_id: data.addManagerId
        }
        );
        connection.query("SELECT * FROM employee",function(err,res){
            if(err) throw err;
            console.table(res)
            startMenu()
    });
})
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
        connection.query("INSERT INTO role SET ?",
        { title: data.addRoleTitle,
        salary: data.addRoleSalary,
        department_id: data.addRoleDepId},
        );
        connection.query("SELECT * FROM role",function(err,res){
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
        connection.query("INSERT INTO department SET ?",
        { name: data.addDepName} 
        );
        connection.query("SELECT * FROM department",function(err,res){
            if(err) throw err;
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
        message:"What is their new manager id?",
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
      connection.end()
          process.exit()
  }