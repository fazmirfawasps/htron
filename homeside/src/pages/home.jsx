import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Container, Grid, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProperty } from '../api/apicall';
import { ProCard } from '../components/ProCard';
import { setIshosted, setHostapplied, setVerified } from '../redux/redux';
import { postwishlist, deleteWishlist, getWishlist } from '../api/apicall';
import api from "../axios/axios";
import Example from "../components/home";



const SkeletonCard = () => {
  return (
    <Card>
      <Skeleton variant="rectangular" animation="wave" height={200}  width={340}/>
      <CardContent>
        <Skeleton variant="text" animation="wave" height={20} width="70%" />
        <Skeleton variant="text" animation="wave" height={12} width="90%" />
        <Skeleton variant="rectangular" animation="wave" height={24} width="30%" />
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState([]);
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.id);
  const[change,setChange]=useState(false)

  useEffect(() => {
    GetAllProperty()
      .then(({ data }) => {
        console.log(data);
        let propertyData = data;
        console.log(userId);
        const isHosted = data.find((item) => item.hostid === userId);
        if (isHosted) {
          console.log('TRUE BOOLEAN');
          dispatch(setIshosted(true));
        } else {
          dispatch(setIshosted(false));
          console.log('false BOOLEAN');
        }
        if (userId) {
          getWishlist(userId)
            .then(({ data }) => {
              console.log(data);
              console.log('wishlist kiitti');
              const newArray = propertyData.map((item) => {
                const matchingItem = data.find((obj) => obj._id === item._id);
                if (matchingItem) {
                  console.log('OOMBI');
                  return { ...item, wishlist: true };
                }
                return item;
              });
              console.log(newArray);
              setProperty(newArray);
            })
            .catch(() => {});
        } else {
          setProperty(propertyData);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    api
      .get(`/getauserdetail/${userId}`)
      .then(({ data }) => {
        console.log(data);
        dispatch(setHostapplied(data[0].Hostapplied));
        dispatch(setVerified(data[0].Verified));
      })
      .catch(() => {});
  }, [userId]);

  function navigateToSinglePage(id) {
    navigate(`/View-SingleProduct/${id}`);
  }

  function addToFavorite(property) {
    if (userId) {
      try {
        postwishlist(userId, property._id).then(() => {
          console.log('addto favorite');
          setChange(!change);
        });
      } catch (err) {
        alert(err);
      }
    } else {
      console.log('hj');
    }
  }

  async function removeFromWishlist(id) {
    if (userId) {
      try {
        await deleteWishlist(userId, id);
        setChange(!change);
      } catch (err) {
        alert(err);
      }
    }
  }

  function renderCards() {
    if (loading) {
      return (
        <>
         <Grid item xs={12} sm={6} md={3} lg={3}>
          <SkeletonCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <SkeletonCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <SkeletonCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <SkeletonCard />
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={3}>
          <SkeletonCard />
          </Grid>
        </>
      );
    }

    return property.map((item, index) => (
      <ProCard
        key={index}
        property={item}
        callback={navigateToSinglePage}
        addtowishlist={addToFavorite}
        removeFromWishlist={removeFromWishlist}
        size={3}
        wishlist={true}
      />
    ));
  }

  return (
    <div>
       <Example></Example>
      <Container maxWidth="xl" sx={{ width: '94%' }}>
        <Typography pt={4} pb={4} color="primary" sx={{ textAlign: 'left' }} variant="h4">
          Looking for the perfect Vehicle ?
        </Typography>
        <Grid container>{renderCards()}</Grid>
      </Container>
    </div>
  );
}
