1- Add ```Dockerfile.dev``` and ```Dockerfile.prod``` as in repo.  
  
2- Add ```docker-compose.yml``` which will behave as default file for ```docker-compose```, we will utilise this for development directly and for production we will add up the changes with a ```docker-compose.prod.yml``` file.  
  
3- To run in development, run- ```docker-compose up``` while for production run, ```docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d```  
  
4- When we will run for production the default values will be taken from ```docker-compose.yml``` file but the specific changes for production will be taken from ```docker-compose.prod.yml``` file.  
  
5- Run ```npm i make``` so that we don't need to run commands individually but directly using make by defining the rules in ```Makefile``` as in repo.