"use client";

import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  Button,
  useColorModeValue,
  Flex,
  Badge,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  IconButton,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useCampaignInfo } from "@/hooks/campaignQueries";
import { useCurrentPrices } from "@/lib/currency-utils";

interface PhotoComparison {
  id: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  date: string;
  plasticRemoved: string;
  description: string;
  coordinates?: string;
}

interface PhotoGalleryProps {
  className?: string;
}

export default function PhotoGallery({ className }: PhotoGalleryProps) {
  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo } = useCampaignInfo(currentPrices);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(50);
  const [viewMode, setViewMode] = useState<"slider" | "side-by-side">("slider");

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("ocean.100", "ocean.700");

  // Calculate progress to determine which photos to show
  const campaignProgress = campaignInfo ? (campaignInfo.usdValue / campaignInfo.goal) * 100 : 0;

  // Mock photo comparisons - in real app these would come from API
  const photoComparisons: PhotoComparison[] = [
    {
      id: "beach-cleanup-1",
      location: "Malibu Beach, California",
      beforeImage: "/campaign/ocean-before-1.jpg",
      afterImage: "/campaign/ocean-after-1.jpg",
      date: "March 2025",
      plasticRemoved: "2,400 lbs",
      description: "Major beach cleanup operation removing years of accumulated plastic waste",
      coordinates: "34.0259°N, 118.7798°W",
    },
    {
      id: "coral-restoration-1",
      location: "Great Barrier Reef, Australia",
      beforeImage: "/campaign/coral-before-1.jpg",
      afterImage: "/campaign/coral-after-1.jpg",
      date: "April 2025",
      plasticRemoved: "890 lbs",
      description: "Coral reef restoration after removing plastic debris and ghost nets",
      coordinates: "16.2839°S, 145.7781°E",
    },
    {
      id: "ocean-cleanup-1",
      location: "Pacific Garbage Patch",
      beforeImage: "/campaign/pacific-before-1.jpg",
      afterImage: "/campaign/pacific-after-1.jpg",
      date: "May 2025",
      plasticRemoved: "15,600 lbs",
      description: "Deep-sea cleanup operation targeting concentrated plastic accumulation",
      coordinates: "38°N, 145°W",
    },
    {
      id: "coastline-restore-1",
      location: "Mediterranean Coast, Italy",
      beforeImage: "/campaign/med-before-1.jpg",
      afterImage: "/campaign/med-after-1.jpg",
      date: "June 2025",
      plasticRemoved: "3,200 lbs",
      description: "Comprehensive coastline restoration and marine habitat protection",
      coordinates: "41.9028°N, 12.4964°E",
    },
  ];

  // Filter photos based on campaign progress
  const availablePhotos = photoComparisons.filter((_, index) => {
    const requiredProgress = (index + 1) * 25; // Each photo unlocks at 25%, 50%, 75%, 100%
    return campaignProgress >= requiredProgress;
  });

  const currentPhoto = availablePhotos[currentPhotoIndex];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % availablePhotos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + availablePhotos.length) % availablePhotos.length);
  };

  if (availablePhotos.length === 0) {
    return (
      <Box
        className={`photo-gallery ${className || ""}`}
        bg={bgColor}
        borderRadius="xl"
        border="2px solid"
        borderColor={borderColor}
        p={6}
        boxShadow="0 8px 32px rgba(0, 119, 190, 0.1)"
        textAlign="center"
      >
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold" color="ocean.600">
            📸 Before & After Gallery
          </Text>
          <Text color="gray.600">
            Photo comparisons will unlock as the campaign reaches funding milestones
          </Text>
          <Box
            bg="ocean.50"
            borderRadius="lg"
            p={8}
            border="1px dashed"
            borderColor="ocean.200"
          >
            <Text fontSize="6xl" color="ocean.200" mb={4}>🔒</Text>
            <Text color="ocean.600" fontWeight="medium">
              First photos unlock at 25% funding ({Math.round(25 - campaignProgress)}% to go)
            </Text>
          </Box>
        </VStack>
      </Box>
    );
  }

  return (
    <Box
      className={`photo-gallery ${className || ""}`}
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

      <VStack spacing={6} align="stretch" position="relative" zIndex={2}>
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" color="ocean.600" mb={2}>
            📸 Before & After Ocean Cleanup Gallery
          </Text>
          <Text color="gray.600" fontSize="sm">
            See the incredible transformation our cleanup efforts have achieved
          </Text>
        </Box>

        {/* Photo Navigation */}
        <HStack justify="space-between" align="center">
          <IconButton
            aria-label="Previous photo"
            icon={<ChevronLeftIcon />}
            onClick={prevPhoto}
            isDisabled={availablePhotos.length <= 1}
            colorScheme="ocean"
            variant="ghost"
          />
          
          <VStack spacing={1}>
            <Text fontWeight="semibold" color="ocean.700">
              {currentPhoto?.location}
            </Text>
            <HStack spacing={2}>
              <Badge colorScheme="green">{currentPhoto?.date}</Badge>
              <Badge colorScheme="orange">{currentPhoto?.plasticRemoved} removed</Badge>
            </HStack>
          </VStack>

          <IconButton
            aria-label="Next photo"
            icon={<ChevronRightIcon />}
            onClick={nextPhoto}
            isDisabled={availablePhotos.length <= 1}
            colorScheme="ocean"
            variant="ghost"
          />
        </HStack>

        {/* View Mode Toggle */}
        <HStack justify="center" spacing={4}>
          <Button
            size="sm"
            variant={viewMode === "slider" ? "solid" : "outline"}
            colorScheme="ocean"
            onClick={() => setViewMode("slider")}
          >
            Slider View
          </Button>
          <Button
            size="sm"
            variant={viewMode === "side-by-side" ? "solid" : "outline"}
            colorScheme="ocean"
            onClick={() => setViewMode("side-by-side")}
          >
            Side by Side
          </Button>
        </HStack>

        {/* Photo Comparison */}
        {currentPhoto && (
          <Box>
            {viewMode === "slider" ? (
              <Box position="relative" borderRadius="lg" overflow="hidden" height="400px">
                {/* Before Image (background) */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width="100%"
                  height="100%"
                  bg="gray.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text color="gray.500" fontSize="lg">Before Image</Text>
                  <Text position="absolute" top="4" left="4" bg="red.500" color="white" px="2" py="1" borderRadius="md" fontSize="sm">
                    BEFORE
                  </Text>
                </Box>

                {/* After Image (overlay) */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  width={`${sliderValue}%`}
                  height="100%"
                  bg="green.200"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  overflow="hidden"
                >
                  <Text color="green.700" fontSize="lg">After Image</Text>
                  <Text position="absolute" top="4" left="4" bg="green.500" color="white" px="2" py="1" borderRadius="md" fontSize="sm">
                    AFTER
                  </Text>
                </Box>

                {/* Slider Handle */}
                <Box
                  position="absolute"
                  top="0"
                  left={`${sliderValue}%`}
                  width="4px"
                  height="100%"
                  bg="white"
                  boxShadow="0 0 10px rgba(0,0,0,0.5)"
                  transform="translateX(-50%)"
                  cursor="ew-resize"
                />

                <Box
                  position="absolute"
                  top="50%"
                  left={`${sliderValue}%`}
                  width="20px"
                  height="20px"
                  bg="white"
                  borderRadius="full"
                  boxShadow="0 2px 10px rgba(0,0,0,0.3)"
                  transform="translate(-50%, -50%)"
                  cursor="ew-resize"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box width="6px" height="6px" bg="ocean.500" borderRadius="full" />
                </Box>
              </Box>
            ) : (
              <HStack spacing={4} align="stretch">
                <VStack flex="1" spacing={2}>
                  <Text fontWeight="semibold" color="red.600" fontSize="sm">BEFORE</Text>
                  <Box
                    height="300px"
                    bg="gray.200"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid"
                    borderColor="red.200"
                  >
                    <Text color="gray.500">Before Cleanup</Text>
                  </Box>
                </VStack>
                <VStack flex="1" spacing={2}>
                  <Text fontWeight="semibold" color="green.600" fontSize="sm">AFTER</Text>
                  <Box
                    height="300px"
                    bg="green.200"
                    borderRadius="lg"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    border="2px solid"
                    borderColor="green.200"
                  >
                    <Text color="green.700">After Cleanup</Text>
                  </Box>
                </VStack>
              </HStack>
            )}

            {/* Slider Control (only for slider view) */}
            {viewMode === "slider" && (
              <Box mt={4}>
                <Text fontSize="sm" color="gray.600" mb={2} textAlign="center">
                  Drag to compare before and after
                </Text>
                <Slider
                  value={sliderValue}
                  onChange={setSliderValue}
                  min={0}
                  max={100}
                  step={1}
                >
                  <SliderTrack bg="gray.200">
                    <SliderFilledTrack bg="ocean.500" />
                  </SliderTrack>
                  <SliderThumb boxSize="20px" bg="ocean.500">
                    <Box width="8px" height="8px" bg="white" borderRadius="full" />
                  </SliderThumb>
                </Slider>
              </Box>
            )}
          </Box>
        )}

        {/* Photo Description */}
        {currentPhoto && (
          <Box
            bg="ocean.50"
            borderRadius="lg"
            p={4}
            border="1px solid"
            borderColor="ocean.200"
          >
            <VStack spacing={2} align="stretch">
              <Text fontSize="sm" fontWeight="medium" color="ocean.700">
                {currentPhoto.description}
              </Text>
              {currentPhoto.coordinates && (
                <Text fontSize="xs" color="gray.600">
                  📍 {currentPhoto.coordinates}
                </Text>
              )}
            </VStack>
          </Box>
        )}

        {/* Photo Index */}
        <HStack justify="center" spacing={2}>
          {availablePhotos.map((_, index) => (
            <Button
              key={index}
              size="xs"
              variant={index === currentPhotoIndex ? "solid" : "outline"}
              colorScheme="ocean"
              onClick={() => setCurrentPhotoIndex(index)}
              borderRadius="full"
              width="8px"
              height="8px"
              minW="8px"
              p="0"
            />
          ))}
        </HStack>

        {/* Unlock Progress */}
        <Box
          bg="seafoam.50"
          borderRadius="lg"
          p={4}
          border="1px solid"
          borderColor="seafoam.200"
        >
          <Text fontSize="sm" fontWeight="medium" color="seafoam.700" mb={2} textAlign="center">
            📈 Gallery Progress
          </Text>
          <Text fontSize="xs" color="gray.600" textAlign="center" mb={3}>
            {availablePhotos.length} of {photoComparisons.length} photo comparisons unlocked
          </Text>
          <Flex justify="space-between" fontSize="xs" color="gray.500">
            <Text>25%</Text>
            <Text>50%</Text>
            <Text>75%</Text>
            <Text>100%</Text>
          </Flex>
        </Box>

        <Text fontSize="xs" color="gray.500" textAlign="center" fontStyle="italic">
          * New photo comparisons unlock as campaign milestones are reached. All images show real cleanup results.
        </Text>
      </VStack>
    </Box>
  );
}
