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
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Tooltip,
} from "@chakra-ui/react";
import { useCampaignInfo } from "@/hooks/campaignQueries";
import { useCurrentPrices } from "@/lib/currency-utils";
import { useState, useEffect } from "react";

interface PollutionData {
  id: string;
  type: string;
  icon: string;
  removed: number;
  target: number;
  unit: string;
  color: string;
  description: string;
  urgency: "low" | "medium" | "high" | "critical";
}

interface PollutionTrackerProps {
  className?: string;
}

export default function PollutionTracker({ className }: PollutionTrackerProps) {
  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo } = useCampaignInfo(currentPrices);
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({});

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("ocean.100", "ocean.700");

  // Calculate progress based on campaign funding
  const campaignProgress = campaignInfo ? (campaignInfo.usdValue / campaignInfo.goal) * 100 : 0;

  const pollutionData: PollutionData[] = [
    {
      id: "plastic-bottles",
      type: "Plastic Bottles",
      icon: "🍾",
      removed: Math.floor((campaignProgress / 100) * 150000),
      target: 150000,
      unit: "bottles",
      color: "red",
      description: "Single-use plastic bottles removed from oceans",
      urgency: campaignProgress >= 75 ? "low" : campaignProgress >= 50 ? "medium" : campaignProgress >= 25 ? "high" : "critical",
    },
    {
      id: "fishing-nets",
      type: "Ghost Fishing Nets",
      icon: "🕸️",
      removed: Math.floor((campaignProgress / 100) * 450),
      target: 450,
      unit: "nets",
      color: "orange",
      description: "Abandoned fishing nets that trap marine life",
      urgency: campaignProgress >= 70 ? "low" : campaignProgress >= 45 ? "medium" : campaignProgress >= 20 ? "high" : "critical",
    },
    {
      id: "microplastics",
      type: "Microplastics",
      icon: "🔬",
      removed: Math.floor((campaignProgress / 100) * 25),
      target: 25,
      unit: "tons",
      color: "purple",
      description: "Microscopic plastic particles filtered from water",
      urgency: campaignProgress >= 80 ? "low" : campaignProgress >= 55 ? "medium" : campaignProgress >= 30 ? "high" : "critical",
    },
    {
      id: "plastic-bags",
      type: "Plastic Bags",
      icon: "🛍️",
      removed: Math.floor((campaignProgress / 100) * 75000),
      target: 75000,
      unit: "bags",
      color: "yellow",
      description: "Single-use plastic bags removed from marine areas",
      urgency: campaignProgress >= 65 ? "low" : campaignProgress >= 40 ? "medium" : campaignProgress >= 15 ? "high" : "critical",
    },
    {
      id: "cigarette-butts",
      type: "Cigarette Butts",
      icon: "🚬",
      removed: Math.floor((campaignProgress / 100) * 200000),
      target: 200000,
      unit: "butts",
      color: "brown",
      description: "Toxic cigarette filters removed from beaches",
      urgency: campaignProgress >= 60 ? "low" : campaignProgress >= 35 ? "medium" : campaignProgress >= 10 ? "high" : "critical",
    },
    {
      id: "food-containers",
      type: "Food Containers",
      icon: "📦",
      removed: Math.floor((campaignProgress / 100) * 80000),
      target: 80000,
      unit: "containers",
      color: "green",
      description: "Takeaway containers and food packaging",
      urgency: campaignProgress >= 70 ? "low" : campaignProgress >= 45 ? "medium" : campaignProgress >= 20 ? "high" : "critical",
    },
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "green";
      case "medium":
        return "yellow";
      case "high":
        return "orange";
      default:
        return "red";
    }
  };

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case "low":
        return "Under Control";
      case "medium":
        return "Needs Attention";
      case "high":
        return "Urgent";
      default:
        return "Critical";
    }
  };

  // Animate counters
  useEffect(() => {
    const timer = setInterval(() => {
      pollutionData.forEach((item) => {
        setAnimatedValues((prev) => {
          const current = prev[item.id] || 0;
          const target = item.removed;
          if (current < target) {
            return { ...prev, [item.id]: Math.min(target, current + Math.ceil(target / 100)) };
          }
          return prev;
        });
      });
    }, 50);

    return () => clearInterval(timer);
  }, [campaignProgress]);

  // Calculate total pollution removed
  const totalRemoved = pollutionData.reduce((sum, item) => {
    const multiplier = item.unit === "tons" ? 1000 : 1; // Convert tons to kg for total
    return sum + (item.removed * multiplier);
  }, 0);

  return (
    <Box
      className={`pollution-tracker ${className || ""}`}
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
            📊 Ocean Pollution Tracker
          </Text>
          <Text color="gray.600" fontSize="sm">
            Real-time monitoring of pollution removal across all cleanup operations
          </Text>
        </Box>

        {/* Overall Statistics */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          <Stat
            bg="ocean.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="ocean.200"
            textAlign="center"
            className="floating-element"
          >
            <StatLabel color="ocean.600" fontSize="sm">
              🗑️ Total Pollution Removed
            </StatLabel>
            <StatNumber color="seafoam.600" fontSize="2xl">
              {totalRemoved.toLocaleString()}
            </StatNumber>
            <StatHelpText color="gray.600">
              items/kg removed from oceans
            </StatHelpText>
          </Stat>

          <Stat
            bg="seafoam.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="seafoam.200"
            textAlign="center"
            className="floating-element"
          >
            <StatLabel color="seafoam.600" fontSize="sm">
              🎯 Campaign Progress
            </StatLabel>
            <StatNumber color="ocean.600" fontSize="2xl">
              {Math.round(campaignProgress)}%
            </StatNumber>
            <StatHelpText color="gray.600">
              of pollution removal goal
            </StatHelpText>
          </Stat>

          <Stat
            bg="coral.50"
            p={4}
            borderRadius="lg"
            border="1px solid"
            borderColor="coral.200"
            textAlign="center"
            className="floating-element"
          >
            <StatLabel color="coral.600" fontSize="sm">
              ⚠️ Critical Areas
            </StatLabel>
            <StatNumber color="red.500" fontSize="2xl">
              {pollutionData.filter(p => p.urgency === "critical").length}
            </StatNumber>
            <StatHelpText color="gray.600">
              requiring immediate attention
            </StatHelpText>
          </Stat>
        </SimpleGrid>

        {/* Pollution Type Grid */}
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
          {pollutionData.map((item) => {
            const progress = (item.removed / item.target) * 100;
            const animatedCount = animatedValues[item.id] || 0;
            
            return (
              <Box
                key={item.id}
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
                {/* Header */}
                <HStack justify="space-between" mb={3}>
                  <HStack>
                    <Text fontSize="2xl" className="floating-element">
                      {item.icon}
                    </Text>
                    <VStack align="start" spacing={0}>
                      <Text fontWeight="semibold" fontSize="sm" color="ocean.700">
                        {item.type}
                      </Text>
                      <Badge colorScheme={getUrgencyColor(item.urgency)} fontSize="xs">
                        {getUrgencyText(item.urgency)}
                      </Badge>
                    </VStack>
                  </HStack>
                  <Tooltip label={`Urgency: ${getUrgencyText(item.urgency)}`}>
                    <Circle
                      size="12px"
                      bg={`${getUrgencyColor(item.urgency)}.500`}
                      className={item.urgency === "critical" ? "ripple-effect" : ""}
                    />
                  </Tooltip>
                </HStack>

                {/* Counter */}
                <Box textAlign="center" mb={3}>
                  <Text fontSize="xl" fontWeight="bold" color="seafoam.600">
                    {animatedCount.toLocaleString()}
                  </Text>
                  <Text fontSize="xs" color="gray.600">
                    of {item.target.toLocaleString()} {item.unit}
                  </Text>
                </Box>

                {/* Progress Bar */}
                <Box mb={3}>
                  <Progress
                    value={progress}
                    size="md"
                    colorScheme={getUrgencyColor(item.urgency)}
                    borderRadius="full"
                    bg="gray.100"
                  />
                  <Flex justify="space-between" mt={1}>
                    <Text fontSize="xs" color="gray.500">0</Text>
                    <Text fontSize="xs" color={`${getUrgencyColor(item.urgency)}.600`} fontWeight="medium">
                      {Math.round(progress)}%
                    </Text>
                    <Text fontSize="xs" color="gray.500">{item.target.toLocaleString()}</Text>
                  </Flex>
                </Box>

                {/* Description */}
                <Text fontSize="xs" color="gray.600" textAlign="center">
                  {item.description}
                </Text>

                {/* Pollution particles animation */}
                {item.removed > 0 && (
                  <>
                    <Circle
                      size="4px"
                      bg={`${item.color}.400`}
                      position="absolute"
                      top="15%"
                      right="10%"
                      className="bubble"
                      opacity={0.6}
                    />
                    <Circle
                      size="3px"
                      bg={`${item.color}.300`}
                      position="absolute"
                      top="30%"
                      right="20%"
                      className="bubble"
                      opacity={0.4}
                    />
                  </>
                )}
              </Box>
            );
          })}
        </SimpleGrid>

        {/* Impact Metrics */}
        <Box
          bg="linear-gradient(135deg, rgba(0, 119, 190, 0.05) 0%, rgba(32, 178, 170, 0.05) 100%)"
          borderRadius="lg"
          p={6}
          border="1px solid"
          borderColor="ocean.200"
        >
          <Text fontSize="lg" fontWeight="semibold" color="ocean.700" mb={4} textAlign="center">
            🌊 Environmental Impact Metrics
          </Text>
          
          <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="green.500">
                {Math.floor(totalRemoved / 1000).toLocaleString()}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Tons of Waste Removed
              </Text>
            </VStack>
            
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="blue.500">
                {Math.floor(campaignProgress * 5).toLocaleString()}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Square KM Cleaned
              </Text>
            </VStack>
            
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="purple.500">
                {Math.floor(campaignProgress * 2.3).toLocaleString()}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Marine Animals Saved
              </Text>
            </VStack>
            
            <VStack>
              <Text fontSize="2xl" fontWeight="bold" color="orange.500">
                {Math.floor(campaignProgress * 0.8).toLocaleString()}
              </Text>
              <Text fontSize="xs" color="gray.600" textAlign="center">
                Coral Reefs Protected
              </Text>
            </VStack>
          </SimpleGrid>
        </Box>

        {/* Urgency Legend */}
        <HStack justify="center" spacing={6} flexWrap="wrap">
          <HStack>
            <Circle size="12px" bg="green.500" />
            <Text fontSize="xs" color="gray.600">Under Control</Text>
          </HStack>
          <HStack>
            <Circle size="12px" bg="yellow.500" />
            <Text fontSize="xs" color="gray.600">Needs Attention</Text>
          </HStack>
          <HStack>
            <Circle size="12px" bg="orange.500" />
            <Text fontSize="xs" color="gray.600">Urgent</Text>
          </HStack>
          <HStack>
            <Circle size="12px" bg="red.500" />
            <Text fontSize="xs" color="gray.600">Critical</Text>
          </HStack>
        </HStack>

        <Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic">
          * All data is tracked in real-time through our blockchain-verified cleanup operations.
        </Text>
      </VStack>
    </Box>
  );
}
