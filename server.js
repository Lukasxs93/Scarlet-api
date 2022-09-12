const express = require('express');
var cors = require('cors');
const { json, response } = require('express');

const app = express();

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

function deepEqual(object1, object2) {
	const keys1 = Object.keys(object1);
	const keys2 = Object.keys(object2);
	if (keys1.length !== keys2.length) {
	  return false;
	}
	for (const key of keys1) {
	  const val1 = object1[key];
	  const val2 = object2[key];
	  const areObjects = isObject(val1) && isObject(val2);
	  if (
		areObjects && !deepEqual(val1, val2) ||
		!areObjects && val1 !== val2
	  ) {
		return false;
	  }
	}
	return true;
  }
  function isObject(object) {
	return object != null && typeof object === 'object';
  }

function containsObject(obj, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if(deepEqual(obj,list[i])){
			return true
		}
    }

    return false;
}


let users = [{email:'luca@erg', password:'ergqrg'}]

// app.get('/users', (request, response) => {
// 	console.log(request);
// 	response.json(users);
// });

app.post('/ahutenticate', (request, response) => {
	let toVerify = request.body;
	console.log(toVerify);
	const result = containsObject(toVerify,users)
	console.log(result)
		response.json(result)
	
});
app.get('/users',(request,response)=>{
	response.json(users)
})
app.post('/add',(request,response)=>{
	let newUser = request.body;
	users.push(newUser);
})

app.listen(PORT, () =>
	console.log(`listening on port ${port} for your requests`)
);
