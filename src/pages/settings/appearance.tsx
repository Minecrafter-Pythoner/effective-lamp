import {
  Box,
  Button,
  Card,
  IconButton,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LuChevronDown } from "react-icons/lu";
import ChakraColorSelector from "@/components/common/chakra-color-selector";
import {
  OptionItemGroup,
  OptionItemGroupProps,
} from "@/components/common/option-item";
import { useLauncherConfig } from "@/contexts/config";

const AppearanceSettingsPage = () => {
  const { t } = useTranslation();
  const { config, update } = useLauncherConfig();
  const appearanceConfigs = config.appearance;
  const primaryColor = appearanceConfigs.theme.primaryColor;

  const ColorSelectPopover = () => {
    return (
      <Popover>
        <PopoverTrigger>
          <IconButton
            size="xs"
            colorScheme={primaryColor}
            aria-label="color"
            icon={<LuChevronDown />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <ChakraColorSelector
              current={primaryColor}
              onColorSelect={(color) => {
                update("appearance.theme.primaryColor", color);
              }}
              size="xs"
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  };

  const HeadNavStyleMenu = () => {
    const headNavStyleTypes = ["standard", "simplified"];

    return (
      <Menu>
        <MenuButton
          as={Button}
          size="xs"
          w="auto"
          rightIcon={<LuChevronDown />}
          variant="outline"
          textAlign="left"
        >
          {t(
            `AppearanceSettingsPage.theme.settings.headNavStyle.type.${appearanceConfigs.theme.headNavStyle}`
          )}
        </MenuButton>
        <MenuList>
          <MenuOptionGroup
            value={appearanceConfigs.theme.headNavStyle}
            type="radio"
            onChange={(value) => {
              update("appearance.theme.headNavStyle", value);
            }}
          >
            {headNavStyleTypes.map((type) => (
              <MenuItemOption value={type} fontSize="xs" key={type}>
                {t(
                  `AppearanceSettingsPage.theme.settings.headNavStyle.type.${type}`
                )}
              </MenuItemOption>
            ))}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
    );
  };

  const PresetBackgroundList = () => {
    const presetBgList = ["Jokull", "SJTU-eastgate"];
    const presetChoice = appearanceConfigs.background.presetChoice;

    return (
      <Wrap spacing={3.5}>
        {presetBgList.map((bg) => (
          <WrapItem key={bg}>
            <VStack spacing={1}>
              <Card
                w="6rem"
                h="3.375rem"
                borderWidth={presetChoice === bg ? 2 : 0}
                borderColor={`${primaryColor}.500`}
                variant={presetChoice === bg ? "outline" : "elevated"}
                overflow="hidden"
                cursor="pointer"
              >
                <Box
                  w="100%"
                  h="100%"
                  bgImage={`url('/images/${bg}.jpg')`}
                  bgSize="cover"
                  bgPosition="center"
                  bgRepeat="no-repeat"
                  onClick={() => {
                    update("appearance.background.presetChoice", bg);
                  }}
                />
              </Card>
              <Text
                fontSize="xs"
                className={`no-select ${presetChoice !== bg ? "secondary-text" : ""}`}
                mt={presetChoice === bg ? "-1px" : 0} // compensate for the offset caused by selected card's border
              >
                {t(`AppearanceSettingsPage.background.presetBgList.${bg}.name`)}
              </Text>
            </VStack>
          </WrapItem>
        ))}
      </Wrap>
    );
  };

  const appearanceSettingGroups: OptionItemGroupProps[] = [
    {
      title: t("AppearanceSettingsPage.theme.title"),
      items: [
        {
          title: t("AppearanceSettingsPage.theme.settings.primaryColor.title"),
          children: <ColorSelectPopover />,
        },
        {
          title: t("AppearanceSettingsPage.theme.settings.headNavStyle.title"),
          children: <HeadNavStyleMenu />,
        },
      ],
    },
    {
      title: t("AppearanceSettingsPage.background.title"),
      items: [
        {
          title: t("AppearanceSettingsPage.background.settings.preset.title"),
          children: <PresetBackgroundList />,
        },
      ],
    },
  ];

  return (
    <>
      {appearanceSettingGroups.map((group, index) => (
        <OptionItemGroup title={group.title} items={group.items} key={index} />
      ))}
    </>
  );
};

export default AppearanceSettingsPage;
