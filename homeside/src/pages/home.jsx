// import HomeText from "../components/hometext";
// import Homecard from "../components/homecard";
import Example from "../components/home";
import { useState, useEffect, } from "react";
import { GetAllProperty } from "../api/apicall";
import { ProCard } from "../components/ProCard";
import { Typography, Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { setIshosted, setHostapplied, setVerified } from "../redux/redux";
import { useDispatch, useSelector } from 'react-redux'
import api from "../axios/axios";
import { postwishlist, deleteWishlist, getWishlist } from "../api/apicall";


export default function Home() {
    // const isTrue = true;
    const dispatch = useDispatch()
    const [Property, setProperty] = useState([])
    const naviagate = useNavigate()
    const[change,setChange]=useState(false)
    const userId = useSelector((state) => state.user.id)
    useEffect(() => {
        GetAllProperty().then(({ data }) => {
            console.log(data);
       let property =data
            console.log(userId);
            const isHosted = data.find((item) => item.hostid === userId)
            if (isHosted) {
                console.log('TRUE BOOLEAN');
                dispatch(setIshosted(true))

            }
            else {
                dispatch(setIshosted(false))
                console.log('false BOOLEAN');

            }
            if(userId){
                getWishlist(userId).then(({ data }) => {
                    console.log(data);
                    console.log('wishlist kiitti');
                    const newArray = property.map(item => {
                        const matchingItem = data.find(obj => obj._id === item._id);
                        if (matchingItem) {
                            console.log('OOMBI');
                          return { ...item, wishlist:true };
                        }
                        return item;
                      });
                      console.log(newArray);
                      setProperty(newArray)
    
                }).catch(() => {
        
                })
            }
            else{
                setProperty(property)
            }
            

        })
    }, [userId,change])

   

    useEffect(() => {
        api.get(`/getauserdetail/${userId}`).then(({ data }) => {
            console.log(data);
            dispatch(setHostapplied(data[0].Hostapplied))
            dispatch(setVerified(data[0].Verified))
        }).catch(() => {

        })
    }, [userId])

    function navigetTosinglepage(id) {
        // // let singleProperty = Property.find((item) => item._id == id)
        // dispatch(addProperty(singleProperty))
        naviagate(`/View-SingleProduct/${id}`)
    }

 function addtofavourite(property) {
        if (userId) {
            try {

                 postwishlist(userId, property._id).then(()=>{
                    console.log('addto favorite');

                    setChange(!change)

                 })

            } catch (err) {
                alert(err)
            }
        } else {
            // setOpenlogin(true)
            console.log('hj');
        }
    }

    async function removeFromWishlist(id) {
        if (userId) {
            try {
                await deleteWishlist(userId, id)
                setChange(!change)

            } catch (err) {
                alert(err)
            }
        }
    }
    function Card() {
        const result = Property.map((item, index,) => {
            return (
                <ProCard
                    key={index}
                    property={item}
                    callback={navigetTosinglepage}
                    addtowishlist={addtofavourite}
                    removeFromWishlist={removeFromWishlist}
                    size={3}
                    wishlist={true}
                />
            )
        })
        return result
    }
    return (
        <div>
            <Example></Example>
            {/* <HomeText isTrue={isTrue}></HomeText>
            <Homecard></Homecard> */}
            {/* <HomeText></HomeText>

            <Homecard></Homecard> */}
            <Container
                maxWidth="xl"
                sx={{
                    width: '94%',
                }}
            >
                <Typography pt={4} pb={4} color="primary" sx={{ textAlign: 'left' }} variant="h4">
                    Looking for the perfect Vehicle ?
                </Typography>
                <Grid container>
                    <Card />
                </Grid>
            </Container>

        </div>
    )

}
