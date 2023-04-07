1- Install Jmeter from ```https://jmeter.apache.org/usermanual/get-started.html#install```  
  
2- Go to ```https://jmeter.apache.org/download_jmeter.cgi```  
  
3- Download ZIP file.  
  
4- Once the zip folder is downloaded, go to the folder location, and then extract the zip folder. Once the folder is extracted go inside that folder and then go inside the bin folder here. In the bin folder open the jmeter.bat file  
  
5- Right-click on the Test plan and go to Add -> Threads(users) -> select the Thread Group  
  
6- Now, we need to configure the number of threads, Ramp-up time.  
  
7- Once we configure the Thread Group, it’s time to select the sampler. Since we need to test the REST endpoints we need to select the HTTP Request.  
  
8- Right click on thread group -> go to Add -> go to Sampler -> go to HTTP Request.  
  
9- Add GET and POST Requests.  
  
10- Add Listeners by right clicking on Thread group -> go to Add -> go to Listener -> Click on following  
 a) View results tree  
 b) Summary report  
 c) Aggregate Report  
 d) Aggregate graph  
  
11- 