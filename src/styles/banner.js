// src/components/Banner2/styles.js
import { keyframes } from "@mui/system";

export const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const floatBoxAnimation = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(-10px, -15px); }
  100% { transform: translate(0, 0); }
`;

export const styles = {
    mainContainer: {
        position: "relative",
        overflow: "hidden",
        background:
            "linear-gradient(-45deg, #6366f1, #8b5cf6, #6366f1, #4f46e5)",
        backgroundSize: "400% 400%",
        animation: `${gradientAnimation} 15s ease infinite`,
        py: { xs: 8, md: 12 },
        color: "white",
    },

    floatingBox1: {
        position: "absolute",
        top: "15%",
        right: "10%",
        width: "100px",
        height: "100px",
        borderRadius: "20px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        animation: `${floatBoxAnimation} 6s ease-in-out infinite`,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(5px)",
    },

    floatingBox2: {
        position: "absolute",
        top: "35%",
        right: "15%",
        width: "60px",
        height: "60px",
        borderRadius: "15px",
        border: "2px solid rgba(255, 255, 255, 0.1)",
        animation: `${floatBoxAnimation} 8s ease-in-out infinite`,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(5px)",
    },

    contentWrapper: {
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        gap: 4,
        position: "relative",
        zIndex: 1,
    },

    textContent: {
        flex: 1,
        textAlign: { xs: "center", md: "right" },
    },

    mainTitle: {
        fontWeight: 800,
        mb: 2,
        background:
            "linear-gradient(135deg, #FFFFFF 0%, #E2E8FF 50%, #C7D2FE 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        color: "transparent",
        textShadow: "rgba(0, 0, 0, 0.1) 2px 2px 4px",
        letterSpacing: "-0.02em",
        fontSize: { xs: "2.5rem", md: "3.5rem" },
        lineHeight: 1.2,
        textAlign: { xs: "center", md: "right" },
        position: "relative",
        zIndex: 1,
        "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
                "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
            zIndex: -1,
        },
    },

    subtitle: {
        mb: 4,
        fontSize: { xs: "1.1rem", md: "1.25rem" },
        fontWeight: 400,
        background:
            "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(226,232,255,0.9) 100%)",
        WebkitBackgroundClip: "text",
        // WebkitTextFillColor: "transparent",
        lineHeight: 1.7,
        letterSpacing: "0.01em",
        position: "relative",
        zIndex: 1,
        "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
                "linear-gradient(45deg, rgba(99,102,241,0.1) 0%, rgba(139,92,246,0.1) 100%)",
            filter: "blur(8px)",
            zIndex: -1,
        },
    },

    // Update stat box colors
    statBox: {
        bgcolor: "rgba(255, 255, 255, 0.08)",
        p: 3,
        borderRadius: 2,
        backdropFilter: "blur(10px)",
        textAlign: "center",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        "&:hover": {
            transform: "scale(1.05)",
            bgcolor: "rgba(255, 255, 255, 0.12)",
            boxShadow: `
        0 8px 32px rgba(0, 0, 0, 0.1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.15)
      `,
        },
    },

    icon: {
        fontSize: 32,
        mb: 1,
        color: "#E2E8FF",
        transition: "transform 0.3s ease",
        "&:hover": {
            transform: "scale(1.1)",
        },
    },

    statsGrid: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 3,
        animation: `${floatAnimation} 5s ease-in-out infinite`,
    },
    greenIcon: {
        fontSize: 32,
        mb: 1,
        color: "#86EFAC",
        transition: "transform 0.3s ease",
        "&:hover": {
            transform: "scale(1.1)",
        },
    },

    statValue: {
        fontWeight: 700,
        mb: 1,
        background: "linear-gradient(135deg, #FFFFFF 0%, #E2E8FF 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        fontSize: "1.75rem",
    },

    statLabel: {
        color: "rgba(255, 255, 255, 0.85)",
        letterSpacing: "0.02em",
        fontSize: "0.95rem",
    },

    icon: {
        fontSize: 32,
        mb: 1,
        color: "rgba(255, 255, 255, 0.9)",
    },

    greenIcon: {
        fontSize: 32,
        mb: 1,
        color: "#4ade80",
    },

    statValue: {
        fontWeight: 700,
        mb: 1,
    },

    statLabel: {
        opacity: 0.9,
    },
};
