import React, { FC, useState } from "react";
import { NewSubject } from "./NewSubject";
import { InputSubjectInfo } from "./InputSubjectInfo";
import { NewSubjectType } from "../../lib/types";
import { useSession } from "next-auth/client";
import { Box } from "@chakra-ui/layout";

type Props = {
  newSubjects: NewSubjectType[];
  setNewSubjects: React.Dispatch<React.SetStateAction<NewSubjectType[]>>;
};

export const SubjectCreator: FC<Props> = ({ newSubjects, setNewSubjects }) => {
  const [session] = useSession();
  const [name, setName] = useState("");
  const [period, setPeriod] = useState(1);
  const [day, setDay] = useState("Sun");
  const date: Date = null;

  const addSubject = () => {
    const newSubject: NewSubjectType = {
      name: name,
      date: date,
      period: period,
      day: day,
      authorId: Number(session.user.id),
    };
    setNewSubjects(newSubjects.concat(newSubject));
  };

  const deleteSubject = (key: number) => {
    const newList = newSubjects.filter((_, index) => {
      return index !== key;
    });
    setNewSubjects(newList);
  };

  return (
    <>
      <InputSubjectInfo
        name={name}
        setName={setName}
        period={period}
        setPeriod={setPeriod}
        day={day}
        setDay={setDay}
        addSubject={addSubject}
      />
      {newSubjects.map((subject, index) => {
        return (
          <>
            <Box key={index}>
              <NewSubject
                subject={subject}
                deleteSubject={() => deleteSubject(index)}
              />
            </Box>
          </>
        );
      })}
    </>
  );
};
