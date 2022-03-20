const inquirer = require ("inquirer");
const mysql = require ("mysql");


const connection = mysql.createConnection({
 host: "Localhost",
 port: 3000,
 user: "root",
 password: "password",
 database: "employee_trackerDB"
});

connection.connect(function(err) {
    if(err) throw err;
    console.log("SQL is Connected");

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
                   "View by Departments",
                   "Update Employee",
                   "Add Employee",
                   "Add Role",
                   "Add Department"
               ]
           }
      ])..then(function (answer) {
        switch (answer.mainMenu) {
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

function updateEmployee() {
    connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
    
     if (err) throw err
     console.log(res)
    inquirer.prompt([
          {
            name: "lastName",
            type: "rawlist",
            choices: function() {
              var lastName = [];
              for (var i = 0; i < res.length; i++) {
                lastName.push(res[i].last_name);
              }
              return lastName;
            },
            message: "What is the Employee's last name? ",
          },
          {
            name: "role",
            type: "rawlist",
            message: "What is the Employees new title? ",
            choices: selectRole()
          },
      ]).then(function(val) {
        var roleId = selectRole().indexOf(val.role) + 1
        connection.query("UPDATE employee SET WHERE ?", 
        {
          last_name: val.lastName
           
        }, 
        {
          role_id: roleId
           
        }, 
        function(err){
            if (err) throw err
            console.table(val)
            startPrompt()
        })
  
    });
  });

  }