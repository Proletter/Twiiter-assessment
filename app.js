const fs = require('fs/promises');
const axios = require('axios')


const response = []

function writeToLocal(response){
    let data = JSON.stringify(response, null, 2);
    fs.writeFile(`${__dirname}/response.txt`,  data, function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
    console.log("Response written to local file system");
}



async function callEndpoints(endpoint){
    try {
      const res = await axios.get(endpoint).catch(err=>console.log(err))
      response.push(res.data)
      console.log(res.data)
        
    } catch (error) {
        console.log(error)
    }

}

function getEndpointsFromFile(file){
const endpoints = file.split("\n")
endpoints.forEach((endpoint)=>{
    callEndpoints(endpoint)
})
writeToLocal(response)
}

async function loadServers(file) {
  try {
    const data = await fs.readFile(`${__dirname}/${file}`, { encoding: 'utf8' });
    getEndpointsFromFile(data);
  } catch (error) {
    console.log(error);
  }
}
loadServers('servers.txt');
