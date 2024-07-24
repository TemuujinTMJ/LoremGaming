import React from "react";

interface TitleProps {
  title: string;
  subtitle: string;
}

const Title: React.FC<TitleProps> = ({ title, subtitle }) => {
  return (
    <div className="md:my-8 grid gap-4">
      <div className="text-2xl md:text-3xl font-bold text-primary">{title}</div>
      <div className="md:text-sm text-secondary">{subtitle}</div>
    </div>
  );
};

export default Title;
