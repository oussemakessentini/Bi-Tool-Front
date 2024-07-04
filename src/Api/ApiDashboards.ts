
import DashboardType from '../types/DashboardType';
const API_URL = 'http://localhost:5000/dashboard';
const API_URL2 = 'http://localhost:5004/pdf/generatePDF'

export const generatePDF = async (id : number) =>{
 
  try {
          const response = await fetch(`${API_URL2}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      const pdfBlob = new Blob([arrayBuffer], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      return pdfUrl;

  } catch (error) {
    console.error('Failed to generate PDF:', error);
  
  }

}


export const getDashboards = async () : Promise<DashboardType[]>=> {
    const response = await fetch(`${API_URL}/getDashboards`);
    const data = await response.json();
    return data;
};

export const getDashboardById = async (id: number) : Promise<DashboardType> => {
    const url = `${API_URL}/getId/${id}`;
  
    return fetch(url, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        if (Array.isArray(data) && data.length > 0) {
            return data[0];
          } else {
            throw new Error(`Data with id ${id} not found`);
          }
    })
    .catch(error => console.error(error));
};
  
export const createDashboard = async (dashboardItem: any) => {
    const url = `${API_URL}/add`;
    fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(dashboardItem)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }
    return response.json();
    })
    .then(data => {
    console.log(data);
    })
    .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
    });
};
  
export const updateDashboard = async (id: number, dashboardItem: any) => {
    const url = `${API_URL}/update/${id}`;
    fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dashboardItem)
    })
    .then(response => {
    if (response.ok) {
        console.log('Dashboard updated successfully');
    } else {
        console.error('Dashboard update failed');
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
};
  
export const deleteDashboard = async (id: number) => {
    const url = `${API_URL}/delete/${id}`;
  
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      console.log('Dashboard deleted successfully');
      return Promise.resolve(); // Resolve the promise to indicate successful deletion
    } catch (error) {
      console.error('There was a problem deleting the dashboard:', error);
      return Promise.reject(error); // Reject the promise to indicate an error during deletion
    }
  };
  
  