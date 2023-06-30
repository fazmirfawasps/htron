import { Box, Typography, Container } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux'
// import HostPropetyCard from '../component/HostPropertyCard'
import HostPropertyCard from '../components/HostPropertyCard';
import { ExternalContext } from '../context/CustomContext'
import { useNavigate } from 'react-router-dom'
import { deleteProperty } from '../api/apicall';
import { setIshosted } from "../redux/redux";



// import { RemoveProperties } from '../Redux/properties/propertiesAction'
import { GetHostedProperty ,GetAllProperty} from '../api/apicall';
import { useSelector, useDispatch, } from 'react-redux'



export default function Viewhosted() {
    // const { id } = useParams();
    const id = useSelector((state) => state.user.id)
    const [change, setChange] = useState(true)

    const dispatch = useDispatch()
    const [hostedProperty, setHostedproperty] = useState([])
    const { setPropertyEdit } = useContext(ExternalContext)
    console.log(id);

    useEffect(() => {
        GetHostedProperty(id).then(({ data }) => {
            console.log(data);
            console.log('itth work avand');
            setHostedproperty(data)
        })
    }, [change])
    useEffect(() => {
        GetAllProperty().then(({ data }) => {


            console.log(id);
            const isHosted = data.find((item) => item.hostid === id)
            if (isHosted) {
                console.log('TRUE BOOLEAN');
                dispatch(setIshosted(true))

            }
            else {
                dispatch(setIshosted(false))
                console.log('false BOOLEAN');

            }
        })
    }, [change])

    // let userID = useSelector((state) => state.user.userDetails._id)
    // let hostedProperty = useSelector((state) =>
    //     state.properties.propertyArray.filter((item) => item.hostid == userID)
    // )
    // const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { setPropertyEdit } = useContext(ExternalContext)
    function editProperty(id) {
        let PropertyToedit = hostedProperty?.find((item) => item._id == id)
        console.log('NAJAN AANE');
        console.log(PropertyToedit);
        // for (var i = 0; i < PropertyToedit.length; i++) {
        //     PropertyToedit[i].vehicleType = PropertyToedit[i].VehicleType;
        //     delete PropertyToedit[i].PropertyToedit .images = PropertyToedit.imageFilenames;;
        //     console.log('DONE');
        //   }
        PropertyToedit.images = PropertyToedit.imageFilenames;
        PropertyToedit.vehicleType = PropertyToedit.VehicleType;
        delete PropertyToedit.imageFilenames;
        delete PropertyToedit.VehicleType;


        setPropertyEdit(PropertyToedit)
        console.log(PropertyToedit);
        navigate(`/Edit-listed-property/${id}`)
    }

    function removeProperty(id) {
        deleteProperty(id)
            .then(({ data }) => {
                console.log('ithum checked');
                setChange(!change)
                console.log(data);
            })
            .catch((err) => alert(err))
    }

    return (
        <Box mt={10}>
            <Container maxWidth="xl" sx={{ width: '94%' }}>
                <Typography variant="h4" color={'#955251'} fontWeight={600}>
                    Listed Property
                </Typography>
                <HostPropertyCard
                    editProperty={editProperty}
                    removeProperty={removeProperty}
                    property={hostedProperty}
                />
            </Container>
        </Box>
    )
}
