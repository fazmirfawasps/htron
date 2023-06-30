import * as React from 'react'
import { Box, styled, CardMedia, useMediaQuery, Grid } from '@mui/material'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import FavoriteSharpIcon from '@mui/icons-material/FavoriteSharp'
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating'
import { Stack } from '@mui/system'
import Swipeble from './Swipeable'

const FavoriteIcon = styled(FavoriteSharpIcon)({
    position: 'absolute',
    top: '5px',
    right: '5px',
    color: 'white',
    zIndex: 1,
    cursor: 'pointer',
})
export function ProCard(
    {
        property,
        callback,
        addtowishlist,
        removeFromWishlist,
        size,
        wishlist
    }) {
    const matches = useMediaQuery('(min-width:600px)')

    return (
        <Grid item xs={12} sm={6} md={size} lg={size}>
            <Card
                sx={{
                    maxWidth: matches ? 280 : 340,
                    boxShadow: 'none',
                    cursor: 'pointer',
                }}
            >
                <Box
                    component={'div'}
                    sx={{
                        position: 'relative',
                        bgcolor: 'transparent',
                    }}
                >
                  {wishlist &&
                        (property?.wishlist ? (
                            <FavoriteIcon
                                sx={{ color: '#d4213f'}}
                                onClick={() => {
                                    removeFromWishlist(property._id)
                                }}
                            />
                        ) : (
                            <FavoriteIcon 
                            sx={{ color: 'grey' }}

                                onClick={() => {
                                    addtowishlist(property)
                                }}
                            />
                        ))} 
                   
                    

                    <Swipeble>
                        {property['imageFilenames']?.map((img, index) => (
                            <CardMedia
                                key={index}
                                component="img"
                                sx={{
                                    height: 270,
                                    borderRadius: 3,
                                }}
                                onClick={() => {
                                    callback(property._id)
                                }}
                                src={img}
                            />
                        ))}
                    </Swipeble>
                </Box>

                <Stack direction={'column'} spacing={0}>
                    <Typography
                        gutterBottom
                        variant="body1"
                        sx={{
                            display: 'inline-block',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                        }}
                        component=""
                    >
                        {property.PropertyName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {property.Address}
                    </Typography>
                    <Rating
                        size="small"
                        name="read-only"
                        color=""
                        value={3.5}
                        readOnly
                    />
                    <Typography variant="body1" bold>
                        ₹{property.Price}
                        <Typography variant="caption">/ day</Typography>
                    </Typography>
                </Stack>
            </Card>
            <Box />
        </Grid>
    )
}
ProCard.propTypes = {
    property: PropTypes.object.isRequired,
    callback: PropTypes.func,
    addtowishlist: PropTypes.func,
    removeFromWishlist: PropTypes.func,
    wishlist: PropTypes.array,
    size: PropTypes.string,
};
