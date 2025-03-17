//Would be more secure to use a proper backend
//For this task this will suffice assuming we don't need to handle any security.
import NationalPark from "./NationalPark";

class Property {
    park;

    constructor(){
        this.park = new NationalPark();
    }


    async retrievePropertyInfo(uprn) {
        const apiKey = process.env.REACT_APP_API_KEY;

        const results = await fetch(`https://api.propeco.io/properties/${uprn}`, {
            headers: {
                "x-api-key": apiKey
            },
        });
        return await results.json()
            .then((e) => {
                return this.handleData(e);
            })
            .catch( () =>{
                return false;
            });

    }
    handleData(json){
        this.park = new NationalPark();
        try {
            if(json['error']){
                throw new Error(json['error']);
            }
            let x = json['planning'];
            x = x['national_parks']
            this.park.inPark = x['in_national_park'];

            let y = x['nearest_national_park'];
            this.park.nearest_national_park = y['name'];
            this.park.distance = y['distance'];
            if(!y || !this.park.nearest_national_park || !this.park.distance){
                throw new Error("Something went wrong when handling the data");
            }

        }catch(e){
            console.log("error processing data " + e);
            return false;
        }
        return true;
    }
}

export default Property;