// styles/sidebarStyles.js
import { keyframes } from "@mui/system";

export const glowAnimation = keyframes`
  0% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.5); }
  100% { box-shadow: 0 0 5px rgba(99, 102, 241, 0.3); }
`;

export const styles = {
    drawer: {
        width: 70,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
            width: 70,
            boxSizing: "border-box",
            background:
                "linear-gradient(180deg, rgba(99, 102, 241, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%)",
            borderRight: "1px solid rgba(99, 102, 241, 0.1)",
            backdropFilter: "blur(10px)",
        },
    },

    mainContainer: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        py: 2,
    },

    logoContainer: {
        display: "flex",
        justifyContent: "center",
        mt: 5,
        mb: 2,
        pt: 2,
    },

    logo: {
        width: 40,
        height: 40,
        borderRadius: "12px",
        background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
    },

    navigationList: { flex: 1 },

    tooltip: {
        "& .MuiTooltip-arrow": {
            color: "#1e293b",
        },
        "& .MuiTooltip-tooltip": {
            backgroundColor: "#1e293b",
            padding: "8px 12px",
            fontSize: "0.875rem",
        },
    },

    listItem: {
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        position: "relative",
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            height: "100%",
            width: "3px",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            opacity: 0,
            transition: "all 0.3s ease",
        },
        "&:hover": {
            backgroundColor: "rgba(99, 102, 241, 0.05)",
            "&::before": {
                opacity: 1,
            },
            "& .MuiListItemIcon-root": {
                transform: "translateY(-2px)",
                animation: `${glowAnimation} 2s infinite`,
            },
        },
    },

    icon: (isActive) => ({
        justifyContent: "center",
        minWidth: "auto",
        color: isActive ? "#6366f1" : "#94a3b8",
        transition: "all 0.3s ease",
        padding: "8px",
        borderRadius: "12px",
        "& svg": {
            fontSize: "1.5rem",
            transition: "all 0.3s ease",
        },
    }),

    bottomArea: {
        display: "flex",
        justifyContent: "center",
        pt: 2,
    },
};
