## Solution Designed<br>
1. In this solution, we will be pushing the updates(increments on shared counter) from different processes onto a Redis List.<br>
2. If multiple processes are going to push their updates concurrently then whichever reaches first to Redis list will be the one which will get queued first to be applied on shared counter.<br>
3. There will be consumer for this Redis list whose job is to keep getting messages getting enqueued onto this list, pop them out in FIFO order and keep applying updates accordingly on shared counter. While doing so, consumer will put a lock with the process_id (process from whom the update is being applied). If doing so, consumer is unable to set a lock which means that the shared counter is being updated by some other process, it will try to retry the same with an increasing delay for 5 times.<br>
4. Whether the update from a process gets successfully applied or gets failed, at the end the consumer will publish the success or failure onto a RMQ Fan-out exchange which is in turn going to broadcast the success and failure status along with the process id and increment value to all the processes.<br>
5. Every incrementor process will be having their exclusive queue attached to this fan-out exchange to read from it all the updates being applied on the shared counter.<br>
<br>

## Steps to run the application
1. Use ```docker-compose up -d --build``` to spin up rabbitmq and redis instances.<br>
2. We can start 2 incrementor processes using ```node incrementor1.js``` and ```node incrementor2.js```.<br>
3. Once done, we can check the order of updates which should be applied by entering into Redis using command ```docker exec -it sh``` followed by ```redis-cli``` inside the shell, followed by command ```LRANGE counter_updates 0 -1```. This command retrieves all elements from index 0 to the last index (-1) in the list, effectively displaying all elements in the list.<br>
4. Finally we can start the consumer for list using ```node increment.js``` and we should be able to see that updates are applied in FIFO order without any race condition. 