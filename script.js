const baseURL = "http://localhost:3000";

// Users
async function createUser() {
  const name = document.getElementById("userName").value;
  const email = document.getElementById("userEmail").value;
  await fetch(`${baseURL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  loadUsers();
}

async function loadUsers() {
  const res = await fetch(`${baseURL}/users`);
  const users = await res.json();
  const list = document.getElementById("userList");
  list.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.name} (${user.email})`;
    li.className = "list-group-item";
    list.appendChild(li);
  });
}

// Rides
async function createRide() {
  const pickupLocation = document.getElementById("pickupLocation").value;
  const destination = document.getElementById("destination").value;
  const driverId = document.getElementById("driverId").value;
  await fetch(`${baseURL}/rides`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pickupLocation,
      destination,
      driverId,
      status: "requested"
    }),
  });
  loadRides();
}

async function cancelRide(id) {
  await fetch(`${baseURL}/rides/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "cancelled" }),
  });
  loadRides();
}

async function deleteRide(id) {
  await fetch(`${baseURL}/rides/${id}`, { method: "DELETE" });
  loadRides();
}

async function loadRides() {
  const res = await fetch(`${baseURL}/rides`);
  const rides = await res.json();
  const list = document.getElementById("rideList");
  list.innerHTML = "";
  rides.forEach(ride => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    li.innerHTML = `
      ${ride.pickupLocation} ➜ ${ride.destination} (${ride.status})
      <span>
        <button class="btn btn-warning btn-sm me-2" onclick="cancelRide('${ride._id}')">Cancel</button>
        <button class="btn btn-danger btn-sm" onclick="deleteRide('${ride._id}')">Delete</button>
      </span>
    `;
    list.appendChild(li);
  });
}

// Initialize
loadUsers();
loadRides();
