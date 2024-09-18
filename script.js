document.getElementById('input').addEventListener('change', function() {
    readXlsxFile(this.files[0]).then(function(rows) {
      const headers = rows[0];
      const getCol = (colName) => headers.indexOf(colName);
      
      const cols = {
        department: getCol('Department'),
        gender: getCol('Gender'),
        salary: getCol('Annual Salary'),
        hireDate: getCol('Hire Date'),
        exitDate: getCol('Exit Date'),
        age: getCol('Age'),
        fullName: getCol('Full Name')
      };
      
      const data = rows.slice(1);
  
      const womenInIT = data.filter(row => row[cols.department] === 'IT' && row[cols.gender] === 'Female').length;
      alert(`Antall kvinner i IT-bransjen: ${womenInIT}`);
  
      const departments = new Set(data.map(row => row[cols.department]));
      alert(`Antall avdelinger i selskapet: ${departments.size}`);
  
      const genderCount = data.reduce((acc, row) => {
        acc[row[cols.gender]] = (acc[row[cols.gender]] || 0) + 1;
        return acc;
      }, {});
      alert(genderCount.Male > genderCount.Female ? 'Flere mannlige ansatte' : 'Flere kvinnelige ansatte');
  
      const youngestAge = Math.min(...data.map(row => row[cols.age]));
      const youngestEmployees = data.filter(row => row[cols.age] === youngestAge).map(row => row[cols.fullName]);
      alert('Yngste ansatte:', youngestEmployees);
  
      const highestSalary = Math.max(...data.map(row => row[cols.salary]));
      const departmentWithHighestSalary = data.find(row => row[cols.salary] === highestSalary)[cols.department];
      alert(`Avdeling med høyest lønn: ${departmentWithHighestSalary}`);
  
      const earliestHireDate = new Date(Math.min(...data.map(row => new Date(row[cols.hireDate]))));
      const firstEmployee = data.find(row => new Date(row[cols.hireDate]).getTime() === earliestHireDate.getTime());
      alert(`Første ansatte: ${firstEmployee[cols.fullName]}`);
  
      const resignedIn2019 = data.filter(row => new Date(row[cols.exitDate]).getFullYear() === 2019).length;
      alert(`Antall ansatte som sluttet i 2019: ${resignedIn2019}`);
  
      const latestExitDate = new Date(Math.max(...data.map(row => new Date(row[cols.exitDate]))));
      const lastEmployeeToLeave = data.find(row => new Date(row[cols.exitDate]).getTime() === latestExitDate.getTime());
      alert(`Siste som sluttet: ${lastEmployeeToLeave[cols.fullName]}`);
  
      const nameCounts = data.reduce((acc, row) => {
        acc[row[cols.fullName]] = (acc[row[cols.fullName]] || 0) + 1;
        return acc;
      }, {});
      const sameNameEmployees = Object.keys(nameCounts).filter(name => nameCounts[name] > 1);
      console.log('Ansatte med samme navn:', sameNameEmployees);
    });
  });
  