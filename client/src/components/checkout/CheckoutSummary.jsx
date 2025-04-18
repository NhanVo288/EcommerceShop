import PropTypes from "prop-types";
import {
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    Unstable_Grid2 as Grid,
     List,
    OutlinedInput,
    Typography,
    useMediaQuery,
    Stack
} from '@mui/material';
import { currencyFormatter } from "../../utils/currencyFormatter";
import { useSelector } from "react-redux";
import CartItem from '../Cart/CartItem';
import { Scrollbar } from '../ui/Scrollbar';
import CustomButton from '../ui/CustomButton';
import { useEffect, useMemo } from "react";

const calculateAmounts = (products) => {

    const shippingTax = 12;
    const subtotal = products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
    const total = shippingTax + subtotal;

    return {
        shippingTax,
        subtotal,
        total
    };
};

const CheckoutSummary = (props) => {
    const { onEditStep, setFieldValue } = props
    const cart = useSelector((state) => state.cart.cart);
    const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const billingInfo = JSON.parse(localStorage.getItem("billingInfo"))
    const { shippingTax, subtotal, total } = calculateAmounts(cart);

    const formattedShippingTax = currencyFormatter.format(shippingTax);
    const formattedSubtotal = currencyFormatter.format(subtotal);
    const formattedTotal = currencyFormatter.format(total);
    const extractedFields = useMemo(() => {
        return cart.map((product) => {
          return {
            name: product.name,
            quantity: product.quantity,
            images: product.images.map((image) => image._id),
            price: product.price,
            product: product._id,
          };
        });
      }, [cart]);
    
      useEffect(() => {
        setFieldValue("orderItems", extractedFields);
        setFieldValue("itemsPrice", subtotal);
        setFieldValue("shippingPrice", shippingTax);
        setFieldValue("totalPrice", total);
      }, [extractedFields, setFieldValue, subtotal, shippingTax, total]);
      
    return (
        <Grid container spacing={3}>
            <Grid xs={12} md={6}>
            <Stack spacing={3}>
                    <List
                        sx={{
                            maxHeight: '800px',
                            overflow: 'auto',
                            ...(isMobileScreen && { flexGrow: 1 }),
                        }}
                    >
                        <Scrollbar>
                            {cart.map((product) => (
                                <CartItem key={product._id} product={product} />
                            ))}
                        </Scrollbar>
                    </List>
                    </Stack>
            </Grid>
            <Grid xs={12} md={6} >
                <Stack spacing={3}>

                    <Card>
                        <CardContent>
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Preview Order
                            </Typography>
                            <Box>
                                <Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography variant="h4" fontWeight="600">
                                            Billing Address:
                                        </Typography>
                                        <CustomButton variant="outlined" size="small" onClick={() => onEditStep(0)}>
                                            Edit
                                        </CustomButton>
                                    </Box>
                                    <Typography variant="subtitle1">Full Name:</Typography>
                                    <Typography variant="body1">
                                        {`${billingInfo.shippingAddress.firstName} ${billingInfo.shippingAddress.lastName}`}
                                    </Typography>
                                    <Typography variant="subtitle1">Address:</Typography>
                                    <Typography variant="body1">{billingInfo.shippingAddress.street1}</Typography>
                                    <br />
                                    {billingInfo.shippingAddress.street2 && (
                                        <>
                                            <Typography variant="body1">{`${billingInfo.shippingAddress.street2}, `}</Typography>
                                            <Typography variant="body1">{billingInfo.shippingAddress.city}</Typography>
                                        </>
                                    )}
                                    <Typography variant="body1">{`${billingInfo.shippingAddress.state} ${billingInfo.shippingAddress.zipCode}`}</Typography>
                                    <Typography variant="body1">{billingInfo.shippingAddress.country}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h4" fontWeight="600">
                                        Contact Information:
                                    </Typography>
                                    <CustomButton variant="outlined" size="small" onClick={() => onEditStep(1)}>
                                        Edit
                                    </CustomButton>
                                </Box>
                                <Typography variant="subtitle1">Email:</Typography>
                                <Typography variant="body1">{billingInfo.email}</Typography>
                                <Typography variant="subtitle1">Phone Number:</Typography>
                                <Typography variant="body1">{billingInfo.phoneNumber}</Typography>
                            </Box>
                            <Box sx={{ mt: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography variant="h4" fontWeight="600">
                                        Payment Method:
                                    </Typography>
                                    <CustomButton variant="outlined" size="small" onClick={() => onEditStep(2)}>
                                        Edit
                                    </CustomButton>
                                </Box>
                                <Typography variant="body1">{billingInfo.paymentMethod}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent >
                            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                                Order Summary
                            </Typography>
                            <OutlinedInput fullWidth placeholder="Discount Code" size="small" sx={{ mt: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Button type="button">Apply Coupon</Button>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5">Subtotal</Typography>
                                <Typography variant="h5">{formattedSubtotal}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5">Shipping Tax</Typography>
                                <Typography variant="h5">{formattedShippingTax}</Typography>
                            </Box>
                            <Divider sx={{ my: 2 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h5">Total</Typography>
                                <Typography variant="h5">{formattedTotal}</Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Stack>
            </Grid>
        </Grid>
    );
};


CheckoutSummary.propTypes = {
    onEditStep: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default CheckoutSummary;