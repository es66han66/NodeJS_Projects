let responseData = null;
const hitApi = async() => {
  try {
    const response = await fetch('http://127.0.0.1:8000/checkServer');
    const data = await response.json();
    responseData = data; 
    console.log("data is",responseData)
  } catch (error) {
    console.error(error?.message ?? "ticker call failed");
  } finally {
    hitApi();
  }
}

hitApi()