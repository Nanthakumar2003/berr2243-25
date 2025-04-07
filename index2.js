const { MongoClient } = require('mongodb');

// Step 1: Create driver data
const drivers = [
  {
    name: "John Doe",
    vehicleType: "Sedan",
    isAvailable: true,
    rating: 4.8,
  },
  {
    name: "Alice Smith",
    vehicleType: "SUV",
    isAvailable: false,
    rating: 4.5,
  },
];

// Step 2: Add an additional driver
drivers.push({
  name: "Nantha Kumar",
  vehicleType: "Hatchback",
  isAvailable: true,
  rating: 4.7,
});

// Step 3: Show all drivers' names
console.log("Driver Names:");
drivers.forEach(driver => {
  console.log(driver.name);
});

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("testDB");
    const collection = db.collection("drivers");

    // Insert all drivers into MongoDB
    await collection.insertMany(drivers);
    console.log("Drivers inserted!");

    // Query and display all drivers from the database
    const allDrivers = await collection.find().toArray();
    console.log("All Drivers in DB:", allDrivers);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

main();
