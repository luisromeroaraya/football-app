import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
}

const PageSection: FC<Props> = ({ title, children }) => (
  <section className="flex flex-col w-full mt-5">
    <div className="mx-4 text-xl w-full capitalize">
      <h3>{title}</h3>
    </div>
    <div className="flex flex-col w-full items-center">{children}</div>
  </section>
);

export default PageSection;
