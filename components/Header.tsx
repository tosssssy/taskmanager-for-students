import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Welcome } from "./Welcome";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  let right = null;

  if (loading) {
    right = (
      <div>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <Box>
        <Link href="/api/auth/signin">
          <Button data-active={isActive("/signup")} m="5px" bg="blue.500">
            Log in
          </Button>
        </Link>
      </Box>
    );
  }

  if (session) {
    right = (
      <Box mt="10px">
        <p>user：{session.user.name}</p>
        <Link href="/create">
          <Button m="5px" size="sm">
            新規作成
          </Button>
        </Link>
        <Button m="5px" size="sm" onClick={() => signOut()}>
          ログアウト
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Flex align="center" justify="space-between" minH="70px">
        <Heading
          ml="40px"
          p="2px"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
          fontSize="4xl"
        >
          <Link href="/">Task Manager</Link>
        </Heading>

        {right}
      </Flex>
      {!session && <Welcome />}
    </>
  );
};

export default Header;
