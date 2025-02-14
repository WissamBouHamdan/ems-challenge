import { Form, redirect, type ActionFunction } from "react-router";
import { getDB } from "~/db/getDB";
import './Styles.css'

export const action: ActionFunction = async ({ request }) => {

  // validations
  const formData = await request.formData();
  const full_name = formData.get("full_name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const DOB = formData.get("dob");
  const jobTtitle = formData.get("jobtitle");
  const department = formData.get("department");
  const salary = formData.get("salary");
  const startDate = formData.get("startdate");
  const endDate = formData.get("enddate");
  const photo = formData.get("photo") as File|null;
  const documents = formData.get("documents") as File|null;

  const db = await getDB();
  await db.run(
    'INSERT INTO employees (full_name, email, phone, DOB, jobTitle, department, salary, startdate, enddate, photo, documents) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    full_name, email, phone, DOB, jobTtitle, department, salary, startDate, endDate, photo, documents
  );

  return redirect("/employees");
}

export default function NewEmployeePage() {
  return ( 
    <div className="container">
      <h1>Create New Employee</h1>
      <Form method="post" >
        
{/* personal info  */}
  
    <div>
      <label htmlFor="full_name">Full Name: </label> 
     <input type="text" name="full_name" id="full_name" placeholder="Enter Full Name" required /> 
    </div>

    <div>
      <label htmlFor="email">Email: </label>
      <input type="email" name="email" id="email" placeholder="Enter Your Email" required />
    </div>

    <div>
      <label htmlFor="phone_number">Phone Number: </label>
      <input type="tel" name="phone" id="phone_number" placeholder="Enter Phone Number" required />
    </div>

    <div>
      <label htmlFor="dob">Date of Birth: </label>
      <input type="date" name="dob" id="dob" required />
    </div>
{/* Professional Info */}
    <div>
      <label htmlFor="jobtitle">Job Title: </label>
      <input type="text" name="jobtitle" id="jobtitle" placeholder="Enter Your Job Title" required />
    </div>

    <div>
      <label htmlFor="department">Department: </label>
      <input type="text" name="department" id="department" placeholder="Enter Department" required />
    </div>

    <div>
      <label htmlFor="salary">Salary: </label>
      <input type="number" name="salary" id="salary" placeholder="Enter Salary" required />
    </div>

    <div>
      <label htmlFor="startdate">Start Date: </label>
      <input type="date" name="startdate" id="startdate" required />
    </div>

    <div>
      <label htmlFor="enddate">End Date (Optional): </label>
      <input type="date" name="enddate" id="enddate" />
    </div>
{/* Documents */}
    <div>
      <label htmlFor="photo">Employee Photo: </label>
      <input type="file" name="photo" id="photo" accept="image/*" />
    </div>

    <div>
      <label htmlFor="documents">Documents (CV, ID, etc.): </label>
      <input type="file" name="documents" id="documents" accept=".pdf, .docx, .jpg, .jpeg, .png" />
    </div>

  <button type="submit">Create Employee</button>

      </Form>
      <hr />
      <ul>
        <li><a href="/employees">Employees</a></li>
        <li><a href="/timesheets">Timesheets</a></li>
      </ul>
    </div>
  );
}
