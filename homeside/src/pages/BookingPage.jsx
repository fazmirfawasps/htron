import React from 'react'
import { Container } from '@mui/material'

import TableComponent from '../components/TableComponent'
import BtnComponent from '../components/btncomponent'
import { useEffect } from 'react'
import { getUserOrders, Cancelorder } from '../api/apicall'
import { useSelector } from 'react-redux'
import swal from 'sweetalert';

function BookingPage() {


    const userid = useSelector((state) => state.user.id)

    const [order, setOrder] = React.useState([])
    const [change, setChange] = React.useState(false)
    function Cancel(id) {
        swal({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            buttons: ['Cancel', 'Delete'],
            dangerMode: true,
        })
            .then((willDelete) => {

                if (willDelete) {
                    Cancelorder(id).then(() => {
                        setChange(!change)
                    })

                }
            }).catch((err) => {
                console.log(err);
            })
     

    }
    const style = {
        backgroundColor: '#d4213f'
    }
    useEffect(() => {
        getUserOrders(userid).then(({ data }) => {
            const datas = data.map((item) => ({
                ...item,
                Image: <img src={`http://htron.site/api/images/${item.Image}`} style={{ width: '50px' }}></img>,
                Action: item.OrderStatus === "Booking Cancelled" ? "" : <BtnComponent
                    variant={'contained'}
                    callback={() => {
                        Cancel(item._id)
                    }}
                    content={'Canel'}
                    style={style}
                />

            }))

            setOrder(datas)
        })
    }, [change])

    return (
        <Container maxWidth="xl" sx={{ width: '94%', paddingTop: '100px' }}>
            <TableComponent Data={order}></TableComponent>
        </Container>
    )
}


export default BookingPage
