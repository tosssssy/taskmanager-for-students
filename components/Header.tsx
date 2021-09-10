import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  let left = <div className="left"></div>;

  let right = null;

  if (loading) {
    left = <div className="left"></div>;
    right = (
      <div className="right">
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin">
          <Button data-active={isActive("/signup")}>Log in</Button>
        </Link>
      </div>
    );
  }

  if (session) {
    left = <div className="left"></div>;
    right = (
      <div className="right">
        <p>{session.user.name}</p>
        <Link href="/create">
          <button>
            <a>新規作成</a>
          </button>
        </Link>
        <button onClick={() => signOut()}>
          <a>ログアウト</a>
        </button>
      </div>
    );
  }

  return (
    <Box bg="gray" h="100px" textAlign="right">
      {left}
      {right}
    </Box>
  );
};

export default Header;
