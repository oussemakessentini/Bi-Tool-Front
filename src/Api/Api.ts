
import ItemType from '../types/ItemType';

const API_URL = 'http://localhost:5000/item';

export const getDashboardItems = async () : Promise<ItemType[]>=> {
    const response = await fetch(`${API_URL}/getItems`);
    const data = await response.json();
    return data;
};

export const getDashboardItemById = async (id: number) : Promise<ItemType> => {
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
  
export const createDashboardItem = async (dashboardItem: any) => {
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
  
export const updateDashboardItem = async (id: number, dashboardItem: any) => {
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
        console.log('Item updated successfully');
    } else {
        console.error('Item update failed');
    }
    })
    .catch(error => {
    console.error('Error:', error);
    });
};
  
export const deleteDashboardItem = async (id: number) => {
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
  
      console.log('Item deleted successfully');
      return Promise.resolve(); // Resolve the promise to indicate successful deletion
    } catch (error) {
      console.error('There was a problem deleting the item:', error);
      return Promise.reject(error); // Reject the promise to indicate an error during deletion
    }
  };
 
  export const getItemsOfDashboard = async (id: number): Promise<ItemType[]> => {
    const url = `${API_URL}/getDashboardItems/${id}`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching dashboard items: ${response.statusText}`);
      }
  
      const data = await response.json();
  
      if (Array.isArray(data) && data.length > 0) {
        return data;
      } else {
        throw new Error(`Data with id ${id} not found`);
      }
    } catch (error) {
      console.error(error);
      throw error; // rethrow the error to handle it elsewhere if needed
    }
  };
  