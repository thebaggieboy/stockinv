import { USER_TYPES, } from '../features/user/userSlice'
import { useMutation} from '@tanstack/react-query'
import fetchProfileData from '../lib/fetchProfileData'
import {selectToken, setToken} from '../features/token/tokenSlice'
import {selectUser, setUser} from "../features/user/userSlice"
import { useDispatch, useSelector } from "react-redux";
import useData from './useData'
import { selectUserEmail, setUserEmail } from '../features/user/userActiveEmail'
import { useRouter } from 'next/router'
import { useState } from 'react'

 

const useUpdateProfileData = (url, successCallback, userType) => {
    const user = useSelector(selectUser)
    const user_email = useSelector(selectUserEmail)
    const token = useSelector(selectToken)
    const router = useRouter()
    const dispatch = useDispatch()
    const isBrand = userType === USER_TYPES.brand
    //const { data, loading } = useData("https://altclan-brands-api-1-1.onrender.com/api/users/")
	const [profileQuery, setProfileQuery] = useState([]);
	 
	const [userResult, setUserResult] = useState([])

    const mutation = useMutation({
        mutationFn: async ({ email, brand_name, brand_bio, brand_type, mobile_number, brand_logo }) => {
            const res = await fetch(url, {
                method: "PUT",
                headers: { 

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, brand_name, brand_bio, brand_type, mobile_number, brand_logo}),
                credentials: "include"

            })
            const data = await res.json()
            console.log("Updated Data: ", data)
           
           
       

          
            if (res.status >= 200 & res.status <= 209) {
                
                const  url2 = "https://altclan-brands-api-1-1.onrender.com/api/users/"
                const res2 =  await fetch(url2, {
                    method: "GET",
                    headers: {
                    
                        "Content-Type": "application/json"
                    },
                })
            
                const data2 = await res2.json()
            
                if (user_email !== null){
                    let filteredUsers = data2.filter((user) => {
                        return user.email === user_email;
                    });
                  
                    
                    //dispatch(setUser(filteredUsers))
                    console.log("Current User: ", user)
                }
               
                
                           
                return
                    
            }

            const error = { ...data }
            throw error
    
        },
        onSuccess: (user) => {
            successCallback(user)
        }
    })





    return mutation
}

export default useUpdateProfileData