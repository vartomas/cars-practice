const Car = require('./carModel')

getAllCars = async (req, res) => {
    try {
        const all = await Car.find({})
        res.json(all)
    } catch (e) {
        res.status(400).json(e)
    }
}

createCar = async (req, res) => {
    const newCar = new Car(req.body)
    try {
        const createdCar = await newCar.save()
        res.json(createdCar)
    } catch (e) {
        res.status(400).json(e)
    }
}

getCar = async (req, res) => {
    try {
        const found = await Car.findById(req.params.id)
        res.json(found)
    } catch (e) {
        res.status(400).json(e)
    }
}

deleteCar = async (req, res) => {
    try {
        const deleted = await Car.findByIdAndRemove(req.params.id)
        res.json(deleted)
    } catch (e) {
        res.status(400).json(e)
    }
}

updateCar = async (req, res) => {
    try {
        const updated = await Car.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.json(updated)
    } catch (e) {
        res.status(400).json(e)
    }
}

filterCars = async (req, res) => {
    const filter = {}
    if (req.body.filterByRun) {
        if (req.body.runGreaterThan) filter.run = {$gte: req.body.runG}
        if (req.body.runLowerThan) filter.run = {...filter.run, $lte: req.body.runL}
    }
    if (req.body.filterByYear) {
        if (req.body.yearGreaterThan) filter.year = {$gte: new Date(req.body.yearG)}
        if (req.body.yearLowerThan) filter.year = {...filter.year, $lte: new Date(req.body.yearL)}
    }
    if (req.body.filterByGearbox) filter.gearbox = req.body.gearbox

    sort = arr => {
        switch(req.body.sortBy) {
            case 'year':
                arr = arr.sort((a, b) => a.year - b.year).reverse()
                break
            case 'model':
                arr = arr.sort((a, b) => (a.model > b.model) ? 1 : -1)
                break
            case 'run':
                arr = arr.sort((a, b) => a.run - b.run)
                break
        }
        return arr
    }

    try {
        const filtered = await Car.find(filter)
        res.json(sort(filtered))
    } catch (e) {
        res.status(400).json(e)
    }
}

/*
filtro pvz su visais property
{
    "filterByRun": true,
    "runGreaterThan": true,
    "runLowerThan": true,
    "runG": 20000,
    "runL": 100000,
    "filterByYear": true,
    "yearGreaterThan": true,
    "yearLowerThan": true,
    "yearG": "2010",
    "yearL": "2015",
    "filterByGearbox": true,
    "gearbox": "auto",
    "sortBy": "year"
}
*/

module.exports = {
    getAllCars,
    createCar,
    getCar,
    deleteCar,
    updateCar,
    filterCars
}