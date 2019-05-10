const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const typeSchema=new Schema({
    id:Schema.Types.ObjectId,
    typeId:Number,//与json命名相同
    typeName:String
})

mongoose.model('Type',typeSchema);