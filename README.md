## installation steps: ##
* configure BROKER variable if you want to change the domain
* server application gets mqtt messages comes from devices in order to run server:
  * cd server
  * npm i
  * npm run start
* device application creates and sends the mqtt messages in order to run device: 
  * cd ../device
  * npm i
  * npm run start
