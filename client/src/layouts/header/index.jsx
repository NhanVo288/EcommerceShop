import Toolbar from '@mui/material/Toolbar';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Container from '@mui/material/Container';
import useAuth from '../../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Badge, Button, IconButton, Box, useMediaQuery } from '@mui/material';
import ModeToggler from '../../components/ui/ModeToggler';
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from '../../app/feature/cartSlice';
import useTheme from '../../hooks/useTheme';
import { SideNav } from '../SideNav';
import Logo from '../../components/ui/Logo';
import { productApi } from '../../api/productApi';
import { useMounted } from '../../hooks/use-mounted';
import UserDropdown from './UserDropdown';
import CategoriesDropDown from './categoriesDropDown';
import Searchbar from './Searchbar';



function Navbar() {
  const { IsLoggedIn, user } = useAuth();
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isMobileScreen = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const location = useLocation();

  const handleOpenNavMenu = () => {
    setIsSideNavOpen(true);
  };

  const handleCloseNavMenu = () => {
    setIsSideNavOpen(false);
  };

  const navigationLinks = [

    { name: "Overview", href: "/dashboard/overview" },
    { name: "Sizes", href: "/dashboard/sizes" },
    { name: "Categories", href: "/dashboard/categories" },
    { name: "Brands", href: "/dashboard/brands" },
    { name: "Products", href: "/dashboard/products" },
    { name: "Orders", href: "/dashboard/orders" },
  ];

  const [categories, setCategories] = useState([])
  const isMounted = useMounted()

  const GetCategories = useCallback(async () => {
    try {
      const response = await productApi.GetCategories();
      if (isMounted()) {
        setCategories(response);
      }
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GetCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        backdropFilter: 'blur(6px)',
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '80px',
        zIndex: 1,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {!isMobileScreen && (<Logo />)}
          <Box sx={{ flexGrow: 1 }}>
            {isMobileScreen && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
            )}

            {isMobileScreen && isSideNavOpen && (
              <SideNav onClose={handleCloseNavMenu} open={handleOpenNavMenu} categories={categories}  />
            )}
          </Box>
          {isMobileScreen && (<Logo />)}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <>
              {IsLoggedIn && user?.role === 'ADMIN' ? (
                navigationLinks.map((item) => (
                  <Button
                    variant="h4"
                    key={item.name}
                    to={item.href}
                    component={Link}
                    sx={{
                      my: 2,
                      color: theme.palette.primary.main,
                      display: 'block',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      borderBottom: `${location.pathname === item.href ? '2px solid #998e76' : 'none'}`,
                      transition: 'all .15s linear'
                    }}
                  >
                    {item.name}
                  </Button>
                ))
              ) : (
                null
              )}
            </>
            <Button
              variant='h4'
              to={"/"}
              component={Link}
              sx={{
                my: 2,
                color: theme.palette.primary.main,
                display: 'block',
                fontWeight: 'bold',
                fontSize: '14px',
                borderBottom: `${location.pathname === "/" ? '2px solid #998e76' : 'none'}`,
                transition: 'all .15s linear'
              }}
            >Home
            </Button>
            {!isMobileScreen && (<CategoriesDropDown categories={categories}
            />)}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center" gap="5px"
          >


            <Searchbar />
            <ModeToggler />
            <Badge
              badgeContent={cart.reduce((a, c) => a + Number(c.quantity), 0)}
              color="secondary"
              invisible={cart.length === 0}
              sx={{
                "& .MuiBadge-badge": {
                  right: 5,
                  top: 5,
                  padding: "0 4px",
                  height: "20px",
                  minWidth: "20px",
                  fontSize: "14px",
                  fontWeight: "800"
                },
              }}
            >
              <IconButton
                onClick={() => dispatch(setIsCartOpen({}))}
                aria-label="Shopping Cart"
                color="primary"
              >
                <ShoppingCartOutlinedIcon />
              </IconButton>
            </Badge>
            <UserDropdown />
          </Box>
        </Toolbar>
      </Container>
    </Box >
  );
}
export default Navbar;
