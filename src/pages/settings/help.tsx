import { useTranslation } from "react-i18next";
import LinkIconButton from "@/components/common/link-icon-button";
import {
  OptionItemGroup,
  OptionItemGroupProps,
} from "@/components/common/option-item";

const HelpSettingsPage = () => {
  const { t } = useTranslation();
  const helpSettingGroups: OptionItemGroupProps[] = [
    {
      items: [
        {
          title: t("HelpSettingsPage.top.settings.LauncherDocs.title"),
          children: (
            <LinkIconButton
              url="https://mc.sjtu.cn/launcher-faq"
              aria-label="launcherdoc"
              isExternal
              showTooltip
              h={18}
            />
          ),
        },
      ],
    },
    {
      title: t("HelpSettingsPage.minecraft.title"),
      items: [
        {
          title: t("HelpSettingsPage.minecraft.settings.mcWiki.title"),
          description: t(
            "HelpSettingsPage.minecraft.settings.mcWiki.description"
          ),
          children: (
            <LinkIconButton
              url={t("HelpSettingsPage.minecraft.settings.mcWiki.url")}
              aria-label="mcWiki"
              isExternal
              showTooltip
            />
          ),
        },
        {
          title: t("HelpSettingsPage.minecraft.settings.mcMod.title"),
          description: t(
            "HelpSettingsPage.minecraft.settings.mcMod.description"
          ),
          children: (
            <LinkIconButton
              url="https://www.mcmod.cn/"
              aria-label="mcMod"
              isExternal
              showTooltip
            />
          ),
        },
        {
          title: t("HelpSettingsPage.minecraft.settings.curseforge.title"),
          description: t(
            "HelpSettingsPage.minecraft.settings.curseforge.description"
          ),
          children: (
            <LinkIconButton
              url="https://www.curseforge.com/minecraft"
              aria-label="curseforge"
              isExternal
              showTooltip
            />
          ),
        },
      ],
    },
    {
      title: t("HelpSettingsPage.community.title"),
      items: [
        {
          title: t("HelpSettingsPage.community.settings.MUA.title"),
          description: t("HelpSettingsPage.community.settings.MUA.description"),
          children: (
            <LinkIconButton
              url="https://www.mualliance.cn/"
              aria-label="MUA"
              isExternal
              showTooltip
            />
          ),
        },
        {
          title: t("HelpSettingsPage.community.settings.SJMC.title"),
          children: (
            <LinkIconButton
              url="https://mc.sjtu.cn/"
              aria-label="SJMC"
              isExternal
              showTooltip
              h={18}
            />
          ),
        },
      ],
    },
  ];

  return (
    <>
      {helpSettingGroups.map((group, index) => (
        <OptionItemGroup title={group.title} items={group.items} key={index} />
      ))}
    </>
  );
};

export default HelpSettingsPage;
