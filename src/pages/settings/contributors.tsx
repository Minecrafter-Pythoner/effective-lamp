import { Avatar, Box, IconButton } from "@chakra-ui/react";
import { open } from "@tauri-apps/plugin-shell";
import { useTranslation } from "react-i18next";
import { LuGithub } from "react-icons/lu";
import LinkIconButton from "@/components/common/link-icon-button";
import { OptionItemGroup } from "@/components/common/option-item";
import { WrapCardGroup } from "@/components/common/wrap-card";

export const CoreContributorsList = [
  {
    username: "UNIkeEN",
    contribution: "fullStackDev",
  },
  {
    username: "w1049",
    contribution: "fullStackDev",
  },
  {
    username: "SundayChen",
    contribution: "frontendDev",
  },
  {
    username: "Toolmanp",
    contribution: "backendDev",
  },
  {
    username: "Reqwey",
    contribution: "fullStackDev",
  },
  {
    username: "HsxMark",
    contribution: "frontendDev",
  },
  {
    username: "baiyuansjtu",
    contribution: "frontendDev",
  },
  {
    username: "KiloxGo",
    contribution: "frontendDev",
  },
  {
    username: "Minecrafter-Pythoner",
    contribution: "frontendDev",
  },
  {
    username: "ff98sha",
    contribution: "doc",
  },
  {
    username: "xunying123",
    contribution: "doc",
  },
  {
    username: "pangbo13",
    contribution: "cicd",
  },
  {
    username: "Neuteria",
    contribution: "design",
  },
  {
    username: "Stya-hr",
    contribution: "design",
  },
];

const ContributorsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <OptionItemGroup
        items={[
          {
            title: t("ContributorsPage.all"),
            children: (
              <LinkIconButton
                url="https://github.com/UNIkeEN/SJMCL/graphs/contributors"
                aria-label="all-contributors"
                isExternal
                showTooltip
                h={18}
              />
            ),
          },
        ]}
      />
      <WrapCardGroup
        title={t("ContributorsPage.core")}
        items={CoreContributorsList.map((item) => {
          return {
            cardContent: {
              title: item.username,
              description: t(
                `ContributorsPage.contribution.${item.contribution}`
              ),
              image: (
                <Avatar
                  size="sm"
                  name={item.username}
                  src={`https://avatars.githubusercontent.com/${item.username}`}
                />
              ),
              extraContent: (
                <Box position="absolute" top={0.5} right={1}>
                  <IconButton
                    size="xs"
                    variant="ghost"
                    aria-label={`${item.username}-github`}
                    icon={<LuGithub />}
                    onClick={() => {
                      open(`https://github.com/${item.username}`);
                    }}
                  />
                </Box>
              ),
            },
          };
        })}
      />
    </>
  );
};
export default ContributorsPage;
