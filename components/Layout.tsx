import { Box, chakra, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/client";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  const [session] = useSession();

  return (
    <Box>
      <Header />
      {session ? props.children : <div>ログインしてください</div>}
      {/* <Heading size={"4xl"}>
        <span>大学生のための</span>
        <br></br>
        <chakra.span
          bgGradient="linear(to-r, teal.500,green.500)"
          bgClip="text"
        >
          シンプル
        </chakra.span>
        な課題管理アプリ
      </Heading> */}
    </Box>
  );
};

export default Layout;
