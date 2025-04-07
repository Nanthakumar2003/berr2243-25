const { MongoClient } = require('mongodb');

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

// ✅ Task 2 - Step 2: Add a new driver
drivers.push({
  name: "Nantha Kumar",
  vehicleType: "Hatchback",
  isAvailable: true,
  rating: 4.7,
});

// ✅ Task 2 - Step 1: Display all driver names
console.log("Driver Names:");
drivers.forEach(driver => {
  console.log(driver.name);
});

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");

    const db = client.db("testDB"); // You can rename the DB if needed
    const collection = db.collection("drivers"); // Store drivers in "drivers" collection

    // 🧹 Optional: Clear old data (for testing)
    await collection.deleteMany({});

    // 🚀 Insert the driver array
    await collection.insertMany(drivers);
    console.log("🚗 Driver data inserted!");

    // 📦 Find and display all drivers in the DB
    const allDrivers = await collection.find().toArray();
    console.log("📋 All Drivers from MongoDB:");
    console.log(allDrivers);

  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await client.close();
  }
}

main();
