
import express from "express"
import { createmeet, deletemeet, getAllmeet, getusermeet, updatemeet } from "../Controllers/meetController.js"

const route=express.Router()

route.post('/create/:id',createmeet);
route.put('/update/:id',updatemeet);
route.delete('/delete/:id',deletemeet);
route.get('/getallmeet/:id',getAllmeet);
route.get('/getuser/:id',getusermeet);

export default route;
