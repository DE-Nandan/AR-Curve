const mongoose = require('mongoose')
const path  = require('path')
const coverImageBasePath = 'upload/imagesF'
const imageSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    coverImageName : {
        type : String,
        required : true
    },
    sno :{
		type: Number,
		required : true,
		unique:true
	}
    
},
{
    // otherwise it would be dynmic based on name of model
    collection:'images'
}

)

imageSchema.virtual('coverImagePath').get(function (){
    if(this.coverImageName != null){
        return path.join('/',coverImageBasePath,this.coverImageName)
    }
})

module.exports = mongoose.model('imageSchema',imageSchema)
module.exports.coverImageBasePath = coverImageBasePath