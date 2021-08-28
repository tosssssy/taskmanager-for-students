export type SubjectProps = {
    id: number;
    author: {
      name: string;
      email: string;
    } | null;
    subject: string;
    date: Date;
    period: number;
    day: string;
    status: number;
    memo?: string;
  };

  export type NewSubjectProps = {
    newSubject: Pick<SubjectProps, "subject" | "date" | "period" | "day">;
  };