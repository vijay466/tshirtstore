import React ,{useState,useEffect} from 'react'
import { isAutheticated } from '../auth/helper'
import Base from '../core/Base'
import { getAllCategory, removeCategory } from './helper/adminapicall'
import { Link } from 'react-router-dom';






const  ManageCategory =()=> {

    const [categories,setCategories] = useState([])
  
    const {user,token} = isAutheticated();
    const preload = () => {
      getAllCategory().then(data => {
        if(data?.error){
          console.log(data?.error)
        }else {
          setCategories(data);
        }
  
      });
    };
    useEffect(() => {
      preload()
    },[])

    const deleteCategory = categoryId => {
        removeCategory(categoryId ,user._id, token).then(data => {
            if(data?.error){
              console.log(data?.error)
            }else {
              preload();
            }
          })
    }
        

    return(
        <Base title="Welcome admin" description="Manage products here">
        <h2 className="mb-4">All categories:</h2>
        <Link className="btn btn-info" to={`/admin/dashboard`}>
          <span className="">Admin Home</span>
        </Link>
        <div className="row">
          <div className="col-12">
            <h2 className="text-center text-white my-3">categories</h2>
  
            
            {categories.map((category, index) => {
              //console.log(products)
              return (
                <div key = {index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{category.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/category/update/${category._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {
                    deleteCategory(category._id)
                  }} className="btn btn-danger">
                    Delete
                  </button>
                </div>
              </div>);
            })}
          </div>
        </div>
      </Base>
    )
  
} 
export default ManageCategory;