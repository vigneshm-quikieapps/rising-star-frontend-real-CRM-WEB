import { CardCol4, CardRow, Description, Title } from "../../components/common";
import Output from "../../components/output";
import Status from "../../components/status";

export const Outputs = ({ arr }) => {
  return (
    <>
      {arr.map((item, index) => {
        return (
          <CardCol4 key={index}>
            <Output
              title={item[0]}
              description={
                item[0] == "Status" ? (
                  <Status status="green" title={item[1]} />
                ) : (
                  item[1]
                )
              }
              variant="title"
            />
          </CardCol4>
        );
      })}
    </>
  );
};

export const TitleDescription = ({ title, description }) => {
  return (
    <CardRow sx={{ marginRight: "20px" }}>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </CardRow>
  );
};
