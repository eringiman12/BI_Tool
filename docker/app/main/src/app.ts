import {Item} from './item';
var elem = document.getElementById('output');
var aBook = new Item('はじめてのTypeScript',1980);
aBook.say(elem);
type ApiResponse = {
    id: number;
    name: string;
    address: string;
    date: string;
    cose: string;
  };
  
async function fetchData(): Promise<ApiResponse | null> {
try {
    const response = await fetch('http://localhost:80/api/este/');
    if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApiResponse = await response.json();
    console.log(data);
    return data;
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

fetchData().then(data => {
    if (data) {
        console.log(data.name); // APIから取得したデータを利用
    }
});