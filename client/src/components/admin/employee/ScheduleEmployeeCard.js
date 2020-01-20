import React from "react";
import moment from "moment";

import { Button, Card, List, Header, Label, Icon } from "semantic-ui-react";

const ScheduleEmployeeCard = ({ sched: { id, date, start } }) => {
  return (
    <Card centered>
      <Label corner="right">
        <Icon name="delete" />
      </Label>
      <Card.Content textAlign="center">
        <Header size="tiny" as="h4" block>
          {moment(parseInt(date)).format("LL")}
        </Header>
        <Card.Description>
          {start.map((time, index) => (
            <List horizontal selection>
              <List.Item key={`${id}+${index}`}>
                <Label size="mini">{time}</Label>
              </List.Item>
            </List>
          ))}
        </Card.Description>
        <Button basic size="small" color="blue">
          Update
        </Button>
      </Card.Content>
    </Card>
  );
};

export default ScheduleEmployeeCard;
