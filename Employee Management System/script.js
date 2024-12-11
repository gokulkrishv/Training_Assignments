class EmployeeManager {
    constructor() {
      this.employees = []; 
    }
  
    addEmployee() {
      const name = document.getElementById("name").value.trim();
      const id = document.getElementById("id").value.trim();
      const skill = document.getElementById("skill").value.trim();
      const doj = document.getElementById("doj").value.trim();
      const department = document.getElementById("department").value.trim();
  
      if (!name || !id || !skill || !doj || !department) {
        alert("All fields are required.");
        return;
      }
  
      if (this.employees.some(emp => emp.id === id)) {
        alert("Employee with this ID already exists.");
        return;
      }
  
      this.employees.push({ name, id, skill, doj, department });
      alert(`Employee ${name} added successfully.`);
      this.clearInputs();
    }
  
    removeEmployee() {
      const id = document.getElementById("remove-id").value.trim();
  
      if (!id) {
        alert("Please enter an Employee ID.");
        return;
      }
  
      const index = this.employees.findIndex(emp => emp.id === id);
  
      if (index !== -1) {
        const removed = this.employees.splice(index, 1);
        alert(`Employee ${removed[0].name} removed successfully.`);
      } else {
        alert("Employee not found.");
      }
    }
  
    searchEmployee() {
      const id = document.getElementById("search-id").value.trim();
  
      if (!id) {
        alert("Please enter an Employee ID.");
        return;
      }
  
      const employee = this.employees.find(emp => emp.id === id);
  
      const resultDiv = document.getElementById("search-result");
      resultDiv.innerHTML = "";
  
      if (employee) {
        const experience = this.calculateExperience(employee.doj);
        resultDiv.innerHTML = `
          <p><strong>Name:</strong> ${employee.name}</p>
          <p><strong>ID:</strong> ${employee.id}</p>
          <p><strong>Skill:</strong> ${employee.skill}</p>
          <p><strong>Department:</strong> ${employee.department}</p>
          <p><strong>Experience:</strong> ${experience} years</p>
        `;
      } else {
        resultDiv.textContent = "Employee not found.";
      }
    }
  
    calculateExperience(doj) {
      const joiningDate = new Date(doj);
      const currentDate = new Date();
      const diffInYears = currentDate.getFullYear() - joiningDate.getFullYear();
      return diffInYears;
    }
  
    clearInputs() {
      document.getElementById("name").value = "";
      document.getElementById("id").value = "";
      document.getElementById("skill").value = "";
      document.getElementById("doj").value = "";
      document.getElementById("department").value = "";
    }
  }
  
  const employeeManager = new EmployeeManager();
  