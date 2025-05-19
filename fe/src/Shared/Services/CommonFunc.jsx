import  { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

//debounce for text input 
const UseDebounce = (value,delay) => {    
    const [debounceValue,setDebounceValue] = useState(value);
        useEffect(()=>{
            const handler = setTimeout(() => {
                setDebounceValue(value)
            }, delay);
            return () => clearTimeout(handler);
        },[value,delay]);
        return debounceValue;  
}

const NotifyNormal = (_icon,_title,_showConfirmButton,_timer) => {
    Swal.fire({
        icon: _icon,
        title: _title,
        showConfirmButton: _showConfirmButton,
        timer: _timer,
    })
}
export  {UseDebounce, NotifyNormal};
