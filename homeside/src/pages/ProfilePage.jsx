import React, { useEffect, useState } from 'react'
import Profile from '../layout/Profile'
import { useSelector } from 'react-redux'
import { getUserDetail } from '../api/apicall'
function ProfilePage() {
    const [username, setuser] = useState('')
    const [phonenumber, setpon] = useState('')
    const [email, setemail] = useState('')
    const [change, setChange] = useState(false)
    const Changeeffect = () => {
        setChange(!change)
    }
    const userId = useSelector((state) => state.user.id)
    useEffect(() => {
        getUserDetail(userId).then(({ data }) => {
            console.log(data);
            console.log(data[0].FullName);
            setpon(data[0].MobileNumber)
            console.log(data[0].MobileNumber);

            setuser(data[0].FullName)
            setemail(data[0].Email)

        }).catch((err) => {
            console.log(err);
        })
    }, [change])
    const address = 'palatskdsndk'
    // const [wallet, setWallet] = useState(0)
    // useEffect(() => {
    //     getWalletAmt(_id)
    //         .then(({ data }) => {
    //             console.log(data)
    //             setWallet(data.Wallet)
    //         })
    //         .catch((err) => {
    //             alert(err)
    //         })
    // }, [])

    return (
        <Profile
            name={username}
            phoneNumber={phonenumber}
            email={email}
            Address={address}
            // wallet={wallet}
            callBack={Changeeffect}
        />
    )
}

export default ProfilePage
