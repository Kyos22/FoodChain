import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import '../../../helpers/css/plugins/footable/footable.core.css';
import { useNavigate } from 'react-router-dom';
import { getUrlApiList } from '../../../Shared/Services/ApiList';
import { UseDebounce } from '../../../Shared/Services/CommonFunc.jsx';
import { GetApi, UpdateStatusApi } from '../../../Shared/Services/ApiFunc.jsx';
// import '../../../helpers/js/plugins/metisMenu/jquery.metisMenu.js';
// import '../../../helpers/js/plugins/slimscroll/jquery.slimscroll.js';
// import '../../../helpers/css/plugins/switchery/switchery.css';
import Switch from "react-switch";
import { type } from '@testing-library/user-event/dist/type/index.js';
import Swal from 'sweetalert2';

// import switchery from 'switchery';
// import '../../../helpers/jsp/inspinia.js';
// import 'switchery/dist/switchery.css';  // Import CSS từ thư viện switchery

function Accounts_Spm(){
    const navigate = useNavigate();
    const[accounts,SetAccounts]             = useState([]);
    const[roles,setRoles]                   = useState([]);
    const[inputFullName,SetInputFullName]   = useState('');
    const[inputUsername,setInputUsername]   = useState('');
    const[inputRoleValue,setInputRoleValue] = useState('');
    const[defaultRole,setDefaultRole]       = useState('all');
    const urlList                           = getUrlApiList();
    const [switchStates, setSwitchStates]   = useState({});


    let cacheUrl = [];

    const debounceInputFullName = UseDebounce(inputFullName,500);
    const debounceInputUsername = UseDebounce(inputUsername,500);
    

    const HandleSearchFullNameChange = (e) => {
        SetInputFullName(e.target.value);
    };

    const HandleSearchUsernameChange = (e) => {
        setInputUsername(e.target.value); 
    }

    const HandleRoleChange = (e) => {
        setInputRoleValue(e.target.value);
    }
   
    //Fetch data
    useEffect(()=>{
        const FetchData = async() => {
            const dataAccount = await GetApi(urlList.account.getAccountApi);
            if(dataAccount){
                SetAccounts(dataAccount);
            }

            const dataRole = await GetApi(urlList.role.getRoleApi);
            if (dataRole){
                setRoles(dataRole);
            }
        }
        FetchData()
        
    },[]);

    //loading data
    useEffect(() => {
        const fetchData = async () => {
            let url = urlList.account.getAccountApi; 
            console.log("cacheUrl",cacheUrl);
            if (inputFullName) {
                url = urlList.account.findByFullnameApi + inputFullName;
                cacheUrl.push(url);
            } else if (inputUsername) {
                url = urlList.account.findByUsernameApi + inputUsername;
                cacheUrl.push(url);
            } else if (inputRoleValue) {
                if (inputRoleValue === 'all'){
                    url = urlList.account.getAccountApi; 
                } else {
                    url = urlList.account.findByRoleApi + inputRoleValue;
                    cacheUrl.push(url);
                }
            } 
            
            try {
                const dataReceived = await GetApi(url);
                if (dataReceived){
                    SetAccounts(dataReceived);
                }
            } catch (error) {
                console.log('API Error:', error);
            }
        };

        fetchData();
    }, [debounceInputFullName, debounceInputUsername, inputRoleValue, defaultRole]);

    //just watch data
    // useEffect(()=>{
    //     console.log("role",roles);
    // },[roles]);

   
    
    const [state, dispatch] = useReducer(reducer, {});

    
    useEffect(() => {
        const initialState = accounts.reduce((acc, account) => {
            acc[account.id] = account.status; 
            return acc;
        }, {});
        dispatch({ type: 'INIT_STATE', payload: initialState });
    }, [accounts]);

    const HandleToggle = async (id) => {
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure?',
            text: 'Do you want to change the status of this account?',
            showCancelButton: true ,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed){
                const updatedStatus = !state[id];
                try{
                    const response = UpdateStatusApi(urlList.account.updateStatus, { id, status: updatedStatus });
                    if (response) {
                        dispatch({type: 'TOGGLE_SWITCH_SUCCESS', id});
                    }else{
                        console.error('Failed to update status');
                    }
                }catch(error){
                    console.error('Error updating status:', error);
                }
            }
        });
        
        
    }

    function reducer(state, action) {
        switch (action.type) {
            case 'INIT_STATE':
                return action.payload;
            case 'TOGGLE_SWITCH_SUCCESS':

                return {
                    ...state,
                    [action.id]: !state[action.id],
                };
                
              
            default:
            return state;
        }
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccounts = accounts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(accounts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return(
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
                            <input type="text" id="product_name" value={inputUsername} onChange={HandleSearchUsernameChange} placeholder="Id Employee" className="form-control"/>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label className="control-label" htmlFor="price">Find By Fullname</label>
                            <input type="text" id="price"  value={inputFullName} onChange={HandleSearchFullNameChange} placeholder="Full name" className="form-control"/>
                        </div>
                    </div>
                    
                    <div className="col-sm-2">
                        <div className="form-group">
                            <label className="control-label" htmlFor="status">Role</label>
                            <select name="status" id="status" className="form-control" value={inputRoleValue} onChange={HandleRoleChange}>
                                <option value={defaultRole} >All</option>
                                {roles.length>0 ? (
                                    roles.map((role)=> {     
                                        return(
                                            <option key={role.id} value={role.id} >{role.nameRole}</option>
                                        )
                                    })
                                ):(
                                  
                                        <option value="0">Not Data</option>
                                    
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="col-sm-2" >
                        <div className="custom-button-add-account">
                            <button className="btn btn-info " onClick={()=>navigate('/superadmin/accounts/register')} type="button"><i className="fa fa-paste"></i> Add New Account</button>

                        </div>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div className="ibox">
                        <div className="ibox-content">

                            <table className="footable table table-stripped toggle-arrow-tiny" data-page-size="15">
                                <thead>
                                <tr>

                                    <th data-toggle="true">Id Employee</th>
                                    <th data-toggle="true">Email</th>
                                    <th data-hide="phone">Full Name</th>
                                    {/* <th data-hide="all">Description</th> */}
                                    <th data-hide="phone">Role</th>
                                    <th data-hide="phone">Status</th>
                                 
                                    {/* <th data-hide="phone">Status</th> */}
                                    <th className="text-right" data-sort-ignore="true">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                
                                
                               
                                {currentAccounts.length > 0 ? (
                                    currentAccounts.map((account) => {
                                        // Log thông tin sản phẩm trước khi render

                                        return (
                                            <tr key={account.id}>
                                                <td>    
                                                    {account.idEmployee}
                                                </td>
                                                <td>
                                                    
                                                    {account.email}
                                                </td>
                                                <td>
                                                    
                                                    {account.fullName}
                                                </td>
                                                
                                                {/* <td>
                                                    It is a long established fact that a reader will be distracted by the readable
                                                    content of a page when looking at its layout. The point of using Lorem Ipsum is
                                                    that it has a more-or-less normal distribution of letters, as opposed to using
                                                    'Content here, content here', making it look like readable English.
                                                </td> */}
                                                <td>
                                                    {account.nameRole}
                                                </td>
                                               
                                                {/* <td>
                                                <Switch
                                                    onChange={() => HandleToggle(account.id)}
                                                    checked={state[account.id] || false}
                                                />
                                                </td> */}
                                                {account.idRole === 2 ? (
                                                    <td>none</td>
                                                ):(
                                                    <td>
                                                        <Switch
                                                            onChange={() => HandleToggle(account.id)}
                                                            checked={state[account.id] || false}
                                                        />
                                                    </td>
                                                )}
                                                
                                                <td className="text-right">
                                                    <div className="btn-group">
                                                        <button onClick={() => navigate(`/superadmin/accounts/edit/${account.id}`)} className="btn-white btn btn-xs">Edit</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="5">No accounts found</td>
                                    </tr>
                                )}
                                </tbody>
                                    <tfoot>
                                    <tr>
                                    <td colSpan="6">
                                        <ul className="pagination pull-right">
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li
                                                    key={index + 1}
                                                    className={currentPage === index + 1 ? 'active' : ''}
                                                >
                                                    <button
                                                        className="btn btn-link"
                                                        onClick={() => handlePageChange(index + 1)}
                                                    >
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                </td>
                                    </tr>
                                    </tfoot>
                            </table>

                        </div>
                    </div>
                </div>
            </div>


        </div>
        </div>
    )
}

export default Accounts_Spm;