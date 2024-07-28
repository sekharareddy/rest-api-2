const { Organization } = require("../models/orgnization");
const { getById } = require("../controllers/organization");

const testData = require("../testData/organization.json");
  
  describe("getById function", () => {
    const  savedData  = testData.getById;

    beforeEach(() => {
      jest.clearAllMocks();
      Organization.findOne = jest.fn().mockResolvedValue(savedData);
    });
  
    it("should get an organization by ID successfully", async () => {
      const result = await getById(
        savedData.orgId
      );
      console.log(result)
      expect(result).toEqual(savedData);
    });
  
    // it("should return null if organization does not exist", async () => {
    //   Organization.findOne.mockResolvedValue(null);
  
    //   const result = await getById(savedData.orgId);
    //   expect(result).toBeNull();
    // });
  
    // it("should throw an error if database operation fails", async () => {
    //   const dbError = new Error("DB error");
    //   Organization.findOne.mockRejectedValue(dbError);
  
    //   await expect(getById(savedData.orgId)).rejects.toThrow("DB error");
    // });
  });
