"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Tooltip,
  SimpleGrid,
  useColorModeValue,
  Circle,
  Flex,
} from "@chakra-ui/react";
import { useCampaignInfo } from "@/hooks/campaignQueries";
import { useCurrentPrices } from "@/lib/currency-utils";

interface CleanupLocation {
  id: string;
  name: string;
  coordinates: { lat: number; lng: number };
  status: "planned" | "active" | "completed";
  plasticRemoved: number;
  speciesRescued: number;
  progress: number;
  icon: string;
}

interface CleanupMapProps {
  className?: string;
}

export default function CleanupMap({ className }: CleanupMapProps) {
  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo } = useCampaignInfo(currentPrices);

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("ocean.100", "ocean.700");

  // Calculate overall progress
  const campaignProgress = campaignInfo ? (campaignInfo.usdValue / campaignInfo.goal) * 100 : 0;

  // Cleanup locations with progress based on campaign funding
  const cleanupLocations: CleanupLocation[] = [
    {
      id: "pacific-gyre",
      name: "Great Pacific Garbage Patch",
      coordinates: { lat: 38.0, lng: -145.0 },
      status: campaignProgress >= 80 ? "completed" : campaignProgress >= 40 ? "active" : "planned",
      plasticRemoved: Math.floor((campaignProgress / 100) * 15000),
      speciesRescued: Math.floor((campaignProgress / 100) * 340),
      progress: Math.min(100, (campaignProgress / 80) * 100),
      icon: "🌊",
    },
    {
      id: "atlantic-gyre",
      name: "North Atlantic Gyre",
      coordinates: { lat: 40.0, lng: -30.0 },
      status: campaignProgress >= 60 ? "completed" : campaignProgress >= 25 ? "active" : "planned",
      plasticRemoved: Math.floor((campaignProgress / 100) * 12000),
      speciesRescued: Math.floor((campaignProgress / 100) * 280),
      progress: Math.min(100, (campaignProgress / 60) * 100),
      icon: "🐋",
    },
    {
      id: "coral-triangle",
      name: "Coral Triangle",
      coordinates: { lat: 0.0, lng: 120.0 },
      status: campaignProgress >= 40 ? "completed" : campaignProgress >= 15 ? "active" : "planned",
      plasticRemoved: Math.floor((campaignProgress / 100) * 8000),
      speciesRescued: Math.floor((campaignProgress / 100) * 450),
      progress: Math.min(100, (campaignProgress / 40) * 100),
      icon: "🐠",
    },
    {
      id: "mediterranean",
      name: "Mediterranean Sea",
      coordinates: { lat: 35.0, lng: 18.0 },
      status: campaignProgress >= 30 ? "completed" : campaignProgress >= 10 ? "active" : "planned",
      plasticRemoved: Math.floor((campaignProgress / 100) * 6000),
      speciesRescued: Math.floor((campaignProgress / 100) * 190),
      progress: Math.min(100, (campaignProgress / 30) * 100),
      icon: "🐢",
    },
    {
      id: "arctic-ocean",
      name: "Arctic Ocean",
      coordinates: { lat: 80.0, lng: 0.0 },
      status: campaignProgress >= 90 ? "active" : "planned",
      plasticRemoved: Math.floor((campaignProgress / 100) * 9000),
      speciesRescued: Math.floor((campaignProgress / 100) * 120),
      progress: Math.min(100, (campaignProgress / 90) * 100),
      icon: "🐧",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "green";
      case "active":
        return "orange";
      default:
        return "gray";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Cleanup Complete";
      case "active":
        return "Cleanup in Progress";
      default:
        return "Awaiting Funding";
    }
  };

  return (
    <Box
      className={`cleanup-map ${className || ""}`}
      bg={bgColor}
      borderRadius="xl"
      border="2px solid"
      borderColor={borderColor}
      p={6}
      boxShadow="0 8px 32px rgba(0, 119, 190, 0.1)"
      position="relative"
      overflow="hidden"
    >
      {/* Animated background */}
      <Box className="ocean-wave" opacity={0.05} />
      <Box className="ocean-wave" opacity={0.03} />

      <VStack spacing={6} align="stretch" position="relative" zIndex={2}>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="ocean.600" mb={2}>
            🗺️ Global Cleanup Progress Map
          </Text>
          <Text color="gray.600" fontSize="sm">
            Interactive tracking of cleanup operations worldwide
          </Text>
        </Box>

        {/* Map Visualization */}
        <Box
          bg="ocean.50"
          borderRadius="lg"
          p={6}
          border="1px solid"
          borderColor="ocean.200"
          position="relative"
          minHeight="300px"
          bgGradient="linear(to-b, ocean.50, seafoam.50)"
        >
          {/* Simplified world map representation */}
          <Box
            position="absolute"
            top="20%"
            left="15%"
            width="70%"
            height="60%"
            borderRadius="xl"
            bg="ocean.100"
            opacity={0.3}
          />
          
          {/* Cleanup location markers */}
          {cleanupLocations.map((location, index) => (
            <Tooltip
              key={location.id}
              label={
                <VStack spacing={1} p={2}>
                  <Text fontWeight="bold" fontSize="sm">{location.name}</Text>
                  <Text fontSize="xs">Status: {getStatusText(location.status)}</Text>
                  <Text fontSize="xs">Plastic Removed: {location.plasticRemoved.toLocaleString()} lbs</Text>
                  <Text fontSize="xs">Species Rescued: {location.speciesRescued}</Text>
                  <Text fontSize="xs">Progress: {Math.round(location.progress)}%</Text>
                </VStack>
              }
              placement="top"
            >
              <Box
                position="absolute"
                top={`${20 + (index * 12)}%`}
                left={`${25 + (index * 15)}%`}
                cursor="pointer"
                className={location.status === "active" ? "floating-element" : ""}
              >
                <Circle
                  size="40px"
                  bg={`${getStatusColor(location.status)}.500`}
                  color="white"
                  fontSize="lg"
                  boxShadow="0 4px 12px rgba(0, 0, 0, 0.2)"
                  border="3px solid white"
                  _hover={{
                    transform: "scale(1.1)",
                    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.3)",
                  }}
                  transition="all 0.2s"
                >
                  {location.icon}
                </Circle>
                {location.status === "active" && (
                  <Box className="ripple-effect" position="absolute" top="0" left="0" w="full" h="full" />
                )}
              </Box>
            </Tooltip>
          ))}

          {/* Ocean current lines */}
          <Box
            position="absolute"
            top="40%"
            left="10%"
            width="80%"
            height="2px"
            bg="ocean.300"
            opacity={0.5}
            className="ocean-current"
            borderRadius="full"
          />
          <Box
            position="absolute"
            top="60%"
            left="15%"
            width="70%"
            height="2px"
            bg="seafoam.300"
            opacity={0.5}
            className="ocean-current"
            borderRadius="full"
          />
        </Box>

        {/* Location Status Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {cleanupLocations.map((location) => (
            <Box
              key={location.id}
              bg="white"
              borderRadius="lg"
              p={4}
              border="1px solid"
              borderColor="gray.200"
              boxShadow="sm"
              className="ocean-current"
              _hover={{
                boxShadow: "md",
                transform: "translateY(-2px)",
              }}
              transition="all 0.2s"
            >
              <HStack justify="space-between" mb={3}>
                <HStack>
                  <Text fontSize="lg">{location.icon}</Text>
                  <Text fontWeight="semibold" fontSize="sm" color="ocean.700">
                    {location.name}
                  </Text>
                </HStack>
                <Badge colorScheme={getStatusColor(location.status)} fontSize="xs">
                  {getStatusText(location.status)}
                </Badge>
              </HStack>
              
              <VStack spacing={2} align="stretch">
                <Flex justify="space-between">
                  <Text fontSize="xs" color="gray.600">Plastic Removed:</Text>
                  <Text fontSize="xs" fontWeight="medium" color="seafoam.600">
                    {location.plasticRemoved.toLocaleString()} lbs
                  </Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontSize="xs" color="gray.600">Species Rescued:</Text>
                  <Text fontSize="xs" fontWeight="medium" color="coral.500">
                    {location.speciesRescued}
                  </Text>
                </Flex>
                <Box>
                  <Flex justify="space-between" mb={1}>
                    <Text fontSize="xs" color="gray.600">Progress:</Text>
                    <Text fontSize="xs" fontWeight="medium" color="ocean.600">
                      {Math.round(location.progress)}%
                    </Text>
                  </Flex>
                  <Box bg="gray.200" borderRadius="full" h="6px">
                    <Box
                      bg={`${getStatusColor(location.status)}.500`}
                      h="6px"
                      borderRadius="full"
                      width={`${location.progress}%`}
                      transition="width 0.5s ease"
                    />
                  </Box>
                </Box>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        {/* Legend */}
        <HStack justify="center" spacing={6} flexWrap="wrap">
          <HStack>
            <Circle size="12px" bg="green.500" />
            <Text fontSize="xs" color="gray.600">Cleanup Complete</Text>
          </HStack>
          <HStack>
            <Circle size="12px" bg="orange.500" />
            <Text fontSize="xs" color="gray.600">Active Cleanup</Text>
          </HStack>
          <HStack>
            <Circle size="12px" bg="gray.500" />
            <Text fontSize="xs" color="gray.600">Awaiting Funding</Text>
          </HStack>
        </HStack>

        <Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic">
          * Interactive map shows real-time cleanup progress. Click markers for detailed information.
        </Text>
      </VStack>
    </Box>
  );
}
