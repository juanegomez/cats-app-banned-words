const Fact = require("../../models/factsModel");//get fact database model

class factService {
  //Get all facts saved in the database
  async getAllFacts() {
    const facts = await Fact.find();
    return facts;
  }

  //this function obtains the information of a fact
  async getFact(id) {
    const facts = await Fact.findById(id);
    return facts;
  }
}

module.exports = factService;
