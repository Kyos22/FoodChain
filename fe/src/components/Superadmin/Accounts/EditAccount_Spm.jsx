import { useEffect, useState } from "react";
import { getUrlApiList } from "../../../Shared/Services/ApiList";
import { useParams } from "react-router-dom";
import {  GetApiById, UpdateApi } from "../../../Shared/Services/ApiFunc";
import Swal from "sweetalert2";
import { NotifyNormal } from "../../../Shared/Services/CommonFunc";

function EditAccount_Spm() {
    const urlList = getUrlApiList();
    const [roles, setRoles] = useState([]);
    const {id} = useParams();
    const [formData, setFormData] = useState({});
    const [inputRoleValue, setInputRoleValue] = useState();

    const HandleOnChangeInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const OnChangeRoleClick = (e) => {
        setInputRoleValue(e.target.value);
    }
    //fetch data from api
    useEffect(() => {
        const fetchData = async () => {
            const combineApiUrl = `${urlList.account.getAccountById}${id}`;
            const accountData = await GetApiById(combineApiUrl);
            if (accountData) {
                setFormData(accountData);
                setInputRoleValue(accountData.idRole);
                console.log("accountData", accountData);
            } else {
                console.error("Failed to fetch account data");
            }

            const roles = await GetApiById(urlList.role.getRoleApi);
            if (roles) {
                setRoles(roles);
            } else {
                console.error("Failed to fetch roles");
            }
        };

        fetchData();
    }, []);

    const HandleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata", formData);
        if (formData.fullName === '' || formData.email === '' || formData.idRole === '') {
            Swal.fire({
                icon: "error",
                title: 'Full Name, Password, Email is required',
                showConfirmButton: false,
                timer: 2000
            });
        } else {
            const post = await UpdateApi(urlList.account.update, {id: formData.id, fullName: formData.fullName, email: formData.email, idRole: inputRoleValue});
            console.log("post", post);
            if (post) {
               NotifyNormal('success', 'Edit Successfully', false, 2000);
               setFormData(formData);
            } else {
                NotifyNormal('error', post.error, false, 2000);
            }
        }
    }


    return (
        <div className="wrapper wrapper-content animated fadeInRight ecommerce">
        <div className="row">
            <div className="col-lg-12">
                <div className="tabs-container">
                        {/* <ul className="nav nav-tabs">
                            <li className=""><a data-toggle="tab" href="#tab-2"> Data</a></li>
                        </ul> */}
                        <div className="">
                            <div className="tab-pane"> 
                                <div className="panel-body">CREATE NEW ACCOUNT</div>
                            </div>
                            <div id="tab-2" className="tab-pane">
                                <div className="panel-body">

                                   <form  role="form" onSubmit={HandleSubmit}>
                                        <fieldset className="form-horizontal">
                        
                                            <div className="form-group"><label className="col-sm-2 control-label">Full Name:</label>
                                                <div className="col-sm-10"><input value={formData.fullName} name="fullName" onChange={HandleOnChangeInput} type="text" className="form-control" placeholder="Full Name"/></div>
                                            </div>

                                            <div className="form-group"><label className="col-sm-2 control-label">Email:</label>
                                                <div className="col-sm-10"><input value={formData.email} name="email" type="text" onChange={HandleOnChangeInput} className="form-control" placeholder="location"/></div>
                                            </div>
                                           
                                            <div className="form-group"><label className="col-sm-2 control-label">Role:</label>
                                                <div className="col-sm-10">
                                                    <select className="form-control"  value={inputRoleValue} onChange={OnChangeRoleClick} >
                                                        {roles.length>0 ? (
                                                            roles.map((role)=>{
                                                            return(
                                                                <option key={role.id}  value={role.id} >{role.nameRole}</option> 
                                                            )
                                                            })
                                                        ):(
                                                            <option>not exist data</option> 
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        
                                            <div className="form-group"><label className="col-sm-2 control-label"></label>
                                                <div className="col-sm-10">
                                                <button className="btn btn-primary" type="submit"><i className="fa fa-check"></i>&nbsp;Submit</button>

                                                </div>
                                            </div>
                                        </fieldset>

                                   </form>

                                </div>
                            </div>
                      
                         
                        </div>
                </div>
            </div>
        </div>

    </div>
     );
}
export default EditAccount_Spm;