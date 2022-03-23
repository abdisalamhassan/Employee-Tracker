const inquirer = require ("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const mysql = require ("mysql2");
require('console.table');

const connection = mysql.createConnection({
 host: "localhost",
 port: 3306,
 user: "root",
 database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("mySQL is Connected");

    start();
})

function start(){
    inquirer
      .prompt([
           {
               type: "list",
               name: "choice",
               choices: [
                   "View all Employees",
                   "View by Roles",
                   "View All Departments",
                   "Update Employee",
                   "Add Employee",
                   "Add Role",
                   "Add Department"
               ]
           }
      ]).then(function (answer) {
        switch (answer.choice) {
          case "View All Employees":
            viewAllEmployees();
            break;
  
          case "View All Departments":
            viewAllDept();
            break;
  
          case "View All Roles":
            viewAllRoles();
            break;
  
          case "Add Employee":
            addEmployee();
            break;
  
          case "Add Department":
            addDept();
            break;
  
          case "Add Role":
            addRole();
            break;
  
          case "Update Employee Role":
            updateEmployeeRole();
            break;
        }
      });
}

function viewAllDept() {
    connection.query("SELECT * FROM department;", function(err, data) {
        console.table(data)
        start();
    })
}

function addDept(){
    inquirer
       .prompt([
           {
               type: "input",
               name: "departmentName",
               message: "What is the name of the new department?"
           }
       ]).then(function(answer){
           connection.query(
               "INSERT INTO department SET ?",
            {
                name: answer.departmentName
            },
            function(err){
                if(err) throw err;
                console.log("_____________________________");
                // console.log("New Department added:" + answer.departmentName);
                console.log(`New Department added: ${answer.departmentName}`);
                console.log("______________________________");
                start();
            }
           )
       })
}

function addEmploeeRole(){
    connection.query("SELECT * FROM role", function(err, results){
        if(err) throw err;
        inquirer.prompt([
            {
                name: "firstName",
                type: "input",
                message: "Please enter employee first name"
            },
            {
                name: "LastName",
                type: "input",
                message: "Enter employee's last name",
            },
            {
                name: "role",
                type: "list",
                choices: function(value){
                        if(isNaN(value)=== false){
                            return true;
                        }
                        return false;
                    },
                   
                message: "Enter manager ID",
                default: "1"
            }
        ]).then(function(answer){
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstName,
                    last_name: answer.lastName,
                    role_id: answer.role,
                    manager_id: answer.manager 
                }
            )
            console.log("_________________"),
            console.log("Employee Added Successfully"),
            console.log("__________________");
            start()
        });
    });
}

function updateEmployee(){
    connection.query("SELECT * FROM employee",
       function(err, results){
           if(err) throw err;
           inquirer
           .prompt([
               {
                   name: "choice",
                   type: "list",
                   choices: function(){
                       let choiceARR = [];
                       for(i=0; i< results.length; i++)
                    {
                        choiceArr.push (results[i].last_name);
                    }
                    return choiceArr;
                   },
                   message: "Select employee to update"
               }
           ])
        .then(function(answer){
            const saveName = answer.choice;

            connection.query("SELECT * FROM employee",
            function(err,results){
                if(err) throw err;
            inquirer
            .prompt([
                {
                    name:"role",
                    type: "list",
                    choices: function(){
                        var choiceArr = [];
                        for(i=0; i< resukts.length; i++){
                            choiceArr.push(results[i].role_id)
                        }
                        return choiceArr;
                    },
                    message: "Select title"
                },
                {
                    name: "manager",
                    type: "number",
                    validate: function(value){
                        if(isNan(value)=== false){
                            return true;
                        }
                        return false;
                    },
                    message: "Enter new manager ID",
                    default: "1"
                }
            ])
            .then(function(answer){
                console.log(answer);
                console.log(saveName);
                connection.query("UPDATE employee SET ? WHERE last_name = ?",
                [
                    {
                        role_id: answer.role,
                        manager_id: answer.manager
                    }, saveName
                ],
                ),
                console.log("_______________________________");
                console.log("Employee update");
                console.log("________________________________");
                start();
            });
            });
        });
       });
}

  