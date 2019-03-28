const Request = require("request");
const peopleAPI = "http://agl-developer-test.azurewebsites.net/people.json";

exports.extractCatNamesFromAPI = (api, cb) => {

    let catNames = { male : [], female : [] };

    Request.get(api, {timeout: 1500}, (err, response, body) => {
        if(err) {
            cb(err);
            return;
        }
        let bodyParsed = JSON.parse(body);
        for(let person of bodyParsed){
            if(person.pets){
                for(let pet of person.pets){
                    if(pet.type === 'Cat'){
                        if(person.gender == 'Male'){
                            catNames.male.push(pet.name);
                        }else if(person.gender == 'Female'){
                            catNames.female.push(pet.name);
                        }
                    }
                }
            }
        }
        cb(null,catNames);
    });

};

exports.extractCatNamesFromAPI(peopleAPI,(err, catNames)=>{
    if(err){
        console.log("Invalid API:"+ err);
        return;
    }
    console.log("Male");
    console.log(catNames.male.sort());
    console.log("Female");
    console.log(catNames.female.sort());
});
