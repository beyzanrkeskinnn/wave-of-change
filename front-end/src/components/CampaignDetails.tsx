"use client";
import {
  Container,
  Box,
  IconButton,
  Image,
  Text,
  Flex,
  useBreakpointValue,
  Heading,
  Progress,
  Button,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Alert,
  AlertTitle,
  AlertDescription,
  Spinner,
  Tooltip,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Card,
  CardBody,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon, InfoIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { CAMPAIGN_SUBTITLE, CAMPAIGN_TITLE } from "@/constants/campaign";
import StyledMarkdown from "./StyledMarkdown";
import { useCampaignInfo, useExistingDonation } from "@/hooks/campaignQueries";
import { useCurrentBtcBlock } from "@/hooks/chainQueries";
import { format } from "timeago.js";
import DonationModal from "./DonationModal";
import HiroWalletContext from "./HiroWalletProvider";
import { useDevnetWallet } from "@/lib/devnet-wallet-context";
import PollutionTracker from "./PollutionTracker";
import CleanupMap from "./CleanupMap";
import MarineLifeCounter from "./MarineLifeCounter";
import PhotoGallery from "./PhotoGallery";
import {
  isDevnetEnvironment,
  isTestnetEnvironment,
} from "@/lib/contract-utils";
import { satsToSbtc, useCurrentPrices, ustxToStx } from "@/lib/currency-utils";
import { FUNDRAISING_CONTRACT } from "@/constants/contracts";
import { getRefundTx } from "@/lib/campaign-utils";
import { getStacksNetworkString } from "@/lib/stacks-api";
import useTransactionExecuter from "@/hooks/useTransactionExecuter";
import CampaignAdminControls from "./CampaignAdminControls";

export default function CampaignDetails({
  images,
  markdownContent,
}: {
  images: string[];
  markdownContent: string;
}) {
  const { mainnetAddress, testnetAddress } = useContext(HiroWalletContext);
  const { currentWallet: devnetWallet } = useDevnetWallet();
  const currentWalletAddress = isDevnetEnvironment()
    ? devnetWallet?.stxAddress
    : isTestnetEnvironment()
    ? testnetAddress
    : mainnetAddress;

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideSize = useBreakpointValue({ base: "100%", md: "500px" });

  const { data: currentPrices } = useCurrentPrices();
  const { data: campaignInfo, error: campaignFetchError } =
    useCampaignInfo(currentPrices);
  const { data: currentBlock } = useCurrentBtcBlock();

  const campaignIsUninitialized = campaignInfo?.start === 0;
  const campaignIsExpired = !campaignIsUninitialized && campaignInfo?.isExpired;
  const campaignIsCancelled =
    !campaignIsUninitialized && campaignInfo?.isCancelled;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const progress = campaignInfo
    ? (campaignInfo.usdValue / campaignInfo.goal) * 100
    : 0;

  const blocksLeft = campaignInfo ? campaignInfo?.end - (currentBlock || 0) : 0;
  const secondsLeft = blocksLeft * 600; // estimate each block is 10 minutes
  const secondsLeftTimestamp = new Date(Date.now() - secondsLeft * 1000);

  const { data: previousDonation } = useExistingDonation(currentWalletAddress);

  const hasMadePreviousDonation =
    previousDonation &&
    (previousDonation?.stxAmount > 0 || previousDonation?.sbtcAmount > 0);

  const executeTx = useTransactionExecuter();

  const handleRefund = async () => {
    const txOptions = getRefundTx(
      getStacksNetworkString(),
      currentWalletAddress || ""
    );
    await executeTx(
      txOptions,
      devnetWallet,
      "Refund requested",
      "Refund not requested"
    );
  };

  return (
    <Container maxW="container.xl" py="8" position="relative">
      {/* Floating ocean particles */}
      <Box className="bubble" style={{ left: "10%", animationDelay: "0s" }} />
      <Box className="bubble" style={{ left: "20%", animationDelay: "2s" }} />
      <Box className="bubble" style={{ left: "80%", animationDelay: "4s" }} />
      
      <Flex direction="column" gap="8">
        {/* Hero Section */}
        <Box
          bg="linear-gradient(135deg, rgba(0, 119, 190, 0.1) 0%, rgba(32, 178, 170, 0.1) 100%)"
          borderRadius="2xl"
          p={8}
          border="2px solid"
          borderColor="ocean.200"
          position="relative"
          overflow="hidden"
          className="floating-element"
        >
          <Box className="ocean-wave" opacity={0.1} />
          <Flex direction="column" gap="3" position="relative" zIndex={2}>
            <HStack spacing={4}>
              <Text fontSize="4xl" className="floating-element">🌊</Text>
              <VStack align="start" spacing={1}>
                <Heading color="ocean.700" fontSize={{ base: "2xl", md: "3xl" }}>
                  {CAMPAIGN_TITLE}
                </Heading>
                <Text color="ocean.600" fontSize={{ base: "md", md: "lg" }}>
                  {CAMPAIGN_SUBTITLE}
                </Text>
              </VStack>
            </HStack>
          </Flex>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="start">
          {/* Left column: Image carousel with ocean styling */}
          <Box 
            position="relative" 
            width="full" 
            overflow="hidden"
            borderRadius="xl"
            border="2px solid"
            borderColor="ocean.200"
            bg="ocean.50"
            className="ocean-current"
          >
            <Flex width={slideSize} mx="auto" position="relative">
              {images.length > 0 ? (
                <Image
                  src={images[currentIndex]}
                  alt={`Ocean cleanup operation ${currentIndex + 1}`}
                  objectFit="cover"
                  width="full"
                  height="400px"
                  fallback={
                    <Box
                      width="full"
                      height="400px"
                      bg="ocean.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexDirection="column"
                      gap={4}
                    >
                      <Text fontSize="6xl">🌊</Text>
                      <Text color="ocean.600" fontWeight="medium">
                        Ocean Cleanup Operation #{currentIndex + 1}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Documentation coming soon
                      </Text>
                    </Box>
                  }
                />
              ) : (
                <Box
                  width="full"
                  height="400px"
                  bg="ocean.100"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexDirection="column"
                  gap={4}
                >
                  <Text fontSize="6xl">🌊</Text>
                  <Text color="ocean.600" fontWeight="medium">
                    Ocean Cleanup Operations
                  </Text>
                  <Text fontSize="sm" color="gray.500">
                    Documentation coming soon
                  </Text>
                </Box>
              )}
              
              {images.length > 1 && (
                <>
                  <IconButton
                    aria-label="Previous image"
                    icon={<ChevronLeftIcon boxSize="5" />}
                    onClick={prevSlide}
                    position="absolute"
                    left="2"
                    top="50%"
                    transform="translateY(-50%)"
                    colorScheme="ocean"
                    rounded="full"
                    size="sm"
                  />
                  <IconButton
                    aria-label="Next image"
                    icon={<ChevronRightIcon boxSize="5" />}
                    onClick={nextSlide}
                    position="absolute"
                    right="2"
                    top="50%"
                    transform="translateY(-50%)"
                    colorScheme="ocean"
                    rounded="full"
                    size="sm"
                  />
                </>
              )}
              
              {images.length > 0 && (
                <Text
                  position="absolute"
                  bottom="2"
                  right="2"
                  bg="blackAlpha.700"
                  color="white"
                  px="2"
                  py="1"
                  rounded="md"
                  fontSize="sm"
                >
                  {currentIndex + 1} / {images.length}
                </Text>
              )}
            </Flex>
          </Box>

          {/* Right column: Campaign stats & donation with ocean theme */}
          <Box>
            {campaignInfo &&
            currentWalletAddress === FUNDRAISING_CONTRACT.address ? (
              <CampaignAdminControls
                campaignIsUninitialized={campaignIsUninitialized}
                campaignIsExpired={!!campaignIsExpired}
                campaignIsCancelled={!!campaignIsCancelled}
                campaignIsWithdrawn={!!campaignInfo?.isWithdrawn}
              />
            ) : null}
            
            <Box 
              p={6} 
              borderRadius="xl" 
              border="2px solid"
              borderColor="ocean.200"
              bg="rgba(255, 255, 255, 0.9)"
              backdropFilter="blur(10px)"
              boxShadow="0 8px 32px rgba(0, 119, 190, 0.1)"
              position="relative"
              overflow="hidden"
            >
              <Box className="ocean-wave" opacity={0.05} />
              
              {campaignIsUninitialized ? (
                <Flex direction="column" gap="4" position="relative" zIndex={2}>
                  <Text color="ocean.600" fontSize="lg" textAlign="center">
                    🚀 Campaign launching soon!
                  </Text>
                  <Text color="gray.600" fontSize="sm" textAlign="center">
                    Our ocean cleanup initiative will begin once initialized.
                  </Text>
                </Flex>
              ) : null}

              {campaignInfo && !campaignIsUninitialized ? (
                <Flex direction="column" gap={6} position="relative" zIndex={2}>
                  <SimpleGrid columns={2} spacing={4}>
                    <Stat>
                      <StatLabel color="ocean.600">🎯 Raised</StatLabel>
                      <StatNumber color="seafoam.600">
                        $
                        {campaignInfo?.usdValue?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </StatNumber>
                      <StatHelpText color="gray.600">
                        of ${campaignInfo?.goal?.toLocaleString()} goal
                      </StatHelpText>
                    </Stat>
                    <Stat>
                      <StatLabel color="ocean.600">🤝 Ocean Protectors</StatLabel>
                      <StatNumber color="coral.500">{campaignInfo?.donationCount}</StatNumber>
                      <StatHelpText color="gray.600">
                        {campaignIsExpired ? (
                          <Flex direction="column">
                            <Box>
                              Campaign completed 
                              <Tooltip
                                label={
                                  <Flex direction="column" gap="1">
                                    <Box>
                                      Completed at: Block #{campaignInfo?.end}
                                    </Box>
                                    <Box>Current: Block #{currentBlock}</Box>
                                  </Flex>
                                }
                              >
                                <InfoIcon ml="1.5" mt="-3px" />
                              </Tooltip>
                            </Box>
                          </Flex>
                        ) : (
                          <Flex direction="column">
                            <Box>
                              {blocksLeft.toLocaleString()} blocks left
                              <Tooltip
                                label={
                                  <Flex direction="column" gap="1">
                                    <Box>
                                      Started: Block #{campaignInfo?.start}
                                    </Box>
                                    <Box>Ends: Block #{campaignInfo?.end}</Box>
                                    <Box>Current: Block #{currentBlock}</Box>
                                  </Flex>
                                }
                              >
                                <InfoIcon ml="1.5" mt="-3px" />
                              </Tooltip>
                            </Box>
                            <Box>
                              (About{" "}
                              {format(secondsLeftTimestamp)?.replace(
                                " ago",
                                ""
                              )}
                              )
                            </Box>
                          </Flex>
                        )}
                      </StatHelpText>
                    </Stat>
                  </SimpleGrid>

                  <Box>
                    <Progress
                      value={progress}
                      size="lg"
                      borderRadius="full"
                      bg="gray.200"
                      sx={{
                        "& > div": {
                          background: "linear-gradient(90deg, #0077BE 0%, #20B2AA 100%)",
                        },
                      }}
                    />
                  </Box>

                  {campaignIsExpired || campaignIsCancelled ? (
                    <Flex direction="column" gap="2">
                      <Box color="ocean.700" fontWeight="medium">
                        This ocean cleanup campaign{" "}
                        {campaignIsCancelled ? "was cancelled" : "has completed"}.
                        {campaignIsCancelled
                          ? " Ocean protectors are eligible for a refund."
                          : null}
                      </Box>
                      {hasMadePreviousDonation ? (
                        <Alert 
                          mb="4" 
                          borderRadius="lg" 
                          border="1px solid" 
                          borderColor="ocean.200"
                          bg="ocean.50"
                        >
                          <Box>
                            <AlertTitle color="ocean.700">
                              🐠 Thank you for protecting our oceans!
                            </AlertTitle>
                            <AlertDescription>
                              <Box color="gray.700">
                                STX:{" "}
                                {Number(
                                  ustxToStx(previousDonation?.stxAmount)
                                ).toFixed(2)}
                              </Box>
                              <Box color="gray.700">
                                sBTC:{" "}
                                {satsToSbtc(
                                  previousDonation?.sbtcAmount
                                ).toFixed(8)}
                              </Box>
                            </AlertDescription>
                            <Box mt="4">
                              {!campaignIsCancelled ? (
                                <Box color="seafoam.600" fontWeight="medium">
                                  🌊 Your contribution is making waves for marine conservation!
                                </Box>
                              ) : (
                                <Button
                                  colorScheme="ocean"
                                  variant="ocean"
                                  onClick={handleRefund}
                                  leftIcon={<Text>💰</Text>}
                                >
                                  Request Ocean Cleanup Refund
                                </Button>
                              )}
                            </Box>
                          </Box>
                        </Alert>
                      ) : null}
                    </Flex>
                  ) : (
                    <Flex direction="column" gap="4">
                      <Button
                        size="lg"
                        colorScheme="ocean"
                        variant="ocean"
                        width="full"
                        onClick={() => {
                          setIsDonationModalOpen(true);
                        }}
                        leftIcon={<Text>🌊</Text>}
                        className="wave-button ripple-effect"
                        _hover={{
                          transform: "translateY(-2px)",
                          boxShadow: "0 12px 40px rgba(0, 119, 190, 0.4)",
                        }}
                      >
                        Support Ocean Cleanup Now
                      </Button>
                      <Box fontSize="xs" color="gray.600">
                        <Box mb="2" textAlign="center" fontWeight="medium" color="ocean.600">
                          🌍 Every donation directly funds:
                        </Box>
                        <VStack spacing={1} align="start" fontSize="xs">
                          <Text>• 🗑️ Plastic waste removal operations</Text>
                          <Text>• 🐢 Marine life rescue and rehabilitation</Text>
                          <Text>• 🔬 Ocean pollution research and prevention</Text>
                          <Text>• 👥 Community education and volunteer programs</Text>
                        </VStack>
                        <Box mt="3" p="3" bg="seafoam.50" borderRadius="md" border="1px solid" borderColor="seafoam.200">
                          <Text fontWeight="medium" color="seafoam.700" mb="1">
                            <strong>Flexible funding</strong>: We keep whatever funds are raised to maximize ocean impact, even if we don&apos;t hit our target.
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            The campaign creator can choose to cancel and provide refunds at any time.
                          </Text>
                        </Box>
                      </Box>
                    </Flex>
                  )}
                </Flex>
              ) : campaignFetchError ? (
                <Box position="relative" zIndex={2}>
                  <Alert status="warning" borderRadius="lg">
                    <Box>
                      <AlertTitle>⚠️ Campaign Data Unavailable</AlertTitle>
                      <AlertDescription>
                        Unable to retrieve ocean cleanup campaign data from the blockchain.
                        This could be due to network issues or the campaign may no longer exist.
                      </AlertDescription>
                    </Box>
                  </Alert>
                </Box>
              ) : !campaignIsUninitialized ? (
                <Box w="full" textAlign="center" position="relative" zIndex={2}>
                  <Spinner size="lg" color="ocean.500" />
                  <Text mt="4" color="ocean.600">Loading ocean cleanup data...</Text>
                </Box>
              ) : null}
            </Box>
          </Box>
        </SimpleGrid>

        {/* Ocean Dashboard - Interactive Components */}
        <Box
          bg="rgba(255, 255, 255, 0.8)"
          borderRadius="2xl"
          border="2px solid"
          borderColor="ocean.200"
          p={6}
          position="relative"
          overflow="hidden"
        >
          <Box className="ocean-wave" opacity={0.03} />
          <Box className="ocean-wave" opacity={0.02} />
          
          <VStack spacing={6} position="relative" zIndex={2}>
            <Box textAlign="center">
              <Heading size="lg" color="ocean.700" mb={2}>
                🌊 Ocean Impact Dashboard
              </Heading>
              <Text color="gray.600">
                Real-time tracking of our ocean cleanup efforts and marine conservation impact
              </Text>
            </Box>

            <Tabs variant="soft-rounded" colorScheme="ocean" width="full">
              <TabList justifyContent="center" flexWrap="wrap" gap={2}>
                <Tab fontSize="sm" fontWeight="medium">
                  🗺️ Cleanup Progress
                </Tab>
                <Tab fontSize="sm" fontWeight="medium">
                  📊 Pollution Tracker
                </Tab>
                <Tab fontSize="sm" fontWeight="medium">
                  🐠 Marine Life
                </Tab>
                <Tab fontSize="sm" fontWeight="medium">
                  📸 Before & After
                </Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <CleanupMap />
                </TabPanel>
                <TabPanel px={0}>
                  <PollutionTracker />
                </TabPanel>
                <TabPanel px={0}>
                  <MarineLifeCounter />
                </TabPanel>
                <TabPanel px={0}>
                  <PhotoGallery />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </VStack>
        </Box>

        {/* Campaign Details - Markdown content with ocean styling */}
        <Box
          bg="rgba(255, 255, 255, 0.9)"
          borderRadius="xl"
          border="1px solid"
          borderColor="ocean.100"
          p={8}
          position="relative"
          overflow="hidden"
        >
          <Box className="ocean-wave" opacity={0.02} />
          <StyledMarkdown>{markdownContent}</StyledMarkdown>
        </Box>      {/* Ocean Impact Summary */}
      <Card bg="blue.50" borderColor="blue.200" mb={8}>
        <CardBody>
          <Flex align="center" gap={2} mb={4}>
            <Text fontSize="2xl">🌊</Text>
            <Heading size="lg" color="blue.800">Your Impact</Heading>
          </Flex>
          <SimpleGrid columns={[2, 2, 4]} gap={4}>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">2.5M</Text>
              <Text fontSize="sm" color="gray.600">Pounds of plastic removed</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="cyan.600">15</Text>
              <Text fontSize="sm" color="gray.600">Marine species protected</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="blue.600">500</Text>
              <Text fontSize="sm" color="gray.600">Miles of coastline cleaned</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="2xl" fontWeight="bold" color="cyan.600">50K</Text>
              <Text fontSize="sm" color="gray.600">Community members engaged</Text>
            </Box>
          </SimpleGrid>
        </CardBody>
      </Card>

      {/* Call to Action */}
      <Card bgGradient="linear(to-r, blue.600, cyan.600)" color="white" mb={8}>
        <CardBody textAlign="center" p={8}>
          <Heading size="lg" mb={4}>🐋 Join the Wave of Change</Heading>
          <Text fontSize="lg" mb={6} opacity={0.9}>
            Every donation brings us closer to cleaner oceans and protected marine life. 
            Together, we can turn the tide on ocean pollution.
          </Text>
          <VStack spacing={4}>
            <Button 
              onClick={() => setIsDonationModalOpen(true)}
              bg="white"
              color="blue.600"
              _hover={{ bg: "blue.50" }}
              px={8}
              py={3}
              fontSize="lg"
              fontWeight="semibold"
              className="ocean-button"
              isDisabled={!currentWalletAddress}
            >
              🌊 Donate Now
            </Button>
            {!currentWalletAddress && (
              <Text fontSize="sm" opacity={0.75}>Connect your wallet to donate</Text>
            )}
          </VStack>
        </CardBody>
      </Card>
      </Flex>
      
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => {
          setIsDonationModalOpen(false);
        }}
      />
    </Container>
  );
}
