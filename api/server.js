// const express = require('express');

// const app = express();
// const PORT = 3000;

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const seedData = require('./seed.json');

const provinces = seedData.provinces || [];
const districts = seedData.districts || [];
const stations = seedData.stations || [];
const vehicles = seedData.vehicles || [];
const pings = seedData.pings || [];

function toId(value) {
    const id = Number.parseInt(value, 10);
    return Number.isNaN(id) ? null : id;
}

function findById(items, id) {
    return items.find((item) => item.id === id);
}

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        session: 'NB6007CEM S2'
    });
});

app.get('/provinces', (req, res) => {
    res.json(provinces);
});

app.get('/provinces/:provinceId', (req, res) => {
    const provinceId = toId(req.params.provinceId);
    const province = provinceId === null ? null : findById(provinces, provinceId);

    if (!province) {
        return res.status(404).json({ error: 'Province not found' });
    }

    return res.json(province);
});

app.get('/districts', (req, res) => {
    res.json(districts);
});

app.get('/districts/:districtId', (req, res) => {
    const districtId = toId(req.params.districtId);
    const district = districtId === null ? null : findById(districts, districtId);

    if (!district) {
        return res.status(404).json({ error: 'District not found' });
    }

    return res.json(district);
});

app.get('/stations', (req, res) => {
    res.json(stations);
});

app.get('/stations/:stationId', (req, res) => {
    const stationId = toId(req.params.stationId);
    const station = stationId === null ? null : findById(stations, stationId);

    if (!station) {
        return res.status(404).json({ error: 'Station not found' });
    }

    return res.json(station);
});

app.get('/vehicles', (req, res) => {
    res.json(vehicles);
});

app.get('/vehicles/:vehicleId', (req, res) => {
    const vehicleId = toId(req.params.vehicleId);
    const vehicle = vehicleId === null ? null : findById(vehicles, vehicleId);

    if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
    }

    return res.json(vehicle);
});

app.get('/vehicles/:vehicleId/pings', (req, res) => {
    const vehicleId = toId(req.params.vehicleId);
    const vehicle = vehicleId === null ? null : findById(vehicles, vehicleId);

    if (!vehicle) {
        return res.status(404).json({ error: 'Vehicle not found' });
    }

    const vehiclePings = pings.filter((ping) => ping.vehicle_id === vehicleId);
    return res.json(vehiclePings);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});