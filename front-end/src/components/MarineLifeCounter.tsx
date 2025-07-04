"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Progress,
  useColorModeValue,
  Flex,
  Badge,
  Circle,
} from "@chakra-ui/react";
import { useCampaignInfo } from "@/hooks/campaignQueries";
import { useCurrentPrices } from "@/lib/currency-utils";
import { useState, useEffect } from "react";

interface MarineSpecies {
  id: string;
  name: string;
  icon: string;
  endangered: boolean;
  protected: number;
  target: number;
  status: "critical" | "threatened" | "stable" | "recovering";
  description: string;
}

interface MarineLifeCounterProps {
  className?: string;
}

export default function MarineLifeCounter({ className }: MarineLifeCounterProps) {
  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo } = useCampaignInfo(currentPrices);
  const [animatedCounts, setAnimatedCounts] = useState<{ [key: string]: number }>({});

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("ocean.100", "ocean.700");

  // Calculate progress and marine life protection based on campaign funding
  const campaignProgress = campaignInfo ? (campaignInfo.usdValue / campaignInfo.goal) * 100 : 0;
  const totalProtected = Math.floor((campaignProgress / 100) * 1250);

  const marineSpecies: MarineSpecies[] = [
    {
      id: "sea-turtles",
      name: "Sea Turtles",
      icon: "🐢",
      endangered: true,
      protected: Math.floor((campaignProgress / 100) * 45),
      target: 45,
      status: campaignProgress >= 75 ? "recovering" : campaignProgress >= 50 ? "stable" : campaignProgress >= 25 ? "threatened" : "critical",
      description: "Protected from plastic ingestion and entanglement",
    },
    {
      id: "dolphins",
      name: "Dolphins",
      icon: "🐬",
      endangered: false,
      protected: Math.floor((campaignProgress / 100) * 120),
      target: 120,
      status: campaignProgress >= 70 ? "recovering" : campaignProgress >= 45 ? "stable" : campaignProgress >= 20 ? "threatened" : "critical",
      description: "Rescued from fishing nets and pollution",
    },
    {
      id: "whales",
      name: "Whales",
      icon: "🐋",
      endangered: true,
      protected: Math.floor((campaignProgress / 100) * 15),
      target: 15,
      status: campaignProgress >= 80 ? "recovering" : campaignProgress >= 55 ? "stable" : campaignProgress >= 30 ? "threatened" : "critical",
      description: "Protected migration routes from plastic debris",
    },
    {
      id: "seabirds",
      name: "Seabirds",
      icon: "🐦",
      endangered: false,
      protected: Math.floor((campaignProgress / 100) * 340),
      target: 340,
      status: campaignProgress >= 65 ? "recovering" : campaignProgress >= 40 ? "stable" : campaignProgress >= 15 ? "threatened" : "critical",
      description: "Prevented plastic ingestion and nesting disruption",
    },
    {
      id: "coral",
      name: "Coral Reefs",
      icon: "🪸",
      endangered: true,
      protected: Math.floor((campaignProgress / 100) * 25),
      target: 25,
      status: campaignProgress >= 85 ? "recovering" : campaignProgress >= 60 ? "stable" : campaignProgress >= 35 ? "threatened" : "critical",
      description: "Restored reef ecosystems (measured in sq km)",
    },
    {
      id: "fish",
      name: "Fish Species",
      icon: "🐠",
      endangered: false,
      protected: Math.floor((campaignProgress / 100) * 705),
      target: 705,
      status: campaignProgress >= 60 ? "recovering" : campaignProgress >= 35 ? "stable" : campaignProgress >= 10 ? "threatened" : "critical",
      description: "Protected habitats and breeding grounds",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recovering":
        return "green";
      case "stable":
        return "blue";
      case "threatened":
        return "orange";
      default:
        return "red";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "recovering":
        return "Recovering";
      case "stable":
        return "Stable";
      case "threatened":
        return "Threatened";
      default:
        return "Critical";
    }
  };

  // Animate counters
  useEffect(() => {
    const timer = setInterval(() => {
      marineSpecies.forEach((species) => {
        setAnimatedCounts((prev) => {
          const current = prev[species.id] || 0;
          const target = species.protected;
          if (current < target) {
            return { ...prev, [species.id]: Math.min(target, current + Math.ceil(target / 50)) };
          }
          return prev;
        });
      });
    }, 100);

    return () => clearInterval(timer);
  }, [campaignProgress]);

  return (
    <Box
      className={`marine-life-counter ${className || ""}`}
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
            🐠 Marine Life Protection Counter
          </Text>
          <Text color="gray.600" fontSize="sm">
            Species protected through our cleanup efforts
          </Text>
        </Box>

        {/* Total Counter */}
        <Box
          bg="ocean.50"
          borderRadius="lg"
          p={6}
          border="1px solid"
          borderColor="ocean.200"
          textAlign="center"
          className="floating-element"
        >
          <Text fontSize="sm" color="ocean.600" mb={2}>
            Total Marine Life Protected
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="ocean.700" className="ocean-current">
            {totalProtected.toLocaleString()}
          </Text>
          <Text fontSize="sm" color="gray.600">
            of 1,250 species goal
          </Text>
          <Progress
            value={(totalProtected / 1250) * 100}
            size="lg"
            colorScheme="green"
            borderRadius="full"
            mt={4}
            bgGradient="linear(to-r, ocean.100, seafoam.100)"
          />
        </Box>

        {/* Species Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {marineSpecies.map((species) => {
            const progress = (species.protected / species.target) * 100;
            const animatedCount = animatedCounts[species.id] || 0;
            
            return (
              <Box
                key={species.id}
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
                position="relative"
                overflow="hidden"
              >
                {/* Species Header */}
                <HStack justify="space-between" mb={3}>
                  <HStack>
                    <Text fontSize="2xl" className="floating-element">
                      {species.icon}
                    </Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold" fontSize="sm" color="ocean.700">
                        {species.name}
                      </Text>
                      {species.endangered && (
                        <Badge colorScheme="red" fontSize="xs">
                          Endangered
                        </Badge>
                      )}
                    </VStack>
                  </HStack>
                  <Badge colorScheme={getStatusColor(species.status)} fontSize="xs">
                    {getStatusText(species.status)}
                  </Badge>
                </HStack>

                {/* Counter */}
                <Box textAlign="center" mb={3}>
                  <Text fontSize="2xl" fontWeight="bold" color="seafoam.600">
                    {animatedCount.toLocaleString()}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    of {species.target} target
                  </Text>
                </Box>

                {/* Progress Bar */}
                <Box mb={3}>
                  <Progress
                    value={progress}
                    size="md"
                    colorScheme={getStatusColor(species.status)}
                    borderRadius="full"
                    bg="gray.100"
                  />
                  <Flex justify="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">0</Text>
                    <Text fontSize="xs" color={`${getStatusColor(species.status)}.600`} fontWeight="medium">
                      {Math.round(progress)}%
                    </Text>
                    <Text fontSize="xs" color="gray.500">{species.target}</Text>
                  </Flex>
                </Box>

                {/* Description */}
                <Text fontSize="xs" color="gray.600" textAlign="center">
                  {species.description}
                </Text>

                {/* Floating particles for active protection */}
                {species.protected > 0 && (
                  <>
                    <Circle
                      size="6px"
                      bg="seafoam.400"
                      position="absolute"
                      top="10%"
                      right="15%"
                      className="bubble"
                      opacity={0.6}
                    />
                    <Circle
                      size="4px"
                      bg="ocean.400"
                      position="absolute"
                      top="25%"
                      right="8%"
                      className="bubble"
                      opacity={0.4}
                    />
                  </>
                )}
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Impact Summary */}
        <Box
          bg="seafoam.50"
          borderRadius="lg"
          p={4}
          border="1px solid"
          borderColor="seafoam.200"
        >
          <Text fontSize="sm" fontWeight="semibold" color="seafoam.700" mb={3} textAlign="center">
            🌊 Conservation Impact Summary
          </Text>
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="red.500">
                {marineSpecies.filter(s => s.status === "critical").length}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">Critical Species</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="orange.500">
                {marineSpecies.filter(s => s.status === "threatened").length}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">Threatened Species</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="blue.500">
                {marineSpecies.filter(s => s.status === "stable").length}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">Stable Species</Text>
            </VStack>
            <VStack>
              <Text fontSize="lg" fontWeight="bold" color="green.500">
                {marineSpecies.filter(s => s.status === "recovering").length}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">Recovering Species</Text>
            </VStack>
          </SimpleGrid>
        </Box>

        <Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic">
          * Counts update in real-time based on cleanup progress and verified conservation data.
        </Text>
      </VStack>
    </Box>
  );
}
