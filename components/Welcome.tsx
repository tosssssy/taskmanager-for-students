import { Box } from "@chakra-ui/layout";
import { FC } from "react";

export const Welcome: FC = () => {
  return (
    <>
      <Box fontSize={"x-large"} m={50}>
        大学生のためのシンプルな課題管理アプリ
      </Box>
    </>
  );
};
