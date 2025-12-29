import { sheets_v4 } from '@google-sheets/v4';

const SPREADSHEET_ID = '1N2AtxAoDUdDTjACBKRRwXimp-Nwv84RlGgzYxOPtr0E';
const RANGE = 'Sheet1!A2:C';

export interface TableData {
  tableNumber: string;
  status: string;
  reservedBy: string;
}

export async function fetchTableData(): Promise<TableData[]> {
  try {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}`;
    const params = new URLSearchParams({
      key: 'AIzaSyCeY9udrNN_kq0YiM7d6UPZMGCzv5Su4Ec'
    });

    const response = await fetch(`${apiUrl}?${params}`, {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('Google Sheets API Error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      if (response.status === 403) {
        throw new Error('Access denied. Please check API key permissions.');
      } else if (response.status === 404) {
        throw new Error('Spreadsheet or range not found. Please verify the spreadsheet ID and range.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
      throw new Error(`Failed to fetch data from Google Sheets (Status: ${response.status})`);
    }

    const data = await response.json();
    
    if (!data.values || !Array.isArray(data.values)) {
      console.error('Invalid data format received:', data);
      throw new Error('Invalid data format received from Google Sheets');
    }

    return data.values.map((row: string[]) => ({
      tableNumber: row[0] || '',
      status: row[1] || '',
      reservedBy: row[2] || ''
    }));
  } catch (error) {
    console.error('Error fetching table data:', error);
    throw error;
  }
}