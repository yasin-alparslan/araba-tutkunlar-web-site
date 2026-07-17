import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema({
  username:{type:String,required:true,trim:true,minlength:2,maxlength:40},
  email:{type:String,required:true,unique:true,lowercase:true,trim:true},
  password:{type:String,required:true},
  role:{type:String,enum:['user','admin'],default:'user'},
  createdAt:{type:Date,default:Date.now}
});
export default mongoose.models.User || mongoose.model('User',UserSchema);
