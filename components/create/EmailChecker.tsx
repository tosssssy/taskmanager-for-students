import React, { useState } from "react";

type Props = {
  email: any;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

const EmailChecker: React.FC<Props> = (props) => {
  const { email, setEmail } = props;
  const [newEmail, setNewEmail] = useState("");
  if (email) return <></>;

  return (
    <>
      <input
        name="email"
        type="email"
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={() => setEmail(newEmail)}>登録</button>
    </>
  );
};

export default EmailChecker;
