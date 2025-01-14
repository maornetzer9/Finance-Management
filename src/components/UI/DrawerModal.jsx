import React, { useState } from "react";
import { Box, Drawer, List, ListItem, ListItemIcon, Tooltip, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "../../styles/navbar";
import { NAV_ITEMS } from "../../constants";
import Logo from "../../assets/Logo.png";

export default function SideNavBar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = window.location.pathname;

    const handleNavigation = (path) => window.location.href = path;
    const toggleDrawer = () => setIsOpen(!isOpen);

    return (
        <Box sx={{ position: "relative" }}>
            {/* Toggle Button */}
            <Box
                sx={{
                    position: "fixed",
                    top: "10px",
                    right: "15px",
                    zIndex: 1301, // Ensure it is above the Drawer
                }}
            >
                <IconButton
                    onClick={toggleDrawer}
                    sx={{ backgroundColor: !isOpen ? "#fff" : '', boxShadow: 1 }}
                >
                    {isOpen ? <CloseIcon color="warning"/> : <MenuIcon />}
                </IconButton>
            </Box>

            {/* Drawer */}
            <Drawer
                variant="persistent"
                anchor="right"
                open={isOpen}
                sx={styles.drawer}
            >
                <Box sx={styles.mainContainer}>
                    {/* Logo Area */}
                    <Box sx={styles.logoContainer}>
                        <Box sx={styles.logo} component="div">
                            <Box
                                component="img"
                                src={Logo}
                                alt="Logo"
                                height="80%"
                            />
                        </Box>
                    </Box>

                    {/* Navigation Items */}
                    <List sx={styles.navigationList}>
                        {NAV_ITEMS.map((item, index) => (
                            <Tooltip
                                key={index}
                                title={item.name}
                                placement="right"
                                arrow
                                sx={styles.tooltip}
                            >
                                <ListItem
                                    onClick={() => handleNavigation(item.path)}
                                    sx={styles.listItem}
                                >
                                    <ListItemIcon
                                        sx={styles.icon(
                                            currentPath === item.path
                                        )}
                                    >
                                        <item.icon />
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        ))}
                    </List>

                    {/* Bottom Area */}
                    <Box sx={styles.bottomArea}>
                        {/* Optional bottom content */}
                    </Box>
                </Box>
                {children}
            </Drawer>
        </Box>
    );
}
