import { useEffect, useState } from "react";
import { GetApi } from "../../../Shared/Services/ApiFunc";
import { getUrlApiList } from "../../../Shared/Services/ApiList";

function Product_Spm() {

const urlList = getUrlApiList();
const [products,SetProducts] = useState([]);

useEffect(() => { 
    const fetchData = async () => {
        const products = await GetApi(urlList.product.getProductApi);
        if (products) {
            SetProducts(products);
        } else {
            console.error("Failed to fetch products");
        }
    };

    fetchData();

}, []);

  return (
     <div>
            <div className="row wrapper border-bottom white-bg page-heading">
                <div className="col-lg-10">
                    <h2>Account List </h2>
                    <ol className="breadcrumb">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        
                        <li className="active">
                            <strong>Accounts</strong>
                        </li>
                    </ol>
                </div>
                <div className="col-lg-2">

                </div>
            </div>

        <div className="wrapper wrapper-content animated fadeInRight ecommerce">


            <div className="ibox-content m-b-sm border-bottom">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="control-label" htmlFor="product_name">Find By Id Employee</label>
                            <input type="text" id="product_name" placeholder="Id Employee" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="control-label" htmlFor="price">Find By Fullname</label>
                            <input type="text" id="price"  placeholder="Full name" className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="status">Role</label>
                            <select name="status" id="status" className="form-control">
                                <option  >All</option>
                                
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <div className="custom-button-add-account">
                            <button className="btn btn-info " type="button"><i className="fa fa-paste"></i> Add New Account</button>

                        </div>
                    </div>
                </div>
 <div class="row">
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="control-label" for="date_added">Date added</label>
                            <div class="input-group date">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="date_added" type="text" class="form-control" value="03/04/2014"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="control-label" for="date_modified">Date modified</label>
                            <div class="input-group date">
                                <span class="input-group-addon"><i class="fa fa-calendar"></i></span><input id="date_modified" type="text" class="form-control" value="03/06/2014"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-4">
                        <div class="form-group">
                            <label class="control-label" for="amount">Amount</label>
                            <input type="text" id="amount" name="amount" value="" placeholder="Amount" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                       <div class="ibox-content">

                        <table class="table table-striped">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Data</th>
                                <th>User</th>
                                <th>Value</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td><span class="line">5,3,2,-1,-3,-2,2,3,5,2</span></td>
                                <td>Samantha</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 40% </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td><span class="line">5,3,9,6,5,9,7,3,5,2</span></td>
                                <td>Jacob</td>
                                <td class="text-warning"> <i class="fa fa-level-down"></i> -20% </td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td><span class="line">1,6,3,9,5,9,5,3,9,6,4</span></td>
                                <td>Damien</td>
                                <td class="text-navy"> <i class="fa fa-level-up"></i> 26% </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
        </div>
  );
}

export default Product_Spm;