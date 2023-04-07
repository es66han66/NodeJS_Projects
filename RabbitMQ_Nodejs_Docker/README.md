1- Run ```docker-compose up -d``` to start RMQ instance, verify in localhost:15672.  
  
2- We will use amqplib for RMQ connection, The library supports 2 methods (async or callback) we are going to use async here. If you want to enable the callback one, just add /callback_api at the end of each import.  
  
3- 