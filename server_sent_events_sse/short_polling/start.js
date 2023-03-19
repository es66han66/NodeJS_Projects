let responseData = null;
const hitApi = async() => {
  try {
    const response = await fetch('http://127.0.0.1:8000/checkServer');
    const data = await response.json();
    console.log("data is",data)
    responseData = data; 
  } catch (error) {
    console.error(error?.message ?? "call failed");
  }
}
setInterval(() => hitApi(), 2000);