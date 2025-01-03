import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLauncherConfig } from "@/contexts/config";
import { useData, useDataDispatch } from "@/contexts/data";
import { useToast } from "@/contexts/toast";
import { AuthServer } from "@/models/account";

interface AddAuthServerModalProps extends Omit<ModalProps, "children"> {}

const AddAuthServerModal: React.FC<AddAuthServerModalProps> = ({
  isOpen,
  onClose,
  ...modalProps
}) => {
  const { t } = useTranslation();
  const { authServerList } = useData();
  const { setAuthServerList } = useDataDispatch();
  const toast = useToast();
  const { config } = useLauncherConfig();
  const primaryColor = config.appearance.theme.primaryColor;

  const [serverUrl, setServerUrl] = useState<string>("");
  const [serverName] = useState<string>("Mock Server Name");
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isServerUrlTouched, setIsServerUrlTouched] = useState(false);
  const isServerUrlInvalid = isServerUrlTouched && !serverUrl;

  useEffect(() => {
    if (isOpen) {
      setIsNextStep(false);
      setServerUrl("");
      setIsServerUrlTouched(false);
    }
  }, [isOpen]);

  const handleNextStep = () => {
    const isDuplicate = authServerList.some(
      (server) => server.authUrl === serverUrl
    );
    if (isDuplicate) {
      toast({
        title: t("AddAuthServerModal.toast.duplicateServer"),
        status: "error",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsNextStep(true);
    }, 1000);
  };

  const handleFinish = () => {
    const newServer: AuthServer = { name: serverName, authUrl: serverUrl };

    setAuthServerList([...authServerList, newServer]);
    toast({
      title: t("AddAuthServerModal.toast.success"),
      status: "success",
    });
    onClose?.();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("AddAuthServerModal.header.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!isNextStep ? (
            <FormControl isInvalid={isServerUrlInvalid}>
              <FormLabel htmlFor="serverUrl">
                {t("AddAuthServerModal.page1.serverUrl")}{" "}
                <Text as="span" color="red.500">
                  *
                </Text>
              </FormLabel>
              <Input
                id="serverUrl"
                type="url"
                placeholder={t("AddAuthServerModal.placeholder.inputServerUrl")}
                value={serverUrl}
                onChange={(e) => setServerUrl(e.target.value)}
                onBlur={() => setIsServerUrlTouched(true)}
              />
              {isServerUrlInvalid && (
                <FormErrorMessage>
                  {t("AddAuthServerModal.page1.serverUrlRequired")}
                </FormErrorMessage>
              )}
            </FormControl>
          ) : (
            <VStack spacing={3.5} align="flex-start">
              <HStack spacing={2}>
                <Text fontWeight={500}>
                  {t("AddAuthServerModal.page2.name")}
                </Text>
                <Text>{serverName}</Text>
              </HStack>
              <HStack spacing={2}>
                <Text fontWeight={500}>
                  {t("AddAuthServerModal.page2.serverUrl")}
                </Text>
                <Text>{serverUrl}</Text>
              </HStack>
            </VStack>
          )}
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3} ml="auto">
            <Button variant="ghost" onClick={onClose}>
              {t("AddAuthServerModal.button.cancel")}
            </Button>
            {isNextStep ? (
              <>
                <Button variant="ghost" onClick={() => setIsNextStep(false)}>
                  {t("AddAuthServerModal.button.previous")}
                </Button>
                <Button colorScheme={primaryColor} onClick={handleFinish}>
                  {t("AddAuthServerModal.button.finish")}
                </Button>
              </>
            ) : (
              <Button
                colorScheme={primaryColor}
                onClick={handleNextStep}
                isLoading={isLoading}
                isDisabled={!serverUrl}
              >
                {t("AddAuthServerModal.button.next")}
              </Button>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAuthServerModal;
