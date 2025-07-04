import { Box } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

export default function StyledMarkdown({ children }: { children: string }) {
  return (
    <Box
      sx={{
        h1: {
          fontSize: "3xl",
          fontWeight: "bold",
          mb: 6,
          mt: 6,
          color: "ocean.700",
          borderBottom: "3px solid",
          borderColor: "ocean.200",
          pb: 2,
        },
        h2: {
          fontSize: "2xl",
          fontWeight: "bold",
          mb: 4,
          mt: 6,
          color: "ocean.600",
          position: "relative",
          _before: {
            content: '"🌊"',
            mr: 2,
          },
        },
        h3: {
          fontSize: "xl",
          fontWeight: "semibold",
          mb: 3,
          mt: 5,
          color: "seafoam.600",
          position: "relative",
          _before: {
            content: '"▪"',
            color: "seafoam.400",
            mr: 2,
          },
        },
        p: {
          mb: 4,
          lineHeight: "1.7",
          color: "gray.700",
        },
        "ul, ol": {
          pl: 6,
          mb: 4,
        },
        li: {
          ml: 4,
          mb: 2,
          lineHeight: "1.6",
          color: "gray.700",
        },
        "li::marker": {
          color: "ocean.400",
        },
        strong: {
          color: "ocean.700",
          fontWeight: "bold",
        },
        em: {
          color: "seafoam.600",
          fontStyle: "italic",
        },
        blockquote: {
          borderLeft: "4px solid",
          borderColor: "ocean.300",
          pl: 4,
          py: 2,
          mb: 4,
          bg: "ocean.50",
          borderRadius: "0 md md 0",
          fontStyle: "italic",
          color: "ocean.700",
        },
        a: {
          color: "ocean.500",
          textDecoration: "underline",
          _hover: {
            color: "ocean.700",
            textDecoration: "none",
          },
        },
        code: {
          bg: "ocean.50",
          color: "ocean.700",
          px: 2,
          py: 1,
          borderRadius: "md",
          fontSize: "sm",
          fontFamily: "mono",
        },
        pre: {
          bg: "gray.100",
          p: 4,
          borderRadius: "lg",
          overflow: "auto",
          mb: 4,
          border: "1px solid",
          borderColor: "gray.200",
        },
      }}
    >
      <ReactMarkdown>{children}</ReactMarkdown>
    </Box>
  );
}
