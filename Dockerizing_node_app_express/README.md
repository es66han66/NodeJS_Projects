1- Add the Dockerfile as in repo.  
  
2- Create image of app by running - ```docker build . -t example-app```  
  
3- To run the app on docker, run - ```docker run --rm -it -p 8000:8000/tcp example-app:latest```  
  
4- 