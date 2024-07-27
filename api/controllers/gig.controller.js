import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";
import crearError from "../utils/createError.js";

export const createGig = async (req, res, next) => {
  if (!req.isSeller)
    return next(crearError(403, "only sellers can create a gig!!"));

  const newGig = new Gig({
    userId: req.userId, //user id comes from jwt(because other gig me kisi or ki id na dal sko)
    ...req.body,
  }); //created new object

  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
    // Sends the savedGig object back to the client in JSON format.
    // Using json is crucial for API development as it ensures the
    // response can be easily consumed by the client (e.g., a front-end application or another service).
  } catch (err) {
    next(err);
  }
};

export const deleteGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (gig.userId !== req.userId)
      return next(createError(403, "you can delete only your gig!"));

    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).send("Gig has beeen deleted!");
  } catch (err) {
    next(err);
  }
};

export const getGig = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) return next(createError(404, "gig not found!"));

    res.status(200).send(gig);
  } catch (err) {
    next(err);
  }
};

export const getGigs = async (req, res, next) => {
  // const filters = {
  //   cat:"design",
  //   price: {$gt:200},
  //   title : {$regex :"Design 2"} //is searching k basis pr gigs select honge
  // }

  const q = req.query;
  const filters = {
    // cat: q.cat,    query me category nai hogi to error aega
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && {cat: {$regex: q.cat, $options: "i"}}),
    //if cat nai hai , no prob..will not create anything
    // if hai. to obj create hoga... then using spreadoperator obj will come outside
    ...((q.min|| q.max) && {
      price:{
        ...(q.min && {$gt: q.min}),
    ...(q.max && {$lt: q.max}),
  },
}),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
    //regex used for pattern matching
    //{{url}}gigs?cat=AI&search=logo ..by using options our search won't be case sensitive anymore. title me "Logo" hai
    //we can search for "logo" also
  };

  try {
    const gigs = await Gig.find(filters).sort({ [q.sort]:-1}); //price :-1 for sorting
    res.status(200).send(gigs);
  } catch (err) {
    next(err);
  }
};

//{{url}}gigs?cat=design&max=500
//{{url}}gigs?cat=design&min=90&search=professional
//{{url}}gigs?userId=66924e851d07bfd78452c0a8