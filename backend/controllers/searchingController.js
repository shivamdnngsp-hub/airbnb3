import Listing from "../models/listing.js";

export const searching = async (req,res,next)=>{

  try {
    const { q } = req.query;

    if (!q) {
      return res.json([]);
    }

    const results = await Listing.aggregate([
      {
        $search: {
          index: "listingSearch",
          text: {
            query: q,
            path: ["title", "location", "category"],
            fuzzy: {
              maxEdits: 2
            }
          }
        }
      },
      {
        $limit: 20
      }
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }

}
