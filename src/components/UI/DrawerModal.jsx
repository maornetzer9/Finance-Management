import React from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, Tooltip } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";

const drawerWidth = 50;

export default function SideNavBar({children}) {
    const pages = [
        { name: "Home", icon: <HomeIcon />, path: "/", color: '#0372cb'},
        { name: "About", icon: <InfoIcon />, path: "/about", color: '#0372cb'},
        { name: "Contact", icon: <ContactMailIcon />, path: "/contact", color: '#0372cb' },
    ];

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    backgroundColor: "#f8f9fa", 
                    borderRight: "1px solid #ddd", 
                },
            }}
        >
            <Box
                sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                {/* Navigation Items */}
                <List>
                    {pages.map((page, index) => (
                        <Tooltip
                            key={index}
                            title={page.name}
                            placement="right"
                            arrow
                        >
                            <ListItem
                                onClick={() => {
                                    window.location.href = page.path;
                                }}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    padding: "20px",
                                    "&:hover": {
                                        backgroundColor: "#e9ecef", 
                                    },
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        cursor:'pointer',
                                        justifyContent: "center",
                                        minWidth: "auto",
                                        color: page.color

                                    }}
                                >
                                    {page.icon}
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Box>
            {children}
        </Drawer>
    );
}
