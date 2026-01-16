import Listing from "../models/listing.js";

export const AddListing = async (req, res) => {
  try {
 
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "At least one photo is required",
      });
    }

const photos = req.files.map(file => file.path);




    const { title, description, price, location, category,lat,lng } = req.body;


    const newListing = await Listing.create({
      title,
      description,
      location,
      category,
      host: req.userId,
      photos,
       price: Number(price),            
  lat: lat ? Number(lat) : null,     
  lng: lng ? Number(lng) : null,
    });

    return res.status(201).json({
      message: "Listing created successfully",
      listing: newListing,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to create listing",
      error: error.message,
    });
  }
};


export  const getlisting = async (req,res,next)=>{

try {
  
    const listings  = await Listing.find();
 return res.status(200).json(listings)
} catch (error) {
      return res.status(500).json({
      message: "Failed to fetch listings",
    });
}
}

export const  getDetails = async (req,res,next)=>{

try {
const {id} = req.params;
  const details = await Listing.findById(id)
return res.status(200).json(details)
  
} catch (error) {
    return res.status(500).json({
      message: "Failed to fetch listings",
    });
}
}

export const getCatListing = async (req,res,next)=>{
  
try {
const {cat} = req.params;

const CatListing = await Listing.find({category:cat})
return res.status(200).json(CatListing);

} catch (error) {
  return res.status(500).json({message:"failed to get listing"})
}

}




export const myListings= async (req,res,next)=>{
try {
  
const userId = req.userId
const myListings = await Listing.find({host:userId})
return res.status(201).json(myListings)

} catch (error) {
  return res.status(500).json({message : "server error in fetching my listing"})
}

}


export const editListing  = async (req,res,next)=>{



try {
  
const userId = req.userId;
const {id} =  req.params;
const listing  = await Listing.findById(id);


if (!listing.host.equals(userId))
{
return res.status(403).json({message:"unauthorzed access"})
}

const images = req.files?.map(file => file.path) || [];


if(images.length>0){
  req.body.photos = images
}

const updatedListing = await Listing.findByIdAndUpdate(
  id,
  req.body,
  {new:true}
)

return res.status(200).json(updatedListing)


} catch (error) {
  return res.status(500).json({message : "server error in updating listing"})
}
}


export const deleteListing = async (req, res) => {
  try {

    const userId = req.userId;
    const { id } = req.params;

    const listing = await Listing.findById(id);

    if (!listing) {
      return res.status(404).json({
        message: "Listing not found"
      });
    }

    if (!listing.host.equals(userId)) {
      return res.status(403).json({
        message: "Unauthorized access"
      });
    }

    await Listing.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Listing deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete listing",
      error: error.message
    });
  }
};
