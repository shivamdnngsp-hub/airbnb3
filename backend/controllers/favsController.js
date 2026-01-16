import Favs from "../models/fav.js";
import Listing from "../models/listing.js";

export const addFav = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const userId = req.userId

    const exist = await Favs.findOne({
      user: userId,
      Listing: listingId
    });

    if (exist) {
      return res.status(200).json({ message: "already added to wishlist" })
    }

    const newfav = await Favs.create({
      user: userId,
      Listing: listingId
    })

    return (
      res.status(201).json({
        message: "fav added succesfully",
        fav: newfav
      })
    )


  } catch (error) {
    return res.status(500).json({ message: " server error in adding fav" })
  }


}

export const fetchWishlist = async (req, res, next) => {

  try {

    const userId = req.userId;


    const wishlist = await Favs.find({ user: userId }).populate("Listing")
    return res.status(201).json(wishlist);


  } catch (error) {
    return res.status(500).json({ message: "server error in fetching wishlist" })
  }


}

export const removeFav = async (req, res, next) => {
  try {


    const { listingId } = req.body;

    await Favs.deleteOne({ Listing: listingId })
    return res.status(201).json({ message: "removed from wishlist" })

  } catch (error) {
    return res.status(500).json({ message: "server error in removing wishlist" })
  }
}


