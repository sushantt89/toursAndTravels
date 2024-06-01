import express from "express";
import {
  createTour,
  deleteTour,
  getAllTour,
  getSingleTour,
  updateTour,
  getTourBySearch,
  getFeaturedTours,
  getToursCount
} from "../controllers/tourController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

//create new tour
router.post("/",verifyAdmin, createTour); //so ya verifAdmin and createTour are 2 middleware funcs so paila verify auxa then create so verifyadmin sakisaepaxi arko middleware func ma jana parne hunxa its like a chain so ho arko ma jana lai nai tyo func vitra afno kam sakisake paxi next() use garya hunxa garena vane next middleware func ma jadian so basically verify ma next() xaina vaye create ma gayena.
//update tour
router.put("/:id",verifyAdmin, updateTour);
//Delete tour
router.delete("/:id",verifyAdmin, deleteTour);
//getSingle tour
router.get("/:id", getSingleTour);
//getAll tour
router.get("/", getAllTour);
//search tour
router.get("/search/getTourBySearch", getTourBySearch);
//Featured tour
router.get("/search/getFeaturedTours",getFeaturedTours);
//Tours count
router.get("/search/getToursCount",getToursCount);
export default router;
