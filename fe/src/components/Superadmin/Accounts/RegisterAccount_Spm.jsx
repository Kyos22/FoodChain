import { useEffect, useState } from "react"
import { GetApi, PostApi } from "../../../Shared/Services/ApiFunc";
import { getUrlApiList } from "../../../Shared/Services/ApiList";
import Swal from "sweetalert2";
import { error, timers } from "jquery";
import { Title } from "chart.js";
import { NotifyNormal } from "../../../Shared/Services/CommonFunc";

function RegisterAccount_Spm (){
    const urlList = getUrlApiList();
    const[roles,setRoles] = useState([]);
    const [formData,setFormData] = useState({
        fullName: '',
        email   : '',
        password: '12345678',
        idRole    : 2,
    });
    const HandlerOnChangeInput = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const OnChangeRoleClick = (value) => {
        setFormData({...formData,idRole: value});
      };
      

    useEffect(()=>{
        const FetchData = async()=>{
            const roles = await GetApi(urlList.role.getRoleApi);
            if (roles){
                setRoles(roles);
            }
        }
        FetchData();
    },[])

    

    const HandleSubmit = async (e) => {
        e.preventDefault();
        console.log("formdata",formData);
        if (formData.fullName === '' || formData.email === '' || formData.idRole === '' ){  
            NotifyNormal('error','fullName, Password, Email is required',false,2000);
        } else {
            
            const post = await PostApi(urlList.account.register,formData);
            console.log("post",post);
            if(post.data){
                NotifyNormal('success','Create Successfully',false,2000);
                setFormData({
                    fullName: '',
                    email: '',
                    password: '12345678',
                    idRole: 2
                })
            }else{
                NotifyNormal('error',post.error,false,2000);
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

                                   <form onSubmit={HandleSubmit} role="form">
                                        <fieldset className="form-horizontal">
                        
                                            <div className="form-group"><label className="col-sm-2 control-label">Full Name:</label>
                                                <div className="col-sm-10"><input value={formData.fullName} name="fullName" onChange={HandlerOnChangeInput} type="text" className="form-control" placeholder="Full Name"/></div>
                                            </div>

                                            <div className="form-group"><label className="col-sm-2 control-label">Email:</label>
                                                <div className="col-sm-10"><input value={formData.email} name="email" onChange={HandlerOnChangeInput} type="text" className="form-control" placeholder="location"/></div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-2 control-label">Password:</label>
                                                <div className="col-sm-10"><input type="text" value={formData.password} className="form-control" placeholder="Quantity"/></div>
                                            </div>
                                            <div className="form-group"><label className="col-sm-2 control-label">Role:</label>
                                                <div className="col-sm-10">
                                                    <select className="form-control" value={formData.idRole} onChange={(e) => OnChangeRoleClick(e.target.value)} >
                                                        {/* <option>option 1</option> */}
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
                                                <button className="btn btn-primary " type="submit"><i className="fa fa-check"></i>&nbsp;Submit</button>

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
    )
}
export default RegisterAccount_Spm