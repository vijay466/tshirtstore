import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import { isAutheticated } from '../auth/helper';
import Base from '../core/Base';
import { AddCategory, getAllCategory, getCategory,UpdateCategory } from './helper/adminapicall';



const CreateCategory = ({match})=> {

    const [name, setName] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user,token} = isAutheticated();

    const Preload = categoryId => {
        getCategory(categoryId).then(data => {
            if(data?.error){
                setError(true)
            }else{
                setError("")
                setSuccess(true)
                setName(data.name)
            };
        });
    };
    useEffect(()=> {
        Preload(match.params.categoryId)
    },[]);


    const goBack = () => (
        <div className="mt-5">
            <Link to = "/admin/dashboard" className="btn btn-sm btn-success mb-3 ">Admin Home</Link>
        </div>
    )
    const handleChange  = event => {
        setError("")
        setName(event.target.value);
    };

    const onsubmit = event => {
        event.preventDefault()
        setError("");
        setSuccess(false);
        //backend request fired
        UpdateCategory(match.params.categoryId,user._id, token, {name}).then(data => {
            if(data?.error){
                setError(true)
                setSuccess(false)
            }else{
                setSuccess(true)
                setError("") 
                setName("")
            
            }
        });
            
            
    };
    const SuccessMessage = () => {
        if (success){
            return <h4 className="text-success">Category updated succussfully</h4>
        }
    };
    const ErrorMessage = () => {
        if (error){
            return <h4 className="text-danger">Failed to update category</h4>
        }
    };
        
    

    const myCategoryForm = ()=> {
        return(
            <form>
                <div className="form-group">
                    <p className="lead">Enter the category</p>
                    <input onChange = {handleChange} value = {name} type="text" className="form-control my-3" autoFocus required placeholder ="For Ex. Summer"
                    />
                    <button onClick = {onsubmit} className="btn btn-outline-info">Update Category</button>
                </div>
            </form>
        )
        
    };

    return (
        <Base
         title = "Update the category here"
         description= "Hey admin you can update the categories  here!!"
            className = "containet bg-info p-4">
                <div className="row bg-white rounded">
                    <div className="col-md-8 offset-md-2">
                        {SuccessMessage()}
                        {ErrorMessage()}
                        {goBack()}
                        {myCategoryForm()}
                    </div>
                </div>
            
        </Base>
    )
}
export default CreateCategory;