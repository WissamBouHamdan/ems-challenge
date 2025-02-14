import { useLoaderData } from "react-router"
import { getDB } from "~/db/getDB"
import { useState } from "react" ;
import './EmployeesPage.css' ;


export async function loader() {
  const db = await getDB()
  const employees = await db.all("SELECT * FROM employees;")

  return { employees }
}


export default function EmployeesPage() {
  const { employees } = useLoaderData()
 
  return (

    <div className="employees-page">
        <h1 className="page-title">Employee List</h1>
      <div className="employee-cards">
        {employees.map((employee: any) => (

          
          <div key={employee.id} className="employee-card">
            <ul>
              <li className="employee-cards">Employee: #{employee.id}</li>
              <ul>
                <li>Full Name: {employee.full_name}</li>
                <li className="position">Position: {employee.jobtitle}</li>
                <li className="department">Department: {employee.department}</li>
                <li className="email">Email: {employee.email}</li>
                 <a className="view-btn" href="{' /employees/${employee.id}}">View Employee</a>
              </ul>
            </ul>
          </div>

        ))}
      </div>
      <hr />
     <div className="nav-links">
      <ul>
        <li><a href="/employees/new" className="nav-btn">New Employee</a></li>
        <li><a href="/timesheets/" className="nav-btn">Timesheets</a></li>
      </ul>
      </div>
    </div>
    
  )
}

