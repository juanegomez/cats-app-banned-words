const Breed = require("../../models/breedsModel");//get breeds database model

//in this class you will find the different functionalities
//to be performed in the database with the breeds.
class breedService {
  //Get all breeds saved in the database
  async getAllBreeds() {
    const breeds = await Breed.find();
    return breeds;
  }

  //this function obtains the information of a breed
  async getBreed(id) {
    const breed = await Breed.findById(id);
    return breed;
  }
}

module.exports = breedService;
