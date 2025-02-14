import { useLoaderData, Form, redirect } from "react-router";
import { getDB } from "~/db/getDB";
import './TimesheetStyle.css';

export async function loader() {
  const db = await getDB();
  const employees = await db.all('SELECT id, full_name FROM employees');
  return { employees };
}

import type { ActionFunction } from "react-router";
import { error } from "console";
import { buildErrorMessage } from "vite";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const employee_id = formData.get("employee_id"); // <select /> input with name="employee_id"
  const start_time = formData.get("start_time");
  const end_time = formData.get("end_time"); 

  // Date Validation to ensure end time is after start time 
  
  if(typeof start_time !== 'string' || typeof end_time !== 'string')
    {
      return {error:"Invalid Input for Tart Time or End Time"};
    } 

  if(new Date(start_time)>= new Date(end_time))
  {
    return {error: "End Time must be after Start Time."};
  }

  const db = await getDB();
  await db.run(
    'INSERT INTO timesheets (employee_id, start_time, end_time) VALUES (?, ?, ?)',
    [employee_id, start_time, end_time]
  );

  return redirect("/timesheets");
}

export default function NewTimesheetPage() {
  const { employees } = useLoaderData(); // Used to create a select input
  return (
    <div>
      <h1>Create New Timesheet</h1>

      <Form method="post">
        <div>
          <label htmlFor="employee_id">Employee</label>
          <select name="employee_id" id="employee_id" required>
            {employees.map((employee:{id:string; full_name:string})=>(

                <option key={employee.id} value={employee.id}>{employee.full_name}</option>

            ))}

          </select>

        </div>
        <div>
          <label htmlFor="start_time">Start Time</label>
          <input type="datetime-local" name="start_time" id="start_time" required />
        </div>
        <div>
          <label htmlFor="end_time">End Time</label>
          <input type="datetime-local" name="end_time" id="end_time" required />
        </div>
        <button type="submit">Create Timesheet</button>
      </Form>
      <hr />
      <ul>
        <li><a href="/timesheets">Timesheets</a></li>
        <li><a href="/employees">Employees</a></li>
      </ul>
    </div>
  );
}
