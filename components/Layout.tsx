import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
    </Box>
  );
};

export default Layout;
