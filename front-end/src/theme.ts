import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    ocean: {
      50: "#E5F7FF",
      100: "#B8EAFF", 
      200: "#8ADDFF",
      300: "#5CD0FF",
      400: "#2EC3FF",
      500: "#0077BE", // Ocean Blue
      600: "#006299",
      700: "#004D75",
      800: "#003850",
      900: "#00232C",
    },
    seafoam: {
      50: "#E5F9F7",
      100: "#B8F0EA",
      200: "#8AE7DD",
      300: "#5CDED0",
      400: "#2ED5C3",
      500: "#20B2AA", // Seafoam Green
      600: "#1A9388",
      700: "#147366",
      800: "#0E5444",
      900: "#083522",
    },
    coral: {
      50: "#FFF5F5",
      100: "#FFE5E5",
      200: "#FFD1D1",
      300: "#FFBDBD",
      400: "#FFA9A9",
      500: "#FF7F7F", // Coral
      600: "#E56565",
      700: "#CC4B4B",
      800: "#B23232",
      900: "#991818",
    },
    brand: {
      500: "#0077BE",
    },
  },
  components: {
    Button: {
      variants: {
        ocean: {
          bg: "ocean.500",
          color: "white",
          _hover: {
            bg: "ocean.600",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(0, 119, 190, 0.3)",
          },
          _active: {
            bg: "ocean.700",
          },
        },
        seafoam: {
          bg: "seafoam.500",
          color: "white", 
          _hover: {
            bg: "seafoam.600",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 25px rgba(32, 178, 170, 0.3)",
          },
          _active: {
            bg: "seafoam.700",
          },
        },
      },
    },
    Progress: {
      baseStyle: {
        filledTrack: {
          bg: "linear-gradient(90deg, #0077BE 0%, #20B2AA 100%)",
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: "linear-gradient(135deg, #E5F7FF 0%, #E5F9F7 100%)",
        minHeight: "100vh",
      },
    },
  },
});

export default theme;
