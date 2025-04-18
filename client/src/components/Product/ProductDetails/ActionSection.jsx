import {  Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { toTitleCase } from "../../../utils/toTitleCase";
import { currencyFormatter } from "../../../utils/currencyFormatter";
import { addToCart } from "../../../app/feature/cartSlice";
import CustomButton from "../../ui/CustomButton";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { useDispatch } from "react-redux";
import { useState } from "react";
 import ProductSizeBox from "./ProductSizes";
 

const ActionSection = (props) => {
    const { product } = props
     const {description, name,  category, quantity="1", price   } = product;

      const dispatch = useDispatch();
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]?.value);
    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };
 
    const handleAddToCart = () => {
        dispatch(addToCart({ item: { ...product, quantity } }));
    };

    return (
        <Box flex="1 1 50%" mb="40px">
               <Box>
                <Typography>CATEGORIES:  {`${category?.name} ${category?.parentCategory ? `/ ${category?.parentCategory.name}` : ""
                    }`}
                </Typography>
                <Box m="10px 0 5px 0" display="flex">
                    <FavoriteBorderOutlinedIcon />
                    <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
                </Box>
            </Box>
            <Box m="40px 0 25px 0">
                <Stack spacing={2}>
                    <Typography variant="h3" fontWeight="bold">{toTitleCase(name)}</Typography>
                    <Typography variant="h4" fontWeight="bold">{currencyFormatter.format(price)}</Typography>
                    <Box>
                        <Typography variant="h4" style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold' }}>Size:</span>
                            <Typography variant="h4" style={{ marginLeft: '8px' }}>
                                {selectedSize}
                            </Typography>
                        </Typography>
                        <Box display="flex" flexWrap="wrap">
                            {product.sizes.map((size, index) => (
                                <ProductSizeBox
                                    key={index}
                                    size={size}
                                    selectedSize={selectedSize}
                                    handleSizeSelect={() => handleSizeSelect(size.value)}
                                />
                            ))}
                        </Box>
                    </Box>
                    <Typography sx={{ mt: "20px" }}>
                        {description}
                    </Typography>
                </Stack>
            </Box>

            <Box display="flex" alignItems="center" minHeight="50px">
                
                <CustomButton
                    sx={{ borderRadius: 0, padding: "10px 40px" }}
                    onClick={handleAddToCart}
                    fullwidh
                >
                    ADD TO CART
                </CustomButton>
            </Box>
         
        </Box>
    );
};

ActionSection.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ActionSection