import { Button, Flex, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import {
  LuEarth,
  LuFullscreen,
  LuHaze,
  LuHouse,
  LuPackage,
  LuPlay,
  LuSettings,
  LuSquareLibrary,
} from "react-icons/lu";
import NavMenu from "@/components/common/nav-menu";
import { useLauncherConfig } from "@/contexts/config";
import { InstanceContext, InstanceContextProvider } from "@/contexts/instance";

const InstanceLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <InstanceContextProvider>
      <InstanceLayoutContent>{children}</InstanceLayoutContent>
    </InstanceContextProvider>
  );
};

const InstanceLayoutContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const { currentInstanceSummary } = useContext(InstanceContext);
  const { config } = useLauncherConfig();
  const primaryColor = config.appearance.theme.primaryColor;

  const instanceTabList: { key: string; icon: IconType }[] = [
    { key: "overview", icon: LuHouse },
    { key: "worlds", icon: LuEarth },
    { key: "mods", icon: LuSquareLibrary },
    { key: "resourcepacks", icon: LuPackage },
    { key: "shaderpacks", icon: LuHaze },
    { key: "screenshots", icon: LuFullscreen },
    { key: "settings", icon: LuSettings },
  ];

  return (
    <VStack align="strench" spacing={4}>
      <Flex alignItems="flex-start">
        <Text fontWeight="bold" fontSize="sm">
          {currentInstanceSummary?.name}
        </Text>
        <Button
          leftIcon={<LuPlay />}
          size="xs"
          ml="auto"
          colorScheme={primaryColor}
          onClick={() => {}} // todo
        >
          {t("InstanceLayout.Button.launch")}
        </Button>
      </Flex>
      <NavMenu
        className="no-scrollbar"
        overflow="auto"
        selectedKeys={[router.asPath]}
        onClick={(value) => router.push(value)}
        direction="row"
        size="xs"
        spacing={1}
        mt={-1.5}
        items={instanceTabList.map((item) => ({
          value: `/games/instance/${router.query.id}/${item.key}`,
          label: (
            <HStack spacing={1.5}>
              <Icon as={item.icon} />
              <Text fontSize="sm">
                {t(`InstanceLayout.instanceTabList.${item.key}`)}
              </Text>
            </HStack>
          ),
        }))}
      />
      {children}
    </VStack>
  );
};

export default InstanceLayout;
