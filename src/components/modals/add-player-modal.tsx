import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuChevronDown, LuLink2Off, LuPlus, LuServer } from "react-icons/lu";
import SegmentedControl from "@/components/common/segmented";
import AddAuthServerModal from "@/components/modals/add-auth-server-modal";
import { useLauncherConfig } from "@/contexts/config";
import { useData } from "@/contexts/data";
import { AuthServer } from "@/models/account";

interface AddPlayerModalProps extends Omit<ModalProps, "children"> {
  initialPlayerType?: string;
  initialAuthServerUrl?: string;
}

const AddPlayerModal: React.FC<AddPlayerModalProps> = ({
  initialPlayerType = "offline",
  initialAuthServerUrl = "",
  ...modalProps
}) => {
  const { t } = useTranslation();
  const { authServerList } = useData();
  const [playerType, setPlayerType] = useState<string>("");
  const [playername, setPlayername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [authServerUrl, setAuthServerUrl] = useState<string>("");
  const { config } = useLauncherConfig();
  const primaryColor = config.appearance.theme.primaryColor;

  const {
    isOpen: isAddAuthServerModalOpen,
    onOpen: onAddAuthServerModalOpen,
    onClose: onAddAuthServerModalClose,
  } = useDisclosure();

  useEffect(() => {
    setPlayerType(initialPlayerType);
  }, [initialPlayerType]);

  useEffect(() => {
    setAuthServerUrl(
      initialAuthServerUrl ||
        (authServerList.length > 0 ? authServerList[0].authUrl : "")
    );
  }, [initialAuthServerUrl, authServerList]);

  useEffect(() => {
    setPassword("");
  }, [playerType]);

  const playerTypeList = [
    {
      key: "offline",
      icon: LuLink2Off,
      label: t("Enums.playerTypes.offline"),
    },
    {
      key: "3rdparty",
      icon: LuServer,
      label: t("Enums.playerTypes.3rdparty"),
    },
  ];

  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("AddPlayerModal.modal.header")}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Stack direction="column" spacing={3.5}>
            <FormControl>
              <FormLabel>{t("AddPlayerModal.label.playerType")}</FormLabel>
              <SegmentedControl
                selected={playerType}
                onSelectItem={(s) => setPlayerType(s)}
                size="sm"
                items={playerTypeList.map((item) => ({
                  label: item.key,
                  value: (
                    <Flex align="center">
                      <Icon as={item.icon} mr={2} />
                      {item.label}
                    </Flex>
                  ),
                }))}
                withTooltip={false}
              />
            </FormControl>

            {playerType === "offline" ? (
              <FormControl isRequired>
                <FormLabel>{t("AddPlayerModal.label.playerName")}</FormLabel>
                <Input
                  placeholder={t("AddPlayerModal.placeholder.playerName")}
                  value={playername}
                  onChange={(e) => setPlayername(e.target.value)}
                  required
                />
              </FormControl>
            ) : (
              <>
                {authServerList.length === 0 ? (
                  <Stack direction="row" align="center">
                    <Text>{t("AddPlayerModal.authServer.noSource")}</Text>
                    <Button
                      variant="ghost"
                      colorScheme={primaryColor}
                      onClick={onAddAuthServerModalOpen}
                    >
                      <LuPlus />
                      <Text ml={1}>
                        {t("AddPlayerModal.authServer.addSource")}
                      </Text>
                    </Button>
                  </Stack>
                ) : (
                  <>
                    <FormControl>
                      <FormLabel>
                        {t("AddPlayerModal.label.authServer")}
                      </FormLabel>
                      <Stack direction="row" align="center">
                        <Menu>
                          <MenuButton
                            as={Button}
                            variant="outline"
                            rightIcon={<LuChevronDown />}
                          >
                            {authServerList.find(
                              (server) => server?.authUrl === authServerUrl
                            )?.name ||
                              t("AddPlayerModal.authServer.selectSource")}
                          </MenuButton>
                          <MenuList>
                            {authServerList.map((server: AuthServer) => (
                              <MenuItem
                                key={server.authUrl}
                                onClick={() => setAuthServerUrl(server.authUrl)}
                              >
                                {server.name}
                              </MenuItem>
                            ))}
                          </MenuList>
                        </Menu>
                        <Text className="secondary-text ellipsis-text">
                          {authServerUrl}
                        </Text>
                      </Stack>
                    </FormControl>
                    {authServerUrl && (
                      <>
                        <FormControl isRequired>
                          <FormLabel>
                            {t("AddPlayerModal.label.playerName")}
                          </FormLabel>
                          <Input
                            placeholder={t(
                              "AddPlayerModal.placeholder.playerName"
                            )}
                            value={playername}
                            onChange={(e) => setPlayername(e.target.value)}
                            required
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>
                            {t("AddPlayerModal.label.password")}
                          </FormLabel>
                          <Input
                            placeholder={t(
                              "AddPlayerModal.placeholder.password"
                            )}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                        </FormControl>
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={modalProps.onClose}>
            {t("AddPlayerModal.modal.cancel")}
          </Button>
          <Button
            colorScheme={primaryColor}
            onClick={modalProps.onClose}
            ml={3}
            isDisabled={
              !playername ||
              (playerType === "3rdparty" &&
                authServerList.length > 0 &&
                (!authServerUrl || !password))
            }
          >
            {t("AddPlayerModal.modal.confirm")}
          </Button>
        </ModalFooter>
      </ModalContent>
      <AddAuthServerModal
        isOpen={isAddAuthServerModalOpen}
        onClose={onAddAuthServerModalClose}
        isCentered
      />
    </Modal>
  );
};

export default AddPlayerModal;
