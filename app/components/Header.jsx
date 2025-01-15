'use client';
import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    IconButton,
    Autocomplete,
    TextField,
    useMediaQuery,
    Link,
    Grid,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { setChosenAuthor } from "../store/slice/FontaneliSlice";
import { useRouter } from "next/navigation";

const NavButtons = styled(Button)(({ theme }) => ({
    color: "white",
    textTransform: "none",
    fontWeight: "bold",
    [theme.breakpoints.down("md")]: {
        fontSize: '0.8rem', // smaller font size on mobile
    },
}));

const Header = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md for mobile+tablet screens

    // const [selectedLanguage, setSelectedLanguage] = useState("English");

    const pages = [
        { name: "Home", path: "/home" },
        { name: "Authors", path: "/author" },
        { name: "Topics", path: "/topic" },
        { name: "Discover Authors", path: "/discover" },
    ];
    const languages = ["English", "Spanish", "French", "German", "Italian"];

    const dispatch = useDispatch();
    const { authors = [] } = useSelector((state) => state.authors);
    const router = useRouter();

    // Function to handle author selection and navigation
    const handleAuthorSelect = (newValue) => {
        if (newValue) {
            dispatch(setChosenAuthor(newValue));
            router.push("/author");
        }
    };

    const PageNavigation = (path) => {
            router.push(path);
    }

    return (
        <>
            {/* Top Section */}
            <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: "none", padding: '0.7rem 2rem' }}>
                <Toolbar sx={{ justifyContent: "space-between", padding: { md: '10px 20px', xs: '10px 10px' } }}>
                    {/* Left Section: Logo and Description */}
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Link href='/home' sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", color: "black" }}>
                                Fontaneli.com
                            </Typography>
                            <Typography sx={{ color: "gray", fontSize: "12px" }}>
                                World's biggest spiritual quotes website
                            </Typography>
                        </Link>
                    </Box>

                    {/* Right Section: Nav Links, Search, Language Selector */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        {/* Navigation Links (visible only on larger screens) */}
                        {!isMobile && (
                            <Box sx={{ display: "flex", gap: 2, paddingRight: '5rem' }}>
                                {pages.map((Page) => (
                                    // <Link href={Page.path} key={Page.name}>
                                        <NavButtons
                                        sx={{ color: 'black' }}
                                        key={Page.path}
                                        onClick={() => PageNavigation(Page.path)}>
                                            {Page.name}
                                        </NavButtons>
                                    // </Link>
                                ))}
                            </Box>
                        )}

                        <Box sx={{ display:'flex', gap:'0.5rem', flexDirection:{ md: 'row', xs:'column' } }}>
                            {/* Autocomplete for Author Search */}
                            <Autocomplete
                                disablePortal
                                onChange={(event, newValue) => handleAuthorSelect(newValue)}
                                options={authors.map((author) => author.name)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        size="small"
                                        label='Search author'
                                        sx={{ width: 150 }}
                                    />
                                )}
                            />

                            {/* Language Selector as Autocomplete */}
                            {/* <Autocomplete
                                value={selectedLanguage}
                                onChange={(event, newValue) => setSelectedLanguage(newValue)}
                                options={languages}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        size="small"
                                        label='Languages'
                                        sx={{ width: 150 }}
                                    />
                                )}
                            /> */}
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Bottom Section (Visible on both Mobile and Desktop) */}
            <Box>
                {/* Green Section */}
                <Box
                    sx={{
                        backgroundColor: "#4b5534",
                        padding: "0px 20px",
                        display: "flex",
                        justifyContent: isMobile ? "center" : "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                    }}
                >
                    {/* Nav Links (Visible only on mobile and tablet) */}
                    {isMobile && (
                        <Box sx={{ display: "flex", gap: 2 }}>
                            {pages.map((Page) => (
                                <Link href={Page.path} key={Page.name}>
                                    <NavButtons sx={{ color: 'black' }}>{Page.name}</NavButtons>
                                </Link>
                            ))}
                        </Box>
                    )}
                </Box>

                {/* Bottom Links (Popular Authors, visible only on large screens) */}
                {!isMobile && (
                    <Box
                        sx={{
                            backgroundColor: "#4b5534",
                            padding: "5px 30px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ color: "white", fontSize: "14px", fontWeight: '900' }}>
                            Popular Authors:
                            {authors.slice(0, 7).map((item) => (
                                <Button
                                    key={item.name}
                                    sx={{ color: "white", fontSize: "12px", textTransform: 'none', fontWeight: '600' }}
                                    onClick={() => handleAuthorSelect(item.name)}
                                >
                                    {item.name}
                                </Button>
                            ))}
                        </Typography>

                        <Box sx={{ marginLeft: "auto" }}>
                            <Button
                                variant="contained"
                                sx={{
                                    backgroundColor: "#f1c40f",
                                    color: "black",
                                    textTransform: "none",
                                    fontSize: "14px",
                                }}
                            >
                                Save our website for later :)
                            </Button>
                        </Box>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default Header;